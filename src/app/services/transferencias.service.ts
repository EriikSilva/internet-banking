import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferenciasService {

  apiUrl = "http://localhost:3333/transferencias"

  constructor(private http:HttpClient) { }

  postTransferencias(data:any){
    return this.http.post(this.apiUrl, data)
  }

}
