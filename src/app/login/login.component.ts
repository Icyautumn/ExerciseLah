import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  results: any = false;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  onSubmit() {
    // check for email and password
    this.authService.authUser(this.myForm.value.email,
      this.myForm.value.password).subscribe(data => {
        this.results = data;
        // if true then set token and
        if (this.results[0].auth) {
          console.log(this.results);
          this.authService.setSecureToken(this.results[0].uid);
          this.authService.setUserRole(this.results[0].role);
          this.authService.setUsername(this.results[0].username)
          // bring user to user's page
          this.router.navigateByUrl('/workout');
        } else {
          alert("Wrong username or password");
        }
      });
  }

}
