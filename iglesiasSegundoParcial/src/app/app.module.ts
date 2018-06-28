import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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

//SERVICIOS
import { HttpModule } from '@angular/http';
import { MiHttpService } from './servicios/mi-http.service';
import { UsuarioService } from './servicios/usuario.service';
import { AuthService } from './servicios/auth/auth.service';
import { AuthGuardService } from './servicios/auth/auth-guard.service';
import { RoleGuardService } from './servicios/auth/role-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    FooterComponent,
    FrmAltaComponent,
    LoginComponent,
    RegistroComponent,
    MenuComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    HttpModule,
    RuteoModule
  ],
  providers: [MiHttpService,AuthGuardService,RoleGuardService,AuthService,UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
