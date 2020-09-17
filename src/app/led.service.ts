import { Injectable } from "@angular/core";

@Injectable()
export class LEDService{
    public ledCount: number = 0;
    public leds: Array<Group> = [];
    public cells: any[][] = [];
    public ledReserve = [];

    private debug: boolean = false;
    private rows: number = 9;
    private columns: number = 6;

    private filters = {};

    constructor() {
        let data = JSON.parse(localStorage.getItem('leds'));
        console.log(data);
        if(data) {
            Object.keys(data).forEach((key) => { this[key] = data[key] });
        }
    }

    setCells() {
        this.cells = Array(this.rows).fill(0).map(x => Array(this.columns).fill(0));
        this.leds.forEach((group: Group) => {
            if(group.pos) {
                this.cells[group.pos.y][group.pos.x] = group.id;
            }
        })
    }

    onFillReserve() {
        this.ledReserve = [];
        this.ledReserve = Array(this.ledCount).fill(0);
    }

    onUpdateLED(index, value: boolean | string) {
        this.ledReserve[index] = value ? value : 0;
    }

    onClearLEDs(id) {
        
        for(let i = 0; i < this.ledReserve.length; i++){
            let led = this.ledReserve[i];
            console.log(id, led);
            if(led == id) this.ledReserve[i] = 0;
        }
        console.log(this.ledReserve);
    }

    onSetLEDs(leds: any[]) {
        leds.forEach((led, i) => {
            if(led) this.ledReserve[i] = led;
        });
    }

    submitGroup(obj: Group){
        this.leds.push(obj);
    }

    updateGroup(obj: Group) {
        this.leds.forEach((group: Group, i) => {
            if(obj.id == group.id) {
                this.leds[i] = obj;
            }
        })
    }

    onDeleteGroup(id) {
        this.onClearLEDs(id);
        this.leds.forEach((group: Group, i) => {
            if(id == group.id) {
                
                this.leds.splice(i, 1);
            }
        });
    }
    
    onGenerateData() {
        localStorage.setItem('leds', JSON.stringify({
            leds: this.leds,
            ledCount: this.ledCount,
            ledReserve: this.ledReserve
        }));
        if(this.debug) {
            let data = [
                1 + ' Setup String',
                this.ledCount + ' Number of LEDs',
                0 + ' Reserved',
                0 + ' Reserved',
                0 + ' Reserved',
                0 + ' Reserved',
                0 + ' Reserved',
                this.leds.length + ' Groups',
            ];
            this.leds.forEach((group: Group, i) => {
                if(group.hasOwnProperty('pos')){
                    let groupArr = [
                        (['group', 'list']).indexOf(group.type) + ' Type',
                        0 + ' Reserved',
                        0 + ' Reserved',
                        (group.hasOwnProperty('reverse') ? group.reverse ? 1 : 0 : 0) + ' Reversed',
                        group.pos.x + ' X',
                        group.pos.y + ' Y',
                        group.leds.length + ' Leds'
                    ];
                    group.leds.sort((a: LED, b: LED) => {
                        return a.index > b.index ? 1 : a.index < b.index ? -1 : 0;
                    })
                    group.leds.forEach((led, i) => {
                        groupArr.push(led.index + ' Led');
                        if(i + 1 == group.leds.length) data = data.concat(groupArr);
                    });
    
                }
    
                if(i + 1 == this.leds.length) {
                    console.log(data);
                }
            });
        } else {
            let data = [
                1,
                this.ledCount,
                0,
                0,
                0,
                0,
                0,
                this.leds.length,
            ];
            this.leds.forEach((group: Group, i) => {
                if(group.hasOwnProperty('pos')){
                    let groupArr = [
                        (['group', 'list']).indexOf(group.type),
                        0,
                        0,
                        (group.hasOwnProperty('reverse') ? group.reverse ? 1 : 0 : 0),
                        group.pos.x,
                        group.pos.y,
                        group.leds.length
                    ];
                    group.leds.sort((a: LED, b: LED) => {
                        return a.index > b.index ? 1 : a.index < b.index ? -1 : 0;
                    });
                    group.leds.forEach((led, i) => {
                        groupArr.push(led.index);
                        if(i + 1 == group.leds.length) data = data.concat(groupArr);
                    });
    
                }
    
                if(i + 1 == this.leds.length) {
                    console.log(data);
                    let dataStr = JSON.stringify(data)
                    console.log(dataStr.substring(1, dataStr.length-1) + '/n');
                }
            });
        }
    }

    registerLayer(id, filter) {
        this.filters[id] = filter;
    }

    removeLayer(id) {
        delete this.filters[id];
    }
}

// LEDs in line
export interface Group {
    id: string;
    type: 'group' | 'list';
    selectType: 'range' | 'select';
    label: string;
    leds: LED[];
    reverse?: boolean;
    blinker?: boolean;
    brake?: boolean;
    pos?: {
        x: number;
        y: number;
    }
}

export interface LED {
    index: number;
    color: {
        r: number;
        g: number;
        b: number;
        a: number;
    }
}

export interface Layer {
    filter: 'add' | 'subtract' | 'multiply';
    type: '1d' | '2d';

}