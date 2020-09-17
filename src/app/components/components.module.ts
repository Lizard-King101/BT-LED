import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { Bezier } from './bezier/bezier.component';
import { Point } from './pipes/points.pipe';
import { LayerPreview } from './layerpreview/layer-preview.component';
import { FilterSelect } from './filterselect/filter-select.component';

@NgModule({
    declarations: [
        Bezier,
        Point,
        LayerPreview,
        FilterSelect
    ],
    entryComponents: [],
    imports: [
        IonicModule,
        FormsModule,
        CommonModule,
    ],
    exports: [
        Bezier,
        Point,
        LayerPreview,
        FilterSelect
    ]
})
export class ComponentModule {}