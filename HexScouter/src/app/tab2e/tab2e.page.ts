import { Component, OnInit } from '@angular/core';
import { Filesystem, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2e',
  templateUrl: './tab2e.page.html',
  styleUrls: ['./tab2e.page.scss'],
})
export class Tab2ePage implements OnInit {
  issuesChecked: String[] = [];
  noIssueChecked: boolean = null;
  connectIssueChecked: boolean = null;
  controlIssueChecked: boolean = null;
  tippedIssueChecked: boolean = null;
  breakingIssueChecked: boolean = null;
  toasterIssueChecked: boolean = null;
  brickIssueChecked: boolean = null;
  powerIssueChecked: boolean = null;
  otherIssueChecked: boolean = null;
  otherIssue: String = null;

  penaltiesChecked: String[] = [];
  yellowPenaltyChecked: boolean = null;
  redPenaltyChecked: boolean = null;
  foulPenaltyChecked: boolean = null;
  techPenaltyChecked: boolean = null;
  noPenaltyChecked: boolean = null;
  noVisionPenaltyChecked: boolean = null;

  comments: String = null;

  canLeave: boolean = null;

  constructor(public toastController: ToastController, public router: Router, public alertController: AlertController) { }

  ngOnInit() {
  }

  async saveCachedForm(){
    const alert = await this.alertController.create({
      header: 'Save Form?',
      message: 'Would you like to save this Form?',
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
            var obj = await this.assembleCachedForm();
            if(!this.canLeave){
              return false;
            }
            this.presentToast("Saving Form...");
            if(obj.matchNum == null){
              return false;
            }
            var filename = "forms/match_" + obj.matchNum + ".json";
            console.log(filename);
            try{
              const result = await Filesystem.writeFile({
                path: filename,
                data: JSON.stringify(obj),
                directory: FilesystemDirectory.Data,
                encoding: FilesystemEncoding.UTF8
              })
              console.log('Wrote file', result);
              this.clearAllCaches();
            }catch(e){
              this.presentToast('Unable to save results. Please try again.');
              console.error('Error saving cached form', e);
            }
            this.router.navigate(['/tabs/tab1']);
          }
        }
      ]
    });

    await alert.present();
  }

  clearAllCaches(){
    try{
      const result2 = Filesystem.deleteFile({
        path: 'tab2Cache.json',
        directory: FilesystemDirectory.Cache
      });
      console.log('Deleted file', result2);

      const result2b = Filesystem.deleteFile({
        path: 'tab2BCache.json',
        directory: FilesystemDirectory.Cache
      });
      console.log('Deleted file', result2b);

      const result2c = Filesystem.deleteFile({
        path: 'tab2CCache.json',
        directory: FilesystemDirectory.Cache
      });
      console.log('Deleted file', result2c);

      const result2d = Filesystem.deleteFile({
        path: 'tab2DCache.json',
        directory: FilesystemDirectory.Cache
      });
      console.log('Deleted file', result2d);

      const result2e = Filesystem.deleteFile({
        path: 'tab2ECache.json',
        directory: FilesystemDirectory.Cache
      });
      console.log('Deleted file', result2e);
    }catch(e){
      this.presentToast('Unable to delete all cached files. Please try again.');
      console.error('Error deleting caches', e);
    }
  }

  async assembleCachedForm(){
    var blank = {matchNum: null};
    this.saveJSON();
    if(!this.canLeave){
      return blank;
    }
    try{
      let contents = await Filesystem.readFile({
        path: 'tab2Cache.json',
        directory: FilesystemDirectory.Cache,
        encoding: FilesystemEncoding.UTF8
      });
      var tab2Cache = JSON.parse(contents.data);

      let contents2b = await Filesystem.readFile({
        path: 'tab2BCache.json',
        directory: FilesystemDirectory.Cache,
        encoding: FilesystemEncoding.UTF8
      });
      var tab2BCache = JSON.parse(contents2b.data);

      let contents2c = await Filesystem.readFile({
        path: 'tab2CCache.json',
        directory: FilesystemDirectory.Cache,
        encoding: FilesystemEncoding.UTF8
      });
      var tab2CCache = JSON.parse(contents2c.data);

      let contents2d = await Filesystem.readFile({
        path: 'tab2DCache.json',
        directory: FilesystemDirectory.Cache,
        encoding: FilesystemEncoding.UTF8
      });
      var tab2DCache = JSON.parse(contents2d.data);

      let contents2e = await Filesystem.readFile({
        path: 'tab2ECache.json',
        directory: FilesystemDirectory.Cache,
        encoding: FilesystemEncoding.UTF8
      });
      var tab2ECache = JSON.parse(contents2e.data);
    }catch(e){
      this.presentToast('Error loading Cached Data-- How did you even get this error?');
      console.error('Error loading tab2 Cache', e);
    }
    var thing = {
      regional: tab2Cache.regional,
      dateTime: tab2Cache.dateTime,
      teamName: tab2Cache.teamName,
      matchNum: tab2Cache.matchNum,
      position: tab2Cache.position,
      scouterName: tab2Cache.scouterName,
      autoBallsShot: tab2BCache.autoBallsShot,
      autoBallsScored: tab2BCache.autoBallsScored,
      autoPassedLine: tab2BCache.autoPassedLine,
      autoPortsChecked: tab2BCache.autoPortsChecked,
      telePortsChecked: tab2CCache.telePortsChecked,
      teleShootPositions: tab2CCache.teleShootPositions,
      teleBallsAttemptedUpper: tab2CCache.teleBallsAttemptedUpper,
      teleBallsScoredUpper: tab2CCache.teleBallsScoredUpper,
      teleBallsAttemptedBottom: tab2CCache.teleBallsAttemptedBottom,
      teleBallsScoredBottom: tab2CCache.teleBallsScoredBottom,
      teleIntakePositions: tab2CCache.teleIntakePositions,
      teleCPMethods: tab2CCache.teleCPMethods,
      climbed: tab2DCache.climbed,
      inRendezPoint: tab2DCache.inRendezPoint,
      climbSpeed: tab2DCache.climbSpeed,
      numBotsClimbed: tab2DCache.numBotsClimbed,
      sgBalanced: tab2DCache.sgBalanced,
      climbingPosition: tab2DCache.climbingPosition,
      issuesChecked: tab2ECache.issuesChecked,
      penaltiesChecked: tab2ECache.penaltiesChecked,
      comments: tab2ECache.comments
    }
    console.log(thing);
    return thing;
  }

  async saveJSON(){
    this.assembleArray();
    var obj = {
      issuesChecked: this.issuesChecked,
      penaltiesChecked: this.penaltiesChecked,
      comments: this.comments
    }
    console.log(obj);
    console.log(Object.values(obj));

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
          path: 'tab2ECache.json',
          data: JSON.stringify(obj),
          directory: FilesystemDirectory.Cache,
          encoding: FilesystemEncoding.UTF8
        });
        console.log('Wrote file', result);
      } catch(e){
        this.presentToast('An Error Occured');
        console.error('Unable to write file', e);
      }
    }
  }

  assembleArray(){
    this.canLeave = true;
    this.issuesChecked = [];
    if(this.noIssueChecked){
      this.issuesChecked.push("No Issues");
    }
    if(this.connectIssueChecked){
      this.issuesChecked.push("Connection Issues");
    }
    if(this.controlIssueChecked){
      this.issuesChecked.push("Control Issues");
    }
    if(this.tippedIssueChecked){
      this.issuesChecked.push("Tipped");
    }
    if(this.breakingIssueChecked){
      this.issuesChecked.push("Breaking Apart");
    }
    if(this.toasterIssueChecked){
      this.issuesChecked.push("Toaster");
    }
    if(this.brickIssueChecked){
      this.issuesChecked.push("Brick");
    }
    if(this.powerIssueChecked){
      this.issuesChecked.push("Power Issues");
    }
    if(this.otherIssueChecked){
      this.issuesChecked.push(this.otherIssue);
    }
    if(this.issuesChecked.length == 0){
      this.presentToast('Not all items have been filled in');
      this.canLeave = false;
      return false;
    }

    this.penaltiesChecked = [];
    if(this.yellowPenaltyChecked){
      this.penaltiesChecked.push("Yellow Card");
    }
    if(this.redPenaltyChecked){
      this.penaltiesChecked.push("Red Card");
    }
    if(this.foulPenaltyChecked){
      this.penaltiesChecked.push("Foul");
    }
    if(this.techPenaltyChecked){
      this.penaltiesChecked.push("Tech Foul");
    }
    if(this.noPenaltyChecked){
      this.penaltiesChecked.push("No Penalties");
    }
    if(this.noVisionPenaltyChecked){
      this.penaltiesChecked.push("Couldn't See");
    }
    if(this.penaltiesChecked.length == 0){
      this.presentToast('Not all items have been filled in');
      this.canLeave = false;
      return false;
    }
  }

  async loadJSON(){
    try{
      let contents = await Filesystem.readFile({
        path: 'tab2ECache.json',
        directory: FilesystemDirectory.Cache,
        encoding: FilesystemEncoding.UTF8
      });
      var obj = JSON.parse(contents.data);
      console.log(obj);
      this.comments = obj.comments;
      this.parseArray(obj);
    }catch(e){
      this.presentToast('Error loading Cached Data-- entries may not exist');
      console.error('Error loading Cached Data', e);
    }
  }

  async parseArray(obj: any){
    var issues: String[] = obj.issuesChecked;
    var possibleIssues: String[] = ["No Issues", "Connection Issues",
                                    "Control Issues", "Tipped", "Breaking Apart",
                                    "Toaster", "Brick", "Power Issues"];
    if(issues.includes("No Issues")){
      this.noIssueChecked = true;
    }
    if(issues.includes("Connection Issues")){
      this.connectIssueChecked = true;
    }
    if(issues.includes("Control Issues")){
      this.controlIssueChecked = true;
    }
    if(issues.includes("Tipped")){
      this.tippedIssueChecked = true;
    }
    if(issues.includes("Breaking Apart")){
      this.breakingIssueChecked = true;
    }
    if(issues.includes("Toaster")){
      this.toasterIssueChecked = true;
    }
    if(issues.includes("Brick")){
      this.brickIssueChecked = true;
    }
    if(issues.includes("Power Issues")){
      this.powerIssueChecked = true;
    }
    var otherBool = true;
    for(let item of possibleIssues){
      if(issues[issues.length-1] === item){
        otherBool = false;
        break;
      }
    }
    if(!otherBool){
      this.otherIssueChecked = false;
    }else{
      this.otherIssueChecked = true;
      this.otherIssue = issues[issues.length-1];
    }

    var penalties: String[] = obj.penaltiesChecked;
    if(penalties.includes("Yellow Card")){
      this.yellowPenaltyChecked = true;
    }
    if(penalties.includes("Red Card")){
      this.redPenaltyChecked = true;
    }
    if(penalties.includes("Foul")){
      this.foulPenaltyChecked = true;
    }
    if(penalties.includes("Tech Foul")){
      this.techPenaltyChecked = true;
    }
    if(penalties.includes("No Penalties")){
      this.noPenaltyChecked = true;
    }
    if(penalties.includes("Couldn't See")){
      this.noVisionPenaltyChecked = true;
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

  async canDeactivate(){
    await this.saveJSON();
    return this.canLeave;
  }

  ionViewDidEnter(){
    this.issuesChecked = [];
    this.noIssueChecked = null;
    this.connectIssueChecked = null;
    this.controlIssueChecked = null;
    this.tippedIssueChecked = null;
    this.breakingIssueChecked = null;
    this.toasterIssueChecked = null;
    this.brickIssueChecked = null;
    this.powerIssueChecked = null;
    this.otherIssueChecked = null;
    this.otherIssue = null;

    this.penaltiesChecked = [];
    this.yellowPenaltyChecked = null;
    this.redPenaltyChecked = null;
    this.foulPenaltyChecked = null;
    this.techPenaltyChecked = null;
    this.noPenaltyChecked = null;
    this.noVisionPenaltyChecked = null;

    this.comments = null;

    this.canLeave = null;
    this.loadJSON();
  }

}
