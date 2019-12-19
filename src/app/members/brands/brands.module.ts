import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrandsPageRoutingModule } from './brands-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrandsPage } from './brands.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrandsPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [BrandsPage]
})
export class BrandsPageModule {}
