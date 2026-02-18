import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

type VideoFilter = 'all' | 'sermons' | 'shorts';

interface SermonVideo {
  id: string;
  title: string;
  durationSeconds: number;
  isShort: boolean;
}

interface YoutubeSearchResponse {
  items?: Array<{
    id?: { videoId?: string };
    snippet?: {
      title?: string;
      liveBroadcastContent?: string;
    };
  }>;
}

interface YoutubeVideoDetailsResponse {
  items?: Array<{
    id?: string;
    contentDetails?: {
      duration?: string;
    };
  }>;
}

@Component({
  selector: 'app-sermons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sermons.component.html',
  styleUrls: ['./sermons.component.css']
})
export class SermonsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sermonsSection') sermonsSectionRef?: ElementRef<HTMLElement>;
  @ViewChild('catalogRow') catalogRowRef?: ElementRef<HTMLElement>;
  @Output() playbackStateChange = new EventEmitter<boolean>();

  readonly filters: Array<{ key: VideoFilter; label: string }> = [
    { key: 'all', label: 'All' },
    { key: 'sermons', label: 'Sermons' },
    { key: 'shorts', label: 'Shorts' }
  ];

  readonly fallbackVideos: SermonVideo[] = [
    { title: 'God will change rules', id: '5AWzj-Bkv68', durationSeconds: 300, isShort: false },
    { title: 'Overcoming Fear', id: '3gkIFiVmlyg', durationSeconds: 300, isShort: false },
    { title: 'Power of Prayer', id: 'ezL0okMBhyg', durationSeconds: 300, isShort: false },
    { title: 'Mind of Christ', id: 'K8a1gW2oyYU', durationSeconds: 300, isShort: false },
    { title: 'Do not grieve the Holy Spirit', id: 'KhzGxKD42Bc', durationSeconds: 300, isShort: false }
  ];

  allVideos: SermonVideo[] = [];
  videos: SermonVideo[] = [];
  selectedFilter: VideoFilter = 'all';
  activeIndex = 0;
  isLoadingVideos = true;

  selectedVideoUrl?: SafeResourceUrl;
  previewVideoId: string | null = null;

  private observer?: IntersectionObserver;
  private isSectionActive = false;
  private previewUrlCache = new Map<string, SafeResourceUrl>();

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadVideosFromChannel();
  }

  ngAfterViewInit(): void {
    this.initializeIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.playbackStateChange.emit(false);
  }

  get isCurrentVideoShort(): boolean {
    return this.videos[this.activeIndex]?.isShort ?? false;
  }

  setFilter(filter: VideoFilter): void {
    if (this.selectedFilter === filter) return;
    this.selectedFilter = filter;
    this.applyVideoFilter();
  }

  selectVideo(index: number): void {
    if (index < 0 || index >= this.videos.length) return;

    this.activeIndex = index;
    this.previewVideoId = null;
    this.updateSelectedVideoUrl(true);
  }

  startPreview(videoId: string): void {
    this.previewVideoId = videoId;
  }

  stopPreview(videoId?: string): void {
    if (!videoId || this.previewVideoId === videoId) {
      this.previewVideoId = null;
    }
  }

  scrollCatalog(direction: 1 | -1): void {
    const container = this.catalogRowRef?.nativeElement;
    if (!container) return;

    const amount = Math.max(container.clientWidth * 0.78, 260);
    container.scrollBy({
      left: amount * direction,
      behavior: 'smooth'
    });
  }

  isPreviewing(videoId: string): boolean {
    return this.previewVideoId === videoId;
  }

  getVideoThumbnail(videoId: string): string {
    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  }

  getPreviewUrl(videoId: string): SafeResourceUrl {
    const cached = this.previewUrlCache.get(videoId);
    if (cached) return cached;

    const url = this.buildEmbedUrl(videoId, {
      autoplay: true,
      mute: true,
      controls: false,
      loop: true
    });

    const trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.previewUrlCache.set(videoId, trustedUrl);
    return trustedUrl;
  }

  private loadVideosFromChannel(): void {
    const apiKey = environment.youtubeLiveApiKey;
    const channelId = environment.youtubeChannelId;

    if (!apiKey || !channelId) {
      this.setAllVideos(this.fallbackVideos);
      return;
    }

    const searchUrl =
      `https://www.googleapis.com/youtube/v3/search?part=snippet` +
      `&channelId=${encodeURIComponent(channelId)}` +
      `&maxResults=20&type=video&order=date&key=${apiKey}`;

    this.http.get<YoutubeSearchResponse>(searchUrl).subscribe({
      next: (response) => {
        const channelVideos =
          response.items
            ?.filter(
              (item) =>
                item.id?.videoId &&
                item.snippet?.liveBroadcastContent === 'none'
            )
            .map((item) => ({
              id: item.id!.videoId!,
              title: item.snippet?.title?.trim() || 'Sermon Video'
            })) ?? [];

        if (!channelVideos.length) {
          this.setAllVideos(this.fallbackVideos);
          return;
        }

        this.loadDurationsForVideos(channelVideos, apiKey);
      },
      error: () => {
        this.setAllVideos(this.fallbackVideos);
      }
    });
  }

  private loadDurationsForVideos(videos: Array<{ id: string; title: string }>, apiKey: string): void {
    const ids = videos.map((video) => video.id).join(',');
    const detailsUrl =
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails` +
      `&id=${encodeURIComponent(ids)}&key=${apiKey}`;

    this.http.get<YoutubeVideoDetailsResponse>(detailsUrl).subscribe({
      next: (detailsResponse) => {
        const durationMap = new Map<string, number>();

        detailsResponse.items?.forEach((item) => {
          if (!item.id) return;
          durationMap.set(item.id, this.parseIsoDurationToSeconds(item.contentDetails?.duration));
        });

        const mergedVideos: SermonVideo[] = videos.map((video) => {
          const durationSeconds = durationMap.get(video.id) ?? 0;
          return {
            id: video.id,
            title: video.title,
            durationSeconds,
            isShort: this.isShortVideo(video.title, durationSeconds)
          };
        });

        this.setAllVideos(mergedVideos.length ? mergedVideos : this.fallbackVideos);
      },
      error: () => {
        const mergedVideos: SermonVideo[] = videos.map((video) => ({
          id: video.id,
          title: video.title,
          durationSeconds: 0,
          isShort: this.isShortVideo(video.title, 0)
        }));

        this.setAllVideos(mergedVideos.length ? mergedVideos : this.fallbackVideos);
      }
    });
  }

  private setAllVideos(videos: SermonVideo[]): void {
    this.allVideos = videos;
    this.isLoadingVideos = false;
    this.applyVideoFilter();
  }

  private applyVideoFilter(): void {
    if (!this.allVideos.length) {
      this.videos = [];
      this.activeIndex = 0;
      this.selectedVideoUrl = undefined;
      return;
    }

    if (this.selectedFilter === 'sermons') {
      this.videos = this.allVideos.filter((video) => !video.isShort);
    } else if (this.selectedFilter === 'shorts') {
      this.videos = this.allVideos.filter((video) => video.isShort);
    } else {
      this.videos = this.allVideos;
    }

    this.activeIndex = 0;
    this.previewVideoId = null;

    if (!this.videos.length) {
      this.selectedVideoUrl = undefined;
      this.playbackStateChange.emit(false);
      return;
    }

    this.updateSelectedVideoUrl(false);
    this.playbackStateChange.emit(this.isSectionActive);
  }

  private updateSelectedVideoUrl(autoplay: boolean): void {
    if (!this.videos.length) {
      this.selectedVideoUrl = undefined;
      return;
    }

    const videoId = this.videos[this.activeIndex].id;
    const url = this.buildEmbedUrl(videoId, {
      autoplay,
      mute: false,
      controls: true,
      loop: false
    });

    this.selectedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private buildEmbedUrl(
    videoId: string,
    options: { autoplay: boolean; mute: boolean; controls: boolean; loop: boolean }
  ): string {
    const params = new URLSearchParams({
      autoplay: options.autoplay ? '1' : '0',
      mute: options.mute ? '1' : '0',
      controls: options.controls ? '1' : '0',
      rel: '0',
      playsinline: '1',
      modestbranding: '1'
    });

    if (options.loop) {
      params.set('loop', '1');
      params.set('playlist', videoId);
    }

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  }

  private initializeIntersectionObserver(): void {
    if (typeof IntersectionObserver === 'undefined' || !this.sermonsSectionRef) {
      this.setSectionPlaybackState(true);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        this.setSectionPlaybackState(entry.isIntersecting);
      },
      { threshold: 0.45 }
    );

    this.observer.observe(this.sermonsSectionRef.nativeElement);
  }

  private setSectionPlaybackState(isActive: boolean): void {
    if (this.isSectionActive === isActive) return;

    this.isSectionActive = isActive;
    if (!isActive) {
      this.previewVideoId = null;
      this.updateSelectedVideoUrl(false);
    }

    this.playbackStateChange.emit(isActive && this.videos.length > 0);
  }

  private isShortVideo(title: string, durationSeconds: number): boolean {
    if (durationSeconds > 0) {
      return durationSeconds <= 90;
    }

    return /\bshorts?\b|#shorts?\b/i.test(title);
  }

  private parseIsoDurationToSeconds(duration?: string): number {
    if (!duration) return 0;

    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;

    const hours = Number(match[1] ?? 0);
    const minutes = Number(match[2] ?? 0);
    const seconds = Number(match[3] ?? 0);

    return hours * 3600 + minutes * 60 + seconds;
  }
}
