import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector     : 'orders-compose',
    templateUrl  : './compose.component.html',
    styleUrls    : ['./compose.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ArizaKayitDialogComponent
{
    composeForm: FormGroup;

    /**
     * Constructor
     *
     * @param {MatDialogRef<MailNgrxComposeDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<ArizaKayitDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.composeForm = this.createComposeForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create yeni-kayit form
     *
     * @returns {FormGroup}
     */
    createComposeForm(): FormGroup
    {
        return this._formBuilder.group({
            from   : {
                value   : ['johndoe@creapond.com'],
                disabled: [true]
            },
            to     : [''],
            cc     : [''],
            bcc    : [''],
            subject: [''],
            message: ['']
        });

    }

}
