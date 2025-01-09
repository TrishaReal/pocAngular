import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';  // Import Observable

@Injectable({
  providedIn: 'root' // Questo servizio è disponibile ovunque nell'app.
})
export class CommonService {
  privateApiUrl = 'assets/mock/data.json'; // URL(path) del file JSON contenente i dati del progetto.
  private httpClient = inject(HttpClient); // Inietta automaticamente un'istanza di HttpClient.

  // Metodo per recuperare i dati dal file JSON.
  // Ritorna un Observable che emette un array di progetti.
  // fetchData(): Observable<any[]> {
  //   return this.httpClient.get<any[]>(this.privateprivateApiUrl);
  // }


  // Metodo per recuperare l'intero file JSON
  fetchData(): Observable<any> {
    return this.httpClient.get<any>(this.privateApiUrl);
  }

  // Metodo per recuperare i progetti
  fetchProjects(): Observable<any[]> {
    return this.httpClient.get<any>(this.privateApiUrl).pipe( //Con la pipe "filtro" il risultato dell'observable
      map(data => data.projects) // Estraggo solo i progetti dal JSON
    );
  }

  // Metodo per recuperare le competenze (skills)
  fetchSkills(): Observable<any[]> {
    return this.httpClient.get<any>(this.privateApiUrl).pipe( 
      map(data => data.skills) // Estraggo solo le competenze dal JSON
    );
  }

  // Metodo per recuperare le informazioni personali
  fetchPersonalInfo(): Observable<any> {
    return this.httpClient.get<any>(this.privateApiUrl).pipe( 
      map(data => data.personalInfo) // Estraggo solo le informazioni personali dal JSON
    );
  }

  // Metodo per recuperare le informazioni del resume
  fetchResume(): Observable<any> {
    return this.httpClient.get<any>(this.privateApiUrl).pipe( 
      map(data => data.resume) // Estraggo solo le informazioni personali dal JSON
    );
  }
}
