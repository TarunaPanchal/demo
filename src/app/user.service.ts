import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, config } from 'rxjs';

interface isLoggedIn {
  status: boolean;
}


interface update {
  success: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  isLoggedIn(): Observable<isLoggedIn> {
    return this.http.get<isLoggedIn>('/api/isloggedin');
  }

  getData() {
    return this.http.get('/api/data', { headers: this.getHeader() });
  }
  getHeaderFormData() {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', '*/*');
    return headers;
  }

// tslint:disable-next-line: no-unused-expression
updateuser( fb ) {
    return this.http.put('/api/updatedata'  , fb , { headers:  this.getHeaderFormData() });
  }
  getHeader() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }


}
