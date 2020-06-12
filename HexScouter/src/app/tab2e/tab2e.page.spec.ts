import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Tab2ePage } from './tab2e.page';

describe('Tab2ePage', () => {
  let component: Tab2ePage;
  let fixture: ComponentFixture<Tab2ePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab2ePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab2ePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
