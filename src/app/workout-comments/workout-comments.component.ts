import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateRef, ViewChild } from '@angular/core';
import { CommentsService } from '../comments.service';
import { WorkoutService } from '../workout.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-workout-comments',
  templateUrl: './workout-comments.component.html',
  styleUrls: ['./workout-comments.component.css']
})
export class WorkoutCommentsComponent implements OnInit {

  @ViewChild('commentsEdit') commentsEdit: TemplateRef<any>; // Note: TemplateRef

  commentUpdate: FormGroup;

  comment: FormGroup;

  userprofile: FormGroup;

  commentData: any[] = [];

  commentHolder: any[] = [];

  updateCommentIndex: number;

  userProfilePicture: any;

  userId: any;

  user: string;

  id: string;

  userrole: string;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private sanitizer: DomSanitizer, private modalService: NgbModal,
    private commentsService: CommentsService, private workoutService: WorkoutService, private authService: AuthService) {
    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.user = this.authService.getSecureToken();
      this.workoutService.getSpecificWorkout(this.id).subscribe(data => {
        this.commentHolder = data[0]["result"].commentOfUser
        console.log(this.commentHolder);
        this.userrole = this.authService.getUserRole();
        this.userId = this.authService.getSecureToken();
        console.log(this.commentHolder);
        this.commentsService.getSpecificComments(this.userId).subscribe(data => {
          this.userprofile = this.fb.group({
            comments: ['', Validators.required],
            rating: '',
            username: data[0].username,
            userProfilePicture: data[0].userImage,
          });
          this.userProfilePicture = this.changeToImage(data[0].userImage);
        });

        for (let i = 0; i < this.commentHolder.length; i++) {
          this.commentsService.getSpecificComments(this.commentHolder[i].userId).subscribe(data => {
            this.comment.patchValue({
              comments: this.commentHolder[i].comment,
              rating: this.commentHolder[i].rating,
              username: data[0].username,
              userProfilePicture: data[0].userImage,
              commentid: this.commentHolder[i].commentid,
              id: this.commentHolder[i].userId
            });
            this.commentData.push(this.comment.value)
          })
        }
      })

    });
  }



  ngOnInit(): void {
    this.comment = this.fb.group({
      comments: '',
      rating: '',
      username: '',
      userProfilePicture: '',
      commentid: '',
      id: ''
    });
    this.userprofile = this.fb.group({
      comments: '',
      rating: '',
      username: '',
      userProfilePicture: ''
    });
    this.commentUpdate = this.fb.group({
      comments: '',
      rating: '',
      username: '',
      userProfilePicture: '',
      commentid: ''
    });


  }

  postComment() {
    // takes the user comment
    console.log(this.userprofile.value.comments);
    console.log(this.userprofile);
      this.commentsService.newComment(this.userId, this.userprofile.value.comments, this.userprofile.value.rating, this.id).subscribe();
      location.reload();


    console.log(this.commentData);


    // reset text area
    // (<HTMLSelectElement>document.getElementById('comment')).value = '';

  }
  changeToImage(base64String: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64String);
  }

  Number(rating_: string): Array<any> {
    return new Array(parseInt(rating_));
  }

  editComment(index: number, contents) {
    this.modalService.open(this.commentsEdit);
    this.commentUpdate.patchValue({
      comments: this.commentData[index].comments,
      rating: this.commentData[index].rating,
      username: this.commentData[index].rating,
      commentid: this.commentData[index].commentid,
      userProfilePicture: this.changeToImage(this.commentData[index].userProfilePicture),
    });

    this.updateCommentIndex = index;
  }

  editCommentSubmit() {
    console.log(this.commentUpdate.value);
    this.commentsService.UpdateComment(this.commentUpdate.value.comments, this.commentUpdate.value.commentid, this.commentUpdate.value.rating, this.id).subscribe();
    this.modalService.dismissAll();
    location.reload();
  }

  deleteComment(id: string) {
    this.commentsService.deleteComment(id, this.id).subscribe();
    location.reload();
  }


}





