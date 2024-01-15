import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  apiUrl = 'http://127.0.0.1:4000/test';

  getData() {
    debugger;
    return this.http.get(this.apiUrl);
  }

  saveData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
