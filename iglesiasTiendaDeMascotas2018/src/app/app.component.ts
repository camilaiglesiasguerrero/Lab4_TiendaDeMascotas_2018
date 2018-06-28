import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  ngOnInit(){
    localStorage.setItem("token",'sinToken');
    localStorage.setItem("tipo",'invitado');
    localStorage.setItem("usuario",null);
  }
}
