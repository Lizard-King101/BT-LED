import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FilterPage } from './filter.page';
import { ComponentModule } from '../components/components.module';

@NgModule({
  imports: [
    ComponentModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: FilterPage
      }
    ])
  ],
  declarations: [FilterPage]
})
export class FilterPageModule {}
