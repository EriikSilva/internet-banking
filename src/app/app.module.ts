import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TesteComponent } from './teste/teste.component';
import {ButtonModule} from 'primeng/button';
import { LoginComponent } from './login/login.component';
import {InputTextModule} from 'primeng/inputtext';
import {AccordionModule} from 'primeng/accordion';     
import {MenuItem, MessageService} from 'primeng/api';         
import {DividerModule} from 'primeng/divider'; 
import {CardModule} from 'primeng/card';     
import {ToolbarModule} from 'primeng/toolbar';
import {SidebarModule} from 'primeng/sidebar';
import {PasswordModule} from 'primeng/password';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AuthInterceptorProvider } from './auth/auth.interceptor';
import { SignInComponent } from './sign-in/sign-in.component';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import { HistoricoTransferenciaComponent } from './historico-transferencia/historico-transferencia.component';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ToastModule} from 'primeng/toast';
import {InputNumberModule} from 'primeng/inputnumber';
import {ProgressBarModule} from 'primeng/progressbar';

import localePt from '@angular/common/locales/pt';
import { CardOpcoesComponent } from './cards/card-opcoes/card-opcoes.component';
import { CardSaldoContaComponent } from './cards/card-saldo-conta/card-saldo-conta.component';
import { CardPerfilComponent } from './cards/card-perfil/card-perfil.component';
;

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    TesteComponent,
    LoginComponent,
    DashboardComponent,
    ToolbarComponent,
    SignInComponent,
    HistoricoTransferenciaComponent,
    CardOpcoesComponent,
    CardSaldoContaComponent,
    CardPerfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    HttpClientModule,
    AccordionModule,
    ToastModule,
    FormsModule,
    DividerModule,
    CardModule,
    ToolbarModule,
    SidebarModule,
    PasswordModule,
    InputTextModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TableModule,
    DialogModule,
    ProgressSpinnerModule,
    InputNumberModule,
    ProgressBarModule   
  ],
  providers: [AuthInterceptorProvider,MessageService,
    { provide: LOCALE_ID, useValue: 'pt-BR' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
