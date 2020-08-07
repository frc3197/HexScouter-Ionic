import { Component, OnInit } from '@angular/core';
import { Filesystem, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { ToastController } from '@ionic/angular';

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

  constructor(public toastController: ToastController) { }

  ngOnInit() {
  }

  async saveCachedForm(){
    var obj = await this.assembleCachedForm();
    var filename = "Match_" + obj.matchNum + ".json";
    try{
      const result = await Filesystem.writeFile({
        path: filename,
        data: JSON.stringify(obj),
        directory: FilesystemDirectory.Data,
        encoding: FilesystemEncoding.UTF8
      })
    }catch(e){

    }
  }

  async assembleCachedForm(){
    //TODO: Finish after confirming all saveJSON() and loadJSON() functions work
    try{
      let contents = await Filesystem.readFile({
        path: 'tab2Cache.json',
        directory: FilesystemDirectory.Cache,
        encoding: FilesystemEncoding.UTF8
      });
      var tab2Cache = JSON.parse(contents.data);
    }catch(e){
      this.presentToast('Error loading Cached Data-- Page 1 may not have completed entries');
      console.error('Error loading tab2 Cache', e);
    }
    var thing = {
      matchNum: tab2Cache.matchNum
    }
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

    var pass = true;
    for(let item of Object.values(obj)){
      if(item == null || [] || ""){
        this.presentToast('Not all items in previous page have been filled in');
        pass = false;
        break;
      }
    }

    if(pass){
      try {
        const result = await Filesystem.writeFile({
          path: 'tab2ECache.json',
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

  assembleArray(){
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
    if(issues.includes("Yellow Card")){
      this.yellowPenaltyChecked = true;
    }
    if(issues.includes("Red Card")){
      this.redPenaltyChecked = true;
    }
    if(issues.includes("Foul")){
      this.foulPenaltyChecked = true;
    }
    if(issues.includes("Tech Foul")){
      this.techPenaltyChecked = true;
    }
    if(issues.includes("No Penalties")){
      this.noPenaltyChecked = true;
    }
    if(issues.includes("Couldn't See")){
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

  ionViewWillLeave(){
    this.saveJSON();
  }

  ionViewDidEnter(){
    this.loadJSON();
  }

}
