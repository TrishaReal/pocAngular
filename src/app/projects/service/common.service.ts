import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  // Import Observable

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  privateApiUrl = 'assets/mock/data.json';
  private httpClient = inject(HttpClient);

  fetchData(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.privateApiUrl);
  }
}
