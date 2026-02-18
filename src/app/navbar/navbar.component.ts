import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
  exact?: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgFor, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuOpen = false;

  readonly navItems: NavItem[] = [
    { label: 'Home', route: '/', exact: true },
    { label: 'About', route: '/about' },
    { label: 'Media', route: '/media' },
    { label: 'Ministries', route: '/ministries' },
    { label: 'Careers', route: '/careers' },
    { label: 'Contact', route: '/visit' }
  ];

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
