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
  midwestBool: boolean = true;
  constructor(public toastController: ToastController) { }

  ngOnInit() {
  }

  ionViewWillLeave(){
    this.saveSettings();
  }

  ionViewDidEnter(){
    this.loadSettings();
  }

  radioGroupChange(event){
    this.regional = event.detail.value;
    console.log(this.regional);
  }

  async loadSettings(){
    try{
      let contents = await Filesystem.readFile({
        path: 'settings.json',
        directory: FilesystemDirectory.Data,
        encoding: FilesystemEncoding.UTF8
      });
      console.log(contents);
      var obj = JSON.parse(contents.data);
      this.regional = obj.regional;
      this.scouterName = obj.scouterName;
      console.log(this.regional);
      console.log(this.scouterName);
      console.log(obj);
    }catch(e){
      this.presentToast('Error loading Settings');
      console.error('Error loading Settings', e);
    }
  }

  async saveSettings(){
    var obj = {scouterName: this.scouterName, regional: this.regional};
    try {
      const result = await Filesystem.writeFile({
        path: 'settings.json',
        data: JSON.stringify(obj),
        directory: FilesystemDirectory.Data,
        encoding: FilesystemEncoding.UTF8
      })
      console.log('Settings Saved', result);
      this.presentToast('Successfully saved settings');
    } catch(e){
      this.presentToast('An Error Occured');
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
