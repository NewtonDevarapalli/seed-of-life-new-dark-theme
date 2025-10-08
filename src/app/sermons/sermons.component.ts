import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Sermon {
  title: string;
  date: string;
  youtubeId: string;
  thumbnail: string;
}

@Component({
  selector: 'app-sermons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sermons.component.html',
  styleUrls: ['./sermons.component.css']
})
export class SermonsComponent {
  public selectedVideo: SafeResourceUrl | null = null;

  sermons: Sermon[] = [
    {
      title: 'When Loss Is Gain',
      date: '10.5.25 | PRESS ON!',
      youtubeId: 'DdVf0xgjUAI',
      thumbnail: 'assets/press-on-1.jpg'
    },
    {
      title: 'Sending Saints',
      date: '9.28.25 | PRESS ON!',
      youtubeId: 'abcdefghijk',
      thumbnail: 'assets/press-on-2.jpg'
    },
    {
      title: 'Working Out What God Works In',
      date: '9.21.25 | PRESS ON!',
      youtubeId: 'lmnopqrstuv',
      thumbnail: 'assets/press-on-3.jpg'
    }
  ];

  constructor(private sanitizer: DomSanitizer) {}

  playVideo(youtubeId: string) {
    this.selectedVideo = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${youtubeId}?autoplay=1`
    );
  }

  closeVideo() {
    this.selectedVideo = null;
  }
}
