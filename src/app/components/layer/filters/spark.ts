
export class Spark{
    attributes: any;
    color: Array<Array<number>>;
    ledCount: number;
    sparks = [];
    timer = 0;

    constructor(data) {
        Object.keys(data).forEach((key) => {this[key] = data[key]});
    }

    update(time) {
        this.timer -= time;

        for(let i = this.sparks.length-1; i >= 0; i--) {
            let spark = this.sparks[i];
            spark.life -= time;
            if(spark.life <= 0) {
                this.sparks.splice(i, 1)
            }
        }

        if(this.timer <= 0) {
            this.timer = 1000 / this.attributes.speed;
            // spawn spark reset timer
            let leds = [];
            if(this.attributes.size == 1) {
                leds = [Math.round(Math.random() * this.ledCount)];
            } else if(this.attributes.size > 1){
                let start = Math.round(Math.random() * this.ledCount);
                let halfSize = Math.floor(this.attributes.size / 2);
                let offset = start - halfSize < 0 ? Math.abs(start - halfSize) : start + halfSize >= this.ledCount ? -(start + halfSize - this.ledCount) : 0;
                let end = start + offset + (halfSize * 2);
                for(let i = start - halfSize + offset; i < end; i++) {
                    leds.push(i);
                }
            }
            this.sparks.push({
                leds: leds,
                life: this.attributes.life * 1000
            });
        }

        let leds = Array(this.ledCount).fill([0,0,0,0]);
        for(let i = 0; i < this.sparks.length; i++) {
            let spark = this.sparks[i];
            let color = this.getColor(1 * spark.life / (this.attributes.life * 1000));
            //console.log(spark.leds[0], color);
            for(let i = 0; i < spark.leds.length; i ++){
                leds[spark.leds[i]] = color;
            }
        }

        return leds;
        
    }

    getColor(at) {
        let color1;
        let color2;
        if(this.color.length == 1) {
                color1 = [...this.color[0]];
                color2 = [0,0,0,0,1];
            
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
            Math.floor(color1[0] * percent + color2[0] * invPerc),
            Math.floor(color1[1] * percent + color2[1] * invPerc),
            Math.floor(color1[2] * percent + color2[2] * invPerc),
            color1[3] * percent + color2[3] * invPerc
        ];
    }
}