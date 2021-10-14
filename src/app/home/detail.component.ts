import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CNFormatedCases, CNDateFormatedCases } from './formateddetail';
import { CovidByCountryService } from './detail.service';

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {
  sub !: Subscription;
  filteredCases : CNDateFormatedCases[] = [];
  temp_cases: CNDateFormatedCases[] = [];
  gottenCases: CNDateFormatedCases[] = [];
  paginatedCases: CNDateFormatedCases[] = [];
  today: string = '';
  paginationRange: number  = 25;
  pages: number[] = [];
  page: number = 1;
  searchedDate !: CNDateFormatedCases;
  todayDate: Date = new Date();
  todayISOString : string = new Date().toISOString().split('T')[0];
  private _date : string = '2021-01-22'
  private _date_min : string = '2020-01-22'
  private _date_max : string = new Date().toISOString().split('T')[0];

  constructor(private countryCovidService: CovidByCountryService, private route: ActivatedRoute) { }
  get dateSelected(): string{
    return this._date
  }
  set dateSelected(value: string){
    console.log(value)
    this._date = value
    var temp_date = value.split('-')
    console.log(temp_date)
    this.filterByDate(parseInt(temp_date[1]).toString() + '/' + parseInt(temp_date[2]).toString() + '/' + temp_date[0][2] + temp_date[0][3])
  }

  // Period Date Min

  get periodDateMin(): string{
    return this._date_min
  }
  set periodDateMin(value: string){
    console.log(value)
    this._date_min = value
    this.filterByPeriod()
  }
  
  // Period Date Max

  get periodDateMax(): string{
    return this._date_max
  }
  set periodDateMax(value: string){
    console.log(value)
    this._date_max = value
    this.filterByPeriod()
  }
  ngOnInit(): void {
    this.todayDate.setDate(this.todayDate.getDate() - 1)
    this.todayISOString = this.todayDate.toISOString().split('T')[0]
    this._date_max = this.todayDate.toISOString().split('T')[0]
    this.sub = this.countryCovidService.getCases(String(this.route.snapshot.paramMap.get('id'))).subscribe({
      next: cases => {
        console.log(cases.length)
        if(cases.length === 1){
          this.temp_cases = [];
          Object.entries(cases[0].timeseries).forEach(date=>{
            this.gottenCases.push({
              'date': date[0],
              'confirmed': date[1].confirmed,
              'deaths': date[1].deaths,
              'recovered': date[1].recovered,
            })
        })}
        this.filteredCases = this.gottenCases;
        this.changeFn({value: 25});
      },
      error: err => console.error(err)
    })
  }

  filterByDate(key: string):void{
    console.log('Filtering by: ', key);
    this.gottenCases.forEach(element=>{
      if(element.date === key){
        this.searchedDate =  element
      }
    })
  }

  filterByPeriod(){
    this.filteredCases = [];
    var temp_start = this._date_min.split('-')
    var temp_end = this._date_max.split('-')
    var start = (parseInt(temp_start[1]).toString() + '/' + parseInt(temp_start[2]).toString() + '/' + temp_start[0][2] + temp_start[0][3])
    var end = (parseInt(temp_end[1]).toString() + '/' + parseInt(temp_end[2]).toString() + '/' + temp_end[0][2] + temp_end[0][3])
    console.log('Filtering by period: ', start,'-', end)
    
    var start_founded = false;
    var end_founded = false
    this.gottenCases.forEach((element, index)=>{
      if(start_founded){
        if(!end_founded){
          if(element.date === end){
            end_founded = true
          }
          this.filteredCases.push(element)
        }
      }else{
        if(element.date === start){
          this.filteredCases.push(element)
          start_founded = true
        }
      }
    })
    console.log(this.filteredCases)
    this.changeFn({value: this.paginationRange});
    this.paginateElements()
  }

  changeFn(value: any){
    this.paginationRange = value.value
    this.pages = []
    for (let index = 1; index < (this.filteredCases.length / this.paginationRange); index++) {
      this.pages.push(index)
    }
    if(this.pages[this.pages.length - 1] < (this.filteredCases.length / this.paginationRange)){
      console.log('Si es mas pequeno')
      console.log(this.pages[this.pages.length - 1])
      this.pages.push(this.pages[this.pages.length - 1] + 1)
    }
    console.log(this.pages, this.page)
    this.paginateElements()
  }
  paginateElements(): void{
    this.paginatedCases = []
    for (let index = (this.page - 1) * this.paginationRange; index < (this.page - 1) * this.paginationRange + this.paginationRange; index++) {
      if(index < this.filteredCases.length)
        this.paginatedCases.push(this.filteredCases[index])
    }
    console.log(this.paginatedCases)
  }
  changePage(value: any): void{
    this.page = value.id;
    this.paginateElements()
  }

}
