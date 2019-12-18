import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {ApiService} from '../../../../../services/api.service';
import {map} from 'rxjs/internal/operators';

@Injectable()
export class EcommerceOrderService implements Resolve<any>
{
    routeParams: any;
    order: any;
    islem: any;
    onOrderChanged: BehaviorSubject<any>;
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
        this.onOrderChanged = new BehaviorSubject({});
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

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getOrder()
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
    getOrder(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('http://localhost:8000/api/ariza/detay/' + this.routeParams.id)
                .subscribe((response: any) => {
                    this.order = response;
                    this.onOrderChanged.next(this.order);
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
        return this.apiService.get('/birim/baskanlikBirimleri/' + this.order.sorumluBirim.birimBaskanlikId).pipe(map(
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
        return this.apiService.get('/user/birimPersonelleri/' + this.order.assignee.birim.id).pipe(map(
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

    saveArizaLog(order): Promise<any>
    {

        // tslint:disable-next-line:no-debugger
        //debugger
        return new Promise((resolve, reject) => {
            this._httpClient.put('http://localhost:8000/api/ariza/' + order.id, order)
                .subscribe((response: any) => {
                    resolve(response);
                    console.log(this.order);
                }, reject);
        });
    }
    /**
     * Save ariza-detay
     *
     * @param order
     * @returns {Promise<any>}
     */
    saveOrder(order): Promise<any>
    {  // tslint:disable-next-line:no-debugger
        //debugger
        return new Promise((resolve, reject) => {
            this._httpClient.put('http://localhost:8000/api/ariza/' + order.id , order)
                .subscribe((response: any) => {
                    this.order = response;
                    this.onOrderChanged.next(this.order);
                    resolve(response);
                    console.log(this.order);
                }, reject);
        });
    }
    kaydetAriza(order): Promise<any>
    {  // tslint:disable-next-line:no-debugger
        //debugger
        return new Promise((resolve, reject) => {
            this._httpClient.post('http://localhost:8000/api/ariza/', order)
                .subscribe((response: any) => {
                    resolve(response);
                    console.log(order);
                }, reject);
        });
    }



    /**
     * Add ariza-detay
     *
     * @param order
     * @returns {Promise<any>}
     */
    addOrder(order): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/e-commerce-ariza-liste/', order)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
