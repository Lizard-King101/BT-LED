import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LayerPage } from './layer/layer.page';

@Component({
  selector: 'app-filter',
  templateUrl: 'filter.page.html',
  styleUrls: ['filter.page.scss'],
})
export class FilterPage {
  layers = [];

  constructor(private modalCtrl: ModalController) {}

  addLayer() {
    this.layers.push({
      layer: null,
      filter: null
    });
  }

  editLayer(layer, index) {
    this.modalCtrl.create({
      component: LayerPage,
      componentProps: {layer}
    }).then((modal) => {
      modal.onDidDismiss().then((layer) => {
        console.log('Save', layer, index);
        if(layer.data) this.layers[index].layer = layer.data;
      });
      modal.present();
    });
  }

  change(index) {
    console.log('change', this.layers[index]);
  }
}
