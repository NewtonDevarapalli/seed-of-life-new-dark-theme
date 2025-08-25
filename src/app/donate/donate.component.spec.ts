import { Component } from '@angular/core';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent {
  qrCodeUrl = 'assets\favicon-16x16.png'; // Replace with the actual QR code image path
}