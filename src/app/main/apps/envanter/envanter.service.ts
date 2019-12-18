import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FuseUtils } from '@fuse/utils';
import { Envanter } from 'app/main/apps/envanter/envanter.model';
import {ApiService} from '../../../../services/api.service';
import {map} from 'rxjs/operators';
@Injectable()
export class EnvanterService implements Resolve<any>
{
    onEnvanterChanged: BehaviorSubject<any>;
    onSelectedEnvanterChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    envanter: Envanter[];
    user: any;
    selectedEnvanter: string[] = [];

    searchText: string;
    filterBy: string;
    personelListe: any[];

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
        this.onEnvanterChanged = new BehaviorSubject([]);
        this.onSelectedEnvanterChanged = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

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
                this.getEnvanter(),
                this.getUserData()
            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getEnvanter();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getEnvanter();
                    });

                    resolve();

                },
                reject
            );
        });
    }

    /**
     * Get envanter
     *
     * @returns {Promise<any>}
     */
    getEnvanter(): Promise<any>
    {
        return new Promise((resolve, reject) => {
                this.apiService.get('/envanter/all/1')
                    .subscribe((response: any) => {

                        this.envanter = response;

                        if ( this.filterBy === 'PompaIstasyonu' )
                        {

                            this.filterBy = 'Pompa İstasyonu';
                                this.envanter = FuseUtils.filterArrayByString(this.envanter, this.filterBy);

                        }
                        if ( this.filterBy === 'DerinKuyu' )
                        {
                            this.filterBy = 'Derin Kuyu';
                                this.envanter = FuseUtils.filterArrayByString(this.envanter, this.filterBy);

                        }

                        if ( this.filterBy === 'SuDeposu' )
                        {
                                this.filterBy = 'Su Deposu';
                                this.envanter = FuseUtils.filterArrayByString(this.envanter, this.filterBy);

                        }
                        if ( this.searchText && this.searchText !== '' )
                        {
                            this.envanter = FuseUtils.filterArrayByString(this.envanter, this.searchText);
                        }

                        this.envanter = this.envanter.map(envanter => {
                            return new Envanter(envanter);
                        });

                        this.onEnvanterChanged.next(this.envanter);
                        resolve(this.envanter);
                    }, reject);
            }
        );
    }

    /**
     * Get user data
     *
     * @returns {Promise<any>}
     */
    getUserData(): Promise<any>
    {
        return new Promise((resolve, reject) => {
                this._httpClient.get('api/contacts-user/5725a6802d10e277a0f35724')
                    .subscribe((response: any) => {
                        this.user = response;
                        this.onUserDataChanged.next(this.user);
                        resolve(this.user);
                    }, reject);
            }
        );
    }

    /**
     * Toggle selected envanter by id
     *
     * @param id
     */
    toggleSelectedEnvanter(id): void
    {
        // First, check if we already have that envanter as selected...
        if ( this.selectedEnvanter.length > 0 )
        {
            const index = this.selectedEnvanter.indexOf(id);

            if ( index !== -1 )
            {
                this.selectedEnvanter.splice(index, 1);

                // Trigger the next event
                this.onSelectedEnvanterChanged.next(this.selectedEnvanter);

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedEnvanter.push(id);

        // Trigger the next event
        this.onSelectedEnvanterChanged.next(this.selectedEnvanter);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        if ( this.selectedEnvanter.length > 0 )
        {
            this.deselectEnvanter();
        }
        else
        {
            this.selectEnvanter();
        }
    }

    /**
     * Select envanter
     *
     * @param filterParameter
     * @param filterValue
     */
    selectEnvanter(filterParameter?, filterValue?): void
    {
        this.selectedEnvanter = [];

        // If there is no filter, select all envanter
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedEnvanter = [];
            this.envanter.map(envanter => {
                this.selectedEnvanter.push(envanter.id);
            });
        }

        // Trigger the next event
        this.onSelectedEnvanterChanged.next(this.selectedEnvanter);
    }

    /**
     * Update envanter
     *
     * @param envanter
     * @returns {Promise<any>}
     */
    updateEnvanter(envanter): Promise<any>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.post('api/contacts-contacts/' + envanter.id, {...envanter})
                .subscribe(response => {
                    this.getEnvanter();
                    resolve(response);
                });
        });
    }

    /**
     * Update user data
     *
     * @param userData
     * @returns {Promise<any>}
     */
    updateUserData(userData): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/contacts-user/' + this.user.id, {...userData})
                .subscribe(response => {
                    this.getUserData();
                    this.getEnvanter();
                    resolve(response);
                });
        });
    }

    /**
     * Deselect envanter
     */
    deselectEnvanter(): void
    {
        this.selectedEnvanter = [];

        // Trigger the next event
        this.onSelectedEnvanterChanged.next(this.selectedEnvanter);
    }

    /**
     * Delete envanter
     *
     * @param envanter
     */
    deleteEnvanter(envanter): void
    {
        const envanterIndex = this.envanter.indexOf(envanter);
        this.envanter.splice(envanterIndex, 1);
        this.onEnvanterChanged.next(this.envanter);
    }

    /**
     * Delete selected envanter
     */
    deleteSelectedEnvanter(): void
    {
        for ( const envanterId of this.selectedEnvanter )
        {
            const envanter = this.envanter.find(_envanter => {
                return _envanter.id === envanterId;
            });
            const envanterIndex = this.envanter.indexOf(envanter);
            this.envanter.splice(envanterIndex, 1);
        }
        this.onEnvanterChanged.next(this.envanter);
        this.deselectEnvanter();
    }


    getPersonelListe():  Observable<any>{
        return this.apiService.get('/user/birimPersonelleri/4').pipe(map(
            res => {
                if (res) {
                    this.personelListe = res;
                    return res;

                }else {
                    console.log(res);
                    return {};
                }
            }
        ));
    } getBirimListe():  Observable<any>{
        return this.apiService.get('/birim/baskanlikBirimleri/1').pipe(map(
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
    getTipListe():  Observable<any>{
        return this.apiService.get('/tip/all').pipe(map(
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
    kaydetEnvanter(envanter): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.apiService.post('/envanter', envanter)
                .subscribe((response: any) => {
                    resolve(response);
                    console.log(envanter);
                }, reject);
        });
    }
    guncelleEnvanter(id, envanter): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.apiService.put('/envanter/' + id , envanter)
                .subscribe((response: any) => {
                    resolve(response);
                    console.log(envanter);
                }, reject);
        });
    }
    silEnvanter(id, envanter): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.apiService.put('/envanter/delete' + id , envanter)
                .subscribe((response: any) => {
                    resolve(response);
                    console.log(envanter);
                }, reject);
        });
    }

}
