import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import {ArizaKaydet} from 'app/main/apps/e-commerce/order/order.model';
import { EcommerceOrderService } from 'app/main/apps/e-commerce/order/order.service';
import { EcommerceOrdersService } from 'app/main/apps/e-commerce/orders/orders.service';
import {Subject} from 'rxjs';
@Component({
    selector     : 'orders-compose',
    templateUrl  : './compose.component.html',
    styleUrls    : ['./compose.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ArizaKayitDialogComponent implements  OnInit{

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
        public matDialogRef: MatDialogRef<ArizaKayitDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _ecommerceOrderService: EcommerceOrderService,
        private _ecommerceOrdersService: EcommerceOrdersService,
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
        this._ecommerceOrdersService.getEnvanterListe().subscribe(res => {
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
        this._ecommerceOrderService.kaydetAriza(this.ariza)
            .then(() => {

                this._matSnackBar.open('Ariza Kaydetme Başarılı', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
                this._ecommerceOrdersService.getOrders();

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


