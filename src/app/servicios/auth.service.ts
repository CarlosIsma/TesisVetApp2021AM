import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public existeU = false;
  public currentUser: any;
  public userStatus: string;
  public userStatusChanges: BehaviorSubject<string>;
  public errorLogin = false;

  constructor(
    private ngZone: NgZone,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private alertController: AlertController
  ) {
    this.userStatusChanges = new BehaviorSubject<string>(this.userStatus);
  }

  setUserStatus(userStatus: any): void {
    this.userStatus = userStatus;
    this.userStatusChanges.next(userStatus);
  }

 async sendVerificationEmail():Promise<void>{
   return(await this.afAuth.currentUser).sendEmailVerification();
 }

  async login(email: string, password: string) {
    await this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.errorLogin = false;
        this.firestore
          .collection('usuarios-movil')
          .ref.where('correo', '==', user.user.email)
          .onSnapshot((snap) => {
            snap.forEach(async (userRef) => {
              this.currentUser = userRef.data();
              localStorage.setItem(
                'User_Data',
                JSON.stringify(this.currentUser)
              );
              this.setUserStatus(this.currentUser);
              if (
                this.currentUser !== null &&
                (this.currentUser.rol === 'veterinaria' ||
                  this.currentUser.rol === 'ciudadano')
              ) {
                this.router.navigate(['/menu']);
              } else {
                this.router.navigate(['/login']);
                const alert = await this.alertController.create({
                  header: 'Error al iniciar sesión',
                  message: 'Usuario no permitido',
                  buttons: ['Aceptar'],
                });

                await alert.present();
              }
            });
          });
      })
      .catch(async (err) => {
        const alert = await this.alertController.create({
          header: 'Error al iniciar sesión',
          message: 'Credenciales de acceso incorrectas',
          buttons: ['Aceptar'],
        });

        await alert.present();
      });
  }

  logOut() {
    this.afAuth
      .signOut()
      .then(() => {
        localStorage.removeItem('User_Data');
        this.currentUser = null;
        this.setUserStatus(null);
        this.ngZone.run(() => this.router.navigate(['/login']));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  crearAuth(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }
}
