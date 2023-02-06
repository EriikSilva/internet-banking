import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    // private loginService: LoginService,
    private router: Router,
    public messageService: MessageService
  ) {}

  userForm = new FormGroup({
    email: new FormControl('', Validators.required),
    senha: new FormControl(null, Validators.required),
  });

  

  submitForm() {
    if (this.userForm.invalid) {
      console.log('Campos Invalidos');
      /**********MENSAGEM DE ERRO***************/
      this.messageService.add({
        key: 'login',
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha os campos obrigatórios',
      });

      return;
    }

    this.authService
      .login(
        this.userForm.get('email')?.value,
        this.userForm.get('senha')?.value
      )
      .subscribe({
        next: () => {this.router.navigate(['/dashboard']), window.location.reload()}, 
        error: () =>
          this.messageService.add({
            key: 'login',
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha na Autenticação',
          }),
      });
  } //FIM

  criarConta() {
    this.router.navigate(['/criar-conta'])
  }
}
