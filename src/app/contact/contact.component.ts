import { Component, inject } from '@angular/core';
import { CommonService } from '../projects/service/common.service';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIcon
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']

})
export class ContactComponent {
  personalInfo: any;

  contact = {
    firstName: '',
    lastName: '',
    email: '',
    description: ''
  };

  feedbackList: any[] = [];
  newFeedback = {
    author: '',
    feedback: '',
    image: 'assets/images/default.jpg', // Immagine di default
    date: new Date().toISOString().split('T')[0],
    rating: 0
  };
  editingFeedback: any = null;

  stars: number[] = Array(5).fill(0);
  commonService = inject(CommonService);

  ngOnInit(): void {

    const storedFeedback = localStorage.getItem('feedbackList');
    if (storedFeedback) {
      this.feedbackList = JSON.parse(storedFeedback);
    }

    this.commonService.fetchData().subscribe({
      next: (data) => {
        this.personalInfo = data.personalInfo;
      },
      error: (err) => console.error('Error fetching data:', err),
    });

    this.commonService.fetchFeedback().subscribe({
      next: (response) => {
        if (!this.feedbackList.length) {
          this.feedbackList = response.feedback;
          console.log('Feedback dal server:', this.feedbackList);
        }
      },
      error: (err) => console.error('The feedback error is -->', err),
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (this.editingFeedback) {
          this.editingFeedback.image = reader.result as string; // Assegna l'immagine come base64
        }
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    if (this.editingFeedback) {
      this.editingFeedback.image = null; // Rimuove l'immagine
    }
  }


  addFeedback(): void {
    this.feedbackList.unshift(this.newFeedback);
    this.commonService.postFeedback(this.newFeedback).subscribe({
      next: () => {
        console.log('Feedback inviato con successo:', this.newFeedback);
        alert('Feedback added!');

        localStorage.setItem('feedbackList', JSON.stringify(this.feedbackList));

        this.newFeedback = {
          author: '',
          feedback: '',
          image: 'assets/images/default.jpg',
          date: new Date().toISOString().split('T')[0],
          rating: 5
        };
      },
      error: (err) => console.error('Errore -->:', err),
    });
  }

  setRating(rating: number): void {
    if (this.editingFeedback) {
      this.editingFeedback.rating = rating;
    }
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

  resetImage(): void {
    this.newFeedback.image = 'assets/images/default.jpg';
  }

  resetAll(feedbackForm: any): void {
    feedbackForm.resetForm();

    this.newFeedback = {
      author: '',
      feedback: '',
      image: 'assets/images/default.jpg',
      date: new Date().toISOString().split('T')[0],
      rating: 0
    };

    this.stars = new Array(5);
  }

  openEditModal(feedback: any): void {
    console.log('Opening modal for feedback:', feedback);
    this.editingFeedback = { ...feedback }; 
  }

  closeEditModal(): void {
    this.editingFeedback = null;
  }

  updateFeedback(): void {
    const index = this.feedbackList.findIndex(f => f.date === this.editingFeedback.date);
    if (index !== -1) {
      this.feedbackList[index] = { ...this.editingFeedback };
      localStorage.setItem('feedbackList', JSON.stringify(this.feedbackList));
      console.log('Feedback updated:', this.editingFeedback);
      this.closeEditModal();
    }
  }


}
