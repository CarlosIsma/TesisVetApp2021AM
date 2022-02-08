import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ShowPassword=false;
  passwordToggleIcon='eye';

  user;

  constructor(private authSrv: AuthService, private router: Router) {}

  togglePassword():void{
    this.ShowPassword=!this.ShowPassword;

    if(this.passwordToggleIcon=='eye'){
      this.passwordToggleIcon="eye-off";
    }else{
      this.passwordToggleIcon='eye';
    }
  };

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('User_Data'));

    if (this.user !== null && this.user !== undefined) {
      if (this.user.rol === 'veterinaria' || this.user.rol === 'ciudadano') {
        this.router.navigate(['/menu']);
      }
    }
  }

  login(form) {
    this.authSrv.login(form.value.correo, form.value.password);
  }

  loginIvitado() {
    let usuarioTemporal = {
      apellido: 'Temporal',
      aprobado: true,
      cedula: '0000000000',
      correo: 'usuario.temporal@correo.com',
      id: 'uSerTemPoral',
      imagen: '',
      nombre: 'Usuario',
      rol: 'invitado',
    };
    localStorage.setItem('User_Data', JSON.stringify(usuarioTemporal));
    this.router.navigate(['/menu']);
  }
  logingoogle(){
    alert('estas log Goo');
  }

  loginfacebook(){
    alert('estas log Face');
  }

  option={
    slidesPerView: 1.5,
    centeredSlides: true,
    lopp: true,
    spaceBetween:10,
    autoplay:true,

  }

}
