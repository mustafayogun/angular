import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjeComponent} from './proje.component';


const routes: Routes = [
  {
    path: '',
    component: ProjeComponent
  },
  {
    // path: 'issue-detail/:id',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjeRoutingModule { }
