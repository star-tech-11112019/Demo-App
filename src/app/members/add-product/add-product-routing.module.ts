import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AddProductPage } from './add-product.page';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AddProductPage
  }
];

@NgModule({
  imports: [CommonModule,IonicModule,
            FormsModule,
            RouterModule.forChild(routes),
            ReactiveFormsModule,
           ],
  exports: [RouterModule,ReactiveFormsModule],
})
export class AddProductPageRoutingModule {}
