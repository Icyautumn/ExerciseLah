import { Injectable } from '@angular/core';
import { comments } from './comments';
import { mocklistOfComments } from './mock-comments';
import { listOfComments } from './comments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  comment: string = "http://localhost:1337/api/comments/";

  constructor(private http: HttpClient) { }


  getSpecificComments(id: string){
    return this.http.post<any[]>(this.comment  +'get', {
      "id": id
    })
  }

  newComment(userId: string, comment:string, rating: number, workout_Id: string ){
    return this.http.put<any[]>(this.comment + "create", {
      "user_id": userId,
      "workout_Id": workout_Id,
      "rating": rating,
      "comment": comment
    })
  }

  UpdateComment(comment: string, comment_id: string, rating: number, workout_id: string){
    return this.http.put<any[]>(this.comment + "update", {
      "comment": comment,
      "comment_id": comment_id,
      "rating": rating,
      "workout_Id": workout_id
    } )
  }

  newCommentTable(item: comments){
    mocklistOfComments.push(item);
  }

  deleteComment(id: string, workout_Id: string){
    return this.http.delete<any[]>(this.comment+ "delete/" + id + "/" + workout_Id, {
    })
  }

}
