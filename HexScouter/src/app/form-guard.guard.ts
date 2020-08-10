import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FormGuardGuard implements CanDeactivate<CanComponentDeactivate> {
  constructor(public toastController: ToastController){}

  canDeactivate(component: CanComponentDeactivate) {
    console.log("Activated")
    return component.canDeactivate ? component.canDeactivate() : true;
  }

  async presentToast(m: String){
    const toast = await this.toastController.create({
      message: m.toString(),
      duration: 1000,
    });
    toast.present();
  }
  
}
