import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SetTrackerService } from 'src/app/Services/set-tracker.service';

@Component({
  selector: 'app-openai-analysis',
  templateUrl: './openai-analysis.component.html',
  styleUrls: ['./openai-analysis.component.css']
})
export class OpenaiAnalysisComponent implements OnInit {

  constructor(private http:HttpClient, private service: SetTrackerService,) { }
  exerciseData: string = '';
  analysis: string = '';
  error: string = '';
  folders:any;
  selectedFolder='';
  exercises:any;
  isDisable=true;
  selectedExercise='';
  ngOnInit(): void {
    this.getAllFolder();
    //this.analyzeExercise();
  }

  getAllFolder(){
    this.service.GetFolder().valueChanges().subscribe((res)=>{
      this.folders=res;
    })
  }

  getExercise(){
    this.service.GetExerciseusingFolder(this.selectedFolder).valueChanges().subscribe((res)=>{
      this.exercises=res;
    })
  }

  analyzeExercise() {
    this.analysis = '';
    this.error = '';
    const apiKey = environment.OPENAI_API_KEY;;
    const payload = {
      exerciseData: this.exerciseData,
    };

    this.http.post<any>('/.netlify/functions/openai-analyze', payload)
      .subscribe({
        next: (res) => {
          this.analysis = res.reply;
        },
        error: (err) => {
          this.error = err?.error?.error || 'Something went wrong.';
        },
      });
  }

  handleFolderChange(event:any){
    this.selectedFolder=event.target.value;
    this.getExercise();
    this.isDisable=false;
  }

  handleExerciseChange(event:any){
    this.selectedExercise=event.target.value;
  }

  onbtnAnalyzeClick(){
    
  }

}
