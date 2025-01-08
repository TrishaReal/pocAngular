import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ProjectCardComponent } from './card/project-card/project-card.component';
import { CommonModule } from '@angular/common';
import { ProjectModalComponent } from './modal/project-modal/project-modal.component';
import { CommonService } from './service/common.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, ProjectModalComponent],  // No need for HttpClientModule here
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  commonService = inject(CommonService);

  ngOnInit(): void {
    this.commonService.fetchData().subscribe({
      next: (data: any) => {
        this.projects = data.projects;
      },
      error: (err: any) => {
        console.error('Error fetching projects:', err);
      }
    });
  }

  @ViewChild(ProjectModalComponent) modal!: ProjectModalComponent;

  openModal(project: { title: string; description: string }) {
    this.modal.title = project.title;
    this.modal.description = project.description;
    this.modal.open();
  }
}
