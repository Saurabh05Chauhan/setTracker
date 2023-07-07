import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/Services/global.service';
import { SetTrackerService } from 'src/app/Services/set-tracker.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  folderNameForm: FormGroup;
 folder:any
  constructor(private fb:FormBuilder, private service:SetTrackerService,private globalService:GlobalService,private router : Router) { 
    this.folderNameForm = this.fb.group({  
      foldername:[''], 
   });
  }

  addNotClicked:boolean=true;
  ngOnInit(): void {
    this.service.GetFolder().valueChanges().subscribe((res:any)=>{
      debugger
if(res.length>0){
this.folder=res;
}
    })
  }

  onSubmit(){
    debugger
    this.folder.push(this.folderNameForm.value)
    console.log(this.folderNameForm.value)
  }

addClicked(){
  this.addNotClicked=!this.addNotClicked
}

onFolderNameClicked(folder:string){
this.globalService.Folder=folder;
this.router.navigate(['/exercises']);
}

}
