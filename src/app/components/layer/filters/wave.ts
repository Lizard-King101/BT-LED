
export class Wave{
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
        // console.log(offset);
        let leds = [];
        for(let i = 0; i < this.ledCount; i ++) {
            let led = (i / this.ledCount) * this.attributes.size;
            let at = led + offset > 1 ? led + offset - 1 : led + offset;
            leds.push(this.getColor(at));
        }
        return leds;
    }

    getColor(led) {
        
        let color = [...this.color].sort((a, b) => {
            let aDif = Math.abs(a[4] - led);
            let bDif = Math.abs(b[4] - led);
            return aDif > bDif ? 1 : bDif > aDif ? -1 : 0;
        });
        let color1 = color[0][4] < color[1][4] ? color[0] : color[1];
        let color2 = color[0][4] > color[1][4] ? color[0] : color[1];

        if((color1[4] > led && color2[4] > led) || (color1[4] < led && color2[4] < led)) {
            let dif1 = Math.abs(color1[4] - led);
            let dif2 = Math.abs(color2[4] - led);
            if(dif1 < dif2) {
                return color1;
            }else {
                return color2;
            }
        }
        
        let percent = ((led - color1[4]) * 1) / (color2[4] - color1[4])
        let invPerc = 1 - percent;
        
        return [
            Math.abs(Math.floor(color1[0] * invPerc + color2[0] * percent)),
            Math.abs(Math.floor(color1[1] * invPerc + color2[1] * percent)),
            Math.abs(Math.floor(color1[2] * invPerc + color2[2] * percent)),
            color1[3] * invPerc + color2[3] * percent
        ];
    }
}