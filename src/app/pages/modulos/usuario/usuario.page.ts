import { Component, OnInit } from '@angular/core';
import { usuariosI } from '../../../interfaces/usuarios.interface';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  user;
  usuario: usuariosI;

  constructor() {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('User_Data'));

    this.usuario = this.user;
  }
}
