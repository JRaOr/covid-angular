import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CVcases } from './cases';
import { Countries } from './countries';
import { CovidService } from './dashboard.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit,OnDestroy {
  sub! : Subscription ;
  subcontinent !: Subscription;
  continents: Countries[] = [];
  constructor(private covidService: CovidService) { }
  cases: CVcases = {
    confirmed: 0,
    deaths:0,
    recovered: 0
  };
  ngOnInit(): void {
    this.sub = this.covidService.getCases().subscribe({
      next: cases=>{
        this.cases = cases
      },
      error: err => console.error(err)
    })
    this.subcontinent = this.covidService.getContinents().subscribe({
      next: continents=>{
        console.log(continents)
        this.continents = continents;
      }
    })
  }
  ngOnDestroy(): void{
    this.sub.unsubscribe()
    this.subcontinent.unsubscribe()
  }
}
