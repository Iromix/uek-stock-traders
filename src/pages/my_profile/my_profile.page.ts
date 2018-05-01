import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home.page';
import * as firebase from 'firebase';

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

var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
}
