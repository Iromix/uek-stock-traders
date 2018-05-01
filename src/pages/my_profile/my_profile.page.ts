import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home.page';

@Component({
    templateUrl: 'my_profile.page.html',
})
export class MyProfilePage {
    public user: any;

    constructor(private navCtrl: NavController){}

    private home_page() {
        this.navCtrl.popToRoot();
    }
    
}

