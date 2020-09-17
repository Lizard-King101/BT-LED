import { Component } from '@angular/core';
import { LEDService, Group } from '../../led.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'group-select',
  templateUrl: 'group-select.page.html',
  styleUrls: ['group-select.page.scss'],
})
export class GroupSelector{
    x: number = null;
    y: number = null;


    constructor(
        private ledService: LEDService,
        private pop: PopoverController
    ) {
        
    }

    onSelect(id) {
        this.ledService.cells[this.y][this.x] = id;
        this.ledService.leds.forEach((group) => {if(group.id == id) { group.pos = {x: this.x,y: this.y}; }})
        this.pop.dismiss(id);
    }

}