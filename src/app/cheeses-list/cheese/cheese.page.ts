import {Component, OnInit} from '@angular/core';
import {AlertController, ToastController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {CheeseService} from "../../cheese.service";
import {Cheese} from "../../models/cheese.model";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import firebase from "firebase";
import {from, Observable} from "rxjs";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-cheese',
  templateUrl: './cheese.page.html',
  styleUrls: ['./cheese.page.scss'],
})
export class CheesePage implements OnInit {
  modif: boolean = false;
  cheese: Cheese | null = null;
  constructor(
    private  alertCtrl: AlertController,
    private route: ActivatedRoute,
    private Cheese: CheeseService,
    private router: Router,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.Cheese.get(id!).subscribe((data: any) => {
      this.cheese = data;
    });
  }

  async setModif(){
    if(!this.modif){
      const alert = await this.alertCtrl.create({
        header: "Etes vous sur de vouloir modifier?",
        subHeader: "Vous rendrez possible la modification",
        buttons: [
          {
            text: 'Annuler',
            role: 'Cancel'
          },
          {
            text: 'Confirmer',
            handler: () => this.modif = !this.modif
          }
        ]
      });
      await alert.present();
      await alert.onDidDismiss();
    } else {
      this.modif = !this.modif;
    }
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Fromage modifié avec succès',
      duration: 2000
    });
    await toast.present();
  }

  onModif(){
    this.Cheese.update(this.cheese!).subscribe(() => {
      this.presentToast();
      this.modif = false;
    });
  }

  onDelete(id: any){
    this.Cheese.delete(id);
    this.router.navigate(['/tab/cheeses']);
  }

  async takePhoto() {
    console.log('la camera s\'active');
    const options = {
      quality: 100,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      saveToGallery: false
    };

    const imageData = await Camera.getPhoto(options);

    this.cheese!.cheeseImg = await this.uploadBase64('photos', 'image.jpg', imageData.dataUrl!).toPromise();
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
