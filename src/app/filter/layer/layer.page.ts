import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-layer',
  templateUrl: 'layer.page.html',
  styleUrls: ['layer.page.scss'],
})
export class LayerPage implements OnInit{
  layer;

  h: number;
  s: number;
  l: number;
  a: number;
  p: number;
  selected: number;
  gradient = "";
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.onGradient();
  }

  onClose() {
    this.modalCtrl.dismiss();
  }

  onSave() {
    this.modalCtrl.dismiss(this.layer);
  }

  getAttributeSettings(type, attr, name) {
    let settings = {
      ride: {
        size: {
          min: 1,
          max: 20,
          step: 1
        },
        speed: {
          min: 0.01,
          max: 2,
          step: 0.01
        }
      },
      wave: {
        size: {
          min: 0.01,
          max: 1,
          step: 0.01
        },
        speed: {
          min: 0.01,
          max: 2,
          step: 0.01
        }
      },
      spark: {
        size: {
          min: 1,
          max: 10,
          step: 1
        },
        speed: {
          min: 1,
          max: 26,
          step: 1
        },
        life: {
          min: 0.01,
          max: 5,
          step: 0.01
        }
      },
      fade: {
        size: {
          min: 0.01,
          max: 2,
          step: 0.01
        }
      }
    };
    let nameObj = settings[name];
    let typeObj = nameObj[type];

    return typeObj[attr];
  }

  hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
      r = g = b = l; // achromatic
    }else{
      var hue2rgb = function hue2rgb(p, q, t){
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
      h = s = 0; // achromatic
    }else{
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [h, s, l];
  }

  onAddColor() {
    this.layer.color.push([0,0,0,1,1])
  }

  onDeleteColor(i) {
    this.layer.color.splice(i, 1)
    if(this.selected == i) this.selected = null;
  }

  onUpdateColor() {
    let [
      r,
      g,
      b
    ] = this.hslToRgb(this.h, this.s, this.l);
    this.layer.color[this.selected][0] = r;
    this.layer.color[this.selected][1] = g;
    this.layer.color[this.selected][2] = b;
    this.onGradient();
  }

  onSelect(index) {
    console.log('select: ', index);
    this.selected = index;
    let hsl = this.rgbToHsl(this.layer.color[this.selected][0],this.layer.color[this.selected][1],this.layer.color[this.selected][2]);
    this.h = hsl[0];
    this.s = hsl[1];
    this.l = hsl[2];
  }

  dragging = null;
  offset = 0;
  onMouseDown(e, i) {
    e.preventDefault()
    this.dragging = i;
    this.offset = -e.layerX;
  }

  onMouseUp() {
    this.dragging = null;
  }

  onMouseMove(e) {
    if(this.dragging != null){
      let target:HTMLElement = e.target;
      while(target.className != "display") {
        target = target.parentElement;
      }
      let box = target.getBoundingClientRect();
      let width = box.width;
      let pos = (e.clientX - box.left) + this.offset + 3;
      let percent = Math.round(100 * pos / width) / 100;
      this.onGradient();
      if(percent < 0) {
        this.layer.color[this.dragging][4] = 0;
        return
      }
      if(percent > 1) {
        this.layer.color[this.dragging][4] = 1;
        return
      }
      this.layer.color[this.dragging][4] = percent;
    }
  }

  onGradient() {
    this.gradient = "linear-gradient(90deg, "+[...this.layer.color].sort((a,b)=>{return a[4] > b[4] ? 1 : a[4] < b[4] ? -1 : 0}).map((color) => { return "rgba("+color[0]+","+color[1]+","+color[2]+","+color[3]+") "+(color[4] * 100)+"%" }).join(",")+")";
  }
}
