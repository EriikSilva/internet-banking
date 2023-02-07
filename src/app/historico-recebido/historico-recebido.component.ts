import { Component, OnInit } from '@angular/core';
import { TransferenciasService } from '../services/transferencias.service';

@Component({
  selector: 'app-historico-recebido',
  templateUrl: './historico-recebido.component.html',
  styleUrls: ['./historico-recebido.component.scss']
})
export class HistoricoRecebidoComponent implements OnInit {

  transferencias:any
  numero_conta:any
  numero_conta_atual:any
  numero_recebedor:any

  constructor(private transferenciaService:TransferenciasService){}


  ngOnInit(): void {

    this.numero_conta = localStorage['numero_conta'];

    this.transferenciaService.getTrasferenciasRecebidos(this.numero_conta)
    .subscribe((res:any) => {
      this.transferencias = res.transferencias
      // this.numero_conta_atual = res.numero_pagador
      // this.numero_recebedor = res.numero_recebedor
      console.log('1111',this.transferencias )
    })
  }


}
