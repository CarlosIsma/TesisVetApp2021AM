import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistroUsuarioPage } from './registro-usuario.page';

describe('RegistroUsuarioPage', () => {
  let component: RegistroUsuarioPage;
  let fixture: ComponentFixture<RegistroUsuarioPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroUsuarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Crea el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería verificarque los campos requeridos: cedula, nombre, apellido, correo electrónico, contraseña, repetir contraseña, tipo de usuario e imagen', () => {

    const component2= fixture.componentInstance;
    const cp= {cedula: "1722641725", nombre: 'Omar', apellido :"Espin", correo: "victoromarmh96@gmail.com", rol: "ciudadano",   }
    const verificacion = component2.createMailUser(cp.cedula, cp.nombre, cp.apellido, cp.correo, cp.rol);

    expect(verificacion['required']).toBeFalsy();
    expect(verificacion ['cedula']).toBeFalsy();
    expect(verificacion ['nombre']).toBeFalsy();
    expect(verificacion ['apellido']).toBeFalsy();
    expect(verificacion ['correo']).toBeFalsy();
    expect(verificacion ['rol']).toBeDefined();

  });
});

function AuthServiceService(AuthServiceService: any) {
  throw new Error('Function not implemented.');
}
