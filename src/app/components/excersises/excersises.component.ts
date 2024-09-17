import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
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




  addNotClicked: boolean=true;
 exerciseForm:UntypedFormGroup;
  constructor(private fb:UntypedFormBuilder,private service:SetTrackerService,public globalService:GlobalService,private router:Router) { 
    this.exerciseForm = this.fb.group({  
      ex:[''], 
   });
  }

  ngOnInit(): void {
this.service.GetExercise().valueChanges().subscribe((res:any)=>{
  if(res.length>0){
    
    this.excerise=res;
  }
})
  }
  addClicked(){
    this.addNotClicked=!this.addNotClicked
  }

  onSubmit(){
    this.excerise.push(this.exerciseForm.value)
  }

  onExerciseNameClicked(exName: string) {
    this.globalService.Exercise=exName;
this.router.navigate(['/analysis']);
    }
}
