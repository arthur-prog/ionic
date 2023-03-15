import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import { AngularFirestore,AngularFirestoreCollection } from "@angular/fire/firestore";
import {Cheese} from "./models/cheese.model";
import {map} from "rxjs/operators";
import {connectableObservableDescriptor} from "rxjs/internal/observable/ConnectableObservable";

@Injectable({
  providedIn: 'root'
})
export class CheeseService {
  private dbPath = '/cheeses';
  cheesesRef: AngularFirestoreCollection<Cheese>;

  private cheeses?: any;
  cheeseSubject = new Subject<any[]>();

  constructor(
    private  db: AngularFirestore
  ) {
    this.cheesesRef = db.collection(this.dbPath);
  }

  getAllCheeses(): any {
    return this.cheesesRef.snapshotChanges().pipe(
      map((changes:any) => {
        return changes.map((doc:any) => {
          return ({id: doc.payload.doc.id, ...doc.payload.doc.data()})
        })
      })
    );
  }

  getCheesesBy(milk: string, dpt: string): any {
    if (dpt == '' && milk == ''){
      return this.getAllCheeses()
    } else if (dpt == ''){
      return this.db.collection(this.dbPath, ref => ref.where('milk', '==', milk)).valueChanges()
        .pipe(
          map((cheeses:any) => {
            return cheeses.map((doc:any) => {
              return ({id: doc.id, ...doc})
            })
          })
        );
    } else if(milk == ''){
      return this.db.collection(this.dbPath, ref => ref.where('dpt', '==', dpt)).valueChanges()
        .pipe(
          map((cheeses:any) => {
            return cheeses.map((doc:any) => {
              return ({id: doc.id, ...doc})
            })
          })
        );
    } else {
      return this.db.collection(this.dbPath, ref => ref.where('dpt', '==', dpt).where('milk', '==', milk)).valueChanges()
        .pipe(
          map((cheeses:any) => {
            return cheeses.map((doc:any) => {
              return ({id: doc.id, ...doc})
            })
          })
        );
    }

  }

  saveNewCheese(cheese: Cheese): any {
    return new Observable(obs => {
      this.cheesesRef.add({...cheese}).then(() => {
        obs.next();
      })
    })
  }

  get(id: any): any {
    return new Observable(obs => {
      this.cheesesRef.doc(id).get().subscribe(res => {
        obs.next({id: res.id, ...res.data()});
      });
    });
  }

  update(cheese: Cheese) {
    return new Observable(obs => {
      this.cheesesRef.doc(cheese.id).update(cheese);
      obs.next();
    });
  }

  delete(id: any){
    this.db.doc(`cheeses/${id}`).delete();
  }


}
