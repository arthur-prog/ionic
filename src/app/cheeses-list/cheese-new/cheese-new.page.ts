import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {Cheese} from 'src/app/models/cheese.model';
import {CheeseService} from 'src/app/cheese.service';
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import firebase from "firebase";
import {from, Observable} from "rxjs";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-cheese-new',
  templateUrl: './cheese-new.page.html',
  styleUrls: ['./cheese-new.page.scss'],
})
export class CheeseNewPage implements OnInit {
  public cheese!: Cheese;

  constructor(
    private Cheese: CheeseService,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.cheese = new Cheese();
  }

  async presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Nouveau Fromage enregistré',
      duration: 2000
    });
    (await toast).present().then(() => {
      setTimeout(() => {
        this.router.navigate(['/tabs/cheeses']);
      }, 2000);
    });
  }


  add() {
    this.Cheese.saveNewCheese(this.cheese).subscribe(() => {
      this.cheese = new Cheese();
      this.presentToast();
    })
  }


  //photo
  async takePhoto() {
    console.log('la camera s\'active');
    const options = {
      quality: 100,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      saveToGallery: false
    };

    const imageData = await Camera.getPhoto(options);

    this.cheese.cheeseImg = await this.uploadBase64('photos', 'image.jpg', imageData.dataUrl!).toPromise();
  }

  uploadBase64(folder: string, name: string, base64: string) {
    console.log('stockage de la photo dans le firestorage');
    const path = `${folder}/${Date.now()}_${name}`;
    const ref = firebase.storage().ref(path);

    const task = ref.putString(base64, 'data_url');
    return this.getDownloadUrl(task, ref);
  }

  private getDownloadUrl(uploadTask: firebase.storage.UploadTask, ref: firebase.storage.Reference): Observable<string> {
    return from(uploadTask).pipe(switchMap(() => ref.getDownloadURL()));
  }

}
