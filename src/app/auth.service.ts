import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

interface myData {
  success: boolean;
  message: string;
  role: string;
  id : string;
}
interface registerUser {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = false;

  constructor(private http: HttpClient ) { }
  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;

  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }
  getHeaderFormData() {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', '*/*');
    return headers;
    }
  getUserDetails(username, password) {
    // Post these details to API server return user info if correct
    return this.http.post<myData>('/api/login', {
      username,
      password
    });
  }
  registerUser(fd ) {
    //  this.getHeaderFormData();
    return this.http.post<registerUser>('/api/register', fd, { headers: this.getHeaderFormData() });


}
}
