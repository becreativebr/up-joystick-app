import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, Platform } from 'ionic-angular';

import { NativeStorage } from 'ionic-native';

import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  initialSettings = { ip: '127.0.0.1:3000', up: 'up', left: 'left', right: 'right', down: 'down', a: 'a', b: 'b', c: 'c', d: 'd' };

  settings: any;

  constructor(private platform: Platform, public navCtrl: NavController, private http: Http) {
    platform.ready().then(() => {
      NativeStorage.getItem("settings").then(
        settings => {
          this.settings = settings;
          console.log(this.settings);
        }, err =>  {
          if(err.code === 2) {
            NativeStorage.setItem("settings", this.initialSettings).then(
              settings => {
                console.log("Intial settings has saved!");
                this.settings = settings;
              },
              err => console.log(JSON.stringify(err))
            );
          }
          console.log(JSON.stringify(err));
        })
      })
    }

    goToSettings() {
      this.navCtrl.push(SettingsPage);
    }

    press(key) {
      console.log(key);
      console.log("http://"+ this.settings.ip + "/press");
      if(this.settings && this.settings.ip) {
        this.http.post("http://"+ this.settings.ip + "/press", {key: key}).subscribe(res => {
          console.log("Key pressed successfully");
        }, err => console.log(JSON.stringify(err)));
      }
    }
  }
