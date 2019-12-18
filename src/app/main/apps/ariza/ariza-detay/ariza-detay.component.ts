import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {fuseAnimations} from '@fuse/animations';
import {Ariza, ArizaLog} from 'app/main/apps/ariza/ariza-detay/ariza.model';
import {MatSnackBar, MatAutocompleteModule} from '@angular/material';
import {ApiService} from '../../../../../services/api.service';
import {ArizaDetayService} from './ariza-detay.service';

@Component({
    selector     : 'ariza-ariza-detay',
    templateUrl  : './ariza-detay.component.html',
    styleUrls    : ['./ariza-detay.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations

})
export class ArizaDetayComponent implements OnInit, OnDestroy
{
    ariza: Ariza;
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
     * @param {EcommerceArizaService} _ecommerceArizaService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _arizaDetayService: ArizaDetayService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar
    )
    {
        // Set the defaults
        this.ariza = new Ariza();

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
        this._arizaDetayService.onArizaChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(ariza => {
                this.ariza = new Ariza(ariza);
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

        this._arizaDetayService.getIslems().subscribe(res => {
            this.islems = res;
        });
        this._arizaDetayService.getBaskanlikBirimleri().subscribe(res => {
            this.birimListesi = res;
        });
        this._arizaDetayService.getBirimPersonelListesi().subscribe(res => {
            this.personelListesi = res;
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
        this.ariza.islem = newStatus;
        this.ariza.islemID = newStatus.id;
        this.ariza.arizaLogAciklama = this.statusForm.get('aciklama').value;
        this.ariza.assigneeId = this.activUser['id'];



        console.log(this.ariza);
        this._arizaDetayService.saveAriza(this.ariza)
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

        this.ariza.arizaLogAciklama = this.havaleForm.get('havaleBirimAciklama').value;
        this.ariza.sorumluBirimID =  newBirimId;
        this.ariza.assigneeId = this.activUser['id'];
        this.ariza.islemID = '3';

        this._arizaDetayService.saveAriza(this.ariza)
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

        this.ariza.arizaLogAciklama = this.personelHavaleForm.get('havalePersonelAciklama').value;
        this.ariza.arizaSorumluUserId = newPersonelId;
        this.ariza.assigneeId =  this.activUser['id'];
        this.ariza.islemID = '6';

        this._arizaDetayService.saveAriza(this.ariza)
            .then(() => {

                this._matSnackBar.open('İşlem Başarılı', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            });




    }

}
