import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sermons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sermons.component.html',
  styleUrls: ['./sermons.component.css']
})
export class SermonsComponent implements OnInit, OnDestroy {
  videos = [
    { title: 'God will change rules', url: 'https://www.youtube.com/shorts/5AWzj-Bkv68' },
    { title: 'Deliverance Lifestyle', url: 'https://www.youtube.com/shorts/5MBT3KEoR_Q' },
    { title: 'Overcoming Fear', url: 'https://www.youtube.com/shorts/3gkIFiVmlyg' },
    { title: 'Power of Prayer', url: 'https://www.youtube.com/shorts/ezL0okMBhyg' },
    { title: 'Mind of Christ', url: 'https://www.youtube.com/shorts/K8a1gW2oyYU' },
    { title: 'Do not grieve the Holy Spirit', url: 'https://www.youtube.com/shorts/KhzGxKD42Bc' }
  ];

  trustedUrls: SafeResourceUrl[] = [];
  activeIndex: number = 0;
  intervalId: any;

  constructor(private sanitizer: DomSanitizer) {
    this.trustedUrls = this.videos.map(v => {
      const videoId = this.extractVideoId(v.url);
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`);
    });
  }

  ngOnInit(): void {
    // Auto-scroll every 5 seconds
    this.intervalId = setInterval(() => this.nextVideo(), 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  extractVideoId(url: string): string {
    const match = url.match(/(?:shorts\/|watch\?v=)([^&]+)/);
    return match ? match[1] : '';
  }

  nextVideo(): void {
    this.activeIndex = (this.activeIndex + 1) % this.videos.length;
  }

  goToVideo(index: number): void {
    this.activeIndex = index;
  }
}
