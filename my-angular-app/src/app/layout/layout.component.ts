import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  menuOpen = false;
constructor( public auth :AuthServiceService,private router :Router){}
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  logout(){
    localStorage.removeItem("token")
    this.router.navigate(['/login'])

  }
}
