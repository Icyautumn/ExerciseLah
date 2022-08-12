import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  passwordForm: FormGroup;
  id: string;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private authService:AuthService, private router: Router) {
    this.route.params.subscribe(params => {
      this.id = params["id"];
      console.log(this.id);
    })
   }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(){
    if(this.passwordForm.value.newPassword != this.passwordForm.value.confirmPassword){
      alert("password does not match")
    }
    else{
      this.authService.resetPassword(this.passwordForm.value.newPassword, this.id).subscribe();
      this.router.navigateByUrl('/login');
    }
  }

}
