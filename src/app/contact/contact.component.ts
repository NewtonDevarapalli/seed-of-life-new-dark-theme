import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  phoneNumber: string = '917981239678';
  whatsappMessage: string = 'Hello, I would like to know more about the ministry.';
  whatsappChannelLink: string = 'https://whatsapp.com/channel/0029VbACkcOBVJkwSQIoSu2A';

  get whatsappChatLink(): string {
    return `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(this.whatsappMessage)}`;
  }

  get callLink(): string {
    return `tel:+${this.phoneNumber}`;
  }

  get prayerRequestLink(): string {
    return this.buildWhatsappLink(
      [
        '*PRAYER REQUEST*',
        'Name:',
        'Prayer Category:',
        'Urgency (Normal/Urgent):',
        'Request Details:',
        'Callback Number:'
      ].join('\n')
    );
  }

  get planVisitLink(): string {
    return this.buildWhatsappLink(
      [
        '*PLAN MY VISIT*',
        'Name:',
        'First Time Visit (Yes/No):',
        'Preferred Service:',
        'Family Members Count:',
        'Need Directions Help (Yes/No):',
        'Contact Number:'
      ].join('\n')
    );
  }

  private buildWhatsappLink(message: string): string {
    return `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(message)}`;
  }
}
