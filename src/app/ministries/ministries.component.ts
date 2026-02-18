import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MinistryCard {
  title: string;
  description: string;
  image: string;
  route: string;
}

@Component({
  selector: 'app-involved',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ministries.component.html',
  styleUrls: ['./ministries.component.css']
})
export class MinistriesComponent {
  readonly ministryCards: MinistryCard[] = [
    {
      title: 'Prophetic School Admissions',
      description: 'Join our training track and discover your calling in biblical leadership and ministry.',
      image: 'assets/ministries/prophetic-school.png',
      route: '/visit'
    },
    {
      title: 'International Conferences',
      description: 'Gather with believers from across regions for worship, teaching, and impartation.',
      image: 'assets/ministries/international-conf.png',
      route: '/media'
    },
    {
      title: 'Media Ministry',
      description: 'Help us broadcast the Gospel through streaming, video, design, and production.',
      image: 'assets/ministries/media.png',
      route: '/media'
    },
    {
      title: 'Job Opportunities',
      description: 'Use your professional gifts to serve in ministry roles and mission-driven teams.',
      image: 'assets/ministries/jobs.png',
      route: '/careers'
    },
    {
      title: 'Upcoming Events',
      description: 'Stay connected with conferences, prayer gatherings, outreach, and special services.',
      image: 'assets/ministries/upcoming-events.png',
      route: '/media'
    }
  ];
}
