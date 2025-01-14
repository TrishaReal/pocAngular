import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MoviesService } from './service/movies.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule],
  templateUrl: './library.component.html',
  styleUrl: './library.component.sass'
})
export class LibraryComponent {
  movies: any[] = [];
  searchQuery: string = '';

  moviesService = inject(MoviesService);

  ngOnInit(): void {
    this.getMovies();  
  }

  /**
   * subscribe() avvia l'ascolto dell'Observable creato dalla chiamata API.
   * Quando i dati arrivano, il blocco `next` li elabora e aggiorna `movies` 
   * con i risultati. Se c'è un errore, il blocco `error` lo gestisce.
   */
  getMovies(): void {
    this.moviesService.getPopularMovies().subscribe({
      next: (response) => {
        this.movies = response.results; 
      },
      error: (err) => console.error('Errore nella chiamata API:', err)
    });
  }

  searchMovies(): void {
    if (this.searchQuery.trim() === '') {
      this.getMovies();  
    } else {
      this.moviesService.searchMovies(this.searchQuery).subscribe({
        next: (response) => {
          this.movies = response.results; 
        },
        error: (err) => console.error('Errore nella ricerca dei film:', err)
      });
    }
  }

  
}
