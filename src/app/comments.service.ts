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
    return target.comments;
  }

  UpdateComment(item: listOfComments, id: number){
    const target = mocklistOfComments.find((x) => x._idOfWorkout == id);
    Object.assign(target.comments, item);
  }
}
