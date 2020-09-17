import { Component, Input, ViewChild, AfterViewInit, ElementRef, OnInit, OnDestroy } from "@angular/core";
import { Layer } from '../layer/layer';
import { LEDService } from 'src/app/led.service';

@Component({
    selector: 'layer-preview',
    templateUrl: 'layer-preview.component.html',
    styleUrls: ['layer-preview.component.scss']
})
export class LayerPreview implements AfterViewInit, OnInit, OnDestroy{
    private _data = null;
    public id;
    @Input('preview-data') 
    set data(data) {
        let init = this._data ? true : false;
        this._data = data;
        if(init) this.ngAfterViewInit();
    }
    get data() { return this._data }
    
    @ViewChild('Canvas', {static: false}) canvasRef: ElementRef;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    layer: Layer;
    constructor(private ledService: LEDService) {
        this.id = Math.random().toString(36).substr(2, 9);
    }

    ngOnInit() {
        this._data.ledCount = 20;
    }

    ngAfterViewInit() {
        this.canvas = this._data.canvas = this.canvasRef.nativeElement;
        this.ctx = this._data.ctx = this.canvas.getContext("2d");
        this.layer = new Layer(this._data);
        
        //this.ledService.registerLayer(, this.layer);
    }

    ngOnDestroy() {
        this.layer.Destroy();
    }
}