import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  successMessage: string | null = null;
  errorMessage: string | null = null;

  sendEmail(e: Event) {
    e.preventDefault();

    emailjs.sendForm(
      'service_oifeiiq',   // replace with EmailJS Service ID
      'template_md006bu',  // replace with EmailJS Template ID
      e.target as HTMLFormElement,
      'BRM5WdVlL8VJax2n1'    // replace with EmailJS Public Key
    ).then(
      (result: EmailJSResponseStatus) => {
        this.successMessage = "Your message has been sent successfully!";
        this.errorMessage = null;
        (e.target as HTMLFormElement).reset();
      },
      (error) => {
        this.errorMessage = "Oops! Something went wrong. Please try again.";
        this.successMessage = null;
      }
    );
  }
}
