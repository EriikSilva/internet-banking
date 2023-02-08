import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-card-saldo-conta',
  templateUrl: './card-saldo-conta.component.html',
  styleUrls: ['./card-saldo-conta.component.scss']
})
export class CardSaldoContaComponent implements OnInit {
  nome: any;
  id_user: any;
  saldo: any;
  numero_conta: any;
  teste:any
  cargos:any;

  constructor( private usuariosService: UsuariosService){}

  ngOnInit(): void {
      // this.nome = localStorage['nome']

      this.id_user = localStorage['id'];
    
      this.usuariosService.getUsuario(this.id_user).subscribe((res: any) => {
        this.saldo = res.usuario.saldo;
        this.numero_conta = res.usuario.numero_conta;
        this.nome = res.usuario.nome;
        // console.log('dashboard', res);
      });
  }

}
