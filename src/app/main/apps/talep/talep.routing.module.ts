import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TalepComponent} from "./talep.component";


const routes: Routes = [
  {
    path: '',
    component: TalepComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TalepRoutingModule { }
