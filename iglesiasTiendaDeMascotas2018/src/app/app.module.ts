import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

//RUTEO
import { RuteoModule } from './ruteo/ruteo.module';

//SERVICIOS
import { HttpModule } from '@angular/http';
import { MiHttpService } from './servicios/mi-http.service';
import { UsuarioService } from './servicios/usuario.service';

import { ExcelService } from './servicios/excel.service';
///Aut
import { AuthService } from './servicios/auth/auth.service';
import { AdministradorAuthService } from './servicios/auth/administrador-auth.service';
import { ClienteAuthService } from './servicios/auth/cliente-auth.service';

//PIPES
import { EdadPipe } from './pipes/edad.pipe';

//COMPONENTES
import { AppComponent } from './app.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { ListadoComponent } from './componentes/listado/listado.component';
import { ErrorComponent } from './componentes/error/error.component';
import { AltaMascotaComponent } from './componentes/alta-mascota/alta-mascota.component';
import { TurnoComponent } from './componentes/turno/turno.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    PrincipalComponent,
    RegistroComponent,
    LoginComponent,
    MenuComponent,
    EdadPipe,
    ListadoComponent,
    ErrorComponent,
    AltaMascotaComponent,
    TurnoComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    HttpModule,
    RuteoModule,
    ChartsModule
  ],
  providers: [MiHttpService, AuthService, UsuarioService, AdministradorAuthService, ClienteAuthService, ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
