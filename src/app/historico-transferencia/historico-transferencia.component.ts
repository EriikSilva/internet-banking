import { Component, OnInit } from '@angular/core';
import { TransferenciasService } from '../services/transferencias.service';

@Component({
  selector: 'app-historico-transferencia',
  templateUrl: './historico-transferencia.component.html',
  styleUrls: ['./historico-transferencia.component.scss']
})
export class HistoricoTransferenciaComponent implements OnInit {

  transferencias:any
  numero_conta:any
  teste:any

  constructor(private transferenciaService:TransferenciasService){}


  ngOnInit(): void {

    this.numero_conta = localStorage['numero_conta'];

    this.transferenciaService.getTrasferencias(this.numero_conta)
    .subscribe((res:any) => {
      this.transferencias = res.transferencias
      
    
      console.log(this.transferencias)
    })

  }

} 
