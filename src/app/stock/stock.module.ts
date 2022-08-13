import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AppMaterialModule } from '../app-material.module';
import { StockRoutingModule } from './stock-routing.module';

import { SkuComponent } from './pages/sku/sku.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SkuComponent],
  imports: [
    AppMaterialModule,
    CommonModule,
    StockRoutingModule,
    SharedModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class StockModule { }
