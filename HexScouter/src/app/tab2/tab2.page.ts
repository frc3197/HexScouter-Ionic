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
    var obj = {teamName: this.teamName, matchNum: this.matchNum};
    if(obj.matchNum == ""){
      this.presentToast('Please Input Match Number');
    }else if(obj.teamName == ""){
      this.presentToast('Please Input Team Name');
    }else{
      try {
        const result = await Filesystem.writeFile({
          path: 'input/Match_' + this.matchNum + '.json',
          data: JSON.stringify(obj),
          directory: FilesystemDirectory.Data,
          encoding: FilesystemEncoding.UTF8
        })
        console.log('Wrote file', result);
        this.presentToast('Successfully Saved Data');
      } catch(e){
        this.presentToast('An Error Occured');
        console.error('Unable to write file', e);
      }
    }
  }

  //TODO: Only for Debug. Eventually should deprecate.
  async readJSON(){
    try{
      let contents = await Filesystem.readFile({
        path: 'input/Match_' + this.matchNum + '.json',
        directory: FilesystemDirectory.Data,
        encoding: FilesystemEncoding.UTF8
      });
      console.log(contents.toString());
    }catch(e){
      this.presentToast('Please Input Match Number');
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
}
