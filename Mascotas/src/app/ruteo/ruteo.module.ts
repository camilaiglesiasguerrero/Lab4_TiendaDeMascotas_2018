//Modules
import { NgModule } from '@angular/core';

//ruteo
import { RouterModule, Routes } from '@angular/router';

//can activate
import { AuthGuardService } from '../servicios/auth/auth-guard.service';
import { RoleGuardService } from '../servicios/auth/role-guard.service';

//componentes
import { PrincipalComponent } from '../componentes/principal/principal.component';
import { RegistroComponent } from '../componentes/registro/registro.component';
import { LoginComponent } from '../componentes/login/login.component';
import { ErrorComponent } from '../componentes/error/error.component';
import { ReservaComponent } from '../componentes/reserva/reserva.component';
import { FrmAltaComponent } from '../componentes/frm-alta/frm-alta.component';
import { NexoComponent } from '../componentes/nexo/nexo.component';

const MiRuteo = [
  {path: '' , component: PrincipalComponent},
  {path:'Principal', component: PrincipalComponent},
  {path: 'Registrarse',component: RegistroComponent},
  {path: 'Ingresar', component: LoginComponent},
  {path: 'Dashboard',component: NexoComponent, canActivate: [RoleGuardService],
      data: { expectedRole: 'admin' }},
  {path: 'Reserva', component: ReservaComponent, canActivate: [RoleGuardService], 
      data: { expectedRole: 'cliente' }},
  {path: 'NuevaMascota/Cliente', component: FrmAltaComponent, canActivate: [RoleGuardService], 
      data: { expectedRole: 'cliente' }},
  {path: 'NuevaMascota', component: FrmAltaComponent, canActivate: [RoleGuardService], 
      data: { expectedRole: 'admin' }},
  {path: 'MisTurnos', component: NexoComponent, canActivate: [RoleGuardService],
      data: { expectedRole: 'cliente' }},
  {path: 'Turnos', component: NexoComponent, canActivate: [RoleGuardService],
      data: { expectedRole: 'admin' }},
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