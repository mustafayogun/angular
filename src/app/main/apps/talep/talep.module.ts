import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TalepComponent} from './talep.component';
import {TalepRoutingModule} from './talep.routing.module';
import {TalepService} from '../../../../services/shared/talep.service';
import {MatIconModule, MatPaginatorModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [TalepComponent],
    imports: [
        CommonModule,
        TalepRoutingModule,
        MatIconModule,
        MatPaginatorModule,
        MatTableModule
    ],
  providers: [TalepService]
})
export class TalepModule { }
