import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase';

@Component({
    templateUrl: 'my_profile.page.html',
})
export class MyProfilePage {
    private name: string;
    private email: string;
    private photoUrl: string;

    constructor(private navCtrl: NavController) {
        const user = firebase.auth().currentUser;

        if (user != null) {
            this.name = user.displayName;
            this.email = user.email;
            this.photoUrl = user.photoURL;
        }
    }

    private openHomePage() {
        this.navCtrl.popToRoot();
    }
}
