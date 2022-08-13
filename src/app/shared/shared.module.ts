import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AppMaterialModule } from '../app-material.module';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    AppMaterialModule,
    CommonModule,
    IonicModule,
  ],
  exports: [HeaderComponent]
})
export class SharedModule { }
