import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CNCases } from './casescountries';
import { CovidCountryService } from './home.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  sub !: Subscription;
  filteredCases: CNCases[] = [];
  paginatedCases: CNCases[] = [];
  paginationRange: number = 10;
  casesGotten: CNCases[] = [];
  pages: number[] =[];
  page: number = 1;
  private _countryFilter: string ='';

  get countryFilter(): string{
    return this._countryFilter;
  }
  set countryFilter(value: string){
      this._countryFilter = value;
      this.filterCountry(value)
  }
  constructor(private countryCovidService: CovidCountryService) { }

  ngOnInit(): void {
    this.sub = this.countryCovidService.getCases().subscribe({
      next: cases => {
        cases.forEach(element=>{
          Object.assign(element, {image: 'https://www.countryflags.io/' + element.countrycode?.iso2.toLocaleLowerCase() + '/flat/64.png'})
        })
        this.casesGotten = cases;
        this.filteredCases = this.casesGotten;
        this.changeFn({value: 10});
      },
      error: err => console.error(err)
    })
  }

  filterCountry(key: string): void{
    console.log('Filtering by: ', key);
    this.filteredCases = []
    this.casesGotten.forEach(element=>{
      if(element.countryregion.toLocaleLowerCase().includes(key.toLocaleLowerCase())){
        this.filteredCases.push(element)
      }
    })
    console.log(this.filteredCases)
    this.changeFn({value: this.paginationRange});
    this.paginateElements()
  }

  changeFn(newvalue: any): void{
    this.paginationRange = newvalue.value
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
