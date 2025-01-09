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
  styleUrl: './contact.component.sass'
})
export class ContactComponent {
  personalInfo: any; // info anagrafiche
  contact = {
    firstName: '',
    lastName: '',
    email: '',
    description: ''
  };

  commonService = inject(CommonService)

  ngOnInit(): void {
    // Recupero i dati personali
    this.commonService.fetchPersonalInfo().subscribe({
      next: (info) => {
        this.personalInfo = info;
        console.log('Personal Info:', this.personalInfo)
      },
      error: (err) => {
        console.error('The error is -->', err);
      }
    });
  }
  onSubmit(): void {
    if (this.contact.firstName && this.contact.lastName && this.contact.email && this.contact.description) {
      console.log('Contact Form Submitted', this.contact);
      alert("Message sent");
    }
  }
}
