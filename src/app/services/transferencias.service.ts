import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferenciasService {

  transferencias = "http://localhost:3333/transferencias/"

  constructor(private http:HttpClient) { }

  postTransferencias(data:any){
    return this.http.post(this.transferencias, data)
  }

  getTrasferencias(numero_conta:any){
    let numero_conta_atual = numero_conta
    return this.http.get(this.transferencias + numero_conta_atual);
  }

}
