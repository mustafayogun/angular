import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {ApiService} from '../../../../../services/api.service';
import {map} from 'rxjs/operators';

@Injectable()
export class ArizaListService implements Resolve<any>
{
    arizaList: any[];
    onArizaListChanged: BehaviorSubject<any>;
    envaterListesi: any [];
    activeUser: {};
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private apiService: ApiService
    )
    {
        // Set the defaults
        this.onArizaListChanged = new BehaviorSubject({});
        this.activeUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log( this.activeUser['birimId']);
    }


    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getAriza()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }


    getAriza(): Promise<any>
    {

        return new Promise((resolve, reject) => {
            this._httpClient.get('http://localhost:8000/api/ariza/birimAriza/' + this.activeUser['birimId'] + '/status/0')
                .subscribe((response: any) => {
                    this.arizaList = response;
                    this.onArizaListChanged.next(this.arizaList);
                    resolve(response);
                },
                    reject);
        });
    }


    getEnvanterListe():  Observable<any>{
       return this.apiService.get('/envanter/all/1').pipe(map(
        res => {
            if (res) {
                this.envaterListesi = res;
                return res;

            }else {
                console.log(res);
                return {};
            }
        }
    ));
}

}
