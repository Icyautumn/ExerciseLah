import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-registeradmin',
  templateUrl: './registeradmin.component.html',
  styleUrls: ['./registeradmin.component.css']
})
export class RegisteradminComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: '',
      password: '',
      username: '',
      role: '',
      fullName: '',
    });
  }
  onSubmit() {
    this.authService.findUsername(this.myForm.value.username).subscribe(data => {
      console.log(data[0].auth);
      if (data[0].auth == false) {
        this.authService.findEmail(this.myForm.value.email).subscribe(data => {
          if (data[0].auth == false){
            this.authService.regAdmin(this.myForm.value.email,
              this.myForm.value.password, this.myForm.value.username, this.myForm.value.role, this.myForm.value.fullName).subscribe();
            this.router.navigateByUrl('/login');
          }
           else{
            alert("this email has already been registered")
           }
        });

      }
      else alert("this username has been taken");

    });


  }


}
