import { Ride } from './filters/ride';
import { Fade } from './filters/fade';
import { Spark } from './filters/spark';
import { Wave } from './filters/wave';

export class Layer{
    filters = {
        Ride,
        Fade,
        Spark,
        Wave
    }
    filter = null;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    time = {
        now: 0,
        last: 0,
        deltaTime: 0
    }
    pixels
    destroy = false;
    ledCount: number;

    name;
    constructor(options) {
        Object.keys(options).forEach((key) => {this[key] = options[key]});
        this.filter = new this.filters[options.name.charAt(0).toUpperCase() + options.name.slice(1)]({
            color: options.color,
            attributes: options.attributes,
            ledCount: options.ledCount
        });
        console.log(options, this.name);
        this.clear();
        this.update();
    }

    update() {
        this.time.now = new Date().getTime();
        if(this.time.last) this.time.deltaTime = this.time.now - this.time.last;
        // time math
        this.clear();
        let pixels = this.filter.update(this.time.deltaTime)
        if(pixels) this.draw(pixels);
        // end time
        this.time.last = this.time.now;
        if(!this.destroy) window.requestAnimationFrame(this.update.bind(this));
    }

    private draw(pixels) {
        
        pixels.forEach((pixel, i) => {
            let pixSum = pixel[0] + pixel[1] + pixel[2];
            if(pixSum < 30 && pixSum > 0) console.log(pixel, i);
            let fill = this.ctx.fillStyle = "#" + this.r2h(pixel[0]) + this.r2h(pixel[1]) + this.r2h(pixel[2]);
            this.ctx.fillRect( (this.canvas.width / this.ledCount) * i, 0, this.canvas.width / this.ledCount, this.canvas.height)
        })
    }

    private r2h(number) {
        var hex = Number(number).toString(16);
        if (hex.length < 2) {
                hex = "0" + hex;
        }
        return hex;
          
    }

    private clear() {
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
    }

    Destroy() {
        this.destroy = true;
    }

    // Layer Maths
    add(pixels) {
        
    }

    subtract(pixels) {

    }

    multiply(pixels) {

    }
}