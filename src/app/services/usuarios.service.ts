import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  apiUsuarios = "http://localhost:3333/usuarios"

  constructor(private http:HttpClient) { }


  // getUsuarios(){
  //   return this.http.get(this.apiUsuarios)
  // }

  getUsuario(id:any){
    let id_usuario = id

    return this.http.get(this.apiUsuarios + '/' + id_usuario)
  }

}
