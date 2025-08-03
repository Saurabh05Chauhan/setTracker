import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor, MonthViewDay } from 'calendar-utils';
import { Observable, Subject } from 'rxjs';
import { SetTrackerService } from 'src/app/Services/set-tracker.service';
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  constructor(private sTservice:SetTrackerService) { }
  viewDate: Date = new Date();
  //events: CalendarEvent[] = [];
  refresh: Subject<void> = new Subject();
  view: CalendarView = CalendarView.Month;
  scrollDirection: 'up' | 'down' | null = null;
  lastScrollTop = 0;
  recordData:any;
  activeDayIsOpen: boolean = true;
  events: CalendarEvent[] = [];
  isLoaded=false;
  selectedDate: Date | null = null;
  selectedDayEvents:any;
  showEventCard=false;
  //events$: Observable<CalendarEvent[]> | undefined;
  COLOR_CODES: {
  LEGS: '#28a745';
  PUSH: '#007bff';
  PULL: '#6c757d';
  Default: '#fff5d6';
} = {
  LEGS: '#28a745',
  PUSH: '#007bff',
  PULL: '#6c757d',
  Default: '#fff5d6'
};
  ngOnInit(): void {

    this.getData();

    // this.recordData.forEach(element => {
    //   if(element.)
    // });
    // if(this.recordData.)
  }

  getData(){
    const updatedEvents: CalendarEvent[] = [];
    this.sTservice.getAllData().valueChanges().subscribe((res:any)=>{
      if(res.length>0){
        this.recordData=res;
        console.log(this.recordData);
        this.recordData.forEach((element:any) => {
          const combinedDate = this.getValidDate(element.date, element.time);
          const normalizedStart = combinedDate ? this.normalizeToMidnight(combinedDate) : null;
//const combinedDateTime = new Date(`${isoDate}T${rawTime}:00`);
          //console.log(combinedDate);
          if (normalizedStart) {
          updatedEvents.push({
            start:normalizedStart,
            title:element.exercise+" "+element.time,
            color:{ primary: this.getColor(element.exgroup.toUpperCase())|| '', secondary:'#f5f5f5'},
            meta: {
                id: element.id,
                time: element.time,
                folder: element.folder,
                exercise: element.exercise
              }
          });

          this.events=[];
          this.events = updatedEvents;
          this.isLoaded=true;
        }
        });
        //this.recordData.sort((a: { time: string; }, b: { time: string; }) => Date.parse(a.time) - Date.parse(b.time))
      }

      //console.log(this.events);
    },err=>{

    },()=>{

    })
  }

  // fetchEvents(): void {
  //   const getStart: any = {
  //     // month: startOfMonth,
  //     // week: startOfWeek,
  //     // day: startOfDay,
  //   }[this.view];

 normalizeToMidnight(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


  getValidDate(dateStr: string, timeStr: string): Date | null {
  const [month, day, year] = dateStr.split("-").map(Number);
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);

  if (!month || !day || !year || hours === undefined || minutes === undefined || seconds === undefined) {
    return null;
  }

  return new Date(year, month - 1, day, hours, minutes, seconds);
}

// onScroll(event: any): void {
//     const scrollTop = event.target.scrollTop;

//     if (scrollTop > this.lastScrollTop) {
//       // Scrolling down
//       this.scrollDirection = 'down';
//       this.viewDate = new Date(
//         this.viewDate.getFullYear(),
//         this.viewDate.getMonth() + 1,
//         1
//       );
//     } else {
//       // Scrolling up
//       this.scrollDirection = 'up';
//       this.viewDate = new Date(
//         this.viewDate.getFullYear(),
//         this.viewDate.getMonth() - 1,
//         1
//       );
//     }

//     this.lastScrollTop = scrollTop;
//     this.refresh.next(); // Optional: trigger view refresh
//   }


  getColor(exGroup:string){
    switch (exGroup) {
            case "LEGS":
              return this.COLOR_CODES.LEGS;
            case "PULL":
              return this.COLOR_CODES.PULL;
            case "PUSH":
              return this.COLOR_CODES.PUSH;
            default:
              return this.COLOR_CODES.Default;
          }
  }

 dayClicked(day: { date: Date; events: CalendarEvent[] }): void {
  //this.selectedDate = day.date;
  const sameMonth = day.date.getMonth() === this.viewDate.getMonth();

  if (!sameMonth) {
    return; // Only respond to clicks in the same month
  }

  if (
    (this.viewDate.getDate() === day.date.getDate() &&
      this.activeDayIsOpen === true)
    || day.events.length === 0
  ) {
    this.activeDayIsOpen = false;
  } else {
    this.viewDate = day.date;
    // this.selectedDayEvents = day.events;
    this.activeDayIsOpen = true;
  }
}
    eventClicked(arg:any){
      this.sTservice.getExerciseUsingID(arg.meta).valueChanges().subscribe((res:any)=>{
        this.selectedDayEvents=res;
        this.showEventCard=true;
      })
    };

    closeClicked(){
      this.showEventCard=false;
    }

}
