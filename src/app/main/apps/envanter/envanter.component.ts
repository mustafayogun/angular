import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { EnvanterService } from 'app/main/apps/envanter/envanter.service';
import { EnvanterFormDialogComponent } from 'app/main/apps/envanter/envanter-form/envanter-form.component';

@Component({
    selector     : 'envanter',
    templateUrl  : './envanter.component.html',
    styleUrls    : ['./envanter.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class EnvanterComponent implements OnInit, OnDestroy
{
    dialogRef: any;
    hasSelectedEnvanter: boolean;
    searchInput: FormControl;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {EnvanterService} _envanterService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _envanterService: EnvanterService,
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog
    )
    {
        // Set the defaults
        this.searchInput = new FormControl('');

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
                this.hasSelectedEnvanter = selectedEnvanter.length > 0;
            });

        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this._envanterService.onSearchTextChanged.next(searchText);
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
     * New envanter
     */
    newEnvanter(): void
    {
        this.dialogRef = this._matDialog.open(EnvanterFormDialogComponent, {
            panelClass: 'envanter-form-dialog',
            data      : {
                action: 'new'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }

                this._envanterService.updateEnvanter(response.getRawValue());
            });
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
