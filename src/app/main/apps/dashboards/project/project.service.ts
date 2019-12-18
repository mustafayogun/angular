import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiService} from '../../../../../services/api.service';


@Injectable()
export class ProjectDashboardService implements Resolve<any>
{
    projects: any[];
    widgets: any[];
    ariza : any ;


    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private  apiService: ApiService
    )
    {
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
                this.getProjects(),
                this.getWidgets()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get projects
     *
     * @returns {Promise<any>}
     */
    getProjects(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/project-dashboard-projects')
                .subscribe((response: any) => {
                    this.projects = response;
                    resolve(response);
                }, reject);
        });
    }
   getAriza(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('https://localhost:8000/api/anasayfa')
                .subscribe((response: any) => {
                    this.ariza = response;
                    resolve(response);
                }, reject);
        });
    }
    getDashboard():  Observable<any>{
        return this.apiService.get('/anasayfa').pipe(map(
            res => {
                if (res) {
                    this.ariza = res;
                   // console.log(res);
                    return res;

                }else {
                    console.log(res);
                    return {};
                }
            }
        ));
    }    getBirimAs():  Observable<any>{
        return this.apiService.get('/anasayfa/birimAS').pipe(map(
            res => {
                if (res) {
                    this.ariza = res;
                   // console.log(res);
                    return res;

                }else {
                    console.log(res);
                    return {};
                }
            }
        ));
    }
    /**
     * Get widgets
     *
     * @returns {Promise<any>}
     */
    getWidgets(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/project-dashboard-widgets')
                .subscribe((response: any) => {
                    this.widgets = response;
                    resolve(response);
                }, reject);
        });
    }
}
