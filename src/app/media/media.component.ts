import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MediaCard {
  title: string;
  description: string;
  href: string;
  external: boolean;
}

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule],
  templateUrl: './media.component.html',
  styleUrl: './media.component.css'
})
export class MediaComponent {
  readonly featuredMessage = {
    title: 'Watch The Latest Message',
    description: 'Stay rooted in the Word through recent sermons, short teachings, and live worship sessions.',
    href: 'https://www.youtube.com/@pastortriveni'
  };

  readonly mediaResources: MediaCard[] = [
    {
      title: 'YouTube Channel',
      description: 'Full messages, shorts, and livestream archives from Seed Of Life Ministries.',
      href: 'https://www.youtube.com/@pastortriveni',
      external: true
    },
    {
      title: 'Livestream Page',
      description: 'Join worship and teaching in real time during live ministry moments.',
      href: 'https://www.youtube.com/@pastortriveni/live',
      external: true
    },
    {
      title: 'Events And Services',
      description: 'See what is happening this week and plan your next in-person gathering.',
      href: '/',
      external: false
    },
    {
      title: 'Ministry Programs',
      description: 'Explore discipleship pathways, training tracks, and outreach opportunities.',
      href: '/ministries',
      external: false
    }
  ];
}
