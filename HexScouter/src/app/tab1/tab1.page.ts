import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Filesystem, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  forms = [];
  visible: boolean[] = [];

  constructor(public alertController: AlertController, public router: Router, public toastController: ToastController) {}

  async ionViewDidEnter(){
    await this.loadForms();
  }

  async loadForms(){
    this.forms = [];
    try{
      let result = await Filesystem.readdir({
        directory: FilesystemDirectory.Data,
        path: 'forms'
      });
      console.log("Result", result.files)
      for(let file of result.files){
        var filepath = 'forms/' + file;
        try{
          let result = await Filesystem.readFile({
            path: filepath,
            directory: FilesystemDirectory.Data,
            encoding: FilesystemEncoding.UTF8
          });
          this.forms.push(JSON.parse(result.data));
        }catch(e){
          console.log("Failed to read file", e);
        }
      }
    }catch(e){

    }
  }

  toggle(index){
    this.visible[index] = !this.visible[index];
    console.log("Clicked a Card!");
  }

  async deleteForm(matchNum, i){
    const alert = await this.alertController.create({
      header: 'Delete Form?',
      message: 'Would you like to delete Match ' + matchNum + '?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('User selected No');
          }
        }, {
          text: 'Yes',
          handler: async () => {
            console.log("Deleting Form", matchNum);
            var filename = "forms/match_" + matchNum + ".json";
            try{
              const result = Filesystem.deleteFile({
              path: filename,
                directory: FilesystemDirectory.Data
              });
              console.log('Deleted file', result);
              this.presentToast('Successfully deleted Form for Match ' + matchNum);
              var index;
              for(let form of this.forms){
                if(form.matchNum == matchNum){
                  index = this.forms.indexOf(form);
                }
              }
              this.forms.splice(index, 1);
              for(var i = 0; i < this.visible.length; i++){
                this.visible[i] = false;
              }
              this.router.navigate(['/tabs/tab1']);
            }catch(e){
              this.presentToast('Unable to delete requested Form. File may not exist.');
              console.error('Error deleting Match ' + matchNum, e);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async loadFormIntoCache(matchNum){
    const alert = await this.alertController.create({
      header: 'Load and Edit Form?',
      message: 'Would you like to load Match ' + matchNum + '?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('User selected No');
          }
        }, {
          text: 'Yes',
          handler: async () => {
            console.log('User selected Yes. Loading Match ' + matchNum);
            var filename = "forms/match_" + matchNum + ".json";
            try{
              let contents = await Filesystem.readFile({
                path: filename,
                directory: FilesystemDirectory.Data,
                encoding: FilesystemEncoding.UTF8
              });
              var obj = JSON.parse(contents.data);
              await this.saveDataToCache(obj);
              this.router.navigate(['/tabs/tab2']);
            }catch(e){
              this.presentToast("Unable to load Form " + matchNum + ". File may not exist or is corrupted.");
              console.log("Unable to load Form " + matchNum, e);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async saveDataToCache(obj){
    var tab2Cache = {
      regional: obj.regional,
      dateTime: obj.dateTime,
      teamName: obj.teamName,
      matchNum: obj.matchNum,
      position: obj.position,
      scouterName: obj.scouterName
    }
    var tab2BCache = {
      autoBallsShot: obj.autoBallsShot,
      autoBallsScored: obj.autoBallsScored,
      autoPassedLine: obj.autoPassedLine,
      autoPortsChecked: obj.autoPortsChecked
    }
    var tab2CCache = {
      telePortsChecked: obj.telePortsChecked,
      teleShootPositions: obj.teleShootPositions,
      teleBallsAttemptedUpper: obj.teleBallsAttemptedUpper,
      teleBallsScoredUpper: obj.teleBallsScoredUpper,
      teleBallsAttemptedBottom: obj.teleBallsAttemptedBottom,
      teleBallsScoredBottom: obj.teleBallsScoredBottom,
      teleIntakePositions: obj.teleIntakePositions,
      teleCPMethods: obj.teleCPMethods
    }
    var tab2DCache = {
      climbed: obj.climbed,
      inRendezPoint: obj.inRendezPoint,
      climbSpeed: obj.climbSpeed,
      numBotsClimbed: obj.numBotsClimbed,
      sgBalanced: obj.sgBalanced,
      climbingPosition: obj.climbingPosition
    }
    var tab2ECache = {
      issuesChecked: obj.issuesChecked,
      penaltiesChecked: obj.penaltiesChecked,
      comments: obj.comments
    }

    try{
      const result2 = await Filesystem.writeFile({
        path: 'tab2Cache.json',
        data: JSON.stringify(tab2Cache),
        directory: FilesystemDirectory.Cache,
        encoding: FilesystemEncoding.UTF8
      });
      console.log('Wrote file', result2);

      const result2b = await Filesystem.writeFile({
        path: 'tab2BCache.json',
        data: JSON.stringify(tab2BCache),
        directory: FilesystemDirectory.Cache,
        encoding: FilesystemEncoding.UTF8
      });
      console.log('Wrote file', result2b);

      const result2c = await Filesystem.writeFile({
        path: 'tab2CCache.json',
        data: JSON.stringify(tab2CCache),
        directory: FilesystemDirectory.Cache,
        encoding: FilesystemEncoding.UTF8
      });
      console.log('Wrote file', result2c);

      const result2d = await Filesystem.writeFile({
        path: 'tab2DCache.json',
        data: JSON.stringify(tab2DCache),
        directory: FilesystemDirectory.Cache,
        encoding: FilesystemEncoding.UTF8
      });
      console.log('Wrote file', result2d);

      const result2e = await Filesystem.writeFile({
        path: 'tab2ECache.json',
        data: JSON.stringify(tab2ECache),
        directory: FilesystemDirectory.Cache,
        encoding: FilesystemEncoding.UTF8
      });
      console.log('Wrote file', result2e);
    }catch(e){
      this.presentToast('An Error Occured');
      console.error('Unable to write file', e);
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
