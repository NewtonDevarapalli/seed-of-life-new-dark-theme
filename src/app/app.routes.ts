import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MediaComponent } from './media/media.component';
import { MinistriesComponent } from './ministries/ministries.component';
import { CareerComponent } from './career/career.component';
import { DonateComponent } from './donate/donate.component';
import { ContactComponent } from './contact/contact.component';
import { SermonsComponent } from './sermons/sermons.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home | Seed Of Life Ministries',
    data: {
      description: 'Welcome to Seed Of Life Ministries. Worship, prayer, and discipleship for families, youth, and communities.'
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About | Seed Of Life Ministries',
    data: {
      description: 'Learn about Seed Of Life Ministries, our mission, beliefs, pastors, and spiritual direction.'
    }
  },
  {
    path: 'media',
    component: MediaComponent,
    title: 'Media | Seed Of Life Ministries',
    data: {
      description: 'Watch sermons, livestreams, and ministry teachings from Seed Of Life Ministries.'
    }
  },
  {
    path: 'ministries',
    component: MinistriesComponent,
    title: 'Ministries | Seed Of Life Ministries',
    data: {
      description: 'Explore ministries and programs including prophetic training, media service, and outreach opportunities.'
    }
  },
  {
    path: 'careers',
    component: CareerComponent,
    title: 'Careers | Seed Of Life Ministries',
    data: {
      description: 'Apply for ministry roles or volunteer opportunities and serve with Seed Of Life Ministries.'
    }
  },
  {
    path: 'give',
    component: DonateComponent,
    title: 'Give | Seed Of Life Ministries',
    data: {
      description: 'Partner with Seed Of Life Ministries through secure giving and support the mission.'
    }
  },
  {
    path: 'visit',
    component: ContactComponent,
    title: 'Contact | Seed Of Life Ministries',
    data: {
      description: 'Contact Seed Of Life Ministries for prayer, support, and service information.'
    }
  },
  {
    path: 'sermons',
    component: SermonsComponent,
    title: 'Sermons | Seed Of Life Ministries',
    data: {
      description: 'Watch words of wisdom and sermon teachings from Seed Of Life Ministries.'
    }
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
