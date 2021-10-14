import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators'
import { CNCases } from "./casescountries";
@Injectable({
    providedIn: 'root'
})
export class CovidCountryService{
    private endpoint = 'https://master-covid-19-api-laeyoung.endpoint.ainize.ai/jhu-edu/latest?onlyCountries=true'
    constructor(private http: HttpClient){}
    getCases():Observable<CNCases[]>{
        return this.http.get<CNCases[]>(this.endpoint).pipe(
            tap(data=> console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)
        )
    }
    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if(err.error instanceof ErrorEvent){
            errorMessage = `An error ocurred: ${err.error.message}`;
        }else{
            errorMessage = `Server returned code: ${err.status}, error message is:${err.message}`
        }
        console.error(errorMessage)
        return throwError(errorMessage)
    }
}