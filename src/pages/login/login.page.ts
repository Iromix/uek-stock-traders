import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HomePage } from '../home/home.page';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'ib-page-login',
    templateUrl: 'login.page.html',
})
export class LoginPage {

    private loginForm: FormGroup;
    private loginError: string;

    constructor(
        private navCtrl: NavController,
        private auth: AuthService,
        fb: FormBuilder
    ) {
        this.loginForm = fb.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }

    private loginGoogle() {
        this.auth.loginWithGoogle().then(
            () => this.navCtrl.setRoot(HomePage),
            (error: any) => console.log(error.message)
        );
    }

    private loginWithEmail() {
        const data = this.loginForm.value;

        if (!data.email) {
            return;
        }

        const credentials = {
            email: data.email,
            password: data.password
        };

        this.auth.loginWithEmail(credentials).then(
            () => this.navCtrl.setRoot(HomePage),
            (error: any) => this.loginError = error.message
        );
    }
}
