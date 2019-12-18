import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {fuseAnimations} from '@fuse/animations';
import {orderStatuses} from 'app/main/apps/e-commerce/order/order-statuses';
import {Order, ArizaLog} from 'app/main/apps/e-commerce/order/order.model';
import {EcommerceOrderService} from 'app/main/apps/e-commerce/order/order.service';
import {MatSnackBar, MatAutocompleteModule} from '@angular/material';
import {ApiService} from '../../../../../services/api.service';

@Component({
    selector     : 'e-commerce-order',
    templateUrl  : './order.component.html',
    styleUrls    : ['./order.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations

})
export class EcommerceOrderComponent implements OnInit, OnDestroy
{
    order: Order;
    orderStatuses: any;
    statusForm: FormGroup;
    havaleForm: FormGroup;
    personelHavaleForm: FormGroup;
    islems: any;
    envanterGorevliler: any [];
    birimListesi: any [];
    personelListesi: any [];
    // Private
    
    private _unsubscribeAll: Subject<any>;
    private apiService: ApiService;
    private activUser: {};

    /**
     * Constructor
     *
     * @param {EcommerceOrderService} _ecommerceOrderService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _ecommerceOrderService: EcommerceOrderService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar
    )
    {
        // Set the defaults
        this.order = new Order();
        this.orderStatuses = orderStatuses;
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
        this.activUser = JSON.parse(localStorage.getItem('currentUser')) ;
        // Subscribe to update ariza-detay on changes
        this._ecommerceOrderService.onOrderChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(order => {
                this.order = new Order(order);
            });

        this.statusForm = this._formBuilder.group({
            newStatus: [''],
            aciklama: ['']
        });
        this.havaleForm = this._formBuilder.group({
            havaleBirim: [''],
            havaleBirimAciklama: ['']
        });
        this.personelHavaleForm = this._formBuilder.group({

            havalePersonel: [''],
            havalePersonelAciklama: ['']
        });

        this._ecommerceOrderService.getIslems().subscribe(res => {
            this.islems = res;
            //console.log(this.islems);
        });
        this._ecommerceOrderService.getBaskanlikBirimleri().subscribe(res => {
            this.birimListesi = res;
           // console.log(this.birimListesi);
        });
        this._ecommerceOrderService.getBirimPersonelListesi().subscribe(res => {
            this.personelListesi = res;
          // console.log(this.personelListesi);
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
     * Update status
     */
    updateStatus(): void
    {

        // tslint:disable-next-line:radix
        const newStatusId = Number.parseInt(this.statusForm.get('newStatus').value);

        if ( !newStatusId )
        {
            return console.log('Id Hatası');
        }

        const newStatus = this.islems.find((islem) => {
            return islem.id === newStatusId;

           });
        this.order.islem = newStatus;
        this.order.islemID = newStatus.id;
        this.order.arizaLogAciklama = this.statusForm.get('aciklama').value;
        this.order.assigneeId = this.activUser['id'];



        console.log(this.order);
        this._ecommerceOrderService.saveOrder(this.order)
                .then(() => {

                    this._matSnackBar.open('İşlem Başarılı', 'OK', {
                        verticalPosition: 'top',
                        duration        : 2000
                    });
                });




    }

    updateHavale(): void
    {

        // tslint:disable-next-line:radix
        const newBirimId = this.havaleForm.get('havaleBirim').value;

        if ( !newBirimId )
        {
            return console.log('Id Hatası');
        }

        this.order.arizaLogAciklama = this.havaleForm.get('havaleBirimAciklama').value;
        this.order.sorumluBirimID =  newBirimId;
        this.order.assigneeId = this.activUser['id'];
        this.order.islemID = '3';

        this._ecommerceOrderService.saveOrder(this.order)
            .then(() => {

                this._matSnackBar.open('İşlem Başarılı', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            });




    }
updatePersonelHavale(): void
    {

        // tslint:disable-next-line:radix
        const newPersonelId = this.personelHavaleForm.get('havalePersonel').value;

        if ( !newPersonelId )
        {
            return console.log('Id Hatası');
        }

        this.order.arizaLogAciklama = this.personelHavaleForm.get('havalePersonelAciklama').value;
        this.order.arizaSorumluUserId = newPersonelId;
        this.order.assigneeId =  this.activUser['id'];
        this.order.islemID = '6';

        this._ecommerceOrderService.saveOrder(this.order)
            .then(() => {

                this._matSnackBar.open('İşlem Başarılı', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            });




    }

}
