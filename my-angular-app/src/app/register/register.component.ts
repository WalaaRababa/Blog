import { Component, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import User from '../../interface/user';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  implements OnDestroy{
  private subscription: Subscription = new Subscription();

  user: User = {
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  }
  errorMessage = signal<string>('')
  message = signal<boolean>(false)
  constructor(private auth: AuthServiceService, private router: Router) { }
  handelCreateUser(event: any) {
    event.preventDefault() 
    const userSubscription = this.auth.CreateUser(this.user).subscribe({
      next: () => {
        this.message.set(true);
      },
      error: (error) => {
        console.log(error.error);
        this.errorMessage.set(error.error.message);
      }
    });
        this.subscription.add(userSubscription);
}
  hideModalMessage() {
    this.message.set(false)
    this.router.navigate(['/login'])
  }
  hideModal() { this.errorMessage.set('') }
    ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
