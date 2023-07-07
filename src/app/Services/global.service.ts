import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  get Folder():any{
    return  localStorage.getItem('folder');
  }
  set Folder(folderName:string){
     localStorage.setItem('folder',folderName.toString())
  }

  get Exercise():any{
    return  localStorage.getItem('exercise');
  }
  set Exercise(exercise:string){
     localStorage.setItem('exercise',exercise.toString())
  }
}
