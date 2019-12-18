import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ArizaKaydet} from 'app/main/apps/e-commerce/order/order.model';
import {ArizaDetayService} from '../../ariza-detay/ariza-detay.service';
import {ArizaListService} from '../../ariza-list/ariza-list.service';

@Component({
    selector     : 'orders-compose',
    templateUrl  : './yeni-kayit.component.html',
    styleUrls    : ['./yeni-kayit.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class YeniKayitComponent implements  OnInit{

    composeForm: FormGroup;
     ariza: ArizaKaydet;
     envaterListesi: any [];
    private activUser: {};

    /**
     * Constructor
     *
     * @param {MatDialogRef<MailNgrxComposeDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<YeniKayitComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _arizaDetayService: ArizaDetayService,
        private _arizaListService: ArizaListService,
        private _matSnackBar: MatSnackBar,


    ) {
        // Set the defaults
        this.composeForm = this.createComposeForm();
        this.ariza = new ArizaKaydet();
        this.activUser = JSON.parse(localStorage.getItem('currentUser'));

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    ngOnInit(): void {
        this._arizaListService.getEnvanterListe().subscribe(res => {
            this.envaterListesi = res;
            // console.log(this.birimListesi);
        });



    }
    /**
     * Create yeni-kayit form
     *
     * @returns {FormGroup}
     */
    arizaKaydet(): void {
        this.ariza.konu = this.composeForm.get('konu').value;
        this.ariza.aciklama = this.composeForm.get('aciklama').value;
        this.ariza.assigneeId =  this.activUser['id'];
        this.ariza.sorumluBirimId = '3';
        this.ariza.islemId = '1';
        this.ariza.durumId = '2';
        this.ariza.envanterId = this.composeForm.get('envanter').value;
        console.log(this.ariza);
        this._arizaDetayService.kaydetAriza(this.ariza)
            .then(() => {

                this._matSnackBar.open('Ariza Kaydetme Başarılı', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
                this._arizaListService.getAriza();

            });


    }


    createComposeForm(): FormGroup {

        return this._formBuilder.group({
            konu: [''],
            aciklama: [''],
            assigneeId: [''],
            birimId: [''],
            envanter: ['']


        });


    }
}


