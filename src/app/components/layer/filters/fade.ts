
export class Fade{
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
        let color = this.getColor(offset);
        for(let i = 0; i < this.ledCount; i ++) {
            leds.push(color);
        }
        return leds;
    }

    getColor(at) {
        let color1;
        let color2;
        if(this.color.length == 1) {
            if(at <= .5) {
                color1 = [...this.color[0]];
                color2 = [0,0,0,0,.5];
            } else if (at > .5) {
                color2 = [...this.color[0]];
                color1 = [0,0,0,0,.5];
                color2[4] = 1;
            }
        } else {
            let color = [...this.color].sort((a, b) => {
                let aDif = Math.abs(a[4] - at);
                let bDif = Math.abs(b[4] - at);
                return aDif > bDif ? 1 : bDif > aDif ? -1 : 0;
            });
            color1 = color[0][4] < color[1][4] ? color[0] : color[1];
            color2 = color[0][4] > color[1][4] ? color[0] : color[1];
        }


        let percent = ((at - color1[4]) * 1) / (color2[4] - color1[4])
        let invPerc = 1 - percent;
        
        return [
            Math.floor(color1[0] * invPerc + color2[0] * percent),
            Math.floor(color1[1] * invPerc + color2[1] * percent),
            Math.floor(color1[2] * invPerc + color2[2] * percent),
            color1[3] * invPerc + color2[3] * percent
        ];
    }
}