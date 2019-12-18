import {ApiService} from '../api.service';

import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';


@Injectable()
export class ProjeService {

    private PROJE_PATH = '/proje';

    constructor(private  apiService: ApiService) {

    }

    getAll(): Observable<any> {   // handell
        return this.apiService.get(this.PROJE_PATH).pipe(map(
            res => {
                if (res) {
                    return res;
                } else {
                    console.log(res);
                    return {};
                }
            }
        ));

    }


    getById(id): Observable<any> {
        return this.apiService.get(this.PROJE_PATH, id).pipe(map(
            res => {
                if (res) {
                    return res;
                } else {
                    console.log(res);
                    return {};
                }
            }
        ));
    }

    createProje(proje): Observable<any> {
        return this.apiService.post(this.PROJE_PATH, proje).pipe(map(
            res => {
                if (res) {
                    return res;
                } else {
                    console.log(res);
                    return {};
                }
            }
        ));
    }


}

