import { Injectable } from '@angular/core';
import { comments } from './comments';
import { mocklistOfComments } from './mock-comments';
import { listOfComments } from './comments';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor() { }

  getSpecificComments(id: number){
    const target = mocklistOfComments.find((item) => item._idOfWorkout == id);
    console.log(target);
    return target.comments;
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
