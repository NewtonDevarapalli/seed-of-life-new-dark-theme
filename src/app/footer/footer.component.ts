import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface FooterRoute {
  label: string;
  route: string;
  exact?: boolean;
}

interface SocialLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor, RouterLink, RouterLinkActive],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

  readonly routes: FooterRoute[] = [
    { label: 'Home', route: '/', exact: true },
    { label: 'About', route: '/about' },
    { label: 'Media', route: '/media' },
    { label: 'Ministries', route: '/ministries' },
    { label: 'Careers', route: '/careers' },
    { label: 'Give', route: '/give' },
    { label: 'Contact', route: '/visit' }
  ];

  readonly socials: SocialLink[] = [
    { label: 'Facebook', href: 'https://www.facebook.com/seedoflifeapstolicpropheticministriesintl/' },
    { label: 'YouTube', href: 'https://www.youtube.com/@pastortriveni' },
    { label: 'WhatsApp Channel', href: 'https://whatsapp.com/channel/0029VbACkcOBVJkwSQIoSu2A' }
  ];
}
