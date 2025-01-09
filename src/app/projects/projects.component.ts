import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ProjectCardComponent } from './card/project-card/project-card.component';
import { CommonModule } from '@angular/common';
import { ProjectModalComponent } from './modal/project-modal/project-modal.component';
import { CommonService } from './service/common.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    ProjectCardComponent,
    MatTabsModule,
    MatButtonModule,
    ProjectModalComponent],  // No need for HttpClientModule here
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {
  projects: any[] = []; 
  allProjects: any[] = []; //if i want to see all together
  commonService = inject(CommonService); 

  ngOnInit(): void {
    this.commonService.fetchProjects().subscribe({
      next: (project) => {
        this.projects = project;
        console.log('Resume:', this.projects); 
      },
      error: (err) => {
        console.error('Error fetching project:', err); 
      }
    });
  }

  // ngOnInit(): void {
  //   this.commonService.fetchProjects().subscribe({
  //     next: (data: any) => {
  //       this.projects = data; // Salvo i progetti divisi per categorie nell'array
  //       this.allProjects = this.projects.reduce((acc, category) => {
  //         return acc.concat(category.items); // Unisce tutti i progetti in un unico array
  //       }, []); // L'array combinato
  //     },
  //     error: (err: any) => {
  //       console.error('Error fetching projects:', err);
  //     }
  //   });
  // }

  @ViewChild(ProjectModalComponent) modal!: ProjectModalComponent; 

  openModal(project: {  image: string; title: string; description: string }) {
    // Metodo per aprire il modale e visualizzare i dettagli di un progetto
    this.modal.image = project.image;  
    this.modal.title = project.title;
    this.modal.description = project.description;
    this.modal.open();
  }
}
