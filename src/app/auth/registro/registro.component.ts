import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'; // Importar FormsModule

interface NewUser {
  username: string;
  password: string;
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule],  // Asegúrate de incluir FormsModule aquí
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  newUser: NewUser = { username: '', password: '' };
  errorMessage: string = '';

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  register() {
    if (this.newUser.username && this.newUser.password) {
      // Guardamos el usuario simulado en localStorage
      localStorage.setItem('registeredUser', JSON.stringify(this.newUser));
  
      this.snackBar.open('Usuario registrado con éxito', 'Cerrar', { duration: 3000 });
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Por favor, completa todos los campos.';
      this.snackBar.open(this.errorMessage, 'Cerrar', { duration: 3000 });
    }
  }
  
}

