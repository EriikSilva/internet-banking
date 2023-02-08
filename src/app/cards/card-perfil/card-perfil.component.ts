import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-card-perfil',
  templateUrl: './card-perfil.component.html',
  styleUrls: ['./card-perfil.component.scss']
})
export class CardPerfilComponent implements OnInit {
  nome: any;
  id_user: any;
  numero_conta: any;
  teste:any
  cargos:any;
  email:any;

  constructor(private usuariosService: UsuariosService){}

  ngOnInit(): void {
    this.id_user = localStorage['id'];
    
    this.usuariosService.getUsuario(this.id_user).subscribe((res: any) => {
 
      this.numero_conta = res.usuario.numero_conta;
      this.nome = res.usuario.nome;
      this.email = res.usuario.email
      console.log('perfil', res);
    });
  }

}
