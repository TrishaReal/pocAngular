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
    this.commonService.fetchData().subscribe({
      next: (data) => {
        this.personalInfo = data.personalInfo;
        this.skills = data.skills;
        this.resume = data.resume;
        console.log('Fetched Data:', {
          personalInfo: this.personalInfo,
          skills: this.skills,
          resume: this.resume,
        });
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      },
    });
  }

}
