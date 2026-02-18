import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SermonsComponent } from '../sermons/sermons.component';
import { ServicesComponent } from '../services/services.component';
import { environment } from '../../environments/environment';

interface YoutubeLiveSearchResponse {
  items?: Array<{ snippet?: { liveBroadcastContent?: string } }>;
}

interface LocationCard {
  city: string;
  schedule: string;
  address: string;
}

interface PathwayCard {
  title: string;
  body: string;
  action: string;
  route: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, SermonsComponent, ServicesComponent, RouterModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroVideo') heroVideoRef?: ElementRef<HTMLVideoElement>;

  isLive: boolean = false;
  readonly locations: LocationCard[] = [
    {
      city: 'Secunderabad',
      schedule: 'Sundays | 4:00 PM',
      address: 'Seed Of Life Worship Centre, 2nd Floor, Above Rynox Showroom, Tirumalagiri'
    },
    {
      city: 'Weekly Prayer',
      schedule: 'Wednesdays | 7:00 PM',
      address: 'Online and in-person intercession with ministry team'
    }
  ];

  readonly pathways: PathwayCard[] = [
    {
      title: 'Plan Your Visit',
      body: 'New here? Get directions, service details, and what to expect before you arrive.',
      action: 'Visit Details',
      route: '/visit'
    },
    {
      title: 'Partner With The Mission',
      body: 'Your giving helps us disciple families, equip leaders, and serve the city.',
      action: 'Give Now',
      route: '/give'
    },
    {
      title: 'Grow Through The Word',
      body: 'Watch messages, revisit teachings, and stay rooted in biblical truth.',
      action: 'Explore Media',
      route: '/media'
    }
  ];

  private isSermonsPlaying = false;
  private userInteractedWithPage = false;

  private enableAudioHandler = () => {
    this.userInteractedWithPage = true;
    this.applyHeroVideoAudioState();
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const apiKey = environment.youtubeLiveApiKey;
    const channelId = environment.youtubeChannelId;

    if (!apiKey || !channelId) {
      this.isLive = false;
      return;
    }

    const liveUrl =
      `https://www.googleapis.com/youtube/v3/search?` +
      `part=snippet&channelId=${encodeURIComponent(channelId)}` +
      `&eventType=live&type=video&order=date&maxResults=5&key=${apiKey}`;

    this.http.get<YoutubeLiveSearchResponse>(liveUrl).subscribe({
      next: (res) => {
        const isLive =
          res.items?.some((item: any) => item.snippet?.liveBroadcastContent === 'live') ?? false;

        this.isLive = isLive;
      },
      error: (err) => {
        console.error('Live check failed', err);
        this.isLive = false;
      }
    });
  }

  ngAfterViewInit(): void {
    const video = this.heroVideoRef?.nativeElement;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    video.play().catch(() => {});

    document.addEventListener('click', this.enableAudioHandler, { once: true });
    document.addEventListener('touchstart', this.enableAudioHandler, { once: true });
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.enableAudioHandler);
    document.removeEventListener('touchstart', this.enableAudioHandler);
  }

  onSermonsPlaybackChange(isPlaying: boolean): void {
    this.isSermonsPlaying = isPlaying;
    this.applyHeroVideoAudioState();
  }

  private applyHeroVideoAudioState(): void {
    const video = this.heroVideoRef?.nativeElement;
    if (!video) return;

    if (this.isSermonsPlaying) {
      video.muted = true;
      video.setAttribute('muted', '');
      video.pause();
      return;
    }

    video.play().catch(() => {});

    if (this.userInteractedWithPage) {
      video.muted = false;
      video.removeAttribute('muted');
      video.volume = 0.6;
    }
  }
}
