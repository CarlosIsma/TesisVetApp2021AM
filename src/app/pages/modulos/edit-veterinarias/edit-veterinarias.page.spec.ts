import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditVeterinariasPage } from './edit-veterinarias.page';

describe('EditVeterinariasPage', () => {
  let component: EditVeterinariasPage;
  let fixture: ComponentFixture<EditVeterinariasPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVeterinariasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditVeterinariasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Crea el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería verificarque los campos requeridos: nombre, direccion, telefono, horario, referencia, imagen, formaspago, servicios, coordenadas, pdf, ruc, sector, horaapertura, horacierre', () => {

    const component2= fixture.componentInstance;
    const cp= {nombre: "Patitas Mojadas", direccion: "Whymper y orellana", telefono :"2606624", horario: "apertura", referencia: "veterinario", imagen: 'Carlos', apellido :"Lucero", correo: "carlos.lucero26@hotmail.com", rol: "veterinario",   }
    const verificacion = component2.crearVeterinaria(cp.nombre);

    expect(verificacion['required']).toBeFalsy();
    expect(verificacion ['nombre']).toBeFalsy();
    expect(verificacion ['direccion']).toBeFalsy();
    expect(verificacion ['telefono']).toBeFalsy();
    expect(verificacion ['horario']).toBeFalsy();
    expect(verificacion ['referencia']).toBeDefined();
    expect(verificacion ['imagen']).toBeFalsy();
    expect(verificacion ['referencia']).toBeDefined();

  });
});