import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RegionService } from './region.service';

@Component({
  selector: 'cv-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.sass']
})
export class RegionComponent implements OnInit {
  sub !: Subscription;
  constructor(private regionService: RegionService) { }

  ngOnInit(): void {
    this.sub = this.regionService.getCountriesbyContinent().subscribe({
      next: regions=>{
        console.log(regions)
      }
    })
  }

}
