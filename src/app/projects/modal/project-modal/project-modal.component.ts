import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.sass'
})
export class ProjectModalComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  isVisible: boolean = false;
  encapsulation: ViewEncapsulation.None | undefined; 

  open() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }
}
