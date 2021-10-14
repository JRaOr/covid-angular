import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators'
import { CNCases } from "./casescountriesdetail";
@Injectable({
    providedIn: 'root'
})
export class CovidByCountryService{
    private endpoint = 'https://master-covid-19-api-laeyoung.endpoint.ainize.ai/jhu-edu/timeseries?iso2='
    constructor(private http: HttpClient){}
    getCases(code: string):Observable<CNCases[]>{
        return this.http.get<CNCases[]>(this.endpoint + code).pipe(
            tap(data=> {
                console.log('All: ', JSON.stringify(data));
                console.log(code)
            }),
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