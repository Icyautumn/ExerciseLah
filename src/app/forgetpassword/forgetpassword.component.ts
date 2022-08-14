import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: '',
    });
  }

  onSubmit() {
    this.authService.findEmail(this.myForm.value.email).subscribe(data => {
      if (data[0].auth == true) {
        // user exist create a one time link for 15 minutes
        this.authService.forgetPassword(this.myForm.value.email).subscribe();
        alert("Email has been sent to your account")
      }
      else{
        alert("user is not registered in the database")
      }
    });
  }

}
