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


  /**
   * Costruisco l'URL per recuperare la lista dei film popolari
   * usando la mia API key e alcune query string (es. lingua, pagina). 
   * Utilizzo il metodo HttpClient.get() per inviare una richiesta GET all'API.
   * Alla fine restituisco un Observable che trasmette i dati dei film popolari.
   */
  getPopularMovies(): Observable<any> {
    const url = `${this.apiUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`;
    return this.httpClient.get<any>(url);
  }

  /**
   * Qui creo l'URL per cercare film in base a una stringa di ricerca (`query`).
   * Combino l'API key, la query e altri parametri (lingua e pagina) nell'URL.
   * Chiamo HttpClient.get() per effettuare una richiesta GET all'endpoint di ricerca 
   * e restituisco un Observable con i risultati.
   */
  searchMovies(query: string): Observable<any> {
    const url = `${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}&language=en-US&page=1`;
    return this.httpClient.get<any>(url);
  }
}
