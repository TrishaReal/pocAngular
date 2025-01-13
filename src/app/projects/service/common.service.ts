import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';  // Import Observable

@Injectable({
  providedIn: 'root' // Questo servizio è disponibile ovunque nell'app.
})
export class CommonService {
  privateApiUrl = 'assets/mock/data.json'; // URL(path) del file JSON contenente i dati del progetto.
  feedbackUrl = 'assets/mock/feedback.json';
  private httpClient = inject(HttpClient); // Inietta automaticamente un'istanza di HttpClient.


  // Metodo per recuperare l'intero file JSON
  fetchData(): Observable<any> {
    return this.httpClient.get<any>(this.privateApiUrl);
  }

  // Metodo per recuperare i feedback
  fetchFeedback(): Observable<any> {
    return this.httpClient.get<any>(this.feedbackUrl);
  }

  // Metodo POST per inviare il feedback 
  postFeedback(feedback: any): Observable<any> {
    return this.httpClient.post<any>(this.feedbackUrl, feedback);
  }

}
