import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {ApiService} from '../../../../../services/api.service';
import {map} from 'rxjs/internal/operators';

@Injectable()
export class ArizaDetayService implements Resolve<any>
{
    routeParams: any;
    ariza: any;
    islem: any;
    onArizaChanged: BehaviorSubject<any>;
    private PROJECT_PATH = '/ariza';

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
        this.onArizaChanged = new BehaviorSubject({});
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
        this.routeParams = route.params;
        console.log("lolo");

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

    /**
     * Get ariza-detay
     *
     * @returns {Promise<any>}
     */
    getAriza(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('http://localhost:8000/api/ariza/detay/' + this.routeParams.id)
                .subscribe((response: any) => {
                    this.ariza = response;
                    this.onArizaChanged.next(this.ariza);
                    console.log(this.ariza);
                    resolve(response);
                }, reject);
        });
    }

    getIslems():  Observable<any>{
        return this.apiService.get('/ariza/islems').pipe(map(
            res => {
                if (res){
                    return res;
                }else{
                    console.log(res);
                    return {};
                }
            }
        ));
    }

    getBaskanlikBirimleri():  Observable<any>{
        return this.apiService.get('/birim/baskanlikBirimleri/' + this.ariza.sorumluBirim.birimBaskanlikId).pipe(map(
            res => {
                if (res) {
                    return res;
                }else {
                    console.log(res);
                    return {};
                }
            }
        ));
    }
    getBirimPersonelListesi():  Observable<any>{
        return this.apiService.get('/user/birimPersonelleri/' + this.ariza.assignee.birim.id).pipe(map(
            res => {
                if (res) {
                    return res;
                }else {
                    console.log(res);
                    return {};
                }
            }
        ));
    }

    saveArizaLog(ariza): Promise<any>
    {

        // tslint:disable-next-line:no-debugger
        //debugger
        return new Promise((resolve, reject) => {
            this._httpClient.put('http://localhost:8000/api/ariza/' + ariza.id, ariza)
                .subscribe((response: any) => {
                    resolve(response);
                    console.log(this.ariza);
                }, reject);
        });
    }
    /**
     * Save ariza-detay
     *
     * @param ariza
     * @returns {Promise<any>}
     */
    saveAriza(ariza): Promise<any>
    {  return new Promise((resolve, reject) => {
            this._httpClient.put('http://localhost:8000/api/ariza/' + ariza.id , ariza)
                .subscribe((response: any) => {
                    this.ariza = response;
                    this.onArizaChanged.next(this.ariza);
                    resolve(response);
                    console.log(this.ariza);
                }, reject);
        });
    }
    kaydetAriza(ariza): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('http://localhost:8000/api/ariza/', ariza)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }



    /**
     * Add ariza-detay
     *
     * @param ariza
     * @returns {Promise<any>}
     */
    addAriza(ariza): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/e-commerce-ariza-liste/', ariza)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
