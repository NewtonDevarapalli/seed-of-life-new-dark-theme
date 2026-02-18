import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface EventItem {
  title: string;
  time: string;
  description: string;
  cssClass: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NgFor],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  readonly whatsappNumber = '917981239678';

  readonly events: EventItem[] = [
    {
      title: 'Sunday Service',
      time: 'Sundays | 4:00 PM',
      description: 'Join us every Sunday for worship, word, and fellowship.',
      cssClass: 'sunday'
    },
    {
      title: 'Holy Communion',
      time: 'Third Sunday Of Every Month',
      description: 'A sacred time to remember the cross and renew our covenant walk.',
      cssClass: 'communion'
    },
    {
      title: 'Deliverance Meeting',
      time: 'Wednesdays | 8:00 PM',
      description: 'Prayer and ministry for freedom, healing, and restoration.',
      cssClass: 'deliverance'
    },
    {
      title: 'All Night Prayer',
      time: 'Third Friday Of Every Month',
      description: 'A night of intense intercession and seeking the Lord together.',
      cssClass: 'night-prayer'
    },
    {
      title: 'Men\'s Prayer',
      time: 'Mondays | 9:00 PM',
      description: 'Men gathering in prayer, discipleship, and accountability.',
      cssClass: 'mens-prayer'
    }
  ];

  getEventRsvpLink(event: EventItem): string {
    const message = [
      '*EVENT RSVP*',
      `Event: ${event.title}`,
      `Time: ${event.time}`,
      'Name:',
      'Number of Attendees:',
      'Mobile Number:',
      'Any Prayer Request:'
    ].join('\n');

    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }
}
