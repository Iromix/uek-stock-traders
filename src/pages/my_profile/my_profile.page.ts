import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home.page';
import * as firebase from 'firebase';

@Component({
    templateUrl: 'my_profile.page.html',
})
export class MyProfilePage {
    public user: any;

    constructor(private navCtrl: NavController) {}

    private openHomePage() {
        this.navCtrl.popToRoot();
    }
}
var config = {
    apiKey: 'AIzaSyCUMLEvdZ72PXAQJrbG6E3oJlgX-i_zGGs',
    authDomain: 'uek-stock-traders.firebaseapp.com',
    databaseURL: 'https://uek-stock-traders.firebaseio.com',
    projectId: 'uek-stock-traders',
    storageBucket: 'uek-stock-traders.appspot.com',
    messagingSenderId: '574461787753'
  };

firebase.initializeApp(config);

var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
}