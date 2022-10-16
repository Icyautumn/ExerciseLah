import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { users } from './users';
import { itemDetails } from './foodDetails';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  regUserUrl: string = "http://localhost:1337/api/reguser/";
  authuser: string = "http://localhost:1337/api/authuser/";
  profile: string = "http://localhost:1337/api/profile/";
  password: string = "http://localhost:1337/api/changePassword/";

  constructor(private http: HttpClient) { }
  regUser(email: string, pw: string, username: string, role: string, fullName: string) {
    return this.http.post<any[]>(this.regUserUrl, {
      'email': email,
      'password': pw,
      'username': username,
      'role': 'user',
      'userImage': "data:image/jpeg;base64,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",
      'dateJoined': new Date(),
      "fullName": fullName,
      "bio": "",

    });
  }

  regAdmin(email: string, pw: string, username: string, role: string, fullName: string) {
    return this.http.post<any[]>(this.regUserUrl, {
      'email': email,
      'password': pw,
      'username': username,
      'role': 'admin',
      'userImage': "data:image/jpeg;base64,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",
      'dateJoined': new Date(),
      "fullName": fullName,
      "bio": "",
    });

  }

  findUsername(username: string){
    return this.http.post<any[]>(this.authuser + "username", {
      "username": username
    })
  }

  forgetPassword(email: string){
    return this.http.post<any[]>(this.authuser+ "forgottenpassword", {
      email: email
    })
  }

  findEmail(email: string){
    return this.http.post<any[]>(this.authuser + "email", {
      "email": email
    })
  }
  authUser(email: string, pw: string) {
    return this.http.post<any[]>(this.authuser, {
      'email': email,
      'password': pw
    });
  }

  updateUser(user: users, id: string){
    return this.http.put<any[]>(this.profile + id, {
      "fullName": user.fullName,
      "username": user.username,
      "userImage": user.userImage,
      "bio": user.bio,
    });
  }

  changePassword(currentPassword: string, newPassword: string, id: string){
    return this.http.put<any[]>(this.password, {
      "id": id,
      "currentPassword": currentPassword,
      "newPassword": newPassword,
    });
  }

  resetPassword(newPassword: string, user_id: string){
    return this.http.put<any[]>(this.password + "reset", {
      'newPassword': newPassword,
      "user_id": user_id
    })
  }

  profileInformation(_id: string){
    return this.http.post<any[]>(this.profile, {
      '_id': _id
    });
  }
  setSecureToken(secure_token: string) {
    sessionStorage.setItem("LoggedIn", secure_token)
  }

  setUsername(username: string) {
    sessionStorage.setItem("username", username)
  }
  getSecureToken() {
    return sessionStorage.getItem("LoggedIn")
  }
  getUsername() {
    return sessionStorage.getItem("username")
  }
  setUserRole(role: string) {
    sessionStorage.setItem("UserRole", role);
  }
  getUserRole() {
    return sessionStorage.getItem("UserRole")
  }
  logout() {
    sessionStorage.removeItem("LoggedIn");
    sessionStorage.removeItem("UserRole");
  }
  isLoggedIn() {
    return this.getSecureToken() !== null;
  }

  isAdmin() {
    return (this.getUserRole() == "admin");
  }

  isUser() {
    return (this.getUserRole() == "user" || this.getUserRole() == "admin");
  }
}
