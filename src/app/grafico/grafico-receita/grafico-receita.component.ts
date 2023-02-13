import { Component, OnInit } from '@angular/core';
import { TransferenciasService } from 'src/app/services/transferencias.service';

@Component({
  selector: 'app-grafico-receita',
  templateUrl: './grafico-receita.component.html',
  styleUrls: ['./grafico-receita.component.scss'],
})
export class GraficoReceitaComponent implements OnInit {
  basicData: any;
  basicOptions: any;

  numero_conta: number;
  dados: any;
  transferencias: any;
  gastos: any;
  teste: any;
  teste2: [];

  constructor(private transferenciaService: TransferenciasService) {}

  ngOnInit(): void {
    this.numero_conta = localStorage['numero_conta'];

    this.transferenciaService
      .getTrasferencias(this.numero_conta)
      .subscribe((res) => {
        this.dados = res;
        // console.log(res)

        this.gastos = this.dados.transferencias.filter((dados) => {
          this.teste = dados.valor;
    
        return dados.valor.toString().startsWith('-');
        

        });

        // this.gastos = this.dados.transferencias.forEach((element) => {
        //   var temp = parseInt(element.valor);
        //   var diminuir = 0
        //   // temp = element.valor
        //   // temp.parseInt()
        //   // console.log(temp)
        //   if (temp < 0) {
        //     // temp = element.valor;
        //     // console.log(element)          
            
        //     var sum = 0;
        //     // for (var i = 0; i < element.length; i++) {
        //     //     var soma = data.orderItems[i];
        //     //         sum += soma.valor;
        //     // }
        //     for(var i = 0; i < element.length; i++) {
        //       sum -= element[i];
        //    } 
        //   console.log(sum)
        //   }
        //   return temp;
        // });
        // console.log(this.gastos);

        this.transferencias = this.dados.transferencias.filter((dados) => {
          // console.log(!dados.valor.toString().startsWith('-'))
          


          return !dados.valor.toString().startsWith('-');
        });

        // this.transferencias = this.dados.transferencias.filter((element) => {
        //   var temp = parseInt(element.valor)
        //   return temp
        // })

        // console.log(this.transferencias)
 

 

        // console.log(this.transferencias.length);

        this.basicData = {
          labels: ['Dezembro', 'Janeiro', 'Fevereiro'],
          datasets: [
            {
              label: 'Recebidos',
              backgroundColor: '#25f505',
              data: [0, 0, this.transferencias.length],
              // this.transferencias.length
            },
            {
              label: 'Enviados',
              backgroundColor: '#f50505',
              data: [0, 0, this.gastos.length],
              // this.gastos.length
            },
          ],
        };
      });
  }
}
