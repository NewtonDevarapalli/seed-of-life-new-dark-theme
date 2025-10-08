import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { Routes } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { CareerComponent } from '../career/career.component';
import { ContactComponent } from '../contact/contact.component';
import { DonateComponent } from '../donate/donate.component';
import { SermonsComponent } from "../sermons/sermons.component";
import { ServicesComponent } from "../services/services.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, SermonsComponent, ServicesComponent],  // ✅ Added NgIf here
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isLive: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const apiKey = 'AIzaSyDM_ubjFkCerT3TsuNCS5C8YTINsWQCEqA'; // ⚠️ better move to environment.ts
    const channelId = 'UCXkwwKy8IVci30218IC5LPw';

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`;

    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.isLive = response.items && response.items.length > 0;
      },
      error: (err) => {
        console.error('Error fetching YouTube live status:', err);
        this.isLive = false;
      }
    });
  }
}
export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'career', component: CareerComponent },
    { path: 'donate', component: DonateComponent },
];

