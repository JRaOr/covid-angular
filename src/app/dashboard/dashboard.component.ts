import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CVcases } from './cases';
import { Countries } from './countries';
import { CovidService } from './dashboard.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit,OnDestroy {
  sub! : Subscription ;
  subcontinent !: Subscription;
  continents: Countries[] = [];
  showFormState = false;
  errosState = false
  formErrors: string[] = [];
  popupState = false
  subscription = new FormGroup({
    name: new FormControl('',Validators.compose([Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')])),
    date: new FormControl('',Validators.compose([Validators.required])),
    email: new FormControl('',Validators.compose([Validators.required,Validators.email]))
  });
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
  showForm():void{
    console.log('Mostrando Formulario')
    this.showFormState = !this.showFormState
  }
  onSubmit(): void{
    console.log('Submiting form', this.subscription.value)
    this.formErrors = []
    if(this.subscription.controls.name.errors){
      this.formErrors.push('El nombre es requerido y debe contener solo letras')
      this.errosState = true
    }
    if(this.subscription.controls.date.errors){
      this.formErrors.push('La fecha de nacimiento es requerida')
      this.errosState = true
    }
    if(this.subscription.controls.email.errors){
      this.formErrors.push('El email es requerido y debe ser una direccion valida')
      this.errosState = true
    }
    if(this.formErrors.length === 0){
      this.errosState =false
      this.popupState = true
    }    
  }
  finishSub():void{
    this.popupState = false
    this.errosState = false
    this.showFormState = false
    this.subscription = new FormGroup({
      name: new FormControl('',Validators.compose([Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')])),
      date: new FormControl('',Validators.compose([Validators.required])),
      email: new FormControl('',Validators.compose([Validators.required,Validators.email]))
    });
  }
}
