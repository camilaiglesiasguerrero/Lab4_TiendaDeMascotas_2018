import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

//RUTEO
import { RuteoModule } from './ruteo/ruteo.module';

//COMPONENTES
import { AppComponent } from './app.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { FrmAltaComponent } from './componentes/frm-alta/frm-alta.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { ErrorComponent } from './componentes/error/error.component';
import { ReservaComponent } from './componentes/reserva/reserva.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';

//SERVICIOS
import { HttpModule } from '@angular/http';
import { MiHttpService } from './servicios/mi-http.service';
import { UsuarioService } from './servicios/usuario.service';
import { AuthService } from './servicios/auth/auth.service';
import { AuthGuardService } from './servicios/auth/auth-guard.service';
import { RoleGuardService } from './servicios/auth/role-guard.service';
import { MascotaService } from './servicios/mascota.service';

//PIPE
import { EdadPipe } from './pipes/edad.pipe';
import { ListadoComponent } from './componentes/listado/listado.component';
import { NexoComponent } from './componentes/nexo/nexo.component';
import { FechaPipe } from './pipes/fecha.pipe';
import { HoraPipe } from './pipes/hora.pipe';
import { SelectEstadoComponent } from './componentes/select-estado/select-estado.component';
import { TurnosDirective } from './directivas/turnos.directive';


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    FooterComponent,
    FrmAltaComponent,
    LoginComponent,
    RegistroComponent,
    MenuComponent,
    ErrorComponent,
    ReservaComponent,
    DashboardComponent,
    EdadPipe,
    ListadoComponent,
    NexoComponent,
    FechaPipe,
    HoraPipe,
    SelectEstadoComponent,
    TurnosDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    HttpModule,
    RuteoModule,
    NgxDatatableModule
  ],
  providers: [MiHttpService,AuthGuardService,RoleGuardService,AuthService,UsuarioService, MascotaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
