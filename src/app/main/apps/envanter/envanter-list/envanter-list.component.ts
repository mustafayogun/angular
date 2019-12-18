import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MatPaginator } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { EnvanterService } from 'app/main/apps/envanter/envanter.service';
import { EnvanterFormDialogComponent } from 'app/main/apps/envanter/envanter-form/envanter-form.component';

@Component({
    selector     : 'envanter-envanter-list',
    templateUrl  : './envanter-list.component.html',
    styleUrls    : ['./envanter-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class EnvanterListComponent implements OnInit, OnDestroy
{
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;

    envanter: any;
    user: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['id', 'envanterAdi', 'envKisaKodu', 'birim', 'sorumlu', 'cepTel'];
    selectedEnvanter: any[];
    checkboxes: {};
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

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
        this.dataSource = new FilesDataSource(this._envanterService);

        this._envanterService.onEnvanterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(envanter => {
                this.envanter = envanter;

                this.checkboxes = {};
                envanter.map( envanter => {
                    this.checkboxes[envanter.id] = false;
                });
            });

        this._envanterService.onSelectedEnvanterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedEnvanter => {
                for ( const id in this.checkboxes )
                {
                    if ( !this.checkboxes.hasOwnProperty(id) )
                    {
                        continue;
                    }

                    this.checkboxes[id] = selectedEnvanter.includes(id);
                }
                this.selectedEnvanter = selectedEnvanter;
            });

        this._envanterService.onUserDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
                this.user = user;
            });

        this._envanterService.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._envanterService.deselectEnvanter();
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
     * Edit envanter
     *
     * @param envanter
     */
    editEnvanter(envanter): void
    {
        this.dialogRef = this._matDialog.open(EnvanterFormDialogComponent, {
            panelClass: 'envanter-form-dialog',
            data      : {
                envanter: envanter,
                action : 'edit'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if ( !response )
                {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch ( actionType )
                {
                    /**
                     * Save
                     */
                    case 'save':

                        this._envanterService.updateEnvanter(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteEnvanter(envanter);

                        break;
                }
            });
    }

    /**
     * Delete Envanter
     */
    deleteEnvanter(envanter): void
    {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this._envanterService.deleteEnvanter(envanter);
            }
            this.confirmDialogRef = null;
        });

    }

    /**
     * On selected change
     *
     * @param envanterId
     */
    onSelectedChange(envanterId): void
    {
        this._envanterService.toggleSelectedEnvanter(envanterId);
    }

    /**
     * Toggle star
     *
     * @param envanterId
     */
    toggleStar(envanterId): void
    {
        if ( this.user.starred.includes(envanterId) )
        {
            this.user.starred.splice(this.user.starred.indexOf(envanterId), 1);
        }
        else
        {
            this.user.starred.push(envanterId);
        }

        this._envanterService.updateUserData(this.user);
    }
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {EnvanterService} _envanterService
     */
    constructor(
        private _envanterService: EnvanterService
    )
    {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        return this._envanterService.onEnvanterChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}
