import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferenciasService {

  apiUrl = "http://localhost:3333/transferencias/"

  transferencias = "http://localhost:3333/transferencias/transferencias/"

  constructor(private http:HttpClient) { }

  postTransferencias(data:any){
    return this.http.post(this.apiUrl, data)
  }

  getTrasferencias(numero_conta:any){
    let numero_conta_atual = numero_conta
    return this.http.get(this.transferencias + numero_conta_atual);
  }

}
