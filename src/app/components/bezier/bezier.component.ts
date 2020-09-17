import { Component } from "@angular/core";

@Component({
    selector: 'bezier',
    templateUrl: 'bezier.component.html',
    styleUrls: ['bezier.component.scss']
})
export class Bezier {
    offset = 10;
    width = 100;
    size = [0, 0, this.width + this.offset * 2, this.width + this.offset * 2];
    points = [[0, this.width], [this.width * .25, this.width * .25], [this.width * .75, this.width * .25], [this.width, 0]];
    pointsString = "";
    target: number = null;

    constructor() {
        this.onPointsString();
    }

    onPointsString() {
        this.pointsString = this.points.map( (point,i) => { 
            return  ((['M', 'C'])[i] || '') + point
            .map( (p) => { return p + this.offset; })
            .join(',');
        }).join(' ');
    }

    onSetTarget(index) {
        this.target = index;
    }

    onMovePoint(e: TouchEvent) {
        if(this.target != null) {
            let parentSize: ClientRect = (<HTMLElement>e.target).parentElement.getBoundingClientRect();
            let width = Math.round(parentSize.width);
            let pos = {
                x: (e.changedTouches[0].pageX - parentSize.left) * (this.width + this.offset * 2) / width,
                y: (e.changedTouches[0].pageY - parentSize.top) * (this.width + this.offset * 2) / width
            }

            if(pos.x < this.offset) {
                pos.x = this.offset
            } else if(pos.x > this.width + this.offset){
                pos.x = this.width + this.offset
            } else if([0, 3].indexOf(this.target) > -1){
                if(this.target == 0) pos.x = this.offset;
                if(this.target == 3) pos.x = this.width + this.offset;
            }

            if(pos.y < this.offset) {
                pos.y = this.offset
            } else if(pos.y > this.width + this.offset){
                pos.y = this.width + this.offset
            } 

            this.points[this.target] = [
                pos.x - this.offset, 
                pos.y - this.offset
            ];
            this.onPointsString();
        }
    }

    onClearTarget() {
        if(this.target != null) {
            this.target = null;
        }
    }
}
