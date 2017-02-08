import { Component } from '@angular/core';

import { NavController, Platform, AlertController } from 'ionic-angular';

import { NativeStorage } from 'ionic-native';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  buttonOptions = ['space', 'up', 'left', 'right', 'down', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  settings: Object;

  constructor(private platform: Platform, public navCtrl: NavController, private alertCtrl: AlertController) {
    platform.ready().then(() => {
      NativeStorage.getItem("settings").then(
        settings => {
          this.settings = settings;
          console.log(this.settings);
        }, err =>  {
          console.log(JSON.stringify(err));
        })
      })
    }

    save() {
      console.log('k');
      NativeStorage.setItem("settings", this.settings).then(() => {
        alert("New settings has saved successfully!");
        this.navCtrl.setRoot(HomePage);
      });
    }

    alert(message) {
      let alert = this.alertCtrl.create({
        title: 'Aviso',
        subTitle: message,
        buttons: ['Ok']
      });
      alert.present();
    }
  }
