import { Component } from "@angular/core";
import { PopoverController } from '@ionic/angular';


@Component({
    selector: 'layer-select',
    templateUrl: 'layer-select.component.html',
    styleUrls: ['layer-select.component.scss']
})
export class LayerSelect{
    
    constructor(private popover: PopoverController) { }
    layers = [
        { 
            id: 1,
            name: 'wave',
            color: [
                [255,0,0,   1, 0],
                [255,255,0, 1, .1666],
                [0,255,0,   1, .3333],
                [0,255,255, 1, .5],
                [0,0,255,   1, .6666],
                [255,0,255, 1, .8333],
                [255,0,0,   1, 1]
            ],
            attributes: {
                speed: .2,
                size: .8
            }
        },{
            id: 2,
            name: 'ride',
            color: [
                [255,0,0,1,1]
            ],
            attributes: {
                speed: .4,
                size: 10,
                return: true
            }
        },{
            id: 3,
            name: 'spark',
            color: [
                [255,150,0,1,0]
            ],
            attributes: {
                speed: 7,
                size: 2,
                life: .5
            }
        },{
            id: 4,
            name: 'fade',
            color: [
                [255,0,0,   1, 0],
                [255,255,0, 1, .1666],
                [0,255,0,   1, .3333],
                [0,255,255, 1, .5],
                [0,0,255,   1, .6666],
                [255,0,255, 1, .8333],
                [255,0,0,   1, 1]
            ],
            attributes: {
                speed: .5
            }
        }
    ];

    onSelect(layer) {
        this.popover.dismiss(layer);
    }
}