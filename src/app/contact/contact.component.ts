import { Component, inject } from '@angular/core';
import { CommonService } from '../projects/service/common.service';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']

})
export class ContactComponent {
  personalInfo: any; // info anagrafiche
  contact = {
    firstName: '',
    lastName: '',
    email: '',
    description: ''
  };
  feedbackList: any[] = [];
  currentIndex: number = 0;

  commonService = inject(CommonService)

  ngOnInit(): void {
    // Recupero i dati personali
    this.commonService.fetchData().subscribe({
      next: (data) => {
        this.personalInfo = data.personalInfo;
        console.log('Fetched Data:', {
          personalInfo: this.personalInfo,
        });
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      },
    });

    // Recupero i feedback
    this.commonService.fetchFeedback().subscribe({
      next: (response) => {
        this.feedbackList = response.feedback;
        console.log('feedback list:', this.feedbackList);
      },
      error: (err) => {
        console.error('The feedback error is -->', err);
      }
    });
  }

  getStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push('bi-star-fill');
      } else {
        stars.push('bi-star');
      }
    }
    return stars;
  }

  //contact form submit 
  onSubmit(): void {
    if (this.contact.firstName && this.contact.lastName && this.contact.email && this.contact.description) {
      console.log('Contact Form Submitted', this.contact);
      alert("Message sent");
    }
  }
}
