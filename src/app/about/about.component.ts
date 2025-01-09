import { Component, inject } from '@angular/core';
import { CommonService } from '../projects/service/common.service';
import { CommonModule } from '@angular/common';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    MatProgressBarModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.sass'
})
export class AboutComponent {
  personalInfo: any; // info anagrafiche
  skills: any[] = [];
  resume: any[] = []  ;

  commonService = inject(CommonService)

  ngOnInit(): void {
    // Recupero i dati personali
    this.commonService.fetchPersonalInfo().subscribe({
      next: (info) => {
        this.personalInfo = info;
        console.log('Personal Info:', this.personalInfo);
      },
      error: (err) => {
        console.error('Error fetching personal info:', err); // Gestione dell'errore
      }
    });
    // Recupero le skills 
    this.commonService.fetchSkills().subscribe({
      next: (skills) => {
        this.skills = skills;
        console.log('Skills:', this.skills); // Log delle skills
      },
      error: (err) => {
        console.error('Error fetching skills:', err); // Gestione dell'errore
      }
    });
    // Recupero i dati del resume
    this.commonService.fetchResume().subscribe({
      next: (resume) => {
        this.resume = resume;
        console.log('Resume:', this.resume); // Verifica che i dati siano corretti
      },
      error: (err) => {
        console.error('Error fetching resume:', err); // Gestione dell'errore
      }
    });
  }


}
