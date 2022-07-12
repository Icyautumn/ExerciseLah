import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  url: string = 'http://localhost:3000/api/users'

  constructor(private http:HttpClient) { }

  getAllFood() {
    return this.http.get<any[]>(this.url);
  }
}
