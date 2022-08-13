import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SkuComponent } from './pages/sku/sku.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'sku', component: SkuComponent },
    { path: '**', redirectTo: 'sku' },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
