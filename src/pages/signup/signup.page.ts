import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { HomePage } from '../home/home.page';

@Component({
    selector: 'ib-page-signup',
    templateUrl: 'signup.page.html',
})
export class SignupPage {

    private form: FormGroup;
    private signupError: string;

    constructor(
        fb: FormBuilder,
        private navCtrl: NavController,
        private auth: AuthService,
    ) {
        this.form = fb.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }

    private signUp() {
        const data = this.form.value;
        const credentials = {
            email: data.email,
            password: data.password
        };
        this.auth.signUp(credentials).then(
            () => this.navCtrl.setRoot(HomePage),
            (error: any) => this.signupError = error.message
        );
}
}
