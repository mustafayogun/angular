import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TalepComponent} from './talep.component';
import {TalepRoutingModule} from './talep.routing.module';
import {TalepService} from '../../../../services/shared/talep.service';



@NgModule({
  declarations: [TalepComponent],
  imports: [
    CommonModule,
    TalepRoutingModule
  ],
  providers: [TalepService]
})
export class TalepModule { }
