import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent {
  jobs = [
  { title: 'Worship Leader', location: 'Secunderabad, India', description: 'Lead worship sessions and train choir.' },
  { title: 'Youth Pastor', location: 'Secunderabad, India', description: 'Guide youth and mentor spiritual growth.' },
  { title: 'Media Coordinator', location: 'Remote / Hybrid', description: 'Manage live streaming and video editing.' },
  { title: 'Prayer Ministry Leader', location: 'Remote / Onsite', description: 'Organize prayer meetings and intercessory teams.' },
  { title: 'Administrative Assistant', location: 'Secunderabad, India', description: 'Manage office operations and scheduling.' }
];

volunteers = [
  { title: 'Children’s Ministry Volunteer', description: 'Help mentor kids in Sunday school and programs.' },
  { title: 'Youth Ministry Volunteer', description: 'Support youth events and small groups.' },
  { title: 'Media & Livestream Volunteer', description: 'Assist in recording and streaming services.' },
  { title: 'Community Outreach Volunteer', description: 'Participate in mission trips and aid projects.' }
];

  selectedJob: any = null;
  application: any = { name: '', email: '', phone: '', message: '', file: null };

  // Replace these with your EmailJS IDs
  private serviceID = 'service_oifeiiq';
  private templateID = 'template_md006bu';
  private userID = 'BRM5WdVlL8VJax2n1';

  openApplication(job: any) {
    this.selectedJob = job;
  }

  closeApplication() {
    this.selectedJob = null;
    this.application = { name: '', email: '', phone: '', message: '', file: null };
  }

  onFileChange(event: any) {
    this.application.file = event.target.files[0];
  }

  submitApplication() {
    const templateParams = {
      name: this.application.name,
      email: this.application.email,
      phone: this.application.phone,
      message: this.application.message,
      jobTitle: this.selectedJob.title
    };

    emailjs.send(this.serviceID, this.templateID, templateParams, this.userID)
      .then((response: EmailJSResponseStatus) => {
        alert(`Thank you ${this.application.name}, your application for ${this.selectedJob.title} has been sent successfully.`);
        this.closeApplication();
      }, (error) => {
        console.error('Email sending failed:', error);
        alert('Failed to send application. Please try again later.');
      });
  }
}
