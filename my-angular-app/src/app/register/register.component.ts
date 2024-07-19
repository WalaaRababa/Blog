import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import User from '../../interface/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
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
    this.auth.CreateUser(this.user).subscribe((res) => {
      this.message.set(true)
    }, error => {
      console.log(error.error);
      this.errorMessage.set(error.error.message)
    })
  }
  hideModalMessage() {
    this.message.set(false)
    this.router.navigate(['/login'])
  }
  hideModal() { this.errorMessage.set('') }
}
