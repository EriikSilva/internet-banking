import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TransferenciasService } from 'src/app/services/transferencias.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-card-opcoes',
  templateUrl: './card-opcoes.component.html',
  styleUrls: ['./card-opcoes.component.scss'],
})
export class CardOpcoesComponent implements OnInit {
  dialogTransferir: any;
  formularioDinamico: any;
  numero_conta: any;

  nome: any;
  id_user: any;
  saldo: any;

  teste: any;
  cargos: any;

  constructor(
    private transferenciaService: TransferenciasService,
    private usuariosService: UsuariosService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.id_user = localStorage['id'];

    this.usuariosService.getUsuario(this.id_user).subscribe((res: any) => {
      this.saldo = res.usuario.saldo;
      this.numero_conta = res.usuario.numero_conta;
      this.nome = res.usuario.nome;
      // console.log('dashboard', res);
    });
  }

  transferenciaForm = new FormGroup({
    numero_conta_recebedor: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
    valor: new FormControl(null, Validators.required),
  });

  fazerTransferencia() {
    this.formularioDinamico = this.transferenciaForm.value;
    this.formularioDinamico.numero_conta_pagador = this.numero_conta;

    console.log('transferencias', this.formularioDinamico);

    if (this.transferenciaForm.invalid || '' || null || undefined) {
      console.log('invalido')
      
      this.messageService.add({
        key: 'error',
        severity: 'error',
        summary: 'Error ao inserir',
        detail: 'Preencha os campos obrigatorios',
      });
      return;
    }

    this.transferenciaService
      .postTransferencias(this.formularioDinamico)
      .subscribe({
        next: () => {  this.hideDialog();
          window.location.reload();
          this.messageService.add({
            key: 'transferido',
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Dinheiro Transferido com Sucesso',
          })
          },
          error: () =>{
            this.messageService.add({
              key: 'error',
              severity: 'error',
              summary: 'Error ao inserir',
              detail: 'Algo deu errado ou conta não existe',
            });
          } 
     
      })
  }

  dialogCriar() {
    this.dialogTransferir = true;
  }

  hideDialog() {
    this.dialogTransferir = false;
  }
}
