import { Component, OnInit } from '@angular/core';
import { IonRadio, ToastController } from '@ionic/angular';
import { Filesystem, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { viewClassName } from '@angular/compiler';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  scouterName: String = '';
  regional: String = '';
  position: String = '';
  constructor(public toastController: ToastController) { }

  ngOnInit() {
  }

  ionViewWillLeave(){
    this.saveSettings();
  }

  ionViewDidEnter(){
    this.loadSettings();
  }

  regionalChange(event){
    this.regional = event.detail.value;
    console.log(this.regional);
  }

  positionChange(event){
    this.position = event.detail.value;
    console.log(this.position);
  }

  async loadSettings(){
    try{
      let contents = await Filesystem.readFile({
        path: 'settings/settings.json',
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8
      });
      console.log(contents);
      var obj = JSON.parse(contents.data);
      this.regional = obj.regional;
      this.scouterName = obj.scouterName;
      this.position = obj.position;
      console.log(obj);
    }catch(e){
      this.presentToast('Error loading Settings');
      console.error('Error loading Settings', e);
    }
  }

  async saveSettings(){
    var obj = {
      scouterName: this.scouterName, 
      regional: this.regional,
      position: this.position
    };
    try {
      const result = await Filesystem.writeFile({
        path: 'settings/settings.json',
        data: JSON.stringify(obj),
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8
      })
      console.log('Settings Saved', result);
    } catch(e){
      console.error('Unable to save settings', e);
    }
  }

  async presentToast(m: String){
    const toast = await this.toastController.create({
      message: m.toString(),
      duration: 1000,
    });
    toast.present();
  }

}
