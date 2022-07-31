import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { PhotosService } from '../photos.service';
import { DatePipe } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, observable, Subscriber } from 'rxjs';
import { users } from '../users';

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
  createdImage!: Observable<any>;
  updateImage!: Observable<any>;
  createdImageBase64: string;
  updateImageBase64: string;
  chosenUpdatedImage: File;



  constructor(private fb: FormBuilder, private route: ActivatedRoute,private authService: AuthService, private photosService: PhotosService, public DatePipe: DatePipe) {
    this.profileForm = this.fb.group({
      "username": ['', Validators.required],
      "email": ['', Validators.required],
      "FullName": ['', Validators.required],
      "bio": ''
    });
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params["uid"];
      this.authService.profileInformation(this.id).subscribe(data => {

        this.results = data;


        this.profileImage = this.photosService.changeToImage(this.results[0].userImage);

        this.updateImage = new Observable((Subscriber: Subscriber<any>) => {
          this.readFile(this.chosenUpdatedImage, Subscriber, 'edit')
        });
        this.fullName = this.results[0].fullName;
        this.chosenUpdatedImage = this.convertDataUrlToBlob(this.results[0].userImage);
        this.username = this.results[0].username;
        this.userEmail = this.results[0].email;
        this.role = this.results[0].role;
        this.dateJoined = this.DatePipe.transform(this.results[0].dateJoined, 'MMMM d, y');
        this.bio = this.results[0].bio;

        this.profileForm.patchValue({
          "username": this.username,
          "email": this.userEmail,
          "FullName": this.fullName,
          "bio": this.bio
        })

      });
    });
  }

  onChange = (event: Event, create_or_edit: string) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.convertToBase64(file, create_or_edit);
  }

  convertToBase64(file: File, create_or_edit: string) {
    if (create_or_edit == 'create') {
      this.createdImage = new Observable((subscriber: Subscriber<any>) => {
        this.readFile(file, subscriber, 'create');
      });
    } else if (create_or_edit == 'edit') {
      this.updateImage = new Observable((subscriber: Subscriber<any>) => {
        this.readFile(file, subscriber, 'edit');
      });
    } else {
    }
  }

  readFile(file: File, subscriber: Subscriber<any>, create_or_edit: string) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      if (create_or_edit == "create") {
        this.createdImageBase64 = filereader.result.toString();
      } else {
        this.updateImageBase64 = filereader.result.toString();
      }


      subscriber.next(filereader.result);

      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

  convertDataUrlToBlob(dataUrl): File {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], 'filename', { type: mime });
  }

  user: users;

  onSubmit(){
    this.user = new users();
    this.user.fullName = this.profileForm.value.FullName;
    this.user.userImage = this.updateImageBase64;
    this.user.username = this.profileForm.value.username;
    console.log(this.user);
  }

}
