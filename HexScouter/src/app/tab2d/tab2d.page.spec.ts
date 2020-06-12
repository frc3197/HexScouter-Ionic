import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Tab2dPage } from './tab2d.page';

describe('Tab2dPage', () => {
  let component: Tab2dPage;
  let fixture: ComponentFixture<Tab2dPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab2dPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab2dPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
