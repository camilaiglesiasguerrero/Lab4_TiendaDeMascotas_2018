//Modules
import { NgModule } from '@angular/core';

//can Activate
import { ClienteAuthService } from '../servicios/auth/cliente-auth.service';
import { AdministradorAuthService } from '../servicios/auth/administrador-auth.service';

//ruteo
import { RouterModule, Routes } from '@angular/router';

//componentes
import { PrincipalComponent } from '../componentes/principal/principal.component';
import { RegistroComponent } from '../componentes/registro/registro.component';
import { LoginComponent } from '../componentes/login/login.component';
import { ListadoComponent } from '../componentes/listado/listado.component';
import { AltaMascotaComponent } from '../componentes/alta-mascota/alta-mascota.component';
import { ErrorComponent } from '../componentes/error/error.component';
import { TurnoComponent } from '../componentes/turno/turno.component';
import { DashboardComponent } from '../componentes/dashboard/dashboard.component';




const MiRuteo = [
  {path: '' , component: PrincipalComponent},
  {path: 'Principal',component: PrincipalComponent},
  {path: 'Registrarse',component: RegistroComponent},
  {path: 'Ingresar', component: LoginComponent},
  {path: 'Mascota',component:AltaMascotaComponent, canActivate: [ClienteAuthService]},
  {path: 'Turnos',component:TurnoComponent, canActivate: [ClienteAuthService]},
  {path: 'ListadoTurnos', component: ListadoComponent, canActivate: [ClienteAuthService]},
  {path: 'ListadoTurnos/Cliente',component: ListadoComponent, canActivate: [ClienteAuthService]},
  {path: 'Dashboard',component: DashboardComponent, canActivate: [AdministradorAuthService]},
  {path: 'Error', component: ErrorComponent},
  {path: '**', component: ErrorComponent}
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo)
  ],
  exports: [ RouterModule
  ]
})
export class RuteoModule { }