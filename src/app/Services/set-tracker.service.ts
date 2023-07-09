import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection,Query} from '@angular/fire/compat/firestore'
import { GlobalService } from './global.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SetTrackerService {

  constructor(private afs:AngularFirestore,private globalService:GlobalService,public datepipe: DatePipe) { }

  AddFolder(foldername:string){
    this.afs.collection('Folder',ref=>ref.where('foldername','==',foldername)).get().subscribe(res=>{
      
      if(res.docs.length<=0){
        
        this.afs.collection('/Folder').add({foldername})
      }
    })
  }

  GetFolder(){
    return this.afs.collection('/Folder');
  }

  AddExercise(foldername:string,ex:string){
    this.afs.collection('Exercise',ref=>ref.where('ex','==',ex)).get().subscribe(res=>{
      
      if(res.docs.length<=0){
        
        this.afs.collection('/Exercise').doc(foldername).collection(foldername+'Excercises').add({ex}).catch((err)=>{
          alert(err.message)
        });
      }
    })
  }

  GetExercise(){
    
    var folder=this.globalService.Folder;
    return this.afs.collection('/Exercise').doc(folder).collection(folder+'Excercises');
  }
  AddExerciseData(data:any){
    
    var folder=this.globalService.Folder;
    var exercise=this.globalService.Exercise;
    this.AddFolder(folder);

    this.AddExercise(folder,exercise);

    data.id=this.afs.createId();
    return this.afs.collection('mySetTrackerData').doc('/'+folder).collection("/"+exercise).doc(data.id).set(data).catch((err)=>{
      alert(err.message)
    });

    
  }

  EditExerciseData(data:any){
    var folder=this.globalService.Folder;
    var exercise=this.globalService.Exercise;
    return this.afs.collection('mySetTrackerData').doc('/'+folder).collection("/"+exercise).doc(data.id).update(data).catch((err)=>{
      alert("No Update Found")
    })
  }

  DeleteExerciseData(data:any){
    var folder=this.globalService.Folder;
    var exercise=this.globalService.Exercise;
    this.afs.collection('mySetTrackerData').doc('/'+folder).collection("/"+exercise).doc(data.id).delete().catch((err)=>{
      alert(err.message)
    });
  }

  GetExerciseData():AngularFirestoreCollection<any>{
    
    var folder=this.globalService.Folder;
    var exercise=this.globalService.Exercise;
    return this.afs.collection('/mySetTrackerData').doc(folder).collection(exercise);
   }
}
