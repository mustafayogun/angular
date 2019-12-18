import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import {environment} from '../environments/environment';
import 'rxjs/add/observable/of';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) {
    }

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(environment.API_BASE_PATH + path, {params}).pipe(catchError(this.formatError));
    }

    post(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.post(environment.API_BASE_PATH + path, JSON.stringify(params), this.httpOptions).pipe(catchError(this.formatError));
    }

    put(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.put(environment.API_BASE_PATH + path, JSON.stringify(params), this.httpOptions).pipe(catchError(this.formatError));
    }

    delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.delete(environment.API_BASE_PATH + path, {params}).pipe(catchError(this.formatError));
    }

    getActiveUser( ):  Observable<any>{
        return this.get('/user/activeUser/' + 'ebystest').pipe(map(
            res => {
                if (res) {

                   // console.log(res);
                    return res;

                }else {
                    console.log('getActiveuser-->' + res);
                    return {};
                }
            }
        ));
    }
    private formatError ( error: any ) {
        return Observable.of(
            environment.API_BASE_PATH + error.error);
    }
}
