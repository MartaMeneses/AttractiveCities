import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})

export class LinkService {

  private selectedReportViaButton = new BehaviorSubject<City[]>([]);

  public currentPageName = new BehaviorSubject<string>('');

  emitReportEvent(cityList: City[]){
    this.selectedReportViaButton.next(cityList)
  }

/*
  emitCourseEvent(courseName: string){
    console.log("emit", courseName)
    this.selectedAssignmentViaButton.next(courseName)
  }

  courseEventListner(){
    console.log("return to service")
    return this.selectedCourseViaButton.asObservable();
  } */
  constructor() { }

}
