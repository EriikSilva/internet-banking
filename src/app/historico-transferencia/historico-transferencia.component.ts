import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import autoTable from "jspdf-autotable"
import jsPDF from 'jspdf';
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
  isLoading:boolean = false

  constructor(private transferenciaService:TransferenciasService){}

  @ViewChild('content', {static:false}) interface_pdf!:ElementRef;

  ngOnInit(): void {
    this.isLoading = true
    this.numero_conta = localStorage['numero_conta'];

    this.transferenciaService.getTrasferencias(this.numero_conta)
    .subscribe((res:any) => {
      this.isLoading = false

      this.transferencias = res.transferencias
      
    
      console.log(this.transferencias)
    })

  }


  columns = [
    { title: "Data", dataKey: "criado_em" },
    { title: "Valor", dataKey: "valor" },
    { title: "Nome", dataKey: "nome" },
    { title: "Conta", dataKey: "conta" }
  ];

  printSimplePdf() {
 
    const doc = new jsPDF('p','pt');
    
    autoTable(doc, {
      columns:this.columns,
      body: this.transferencias,
      didDrawPage: (dataArg) => { 
       doc.text('Historico', dataArg.settings.margin.left, 10);
      }
 }); 
    doc.save('historico.pdf');
}


} 
