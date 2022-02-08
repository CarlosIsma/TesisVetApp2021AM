import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-sent-email',
  templateUrl: './sent-email.page.html',
  styleUrls: ['./sent-email.page.scss'],
  providers:[AuthService],
})
export class SentEmailPage implements OnInit {
  //public user$: Observable<any>=this.auth.AFauth.user;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  onSendEmail(){
    this.auth.sendVerificationEmail();
  }

  exitAplication(){
    //this.auth.errorVerificationEmail();
  }

}
