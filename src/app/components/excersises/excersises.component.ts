import { Component, OnInit } from '@angular/core';
import { RequiredValidator, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { GlobalService } from 'src/app/Services/global.service';
import { SetTrackerService } from 'src/app/Services/set-tracker.service';

@Component({
  selector: 'app-excersises',
  templateUrl: './excersises.component.html',
  styleUrls: ['./excersises.component.css']
})
export class ExcersisesComponent implements OnInit {
onEditClick(_t38: any) {
throw new Error('Method not implemented.');
}
onDeleteClick(_t38: any) {
throw new Error('Method not implemented.');
}
excerise: any[]=[];
movementType: any[]=[];
selectedType='';
SelectType='Select Type'
error=false;
  addNotClicked: boolean=true;
 exerciseForm:UntypedFormGroup;
  constructor(private fb:UntypedFormBuilder,private service:SetTrackerService,public globalService:GlobalService,private router:Router) { 
    this.exerciseForm = this.fb.group({  
      ex:['',new RequiredValidator], 
      workoutType:['',new RequiredValidator]
   });
  }

  ngOnInit(): void {
this.service.GetExercise().valueChanges().subscribe((res:any)=>{
  if(res.length>0){
    
    this.excerise=res;
  }

  // this.service.getMovementType().valueChanges().subscribe((res)=>{
  //   if(res.length>0){
  //     this.movementType=res;
  //   }
  // })
})
  }
  addClicked(){
    this.addNotClicked=!this.addNotClicked
  }

  onTypeChanged(type:string){
    this.SelectType=type;
    this.selectedType=type;
    this.exerciseForm.get('workoutType')?.patchValue(this.selectedType);
  }

  onSubmit(){
    if(this.exerciseForm.get('workoutType')?.value!='' && this.exerciseForm.get('ex')?.value!=''){
      this.excerise.push(this.exerciseForm.value)
    }
    else{
      this.error=true;
    }
  }

  onExerciseNameClicked(exName: string,workoutType:string) {
    this.globalService.Exercise=exName;
    this.globalService.WorkoutType=workoutType;
    this.router.navigate(['/analysis']);
    }
}
