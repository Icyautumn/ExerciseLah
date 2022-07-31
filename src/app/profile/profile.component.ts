import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { PhotosService } from '../photos.service';
import { DatePipe } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: string;
  profileImage: any;
  results: any = false;
  userEmail: string;
  username: string;
  role: string;
  dateJoined: any;
  fullName: string;
  bio: string;
  profileForm: FormGroup;



  constructor(private fb: FormBuilder, private route: ActivatedRoute,private authService: AuthService, private photosService: PhotosService, public DatePipe: DatePipe) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params["uid"];
      this.authService.profileInformation(this.id).subscribe(data => {
        this.profileForm = this.fb.group({
          "username": ['', Validators.required],
          "email": ['', Validators.required],
          "fullName": ['', Validators.required],
          "bio": ''
        });
        this.results = data;
        console.log(this.results);
        console.log(this.results[0].userImage);
        this.profileImage = this.photosService.changeToImage(this.results[0].userImage);
        this.username = this.results[0].username;
        this.userEmail = this.results[0].email;
        this.role = this.results[0].role;
        this.dateJoined = this.DatePipe.transform(this.results[0].dateJoined, 'MMMM d, y');
        this.bio = this.results[0].bio;
        this.fullName = this.results[0].fullName;
        this.profileForm.patchValue({
          "username": this.username,
          "email": this.userEmail,
          "fullName": this.fullName,
          "bio": this.bio
        })

      });
    });
  }

}
