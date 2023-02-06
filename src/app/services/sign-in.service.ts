import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private http:HttpClient) {}

  apiUrl = "http://localhost:3333/usuarios/cadastro"

  cadastrarUsuario(data:any){
   return this.http.post(this.apiUrl, data)
  }
}
