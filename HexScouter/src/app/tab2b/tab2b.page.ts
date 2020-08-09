import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Filesystem, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

@Component({
  selector: 'app-tab2b',
  templateUrl: './tab2b.page.html',
  styleUrls: ['./tab2b.page.scss'],
})
export class Tab2bPage implements OnInit {
  autoBallsShot: number = null;
  autoBallsScored: number = null;
  autoPassedLine: boolean = null;
  
  autoPortsChecked: String[] = [];
  bottomChecked: boolean = null;
  outerChecked: boolean = null;
  innerChecked: boolean = null;
  failedChecked: boolean = null;

  canLeave: boolean = null;

  constructor(public toastController: ToastController) { }

  ngOnInit() {
  }

  async saveJSON(){
    this.assembleArray();
    var obj = {
      autoBallsShot: this.autoBallsShot,
      autoBallsScored: this.autoBallsScored,
      autoPassedLine: this.autoPassedLine,
      autoPortsChecked: this.autoPortsChecked
    };
    console.log(obj);

    if(!this.canLeave){

    }else{
      this.canLeave = true;
    }
    for(let item of Object.values(obj)){
      console.log(item);
      if(item == null){
        this.presentToast('Not all items in previous page have been filled in');
        this.canLeave = false;
        break;
      }
    }

    if(this.canLeave){
      try {
        const result = await Filesystem.writeFile({
          path: 'tab2BCache.json',
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
    this.canLeave = true;
    this.autoPortsChecked = [];
    if(this.bottomChecked){
      this.autoPortsChecked.push("Bottom Port");
    }
    if(this.outerChecked){
      this.autoPortsChecked.push("Outer Port");
    }
    if(this.innerChecked){
      this.autoPortsChecked.push("Inner Port");
    }
    if(this.failedChecked){
      this.autoPortsChecked.push("Didn't Score");
    }
    if(this.autoPortsChecked.length == 0){
      this.presentToast('Not all items have been filled in');
      this.canLeave = false;
    }
  }

  async loadJSON(){
    try{
      let contents = await Filesystem.readFile({
        path: 'tab2BCache.json',
        directory: FilesystemDirectory.Cache,
        encoding: FilesystemEncoding.UTF8
      });
      var obj = JSON.parse(contents.data);
      console.log(obj);
      this.autoBallsShot = obj.autoBallsShot;
      this.autoBallsScored = obj.autoBallsScored;
      this.autoPassedLine = obj.autoPassedLine;
      this.parseArray(obj);
    }catch(e){
      this.presentToast('Error loading Cached Data-- entries may not exist');
      console.error('Match Number not Present', e);
    }
  }

  async parseArray(obj: any){
    console.log("parseArray obj");
    console.log(obj);
    var portsChecked: String[] = obj.autoPortsChecked;
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

  // ionViewWillLeave(){
  //   this.saveJSON();
  // }

  ionViewDidEnter(){
    this.loadJSON();
  }

  async canDeactivate(){
    await this.saveJSON();
    console.log("please work");
    return this.canLeave;
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
