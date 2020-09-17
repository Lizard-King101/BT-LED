
export class Ride{
    elapsedTime = 0;
    attributes: any;
    color: Array<Array<number>>;
    ledCount: number;

    constructor(data) {
        Object.keys(data).forEach((key) => {this[key] = data[key]});
    }

    update(time) {
        this.elapsedTime += time;
        let offset = ((this.elapsedTime / 1000) * this.attributes.speed) % 1;
        let leds = Array(this.ledCount).fill([0,0,0,0]);
        let start, end;
        if(this.attributes.return) {
            offset = offset > .5 ? (.5 - (offset - .5)) * 2 : offset * 2;
            start = 0;
            end = this.ledCount - this.attributes.size;
        } else {
            start = 0 - this.attributes.size;
            end = this.ledCount + this.attributes.size;
        }

        let at = Math.round(offset * end + start);
        for(let i = at; i < at + this.attributes.size; i++) {
            leds[i] = this.getColor(i);
        }
        return leds;
    }

    getColor(at) {
        return [this.color[0][0], this.color[0][1], this.color[0][2], this.color[0][3]];
    }
}