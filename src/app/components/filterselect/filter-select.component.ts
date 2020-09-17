import { Component, Output, Input, EventEmitter } from "@angular/core";
import { PopoverController } from '@ionic/angular';
import { LayerSelect } from '../layerselect/layer-select.component';


@Component({
    selector: 'filter-select',
    templateUrl: 'filter-select.component.html',
    styleUrls: ['filter-select.component.scss']
})
export class FilterSelect{
    layer = null;
    @Output('layer') 
    @Input('layer')
    set Layer(data) {
      this.layer = data;
    }
    get Layer() { return this.layer;}

    @Output('onChange') onChange = new EventEmitter();

    constructor(private popover: PopoverController) { }
    
    selectLayer(e: MouseEvent) {
        this.popover.create({
          event: e,
          component: LayerSelect,
          componentProps: {
            layer: this.layer
          }
        }).then((popover) => {
          popover.onDidDismiss().then((layer) => {
            this.layer = layer.data;
            this.onChange.emit(this.layer);
          })
          popover.present();
        })
      }
}