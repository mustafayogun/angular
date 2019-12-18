import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataTablesModule} from 'angular-datatables';
import {YardimTalepService} from './yardim-talep.service';
import {YardimTalepComponent} from './yardim-talep.component';
import {YardimTalepRoutingModule} from './yardim-talep.routing.module';


@NgModule({

    imports: [
        CommonModule,
        DataTablesModule,
        YardimTalepRoutingModule

    ],
    providers: [YardimTalepService], //proje servis sadece burda kullanılacak
    declarations: [YardimTalepComponent],
})
export class YardimTalepModule {
}
