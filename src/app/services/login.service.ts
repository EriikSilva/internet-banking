import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUsuarios = "http://localhost:3333/usuarios/login"

  constructor(private http:HttpClient) { }


  login(email:any, senha:any){
    return this.http.post(this.apiUsuarios, {email, senha})
  }

}
