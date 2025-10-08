import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MediaComponent } from './media/media.component';
import { MinistriesComponent } from './ministries/ministries.component';
import { CareerComponent } from './career/career.component';
import { DonateComponent } from './donate/donate.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'media', component: MediaComponent },
  { path: 'ministries', component: MinistriesComponent },
  { path: 'careers', component: CareerComponent },
  { path: 'give', component: DonateComponent },
  { path: 'visit', component: ContactComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // fallback
];