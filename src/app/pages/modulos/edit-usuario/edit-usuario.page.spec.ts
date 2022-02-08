import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditUsuarioPage } from './edit-usuario.page';

describe('EditUsuarioPage', () => {
  let component: EditUsuarioPage;
  let fixture: ComponentFixture<EditUsuarioPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUsuarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditUsuarioPage);
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
