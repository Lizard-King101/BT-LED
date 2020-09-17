import { Component, OnInit } from '@angular/core';
import { LEDService, Group } from '../led.service';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';

import { LedContainer } from './ledcontainer/led-container.page';
import { GroupSelector } from './groupselector/group-select.page';

@Component({
  selector: 'app-setup',
  templateUrl: 'setup.page.html',
  styleUrls: ['setup.page.scss'],
})
export class SetupPage implements OnInit{
  accDelete: boolean = true;
  tab: string = 'grid';
  

  constructor(
    private ledService: LEDService, 
    private alert: AlertController,
    private modal: ModalController,
    private pop: PopoverController) {

  }

  ngOnInit() {
    this.ledService.setCells();
  }

  onTab() {
    console.log(this.ledService.leds);
  }

  onAddGroup() {
    if(this.ledService.ledCount < 1) {
      this.alert.create({
        header: 'Add LED\'s First',
        subHeader: 'you need to specify how many leds your setup has first',
        buttons: ['OK']
      }).then((alert) => {
        alert.present();
      });
    } else {
      this.accDelete = false;
      this.modal.create({
        component: LedContainer
      }).then((modal) => {
        modal.present();
      });
    }
  }

  assignGroup(e: MouseEvent, x, y) {
    if(!this.ledService.cells[y][x]){
      this.pop.create({
        event: e,
        component: GroupSelector,
        componentProps: {
          x,
          y
        }
      }).then((popover) => {
        popover.onDidDismiss().then((data) => {
          console.log(data.data, x, y);
        })
        popover.present()
      })
    } else {
      let id = this.ledService.cells[y][x];
      this.ledService.leds.forEach((group) => {if(group.id == id) delete group.pos; })
      this.ledService.cells[y][x] = 0;
    }
    
  }

  onEdit(group: Group) {
    this.modal.create({
      component: LedContainer,
      componentProps: group
    }).then((modal) => {
      modal.present();
    });
  }

  onDelete(id, label) {
    this.alert.create({
      header: 'Wait!',
      subHeader: `Are you sure you want to delete the group ${label}?`,
      buttons: [{
        text: 'Delete',
        role: 'cancel',
        handler: () => { this.delete(id) }
      }, 'Cancel']
    }).then((alert) => {
      alert.present();
    });
  }

  delete(id) { 
    this.ledService.onDeleteGroup(id);
  }

  onReset() {
    console.log(this.ledService.ledCount)
    this.accDelete = false;
    this.ledService.leds = [];
    this.ledService.onFillReserve()
  }

  onCountWarning() {
    if(this.ledService.leds.length){
      this.alert.create({
        header: 'Hol-up!',
        subHeader: 'Changing this number will delete all you settings for this controller',
        buttons: [{
          text: 'OK',
          handler: () => { this.accDelete = true; }
        }]
      }).then((alert) => {
        alert.present();
      });
    }
  }
}
