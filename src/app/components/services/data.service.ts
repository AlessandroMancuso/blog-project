// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  USER_API_URL: string = 'https://jsonplaceholder.typicode.com/users';
  POST_API_URL: string = 'https://jsonplaceholder.typicode.com/posts';

  getFeed(): Observable<any> {
    return this.http.get(this.POST_API_URL);
  }

  getPost(postId : number): Observable<any> {
    return this.http.get(`${this.POST_API_URL}/${postId}`);
  }

  getUsers(): Observable<any> {
    return this.http.get(this.USER_API_URL);
  }

  getUser(userId : number): Observable<any> {
    return this.http.get(`${this.USER_API_URL}/${userId}`);
  }
  
}