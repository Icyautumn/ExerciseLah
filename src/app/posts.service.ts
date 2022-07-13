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

  insertUser(name: string, newpost: number){
    return this.http.post<any[]>(this.url, { 'name': name, post: newpost});
  }

  // perform Http delete request to /api/posts
  deletePost(_id: number){
    return this.http.delete<any[]>(this.url + "/" + _id);
  }

  // perform HTTP put request to /api/posts/_id
  updatePost(_id: number, name: string, newpost: number){
    return this.http.put<any[]>(this.url + "/" +_id, {'name': name, 'post': newpost})
  }
}
