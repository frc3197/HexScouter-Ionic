import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Filesystem, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

@Component({
  selector: 'app-tab2d',
  templateUrl: './tab2d.page.html',
  styleUrls: ['./tab2d.page.scss'],
})
export class Tab2dPage implements OnInit {
  climbed: boolean = null;
  inRendezPoint: boolean = null;
  climbSpeed: String = null;
  numBotsClimbed: number = null;
  sgBalanced: boolean = null;
  climbingPosition: String = null;

  canLeave: boolean = null;

  constructor(public toastController: ToastController) { }

  ngOnInit() {
  }

  async saveJSON(){
    var obj = {
      climbed: this.climbed,
      inRendezPoint: this.inRendezPoint,
      climbSpeed: this.climbSpeed,
      numBotsClimbed: this.numBotsClimbed,
      sgBalanced: this.sgBalanced,
      climbingPosition: this.climbingPosition
    }
    console.log(obj);

    this.canLeave = true;
    for(let item of Object.values(obj)){
      if(item == null){
        this.presentToast('Not all items in previous page have been filled in');
        console.log(item);
        this.canLeave = false;
        break;
      }
    }

    if(this.canLeave){
      try {
        const result = await Filesystem.writeFile({
          path: 'tab2DCache.json',
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
        path: 'tab2DCache.json',
        directory: FilesystemDirectory.Cache,
        encoding: FilesystemEncoding.UTF8
      });
      var obj = JSON.parse(contents.data);
      this.climbed = obj.climbed;
      this.inRendezPoint = obj.inRendezPoint;
      this.climbSpeed = obj.climbSpeed;
      this.numBotsClimbed = obj.numBotsClimbed;
      this.sgBalanced = obj.sgBalanced;
      this.climbingPosition = obj.climbingPosition;
    }catch(e){
      this.presentToast('Error loading Cached Data-- entries may not exist')
      console.error('Error loading Cached Data', e)
    }
  }

  // ionViewWillLeave(){
  //   this.saveJSON();
  // }

  ionViewDidEnter(){
    this.loadJSON();
  }

  async canDeactivate(){
    await this.saveJSON();
    console.log("please work");
    console.log(this.canLeave)
    return this.canLeave;
  }

  async presentToast(m: String){
    const toast = await this.toastController.create({
      message: m.toString(),
      duration: 1000
    });
    toast.present();
  }

  eventChange(event){
    console.log(event.detail.value);
  }

  reset(){
    //TODO: Deprecate and remove since this is only for debug
    this.climbed = null;
    this.inRendezPoint = null;
    this.climbSpeed = null;
    this.numBotsClimbed = null;
    this.sgBalanced = null;
    this.climbingPosition = null;
  }
}
