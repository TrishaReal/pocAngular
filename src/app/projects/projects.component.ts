import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ProjectCardComponent } from './card/project-card/project-card.component';
import { CommonModule } from '@angular/common';
import { ProjectModalComponent } from './modal/project-modal/project-modal.component';
import { CommonService } from './service/common.service';
import {  HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, ProjectModalComponent, HttpClientModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.sass'
})
export class ProjectsComponent implements OnInit {
  projects: any;
  commonService = inject(CommonService);
  // constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.fetchData().subscribe(
      (response: any) => {
        this.projects = response;
        console.log(this.projects)
      },
      (error: any) => {
        console.error("The error is:", error)
      }
    )
  }

  @ViewChild(ProjectModalComponent) modal!: ProjectModalComponent;

  openModal(project: { title: string; description: string }) {
    this.modal.title = project.title;
    this.modal.description = project.description;
    this.modal.open();
  }
}
