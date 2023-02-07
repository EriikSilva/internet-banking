import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferenciasService {

  apiUrl = "http://localhost:3333/transferencias/"

  recebidos = "http://localhost:3333/transferencias/recebidos/"

  pagos = "http://localhost:3333/transferencias/pagos/"

  constructor(private http:HttpClient) { }

  postTransferencias(data:any){
    return this.http.post(this.apiUrl, data)
  }

  getTrasferenciasRecebidos(numero_conta:any){
    let numero_conta_atual = numero_conta
    return this.http.get(this.recebidos + numero_conta_atual);
  }

  getTrasferenciasPagos(numero_conta:any){
    let numero_conta_atual = numero_conta
    return this.http.get(this.pagos + numero_conta_atual);
  }

}
