import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { EnvanterService } from 'app/main/apps/envanter/envanter.service';

@Component({
    selector   : 'selected-bar',
    templateUrl: './selected-bar.component.html',
    styleUrls  : ['./selected-bar.component.scss']
})
export class EnvanterSelectedBarComponent implements OnInit, OnDestroy
{
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    hasSelectedEnvanter: boolean;
    isIndeterminate: boolean;
    selectedEnvanter: string[];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {EnvanterService} _envanterService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _envanterService: EnvanterService,
        public _matDialog: MatDialog
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
        this._envanterService.onSelectedEnvanterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedEnvanter => {
                this.selectedEnvanter = selectedEnvanter;
                setTimeout(() => {
                    this.hasSelectedEnvanter = selectedEnvanter.length > 0;
                    this.isIndeterminate = (selectedEnvanter.length !== this._envanterService.envanter.length && selectedEnvanter.length > 0);
                }, 0);
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
     * Select all
     */
    selectAll(): void
    {
        this._envanterService.selectEnvanter();
    }

    /**
     * Deselect all
     */
    deselectAll(): void
    {
        this._envanterService.deselectEnvanter();
    }

    /**
     * Delete selected envanter
     */

}
