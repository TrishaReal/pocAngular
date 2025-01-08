import { Component, Input, ViewChild } from '@angular/core';
import { ProjectModalComponent } from '../../modal/project-modal/project-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, ProjectModalComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.sass'
})
export class ProjectCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() image: string = '';

  @ViewChild('modal') modal!: ProjectModalComponent;

  openModal() {
    this.modal.open();
  }
}
