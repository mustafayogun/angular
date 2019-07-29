import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjeComponent} from './proje.component';
import {ProjeRoutingModule} from './proje.routing.module';
import {ProjeService} from '../../../../services/shared/proje.service';
import {DataTablesModule} from 'angular-datatables';


@NgModule({

    imports: [
        CommonModule,
        ProjeRoutingModule,
        DataTablesModule

    ],
    providers: [ProjeService], //proje servis sadece burda kullanılacak
    declarations: [ProjeComponent],
})
export class ProjeModule {
}
