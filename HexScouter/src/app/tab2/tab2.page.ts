import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins, Filesystem, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  teamName: String = null;
  matchNum: String = null;
  canLeave: boolean = null;
  
  constructor(public toastController: ToastController) {}
  
  async saveJSON(){
    var currentDateTime = new Date();
    try{
      let contents = await Filesystem.readFile({
        path: 'settings/settings.json',
        directory: FilesystemDirectory.Data,
        encoding: FilesystemEncoding.UTF8
      });
      var settings = JSON.parse(contents.data);
    }catch(e){
      this.presentToast('Error loading settings');
      console.error('Error loading Settings', e);
    }

    var obj = {
      regional: settings.regional,
      dateTime: currentDateTime,
      teamName: this.teamName, 
      matchNum: this.matchNum,
      position: settings.position,
      scouterName: settings.scouterName,
    };
    console.log(obj);

    this.canLeave = true;
    // for(let item of Object.values(obj)){
    //   if(item == null){
    //     this.presentToast('Not all items in previous page or settings have been filled in');
    //     console.log("Cannot leave");
    //     this.canLeave = false;
    //     break;
    //   }
    // }

    if(this.canLeave){
      try {
        const result = await Filesystem.writeFile({
          path: 'tab2Cache.json',
          data: JSON.stringify(obj),
          directory: FilesystemDirectory.Cache,
          encoding: FilesystemEncoding.UTF8
        })
        console.log('Wrote file', result);
      } catch(e){
        this.presentToast('An Error Occured');
        console.error('Unable to write file', e);
      }
    }
  }

  async loadJSON(){
    try{
      let contents = await Filesystem.readFile({
        path: 'tab2Cache.json',
        directory: FilesystemDirectory.Cache,
        encoding: FilesystemEncoding.UTF8
      });
      var obj = JSON.parse(contents.data);
      console.log(obj);
      this.teamName = obj.teamName;
      this.matchNum = obj.matchNum;
    }catch(e){
      this.presentToast('Error loading Cached Data');
      console.error('Match Number not Present', e);
    }
  }

  async presentToast(m: String){
    const toast = await this.toastController.create({
      message: m.toString(),
      duration: 1000,
    });
    toast.present();
  }

  ionViewWillLeave(){
    this.saveJSON();
  }

  ionViewDidEnter(){
    this.teamName = null;
    this.matchNum = null;
    this.loadJSON();
  }

  async canDeactivate(){
    await this.saveJSON();
    console.log("please work");
    return this.canLeave;
  }
}
