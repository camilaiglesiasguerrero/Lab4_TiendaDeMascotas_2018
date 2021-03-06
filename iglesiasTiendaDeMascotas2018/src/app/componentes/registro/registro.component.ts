import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../clases/usuario';

function copiaClave(input: FormControl) {

      if (input.root.get('clave') == null) {
        return null;
      }

      const verificar = input.root.get('clave').value === input.value;
      return verificar ? null : { mismaClave : true };
  }


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private usuarioS : UsuarioService, private builder: FormBuilder) { 
    this.tipo.setValue('cliente');
  }
  nuevoUsuario : Usuario;
  

  email = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);
  
  clave = new FormControl('', [
    Validators.required
  ]);
  
  copiaClave = new FormControl('', [
    Validators.required,
    copiaClave
  ]);

  tipo = new FormControl('',[
    Validators.required,
  ])
  registroForm: FormGroup = this.builder.group({
    email: this.email,
    clave: this.clave,
    copiaClave: this.copiaClave,
    tipo : this.tipo,
  });

  ngOnInit() {
  }

  Registrar(){
    this.nuevoUsuario = new Usuario();
    this.nuevoUsuario.email = this.registroForm.get('email').value;
    this.nuevoUsuario.clave = this.registroForm.get('clave').value;
    this.nuevoUsuario.tipo = this.registroForm.get('tipo').value;
    //console.log(this.nuevoUsuario);
    this.usuarioS.CrearUsuario(this.nuevoUsuario);
    //console.log(this.registroForm.get('email').value); 
  }
}
