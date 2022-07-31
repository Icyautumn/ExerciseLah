import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router) { }
  loggedIn = true;
  isAdmin = false;
  userUid;

  ngOnInit(): void {
    setTimeout(() => { this.ngOnInit() }, 1000 * 0.1)
    if (this.authService.isLoggedIn()){
      this.userUid = this.authService.getSecureToken();
      this.loggedIn = false;
    }
    if (this.authService.isAdmin()){
      this.isAdmin = true;
    }
  }

  onLogout(){
    this.authService.logout();
    this.loggedIn = true;
    this.router.navigateByUrl('/workout');
  }


}
