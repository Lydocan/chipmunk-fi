import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { catchError } from "rxjs/operators";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {
    private loginUrl = "http://cmsapi.wifi8.com/uSystem/v1/user/login";
    private authUrl = 'http://cmsapi.wifi8.com/uSystem/v1/openNet';

    constructor(private http: HttpClient) { }

    login(body: any): Observable<Object> {
        return this.http.post<Object>(this.loginUrl, body, httpOptions)
            .pipe(catchError(this.handleError("login failed")));
    }

    auth(body: any): Observable<Object> {
        return this.http.post(this.authUrl, body, httpOptions)
            .pipe(catchError(this.handleError("auth failed")));
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        console.log(message);
    }
}