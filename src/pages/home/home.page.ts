import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import filter from 'lodash-es/filter';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'ib-page-home',
    templateUrl: 'home.page.html',
})
export class HomePage {
    public user: any;

    constructor(public toastCtrl: ToastController, private auth: AuthService) {
        const myArr = [
            {
                name: 'barney',
                age: 36,
                active: true,
            },
            {
                name: 'fred',
                age: 40,
                active: false,
            }];

        this.user = (filter(myArr, (o) => o.active))[0];
    }

    private showToast() {
      const toast = this.toastCtrl.create({
        message: 'It works!',
        duration: 3000
      });
      toast.present();
    }

    private logout() {
        this.auth.signOut();
    }
}
