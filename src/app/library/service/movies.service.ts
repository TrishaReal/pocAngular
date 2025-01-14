import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiKey: string = '05eee6ae72870162b3af7f76424cdfdc';  
  private apiUrl: string = 'https://api.themoviedb.org/3';

  private httpClient = inject(HttpClient); 

  getPopularMovies(): Observable<any> {
    const url = `${this.apiUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`;
    return this.httpClient.get<any>(url);
  }

  searchMovies(query: string): Observable<any> {
    const url = `${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}&language=en-US&page=1`;
    return this.httpClient.get<any>(url);
  }
}
