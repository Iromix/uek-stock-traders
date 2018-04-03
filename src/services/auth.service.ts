import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Platform } from 'ionic-angular';

@Injectable()
export class AuthService {
    private user: firebase.User;

    constructor(public afAuth: AngularFireAuth, private platform: Platform) {
        afAuth.authState.subscribe((user) => {
            this.user = user;
        });
    }

    get isAuthenticated(): boolean {
      return this.user !== null;
    }

    public loginWithGoogle() {
        if (this.platform.is('cordova')) {
            return this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then(() => {
                return this.afAuth.auth.getRedirectResult().then((result: any) => {
                    console.log(result);
                }).catch((error: any) => {
                    console.log(error);
                });
            });
        } else {
            return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
                .then((res: any) => console.log(res));
        }
    }

    public loginWithEmail(credentials: any) {
        console.log('Sign in with email');
        return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
            credentials.password);
    }

    public signOut(): Promise<void> {
        return this.afAuth.auth.signOut();
    }
}
