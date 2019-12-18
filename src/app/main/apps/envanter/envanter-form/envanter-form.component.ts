import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {Envanter, EnvanterKayitModel, EnvanterUpdateModel} from '../envanter.model';
import {EnvanterService} from '../envanter.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import 'rxjs-compat/add/operator/filter';
import {FuseConfirmDialogComponent} from '../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import {duration} from 'moment';


@Component({
    selector     : 'envanter-envanter-form-dialog',
    templateUrl  : './envanter-form.component.html',
    styleUrls    : ['./envanter-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class EnvanterFormDialogComponent
{
    action: string;
    envanter: Envanter;
    envanterKayit: EnvanterKayitModel;
    envanterUpdateDel: EnvanterUpdateModel;
    envanterForm: FormGroup;
    dialogTitle: string;
    sorumlu: FormControl;
    personelListe: any [];
    baskanlikBirimleri:  any [];
    tipListe:  any [];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    /**
     * Constructor
     *
     * @param {MatDialogRef<EnvanterFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */


    constructor(
        public matDialogRef: MatDialogRef<EnvanterFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _envanterService: EnvanterService,
        private _matSnackBar: MatSnackBar,
        public _matDialog: MatDialog



    ) {
        // Set the defaults

        this.action = _data.action;
        console.log(this.action );
        if (this.action === 'edit') {
            this.dialogTitle = 'Envanter Düzenle';
            this.envanter = _data.envanter;
            this.envanterUpdateDel = new EnvanterUpdateModel({});
            this.envanterForm = this.updateEnvanterForm();

        } else {
            this.dialogTitle = 'Yeni Envanter Kaydet';
            this.envanterKayit = new EnvanterKayitModel({});
            this.envanterForm = this.createEnvanterForm();

        }
        this._envanterService.getPersonelListe().subscribe(res => {
            this.personelListe = res;

        });
        this._envanterService.getBirimListe().subscribe(res => {
            this.baskanlikBirimleri = res;
        });
        this._envanterService.getTipListe().subscribe(res => {
            this.tipListe = res;
        });



    }

    envanterKaydet(): void {
        if (this.action !== 'edit'){
        this.envanterKayit.envAdi = this.envanterForm.get('envAdi').value;
        this.envanterKayit.envKisaKodu = this.envanterForm.get('envKisaKodu').value;
        this.envanterKayit.birimId = this.envanterForm.get('birim').value;
        this.envanterKayit.sorumluId = this.envanterForm.get('sorumlu').value;
        this.envanterKayit.tipId =  this.envanterForm.get('tip').value;
        console.log(this.envanterKayit);
        this._envanterService.kaydetEnvanter(this.envanterKayit)
            .then(() => {

                this._matSnackBar.open('Envanter Kaydetme Başarılı', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
                this._envanterService.getEnvanter();

            });
        }else {


        }
    }
    envanterUpdate(): void {
        this.envanterUpdateDel.envAdi = this.envanterForm.get('envAdi').value;
        this.envanterUpdateDel.envKisaKodu = this.envanterForm.get('envKisaKodu').value;
        this.envanterUpdateDel.envKodu = this.envanterForm.get('envKodu').value;
        this.envanterUpdateDel.birimId = this.envanterForm.get('birim').value;
        this.envanterUpdateDel.sorumluId = this.envanterForm.get('sorumlu').value;
        this.envanterUpdateDel.tipId =  this.envanterForm.get('tip').value;

            this._envanterService.guncelleEnvanter(this._data.envanter.id, this.envanterUpdateDel)
                .then(() => {

                    this._matSnackBar.open('Envanter Güncelleme Başarılı', 'OK', {
                        verticalPosition: 'top',
                        duration: 2000
                    });
                    this._envanterService.getEnvanter();

                });


    }

    // tslint:disable-next-line:typedef

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create envanter form
     *
     * @returns {FormGroup}
     */
    createEnvanterForm(): FormGroup
    {
        return this._formBuilder.group({

            envAdi    : [''],
            envKisaKodu: [''],
            envKodu  : [''],
            tip: [''],
            sorumlu: [''],
            birim:  [''],
            // envAdi    : [this.envanter.envAdi],
            // envKisaKodu: [this.envanter.envKisaKodu],
            // envKodu  : [this.envanter.envKodu],
            // tip: [this.envanter.tip['tipAdi']],
            // sorumlu: [this.envanter.sorumlu['id']],
            // birim:   [this.envanter.birim['id']],

        });
    }

    updateEnvanterForm(): FormGroup
    {
        return this._formBuilder.group({
            envAdi    : [this.envanter.envAdi],
            envKisaKodu: [this.envanter.envKisaKodu],
            envKodu  : [this.envanter.envKodu],
            tip: [this.envanter.tip['id']],
            sorumlu: [this.envanter.sorumlu['id']],
            birim:   [this.envanter.birim['id']],

        });
    }
}
