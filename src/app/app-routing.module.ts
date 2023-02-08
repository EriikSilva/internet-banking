import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardPerfilComponent } from './cards/card-perfil/card-perfil.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IsAuthenticatedGuard } from './guard/is-authenticated.guard';
import { IsLoggeddGuard } from './guard/is-logged-in';
import { HistoricoTransferenciaComponent } from './historico-transferencia/historico-transferencia.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { TesteComponent } from './teste/teste.component';

const routes: Routes = [
  {
    path:"",
    component:LoginComponent,
    canActivate:[IsLoggeddGuard]
  },
  {
    path:"dashboard",
    component:DashboardComponent,
    canActivate:[IsAuthenticatedGuard],
  },
  {
    path:"criar-conta",
    component:SignInComponent,
    canActivate:[IsLoggeddGuard]
  },
  {
    path:'teste',
    component:TesteComponent,
    canActivate:[IsAuthenticatedGuard],
  },
  {
    path:'historico-transferencias',
    component:HistoricoTransferenciaComponent,
    canActivate:[IsAuthenticatedGuard],
  },
  {
    path:'perfil',
    component:CardPerfilComponent,
    canActivate:[IsAuthenticatedGuard],
  },
  { path: '**', redirectTo: '' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
