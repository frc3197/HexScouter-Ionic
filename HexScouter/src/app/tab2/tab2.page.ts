import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { ToastController } from '@ionic/angular';

const { Filesystem } = Plugins;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  teamName: String = "";
  matchNum: String = "";
  
  constructor(public toastController: ToastController) {}
  
  async saveJSON(){
    var currentDateTime = new Date();
    try{
      let contents = await Filesystem.readFile({
        path: 'settings.json',
        directory: FilesystemDirectory.Data,
        encoding: FilesystemEncoding.UTF8
      });
      var settings = JSON.parse(contents.data);
    }catch(e){
      this.presentToast('Error loading settings');
      console.error('Error loading Settings', e);
    }

    var obj = {
      dateTime: currentDateTime,
      teamName: this.teamName, 
      matchNum: this.matchNum,
      position: settings.position,
      scouterName: settings.scouterName,
    };
    console.log(obj);

    if(obj.matchNum == ""){
      this.presentToast('Please input match number');
    }else if(obj.teamName == ""){
      this.presentToast('Please input team name');
    }else if(obj.position == ""){
      this.presentToast('Please set your position in the settings tab');
    }else if(obj.scouterName == ""){
      this.presentToast('Please set your name in the settings tab');
    }else{
      try {
        const result = await Filesystem.writeFile({
          path: 'cache.json',
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
        path: 'cache.json',
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
    this.loadJSON();
  }
}
