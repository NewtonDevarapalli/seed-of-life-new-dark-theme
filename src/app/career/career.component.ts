import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

interface Opportunity {
  title: string;
  location: string;
  description: string;
}

type OpportunityCategory = 'Staff Role' | 'Volunteer';

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent {
  readonly jobs: Opportunity[] = [
    {
      title: 'Worship Leader',
      location: 'Secunderabad, India',
      description: 'Lead worship sessions and train the worship and choir teams.'
    },
    {
      title: 'Youth Pastor',
      location: 'Secunderabad, India',
      description: 'Disciple youth, mentor students, and coordinate youth gatherings.'
    },
    {
      title: 'Media Coordinator',
      location: 'Remote / Hybrid',
      description: 'Manage livestream production, social media publishing, and media assets.'
    },
    {
      title: 'Prayer Ministry Leader',
      location: 'Remote / Onsite',
      description: 'Organize intercession teams and coordinate corporate prayer gatherings.'
    },
    {
      title: 'Administrative Assistant',
      location: 'Secunderabad, India',
      description: 'Support office operations, scheduling, and ministry communications.'
    }
  ];

  readonly volunteers: Opportunity[] = [
    {
      title: 'Children\'s Ministry Volunteer',
      location: 'Onsite',
      description: 'Mentor children in Sunday school and faith-building activities.'
    },
    {
      title: 'Youth Ministry Volunteer',
      location: 'Onsite',
      description: 'Support youth events, small groups, and mentorship programs.'
    },
    {
      title: 'Media And Livestream Volunteer',
      location: 'Onsite / Remote',
      description: 'Assist with recording, live streaming, and post-production tasks.'
    },
    {
      title: 'Community Outreach Volunteer',
      location: 'Onsite',
      description: 'Serve in local outreach initiatives, prayer visits, and mission activities.'
    }
  ];

  selectedOpportunity: Opportunity | null = null;
  selectedOpportunityCategory: OpportunityCategory | null = null;
  applicationFile: File | null = null;
  isSubmitting = false;
  submissionMessage = '';
  submissionError = false;

  readonly applicationForm;

  private readonly ministryInboxEmail = 'seedoflifeministries@gmail.com';
  private readonly ministryWhatsappNumber = '917981239678';
  private readonly serviceID = 'service_oifeiiq';
  private readonly templateID = 'template_md006bu';
  private readonly userID = 'BRM5WdVlL8VJax2n1';

  constructor(private fb: FormBuilder) {
    this.applicationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{8,20}$/)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  openApplication(opportunity: Opportunity, category: OpportunityCategory): void {
    this.selectedOpportunity = opportunity;
    this.selectedOpportunityCategory = category;
    this.submissionMessage = '';
    this.submissionError = false;
    this.applicationForm.markAsPristine();
    this.applicationForm.markAsUntouched();
  }

  closeApplication(): void {
    this.selectedOpportunity = null;
    this.selectedOpportunityCategory = null;
    this.applicationForm.reset();
    this.applicationFile = null;
    this.isSubmitting = false;
    this.submissionMessage = '';
    this.submissionError = false;
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.applicationFile = target.files?.[0] ?? null;
  }

  submitApplication(): void {
    if (!this.selectedOpportunity || this.isSubmitting) return;
    if (this.applicationForm.invalid) {
      this.applicationForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submissionMessage = '';
    this.submissionError = false;

    const formValue = this.applicationForm.getRawValue();

    const submittedAt = new Date().toLocaleString('en-IN');
    const applicationDetails: Array<[string, string]> = [
      ['Application Type', this.selectedOpportunityCategory ?? 'Not specified'],
      ['Role Applied', this.selectedOpportunity.title],
      ['Role Location', this.selectedOpportunity.location],
      ['Applicant Name', formValue.name ?? ''],
      ['Applicant Email', formValue.email ?? ''],
      ['Applicant Mobile', formValue.mobile ?? ''],
      ['Why Called To Role', formValue.message ?? ''],
      ['Resume File', this.applicationFile?.name ?? 'Not provided'],
      ['Submitted At', submittedAt]
    ];

    const templateParams = {
      name: formValue.name,
      email: formValue.email,
      phone: formValue.mobile,
      message: formValue.message,
      jobTitle: this.selectedOpportunity.title,
      // explicit ministry inbox payload fields
      to_email: this.ministryInboxEmail,
      applicant_name: formValue.name,
      applicant_email: formValue.email,
      applicant_mobile: formValue.mobile,
      course_applied: this.selectedOpportunity.title,
      application_message: formValue.message,
      resume_file_name: this.applicationFile?.name ?? 'Not provided',
      submitted_at: submittedAt,
      role_location: this.selectedOpportunity.location,
      application_type: this.selectedOpportunityCategory ?? 'Not specified',
      application_table_html: this.buildApplicationTableHtml(applicationDetails),
      application_table_text: this.buildApplicationTableText(applicationDetails)
    };

    emailjs.send(this.serviceID, this.templateID, templateParams, this.userID)
      .then((response: EmailJSResponseStatus) => {
        if (response.status === 200) {
          this.submissionError = false;
          this.submissionMessage = `Application sent for ${this.selectedOpportunity?.title}.`;
          this.applicationForm.reset();
          this.applicationFile = null;
        }
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
        this.submissionError = true;
        this.submissionMessage = 'Failed to send application. Please try again later.';
      })
      .finally(() => {
        this.isSubmitting = false;
      });
  }

  sendToWhatsApp(): void {
    if (!this.selectedOpportunity) return;
    if (this.applicationForm.invalid) {
      this.applicationForm.markAllAsTouched();
      return;
    }

    const formValue = this.applicationForm.getRawValue();
    const submittedAt = new Date().toLocaleString('en-IN');
    const message = this.buildWhatsAppMessage([
      ['Application Type', this.selectedOpportunityCategory ?? 'Not specified'],
      ['Role Applied', this.selectedOpportunity.title],
      ['Role Location', this.selectedOpportunity.location],
      ['Applicant Name', formValue.name ?? ''],
      ['Applicant Email', formValue.email ?? ''],
      ['Applicant Mobile', formValue.mobile ?? ''],
      ['Why Called To Role', formValue.message ?? ''],
      ['Resume File', this.applicationFile?.name ?? 'Not provided'],
      ['Submitted At', submittedAt]
    ]);

    const url = `https://wa.me/${this.ministryWhatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  private buildApplicationTableHtml(details: Array<[string, string]>): string {
    const rows = details
      .map(
        ([label, value]) =>
          `<tr>
            <td style="padding:10px 12px;border:1px solid #d9d9d9;background:#f7f7f7;font-weight:700;width:35%;">${this.escapeHtml(label)}</td>
            <td style="padding:10px 12px;border:1px solid #d9d9d9;background:#ffffff;">${this.escapeHtml(value || '-')}</td>
          </tr>`
      )
      .join('');

    return `<table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;max-width:700px;font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#222;">
      <thead>
        <tr>
          <th colspan="2" style="padding:12px;border:1px solid #d9d9d9;background:#1c2a33;color:#ffffff;text-align:left;font-size:15px;">
            Seed Of Life Application Details
          </th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
  }

  private buildApplicationTableText(details: Array<[string, string]>): string {
    return details.map(([label, value]) => `${label}: ${value || '-'}`).join('\n');
  }

  private buildWhatsAppMessage(details: Array<[string, string]>): string {
    const lines = details.map(([label, value]) => `*${label}:* ${value || '-'}`);
    return ['*CAREERS*', 'Application Details', '------------------------------', ...lines].join('\n');
  }

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
