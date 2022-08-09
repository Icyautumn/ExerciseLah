import { Injectable } from '@angular/core';
import { comments } from './comments';
import { mocklistOfComments } from './mock-comments';
import { listOfComments } from './comments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  comment: string = "http://localhost:3000/api/comments/";

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

  UpdateComment(item: any, id: number){
    const target = mocklistOfComments.find((x) => x._idOfWorkout == id);
    console.log("target",target);
    // Object.assign(target.comments, item);
    // console.log(mocklistOfComments);
  }

  newCommentTable(item: comments){
    mocklistOfComments.push(item);
  }

  deleteEntireComment(id: number){
    mocklistOfComments.splice(id, 1);
  }

}
