import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Filesystem, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

@Component({
  selector: 'app-tab2b',
  templateUrl: './tab2b.page.html',
  styleUrls: ['./tab2b.page.scss'],
})
export class Tab2bPage implements OnInit {
  ballsShot: number = null;
  ballsScored: number = null;
  passedLine: boolean = null;
  portsChecked: String[] = [];
  bottomChecked: boolean = null;
  outerChecked: boolean = null;
  innerChecked: boolean = null;
  failedChecked: boolean = null;

  constructor(public toastController: ToastController) { }

  ngOnInit() {
  }

  async saveJSON(){
    try{
      let contents = await Filesystem.readFile({
        path: 'cache.json',
        directory: FilesystemDirectory.Cache,
        encoding: FilesystemEncoding.UTF8
      });
      var old = JSON.parse(contents.data);
    }catch(e){
      this.presentToast('Error loading Cached Data');
      console.error('Match Number not Present', e);
    }
    this.assembleArray();
    var obj = {
      dateTime: old.dateTime,
      teamName: old.teamName,
      matchNum: old.matchNum,
      position: old.position,
      scouterName: old.scouterName,
      ballsShot: this.ballsShot,
      ballsScored: this.ballsScored,
      passedLine: this.passedLine,
      portsChecked: this.portsChecked
    };
    console.log(obj);
    if(this.ballsShot == null){
      this.presentToast('Please input number of balls shot');
    }else if(this.ballsScored == null){
      this.presentToast('Please input number of balls scored');
    }else if(this.passedLine == null){
      this.presentToast('Please set if the bot has passed the initiation line');
    }else if(this.portsChecked == []){
      this.presentToast('Please check which ports the bot scored in');
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
    if(this.bottomChecked){
      this.portsChecked.push("Bottom Port");
    }
    if(this.outerChecked){
      this.portsChecked.push("Outer Port");
    }
    if(this.innerChecked){
      this.portsChecked.push("Inner Port");
    }
    if(this.failedChecked){
      this.portsChecked.push("Didn't Score");
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
      this.ballsShot = obj.ballsShot;
      this.ballsScored = obj.ballsScored;
      this.passedLine = obj.passedLine;
      this.parseArray(obj);
    }catch(e){
      this.presentToast('Error loading Cached Data-- entries may not exist');
      console.error('Match Number not Present', e);
    }
  }

  async parseArray(obj: any){
    var portsChecked: String[] = obj.portsChecked;
    if(portsChecked.includes("Bottom Port")){
      this.bottomChecked = true;
    }
    if(portsChecked.includes("Outer Port")){
      this.outerChecked = true;
    }
    if(portsChecked.includes("Inner Port")){
      this.innerChecked = true;
    }
    if(portsChecked.includes("Didn't Score")){
      this.failedChecked = true;
    }
  }

  ionViewWillLeave(){
    this.saveJSON();
  }

  ionViewDidEnter(){
    this.loadJSON();
  }

  async presentToast(m: String){
    const toast = await this.toastController.create({
      message: m.toString(),
      duration: 1000,
    });
    toast.present();
  }

  initLineChange(event){
    console.log(event.detail.value);
  }
}
