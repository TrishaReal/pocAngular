import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';  // Import Observable

@Injectable({
  providedIn: 'root' 
})
export class CommonService {
  privateApiUrl = 'assets/mock/data.json';
  feedbackUrl = 'assets/mock/feedback.json';
  private httpClient = inject(HttpClient); 


  fetchData(): Observable<any> {
    return this.httpClient.get<any>(this.privateApiUrl);
  }

  fetchFeedback(): Observable<any> {
    return this.httpClient.get<any>(this.feedbackUrl);
  }

  postFeedback(feedback: any): Observable<any> {
    return this.httpClient.post<any>(this.feedbackUrl, feedback);
  }

}
