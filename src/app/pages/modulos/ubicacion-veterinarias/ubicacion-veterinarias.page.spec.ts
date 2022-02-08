import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UbicacionVeterinariasPage } from './ubicacion-veterinarias.page';

describe('UbicacionVeterinariasPage', () => {
  let component: UbicacionVeterinariasPage;
  let fixture: ComponentFixture<UbicacionVeterinariasPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UbicacionVeterinariasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UbicacionVeterinariasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
