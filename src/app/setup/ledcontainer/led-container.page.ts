import { Component, OnInit } from '@angular/core';
import { LEDService, Group, LED } from '../../led.service';
import { ModalController, IonCheckbox } from '@ionic/angular';

@Component({
  selector: 'led-container',
  templateUrl: 'led-container.page.html',
  styleUrls: ['led-container.page.scss'],
})
export class LedContainer implements OnInit{
    private new = false;
    type: 'group' | 'list' = 'group';
    selectType: 'range' | 'select' = 'range';
    id: string = null;
    reverse: boolean = false;
    pos: null;
    label: string = null;
    ledl: number = null;
    ledh: number = null;

    oldLeds = [];

    constructor(
        private ledService: LEDService,
        private modal: ModalController
    ) {
        
    }

    ngOnInit() {
        console.log(this.id);
        if(!this.id) {
            this.id = Math.random().toString(36).substr(2, 9);
            this.new = true;
        } else {
            this.ledService.ledReserve.forEach((led, i) => {
                if(led == this.id) {
                    this.oldLeds[i] = led;
                } else {
                    this.oldLeds[i] = 0;
                }
            });
        }
    }

    onFillCell(e, index) {
        if(!this.ledService.ledReserve[index] || this.ledService.ledReserve[index] == this.id){
            this.ledService.onUpdateLED(index, this.ledService.ledReserve[index] == this.id ? false : this.id);
        }
        
    }

    onSave() {
        // save data
        let tmp: Group = {
            id: this.id,
            type: this.type,
            selectType: this.selectType,
            label: this.label,
            leds: []
        };
        if(this.type == 'group'){
            tmp.type = 'group';
        } else if (this.type == 'list'){
            tmp.type = 'list';
            tmp.reverse = this.reverse;
        }
        if(this.selectType == 'range'){
            for(let i = this.ledl - 1; i <= this.ledh; i++) {
                this.ledService.onUpdateLED(i, this.id);
                tmp.leds.push({
                    index: i,
                    color: {
                        r: 0,
                        g: 0,
                        b: 0,
                        a: 0
                    }
                } as LED);
            }
        } else if(this.selectType == 'select') {
            for(let i = 0; i < this.ledService.ledReserve.length; i++) {
                let led = this.ledService.ledReserve[i];
                if(led == this.id){
                    tmp.leds.push({
                        index: i,
                        color: {
                            r: 0,
                            g: 0,
                            b: 0,
                            a: 0
                        }
                    } as LED);
                }
            }
        }
        if(this.new) this.ledService.submitGroup(tmp);
        else if(!this.new) {
            if(this.pos) tmp.pos = this.pos;
            this.ledService.updateGroup(tmp);
        }
        this.modal.dismiss();
    }

    onDismiss() {
        this.ledService.onClearLEDs(this.id);
        if(this.oldLeds.length) this.ledService.onSetLEDs(this.oldLeds);
        this.modal.dismiss();
    }

}