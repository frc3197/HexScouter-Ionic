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

  canLeave: boolean = null;

  constructor(public toastController: ToastController) { }

  ngOnInit() {
  }

  async saveJSON(){
    this.assembleArray();
    var obj = {
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

    if(!this.canLeave){

    }else{
      this.canLeave = true;
    }
    for(let item of Object.values(obj)){
      if(item == null){
        this.presentToast('Not all items in previous page have been filled in');
        this.canLeave = false;
        break;
      }
    }

    if(this.canLeave){
      try {
        const result = await Filesystem.writeFile({
          path: 'tab2CCache.json',
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
    this.canLeave = true;
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
    if(this.telePortsChecked.length == 0){
      this.presentToast('Not all items have been filled in');
      this.canLeave = false;
      return false;
    }

    this.teleShootPositions = [];
    if(this.teleTrenchSPChecked){
      this.teleShootPositions.push("Trench");
    }
    if(this.teleFrontPPSPChecked){
      this.teleShootPositions.push("In Front of Power Port");
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
    if(this.teleShootPositions.length == 0){
      this.presentToast('Not all items have been filled in');
      this.canLeave = false;
      return false;
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
    if(this.teleIntakePositions.length == 0){
      this.presentToast('Not all items have been filled in');
      this.canLeave = false;
      return false;
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
    if(this.teleCPMethods.length == 0){
      this.presentToast('Not all items have been filled in');
      this.canLeave = false;
      return false;
    }
  }

  async loadJSON(){
    try{
      let contents = await Filesystem.readFile({
        path: 'tab2CCache.json',
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
      console.error('Error loading Cached Data', e);
    }
  }

  async parseArray(obj: any){ //I hate this entire method so much
    console.log("parseArray obj");
    console.log(obj);
    var portsChecked: String[] = obj.telePortsChecked;
    if(portsChecked.includes("Bottom Port")){
      this.teleBottomChecked = true;
    }
    if(portsChecked.includes("Outer Port")){
      this.teleOuterChecked = true;
    }
    if(portsChecked.includes("Inner Port")){
      this.teleInnerChecked = true;
    }
    if(portsChecked.includes("Didn't Score")){
      this.teleFailedChecked = true;
    }
    if(portsChecked.includes("Unable to Score")){
      this.teleUnableChecked = true;
    }

    var shootPositions: String[] = obj.teleShootPositions;
    var possibleSP: String[] = ["Trench", "In Front of Power Port", 
                              "Initiation Line", "Shield Generator",
                              "Can't Shoot", "Didn't Shoot"];
    if(shootPositions.includes("Trench")){
      this.teleTrenchSPChecked = true;
    }
    if(shootPositions.includes("In Front of Power Port")){
      this.teleFrontPPSPChecked = true;
    }
    if(shootPositions.includes("Initiation Line")){
      this.teleInitSPChecked = true;
    }
    if(shootPositions.includes("Shield Generator")){
      this.teleShieldSPChecked = true;
    }
    if(shootPositions.includes("Can't Shoot")){
      this.teleUnableSPChecked = true;
    }
    if(shootPositions.includes("Didn't Shoot")){
      this.teleFailedSPChecked = true;
    }
    var otherBool = true;
    for(let item of possibleSP){
      if(shootPositions[shootPositions.length-1] === item){
        otherBool = false;
        break;
      }
    }
    if(!otherBool){
      this.teleOtherSPChecked = false;
    }else{
      this.teleOtherSPChecked = true;
      this.shootPositionOther = shootPositions[shootPositions.length-1];
    }

    var intakePositions: String[] = obj.teleIntakePositions;
    var possibleIP: String[] = ["Ground", "Loading Station", "Neither"];
    if(intakePositions.includes("Ground")){
      this.teleGroundIPChecked = true;
    }
    if(intakePositions.includes("Loading Station")){
      this.teleLoadingIPChecked = true;
    }
    if(intakePositions.includes("Neither")){
      this.teleNeitherIPChecked = true;
    }
    var otherBool2 = true;
    for(let item of possibleIP){
      if(intakePositions[intakePositions.length-1] == item){
        otherBool2 = false;
        break;
      }
    }
    if(!otherBool2){
      this.teleOtherIPChecked = false;
    }else{
      this.teleOtherIPChecked = true;
      this.intakePositionOther = intakePositions[intakePositions.length-1];
    }

    var cpMethods: String[] = obj.teleCPMethods;
    if(cpMethods.includes("Stage 2")){
      this.teleStage2CPChecked = true;
    }
    if(cpMethods.includes("Stage 3")){
      this.teleStage3CPChecked = true;
    }
    if(cpMethods.includes("Didn't Manipulate the Control Panel")){
      this.teleNeitherCPChecked = true;
    }
    if(cpMethods.includes("Can't Manipulate the Control Panel")){
      this.teleFailedCPChecked = true;
    }
    if(cpMethods.includes("Match did not reach high stage")){
      this.teleMatchFailCPChecked = true;
    }
  }

  async presentToast(m: String){
    const toast = await this.toastController.create({
      message: m.toString(),
      duration: 1000,
    });
    toast.present();
  }

  // ionViewWillLeave(){
  //   this.saveJSON();
  // }

  ionViewDidEnter(){
    this.loadJSON();
  }

  async canDeactivate(){
    await this.saveJSON();
    return this.canLeave;
  }
}
