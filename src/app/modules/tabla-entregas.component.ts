import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-tabla-entregas',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './tabla-entregas.component.html',
  styleUrls: ['./tabla-entregas.component.css']
})
export class TablaEntregasComponent {
  displayedColumns: string[] = ['id', 'cliente', 'direccion', 'estado'];
  dataSource = [
    { id: 1, cliente: 'Juan Pérez', direccion: 'Calle 1', estado: 'Entregado' },
    { id: 2, cliente: 'Ana Ruiz', direccion: 'Calle 2', estado: 'Pendiente' },
    { id: 3, cliente: 'Carlos Gómez', direccion: 'Calle 3', estado: 'En ruta' },
    { id: 4, cliente: 'Alexander Hernandez', direccion: 'Calle 4', estado: 'Pendiente' },
    // ... puedo aqui agregar más datos simulados
  ];

  searchText = '';

  get filteredData() {
    if (!this.searchText) return this.dataSource;
    return this.dataSource.filter(row =>
      Object.values(row).some(val =>
        String(val).toLowerCase().includes(this.searchText.toLowerCase())
      )
    );
  }

  exportToExcel(): void {
    const ws = XLSX.utils.json_to_sheet(this.filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Entregas');
    XLSX.writeFile(wb, 'entregas.xlsx');
  }

  exportToPDF(): void {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [this.displayedColumns],
      body: this.filteredData.map(row => this.displayedColumns.map(col => row[col as keyof typeof row]))
    });
    doc.save('entregas.pdf');
  }
}
