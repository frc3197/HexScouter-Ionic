import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Tab2bPage } from './tab2b.page';

describe('Tab2bPage', () => {
  let component: Tab2bPage;
  let fixture: ComponentFixture<Tab2bPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab2bPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab2bPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
