import { Component, OnDestroy, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnDestroy{
  private subscription: Subscription = new Subscription();
  constructor(private auth: AuthServiceService, private router: Router) { }
  userInfo = {
    email: '',
    password: ''
  }
  errorMessage = signal<string>('')

  handelLogin(event: any) {
    event.preventDefault()
   const userSubscription= this.auth.login(this.userInfo).subscribe((res) => {
      console.log(res);
      localStorage.setItem("token", res)
      this.router.navigate(['/home'])
    }, error => {
      console.log(error);
      this.errorMessage.set(error.error.message)

    })
    this.subscription.add(userSubscription);

  }
  hideModal() { this.errorMessage.set('') }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
