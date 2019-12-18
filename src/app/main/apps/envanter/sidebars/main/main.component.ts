import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EnvanterService } from 'app/main/apps/envanter/envanter.service';

@Component({
    selector   : 'envanter-main-sidebar',
    templateUrl: './main.component.html',
    styleUrls  : ['./main.component.scss']
})
export class EnvanterMainSidebarComponent implements OnInit, OnDestroy
{
    user: any;
    filterBy: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {EnvanterService} _envanterService
     */
    constructor(
        private _envanterService: EnvanterService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.filterBy = this._envanterService.filterBy || 'all';

        this._envanterService.onUserDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
                this.user = user;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Change the filter
     *
     * @param filter
     */
    changeFilter(filter): void
    {
        this.filterBy = filter;
        this._envanterService.onFilterChanged.next(this.filterBy);
    }
}
