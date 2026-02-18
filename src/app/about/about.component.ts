import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MissionPoint {
  title: string;
  detail: string;
}

interface BeliefPoint {
  title: string;
  detail: string;
}

interface PastorProfile {
  name: string;
  role: string;
  image: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  readonly missionPoints: MissionPoint[] = [
    {
      title: 'Preach The Word',
      detail: 'We teach the uncompromised Gospel of Jesus Christ with conviction and clarity.'
    },
    {
      title: 'Equip Believers',
      detail: 'We train disciples through apostolic and prophetic foundations for everyday life.'
    },
    {
      title: 'Build Communities',
      detail: 'We cultivate worship, prayer, fellowship, and spiritual accountability.'
    },
    {
      title: 'Healing And Deliverance',
      detail: 'We minister freedom and restoration to the brokenhearted and oppressed.'
    },
    {
      title: 'Impact Nations',
      detail: 'We carry revival fire beyond local boundaries to cities and nations.'
    }
  ];

  readonly beliefs: BeliefPoint[] = [
    {
      title: 'The Word Of God',
      detail: 'Scripture is our final authority for truth, doctrine, and daily living.'
    },
    {
      title: 'Jesus Christ',
      detail: 'Salvation is found only through the finished work of Christ.'
    },
    {
      title: 'The Holy Spirit',
      detail: 'The Spirit empowers holy living, prayer, and spiritual gifts.'
    },
    {
      title: 'Prayer And Prophecy',
      detail: 'We pursue God through intercession and biblical prophetic ministry.'
    }
  ];

  readonly pastors: PastorProfile[] = [
    {
      name: 'Pastor Abhijith S Sofji',
      role: 'Senior Pastor',
      image: 'assets/pastor1.jpg'
    },
    {
      name: 'Pastor Triveni',
      role: 'Co-Pastor',
      image: 'assets/pastor2.jpg'
    }
  ];
}
