import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  errorMessage = '';

  constructor(private router: Router) {}

  login() {
    const storedUser = localStorage.getItem('registeredUser');
  
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (this.credentials.username === parsedUser.username && this.credentials.password === parsedUser.password) {
        localStorage.setItem('authToken', 'simulated_token');
        localStorage.setItem('userRole', 'user');
        this.router.navigate(['/dashboard']);
        return;
      }
    }
  
    // Usuarios predefinidos (opcional)
    if (this.credentials.username === 'admin' && this.credentials.password === 'admin') {
      localStorage.setItem('authToken', 'simulated_admin_token');
      localStorage.setItem('userRole', 'admin');
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos.';
    }
  }
  
}
