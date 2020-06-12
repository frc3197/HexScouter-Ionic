import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Tab2cPage } from './tab2c.page';

describe('Tab2cPage', () => {
  let component: Tab2cPage;
  let fixture: ComponentFixture<Tab2cPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab2cPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab2cPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
