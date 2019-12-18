import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {YardimTalepComponent} from './yardim-talep.component';



const routes: Routes = [
  {
    path: '',
    component: YardimTalepComponent
  },
  {
    // path: 'issue-detail/:id',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YardimTalepRoutingModule { }
