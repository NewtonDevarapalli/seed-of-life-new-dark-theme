import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-involved',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ministries.component.html',
  styleUrls: ['./ministries.component.css']
})
export class MinistriesComponent {
  involvementList = [
    {
      title: 'Volunteer',
      description: 'Participate in the mission to advance the gospel by serving on a volunteer team.',
      image: 'assets/images/volunteer.jpg',
      link: '/ministries'
    },
    {
      title: 'Lead',
      description: 'Lead an eGroup, host a Watch Party or become a student leader.',
      image: 'assets/images/lead.jpg',
      link: '/careers'
    },
    {
      title: 'Jobs',
      description: 'Explore job opportunities to use your gifts in a ministry setting.',
      image: 'assets/images/jobs.jpg',
      link: '/careers'
    }
  ];
}
