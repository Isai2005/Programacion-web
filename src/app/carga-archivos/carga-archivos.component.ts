import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-carga-archivos',
  standalone: true,
  templateUrl: './carga-archivos.component.html',
  styleUrls: ['./carga-archivos.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class CargaArchivosComponent {
  data: any[] = [];
  columnas: string[] = [];

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    const extension = file.name.split('.').pop().toLowerCase();

    reader.onload = () => {
      const contenido = reader.result as string;

      if (extension === 'csv') {
        this.parseCSV(contenido);
      } else if (extension === 'json') {
        this.parseJSON(contenido);
      } else {
        alert('Formato no soportado. Usa CSV o JSON.');
      }
    };

    reader.readAsText(file);
  }

  parseCSV(texto: string) {
    const lineas = texto.trim().split('\n');
    const cabeceras = lineas[0].split(',').map(c => c.trim());
    this.columnas = cabeceras;

    this.data = lineas.slice(1).map(linea => {
      const valores = linea.split(',').map(v => v.trim());
      const objeto: any = {};
      cabeceras.forEach((key, i) => objeto[key] = valores[i]);
      return objeto;
    });
  }

  parseJSON(texto: string) {
    try {
      const json = JSON.parse(texto);
      if (Array.isArray(json)) {
        this.data = json;
        this.columnas = Object.keys(json[0] || {});
      } else {
        alert('El JSON debe ser un arreglo de objetos.');
      }
    } catch {
      alert('JSON inválido.');
    }
  }
}
