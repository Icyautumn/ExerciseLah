import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: '',
      password: '',
      username: '',
      role: ''
    });
  }
  onSubmit() {
    this.authService.regUser(this.myForm.value.email,
      this.myForm.value.password, this.myForm.value.username, this.myForm.value.role, this.myForm.value.fullName).subscribe();
    this.router.navigateByUrl('/login');
  }


}
