import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  privateApiUrl = "mock/data.json"
  httpClient = inject(HttpClient)
  // constructor(private httpClient: HttpClient) {}

  fetchData():Observable<any>{
    return this.httpClient.get(this.privateApiUrl)
  }

}

