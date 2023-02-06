import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Route } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private _naotaLogado$ = new BehaviorSubject<boolean>(true);
  // private readonly TOKEN_NAME = 'senha_jwt'
  private readonly TOKEN_NAME = 'senha_jwt';
  // private readonly NAME = 'nome'
  private readonly ID = 'id';
  // naoTaLogado:boolean = true

  emailFront: any;

  isLoggedIn$ = this._isLoggedIn$.asObservable();
  naoTaLogado$ = this._naotaLogado$.asObservable(); 

  getToken() {
    // return this.token
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(private loginService: LoginService) {
    this._isLoggedIn$.next(!!this.getToken());
    this._naotaLogado$.next(!this.getToken())
  }

 
  login(email: any, senha: any) {
    return this.loginService.login(email, senha).pipe(
      tap((res: any) => {
        console.log("LOGIN",res)
        const token = res.token;

        this._isLoggedIn$.next(true);
        this._naotaLogado$.next(true);
        // this.naoTaLogado = false
        localStorage.setItem(this.TOKEN_NAME, token);
        localStorage.setItem(this.ID, res.id_usuario);
        localStorage.setItem('numero_conta', res.numero_conta)
     

      })
    );
  }

  private clearAuthData() {
    localStorage.removeItem(this.TOKEN_NAME);
    localStorage.removeItem(this.ID);
    localStorage.removeItem('numero_conta');
  }

  logout() {
    // this.token = null;
    // this.naotaLogado = true;
    this.clearAuthData();
  }
}
