import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection,Query} from '@angular/fire/compat/firestore'
import { GlobalService } from './global.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SetTrackerService {
  constructor(
    private afs: AngularFirestore,
    private globalService: GlobalService,
    public datepipe: DatePipe
  ) {}

  AddFolder(foldername: string) {
    this.afs
      .collection('Folder', (ref) => ref.where('foldername', '==', foldername))
      .get()
      .subscribe((res) => {
        if (res.docs.length <= 0) {
          this.afs.collection('/Folder').add({ foldername });
        }
      });
  }

  GetFolder() {
    return this.afs.collection('/Folder');
  }

  AddExercise(foldername: string, ex: string, workoutType: string) {
    this.afs
      .collection(
        'Exercise/' + foldername + '/' + foldername + 'Excercises',
        (ref) => ref.where('ex', '==', ex)
      )
      .get()
      .subscribe((res) => {
        if (res.docs.length <= 0) {
          this.afs
            .collection('/Exercise')
            .doc(foldername)
            .collection(foldername + 'Excercises')
            .add({ ex, workoutType })
            .catch((err) => {
              alert(err.message);
            });
        }
      });
  }

  GetExercise() {
    var folder = this.globalService.Folder;
    return this.afs
      .collection('/Exercise')
      .doc(folder)
      .collection(folder + 'Excercises');
  }
  GetExerciseusingFolder(folder:string) {
    //var folder = this.globalService.Folder;
    return this.afs
      .collection('/Exercise')
      .doc(folder)
      .collection(folder + 'Excercises');
  }
  AddExerciseData(data: any) {
    var folder = this.globalService.Folder;
    var exercise = this.globalService.Exercise;
    var workoutType = this.globalService.WorkoutType;
    this.AddFolder(folder);

    this.AddExercise(folder, exercise, workoutType);

    data.id = this.afs.createId();
    data.exgroup = workoutType;
    data.exercise = exercise;
    this.afs
      .collection('mySetTrackerData')
      .doc('/' + folder)
      .collection('/' + exercise)
      .doc(data.id)
      .set(data)
      .catch((err) => {
        alert(err.message);
      });

    return this.updateAllExcerciseCombineData(data);
  }

  getMovementType() {
    return this.afs.collection('/workoutType');
  }

  EditExerciseData(data: any) {
    var folder = this.globalService.Folder;
    var exercise = this.globalService.Exercise;
    return this.afs
      .collection('mySetTrackerData')
      .doc('/' + folder)
      .collection('/' + exercise)
      .doc(data.id)
      .update(data)
      .catch((err) => {
        alert('No Update Found');
      });
  }

  DeleteExerciseData(data: any) {
    var folder = this.globalService.Folder;
    var exercise = this.globalService.Exercise;
    this.afs
      .collection('mySetTrackerData')
      .doc('/' + folder)
      .collection('/' + exercise)
      .doc(data.id)
      .delete()
      .catch((err) => {
        alert(err.message);
      });
  }

  GetExerciseData(): AngularFirestoreCollection<any> {
    var folder = this.globalService.Folder;
    var exercise = this.globalService.Exercise;
    return this.afs
      .collection('/mySetTrackerData')
      .doc(folder)
      .collection(exercise);
  }

  async updateAllExerciseValues() {
    var folder = this.globalService.Folder;
    var exercise = this.globalService.Exercise;
    //var getType=await this.GetexGroup(folder);
    var response: any;
    this.afs
      .collection('/mySetTrackerData')
      .doc(folder)
      .collection(exercise)
      .valueChanges()
      .subscribe((res: any) => {
        response = res;

        response.forEach((data: any) => {
          data.exercise = exercise;
          this.afs
            .collection('mySetTrackerData')
            .doc('/' + folder)
            .collection('/' + exercise)
            .doc(data.id)
            .update(data)
            .catch((err) => {
              alert('No Update Found');
            });
        });
      });
    if (response != null || response != undefined) {
    }
  }

  updateAllExcerciseCombineData(data: any) {
    var newdata = {
      date: data.date,
      time: data.time,
      exercise: data.exercise,
      exgroup: data.exgroup,
      folder: this.globalService.Folder,
      id: data.id,
    };
    return this.afs
      .collection('/AllExerciseCombineData', (ref) =>
        ref.where('id', '==', data.id)
      )
      .get()
      .subscribe((res) => {
        if (res.docs.length <= 0) {
          // No existing document found — safe to add
          return this.afs
            .collection('/AllExerciseCombineData')
            .add(newdata)
            .then(() => {
              console.log('Exercise added');
            });
        } else {
          // ID already exists — skip or handle as needed
          console.warn('Exercise with same ID already exists');
          return Promise.resolve(); // or throw error if you want
        }
      });
    /// return this.afs.collection('/AllExerciseCombineData').add(newdata);
  }

  GetexGroup(folder: string) {
    this.afs
      .collection('/Exercise')
      .doc(folder)
      .collection(folder + 'Excercises')
      .valueChanges()
      .subscribe((res: any) => {
        return res[0].workoutType;
      });
  }

  getAllData() {
    return this.afs.collection('/AllExerciseCombineData');
  }

  getExerciseUsingID(data:any){
    return this.afs
      .collection('/mySetTrackerData')
      .doc(data.folder)
      .collection(data.exercise).doc(data.id);
  }
}


