import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthServiceService } from './services/auth-service.service';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-angular-app';
  constructor(public auth :AuthServiceService){}
}
