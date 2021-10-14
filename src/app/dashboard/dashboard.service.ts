import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators'
import { CVcases } from "./cases";
import { Countries } from "./countries";
@Injectable({
    providedIn: 'root'
})
export class CovidService{
    private endpoint = 'https://master-covid-19-api-laeyoung.endpoint.ainize.ai/jhu-edu/brief'
    private dataroute = 'assets/data/continents.json'
    constructor(private http: HttpClient){}
    getCases():Observable<CVcases>{
        return this.http.get<CVcases>(this.endpoint).pipe(
            tap(data=> console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)
        )
    }
    getContinents(): Observable<Countries[]>{
        return this.http.get<Countries[]>(this.dataroute).pipe(
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