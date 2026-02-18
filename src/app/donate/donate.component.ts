import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface BankDetail {
  label: string;
  value: string;
}

interface UpiApp {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [NgFor],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css'
})
export class DonateComponent {
  readonly whatsappNumber = '917981239678';

  readonly bankDetails: BankDetail[] = [
    { label: 'Account Name', value: 'Abhijith S Sofji' },
    { label: 'Account Number', value: '10720100392027' },
    { label: 'IFSC Code', value: 'FDRL0001072' },
    { label: 'Branch', value: 'Nedumangad' }
  ];

  readonly upiApps: UpiApp[] = [
    { name: 'Google Pay', logo: 'assets/give/gpay.png' },
    { name: 'PhonePe', logo: 'assets/give/phonepe.png' }
  ];

  get givingSupportLink(): string {
    const message = [
      '*GIVING SUPPORT REQUEST*',
      'Name:',
      'Giving Method (UPI/Bank):',
      'Issue Type (Payment failed/Reference needed/Other):',
      'Amount:',
      'Transaction Reference (if any):',
      'Contact Number:'
    ].join('\n');

    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }
}
