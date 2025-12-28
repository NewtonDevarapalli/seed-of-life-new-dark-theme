import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  phoneNumber: string = '917981239678'; // Country code + number
  whatsappMessage: string = 'Hello, I would like to know more about the ministry.';
  whatsappChannelLink: string = 'https://whatsapp.com/channel/0029VbACkcOBVJkwSQIoSu2A';

  get whatsappChatLink(): string {
    return `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(this.whatsappMessage)}`;
  }

  get callLink(): string {
    return `tel:+${this.phoneNumber}`;
  }
}
