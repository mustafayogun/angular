import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
    MatSortModule, MatToolbarModule, MatDialogModule,
    MatTableModule, MatTabsModule, MatAutocompleteModule
} from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { EcommerceProductsComponent } from 'app/main/apps/e-commerce/products/products.component';
import { EcommerceProductsService } from 'app/main/apps/e-commerce/products/products.service';
import { EcommerceProductComponent } from 'app/main/apps/e-commerce/product/product.component';
import { EcommerceProductService } from 'app/main/apps/e-commerce/product/product.service';
import { EcommerceOrdersComponent } from 'app/main/apps/e-commerce/orders/orders.component';
import { EcommerceOrdersService } from 'app/main/apps/e-commerce/orders/orders.service';
import { EcommerceOrderComponent } from 'app/main/apps/e-commerce/order/order.component';
import { EcommerceOrderService } from 'app/main/apps/e-commerce/order/order.service';
import { ArizaKayitDialogComponent } from 'app/main/apps/e-commerce/dialogs/compose/compose.component';
import {ArizaDetayComponent} from './ariza-detay/ariza-detay.component';
import {ArizaListComponent} from './ariza-list/ariza-list.component';
import {areAllEquivalent} from '@angular/compiler/src/output/output_ast';
import {ArizaListService} from './ariza-list/ariza-list.service';
import {ArizaDetayService} from './ariza-detay/ariza-detay.service';
import {YeniKayitComponent} from './dialogs/yeni-kayit/yeni-kayit.component';



const routes: Routes = [

    {
        path     : 'ariza-liste',
        component: ArizaListComponent,
        resolve  : {
            data: ArizaListService
        }
    },
    {
        path     : 'ariza-liste/:id',
        component: ArizaDetayComponent,
        resolve  : {
            data: ArizaDetayService
        }
    }
];

@NgModule({
    declarations: [
        ArizaDetayComponent,
        ArizaListComponent,
        YeniKayitComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatAutocompleteModule,
        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseWidgetModule,
        MatToolbarModule,
        MatDialogModule,
        MatAutocompleteModule
    ],
    providers   : [
        ArizaDetayService,
        ArizaListService,
        EcommerceOrdersService,
        EcommerceOrderService
    ],
    entryComponents: [YeniKayitComponent]
})
export class ArizaModule
{
}
