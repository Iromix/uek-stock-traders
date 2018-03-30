import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HomePage } from '../home/home.page';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'ib-page-login',
    templateUrl: 'login.page.html',
})
export class LoginPage {

    constructor(private auth: AuthService, private navCtrl: NavController) {
    }

    private loginGoogle() {
        this.auth.loginWithGoogle().then(
            () => this.navCtrl.setRoot(HomePage),
            (error: any) => console.log(error.message)
        );
    }
}
