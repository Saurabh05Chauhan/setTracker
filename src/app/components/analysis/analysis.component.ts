import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import { time } from 'console';
import { sortByProperty } from 'sort-by-property';
import { GlobalService } from 'src/app/Services/global.service';
import { SetTrackerService } from 'src/app/Services/set-tracker.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css'],
})
export class AnalysisComponent implements OnInit {
  addNotClicked: boolean = true;
  RecordForm: UntypedFormGroup;
  recordData: any;
  Todaydata: any[] = [];
  EarlierData: any[] = [];
  imgSrc='../../assets/plus.png';
  collapseTwo=true;
  collapseOne=false;
  constructor(
    private fb: UntypedFormBuilder,
    public globalService: GlobalService,
    private sTservice: SetTrackerService,
    public datepipe: DatePipe
  ) {
    this.RecordForm = this.fb.group({
      id: [''],
      Weight: [''],
      Reps: [''],
      time: [Date],
      date: [Date],
      exgroup: [''],
    });
  }

  ngOnInit(): void {
    this.sTservice
      .GetExerciseData()
      .valueChanges()
      .subscribe(
        (res: any) => {
          if (res.length > 0) {
            this.recordData = res;
            this.recordData.sort(
              (a: { time: string }, b: { time: string }) =>
                Date.parse(a.time) - Date.parse(b.time)
            );
            this.Todaydata = [];
            this.EarlierData = [];
            this.structureData();
          }

          // this.recordData.forEach((element:any) => {
          //  this.sTservice.updateAllExcerciseCombineData(element);
          // });
        },
        (err) => {},
        () => {}
      );

    //this.updateAllData();
  }

  public structureData() {
    var currentDateTime = this.datepipe
      .transform(new Date(), 'MM-dd-yyyy')
      ?.toString();
    this.recordData.forEach((element: any) => {
      if (element.date == currentDateTime) {
        this.Todaydata.push(element);
        this.Todaydata.sort(sortByProperty('time', 'desc'));
      } else {
        this.EarlierData.push(element);
        this.EarlierData.sort(sortByProperty('date', 'desc'));
      }
    });
  }

  // data() : FormArray {
  //   return this.RecordForm.get("RecordFormArr") as FormArray
  // }

  // newQuantity(): FormGroup {
  //   return this.fb.group({
  //     Weight: [''],
  //     Reps:[''],
  //     time: ['']
  //   })
  // }
  // get f():{ [key: string]: AbstractControl } {
  //   return this.CodeForm.controls; }

  addClicked() {
    this.addNotClicked = !this.addNotClicked;
    if(this.addNotClicked){
      this.imgSrc='../../assets/plus.png';
    }
    else{
      this.imgSrc="../../../assets/remove.png";
    }
  }

  onSubmit() {
    var currentDateTime = this.datepipe
      .transform(new Date(), 'MM-dd-yyyy_h:mm:ss')
      ?.toString();
    // this.RecordForm.controls['date'].patchValue(currentDateTime);
    this.RecordForm.controls['time'].patchValue(
      this.datepipe.transform(new Date(), 'h:mm:ss')?.toString()
    );
    this.RecordForm.controls['date'].patchValue(
      this.datepipe.transform(new Date(), 'MM-dd-yyyy')?.toString()
    );
    // this.RecordForm.controls['RecordFormdata'].patchValue(this.RecordFormArr.value);
    //var value=this.RecordForm.get('RecordFormArr')?.get('Weight')?.value;
    //this.data().push(this.newQuantity());
    // this.globalService.Folder="Chest";
    // this.globalService.Exercise="Incline bench Press"
    this.sTservice.AddExerciseData(this.RecordForm.value);
    this.clearForm();
  }

  onEditSubmit() {
    this.sTservice.EditExerciseData(this.RecordForm.value);
  }

  onCloseClick() {
    this.clearForm();
  }

  clearForm() {
    this.RecordForm.controls['id'].patchValue('');
    this.RecordForm.controls['time'].patchValue('');
    this.RecordForm.controls['date'].patchValue('');
    this.RecordForm.controls['Weight'].patchValue('');
    this.RecordForm.controls['Reps'].patchValue('');
  }

  onEditClick(x: any) {
    this.RecordForm.controls['id'].patchValue(x.id);
    this.RecordForm.controls['time'].patchValue(x.time);
    this.RecordForm.controls['date'].patchValue(x.date);
    this.RecordForm.controls['Weight'].patchValue(x.Weight);
    this.RecordForm.controls['Reps'].patchValue(x.Reps);
  }

  onDeleteClick(x: any) {
    this.sTservice.DeleteExerciseData(x);
  }

  updateAllData() {
    console.log(this.sTservice.updateAllExerciseValues());
  }
}
