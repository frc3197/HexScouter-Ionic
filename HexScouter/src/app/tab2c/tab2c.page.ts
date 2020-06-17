import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Filesystem, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

@Component({
  selector: 'app-tab2c',
  templateUrl: './tab2c.page.html',
  styleUrls: ['./tab2c.page.scss'],
})
export class Tab2cPage implements OnInit {
  telePortsChecked: String[] = [];
  teleBottomChecked: boolean = null;
  teleOuterChecked: boolean = null;
  teleInnerChecked: boolean = null;
  teleFailedChecked: boolean = null;
  teleUnableChecked: boolean = null;

  teleShootPositions: String[] = [];
  teleTrenchSPChecked: boolean = null;
  teleFrontPPSPChecked: boolean = null;
  teleInitSPChecked: boolean = null;
  teleShieldSPChecked: boolean = null;
  teleUnableSPChecked: boolean = null;
  teleFailedSPChecked: boolean = null;
  teleOtherSPChecked: boolean = null;
  shootPositionOther: String = "";

  teleBallsAttemptedUpper: number = null;
  teleBallsScoredUpper: number = null;
  teleBallsAttemptedBottom: number = null;
  teleBallsScoredBottom: number = null;

  teleIntakePositions: String[] = [];
  teleGroundIPChecked: boolean = null;
  teleLoadingIPChecked: boolean = null;
  teleNeitherIPChecked: boolean = null;
  teleOtherIPChecked: boolean = null;
  intakePositionOther: String = "";

  teleCPMethods: String[] = [];
  teleStage2CPChecked: boolean = null;
  teleStage3CPChecked: boolean = null;
  teleNeitherCPChecked: boolean = null;
  teleFailedCPChecked: boolean = null;
  teleMatchFailCPChecked: boolean = null;

  constructor(public toastController: ToastController) { }

  ngOnInit() {
  }

  async saveJSON(){
    var currentDateTime = new Date();
    try{
      let contents = await Filesystem.readFile({
        path: 'cache.json',
        directory: FilesystemDirectory.Data,
        encoding: FilesystemEncoding.UTF8
      });
      var old = JSON.parse(contents.data);
    }catch(e){
      this.presentToast('Error loading settings');
      console.error('Error loading Settings', e);
    }
    this.assembleArray();
    var obj = {
      dateTime: old.dateTime,
      teamName: old.teamName,
      matchNum: old.matchNum,
      position: old.position,
      scouterName: old.scouterName,
      autoBallsShot: old.autoBallsShot,
      autoBallsScored: old.autoBallsScored,
      autoPassedLine: old.autoPassedLine,
      autoPortsChecked: old.autoPortsChecked,
      telePortsChecked: this.telePortsChecked,
      teleShootPositions: this.teleShootPositions,
      teleBallsAttemptedUpper: this.teleBallsAttemptedUpper,
      teleBallsScoredUpper: this.teleBallsScoredUpper,
      teleBallsAttemptedBottom: this.teleBallsAttemptedBottom,
      teleBallsScoredBottom: this.teleBallsScoredBottom,
      teleIntakePositions: this.teleIntakePositions,
      teleCPMethods: this.teleCPMethods
    };
    console.log(obj);

    if(obj.telePortsChecked == []){
      this.presentToast('Please check which ports the bot scored in');
    }else if(obj.teleShootPositions == []){
      this.presentToast('Please check which position the bot shot from');
    }else if(obj.teleBallsAttemptedUpper == null){
      this.presentToast('Please input number of balls attempted in the upper port');
    }else if(obj.teleBallsScoredUpper = null){
      this.presentToast('Please input number of balls scored in the upper port');
    }else if(obj.teleBallsAttemptedBottom == null){
      this.presentToast('Please input number of balls attempted in the lower port');
    }else if(obj.teleBallsScoredBottom == null){
      this.presentToast('Please input number of balls scored in the lower port');
    }else if(obj.teleIntakePositions = []){
      this.presentToast('Please check which positions the bot took in balls from');
    }else if(obj.teleCPMethods = []){
      this.presentToast('Please check which methods the bot used for the Control Panel');
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

  async assembleArray(){
    this.telePortsChecked = [];
    if(this.teleBottomChecked){
      this.telePortsChecked.push("Bottom Port");
    }
    if(this.teleOuterChecked){
      this.telePortsChecked.push("Outer Port");
    }
    if(this.teleInnerChecked){
      this.telePortsChecked.push("Inner Port");
    }
    if(this.teleFailedChecked){
      this.telePortsChecked.push("Didn't Score");
    }
    if(this.teleUnableChecked){
      this.telePortsChecked.push("Unable to Score");
    }

    this.teleShootPositions = [];
    if(this.teleTrenchSPChecked){
      this.teleShootPositions.push("Trench");
    }
    if(this.teleFrontPPSPChecked){
      this.teleShootPositions.push("In front of Power Port");
    }
    if(this.teleInitSPChecked){
      this.teleShootPositions.push("Initiation Line");
    }
    if(this.teleShieldSPChecked){
      this.teleShootPositions.push("Shield Generator");
    }
    if(this.teleUnableSPChecked){
      this.teleShootPositions.push("Can't Shoot");
    }
    if(this.teleFailedSPChecked){
      this.teleShootPositions.push("Didn't Shoot");
    }
    if(this.teleOtherSPChecked){
      this.teleShootPositions.push(this.shootPositionOther);
    }

    this.teleIntakePositions = [];
    if(this.teleGroundIPChecked){
      this.teleIntakePositions.push("Ground");
    }
    if(this.teleLoadingIPChecked){
      this.teleIntakePositions.push("Loading Station");
    }
    if(this.teleNeitherIPChecked){
      this.teleIntakePositions.push("Neither");
    }
    if(this.teleOtherIPChecked){
      this.teleIntakePositions.push(this.intakePositionOther);
    }

    this.teleCPMethods = [];
    if(this.teleStage2CPChecked){
      this.teleCPMethods.push("Stage 2");
    }
    if(this.teleStage3CPChecked){
      this.teleCPMethods.push("Stage 3");
    }
    if(this.teleNeitherCPChecked){
      this.teleCPMethods.push("Didn't Manipulate the Control Panel");
    }
    if(this.teleFailedCPChecked){
      this.teleCPMethods.push("Can't Manipulate the Control Panel");
    }
    if(this.teleMatchFailCPChecked){
      this.teleCPMethods.push("Match did not reach high stage");
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
      this.teleBallsAttemptedUpper = obj.teleBallsAttemptedUpper;
      this.teleBallsScoredUpper = obj.teleBallsScoredUpper;
      this.teleBallsAttemptedBottom = obj.teleBallsAttemptedBottom;
      this.teleBallsScoredBottom = obj.teleBallsScoredBottom;
      this.parseArray(obj);
    }catch(e){
      this.presentToast('Error loading Cached Data-- entries may not exist');
      console.error('Match Number not Present', e);
    }
  }

  async parseArray(obj: any){
    console.log("parseArray obj");
    console.log(obj);
    var portsChecked: String[] = obj.telePortsChecked;
    //TODO: Finish this
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
