import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../../interface/user';
import { Observable } from 'rxjs';
type loginDto={
  email:string,
  password:string
}
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http:HttpClient) { }
  private url='http://localhost:5000/user/'
  CreateUser(user:User):Observable<User>{
    return this.http.post<User>(this.url+'register',user)
  }
 login(userInfo:loginDto):Observable<string>{
  return this.http.post<string>(this.url+'login',userInfo)
 }
}
