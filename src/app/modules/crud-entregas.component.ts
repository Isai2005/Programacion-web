import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-crud-entregas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
  ],
  templateUrl: './crud-entregas.component.html',
  styleUrls: ['./crud-entregas.component.css']
})
export class CrudEntregasComponent {
  entregaForm: FormGroup;
  entregas: any[] = [];
  editando = false;
  indexEditando = -1;

  constructor(private fb: FormBuilder, private snack: MatSnackBar, private dialog: MatDialog) {
    this.entregaForm = this.fb.group({
      cliente: ['', Validators.required],
      direccion: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  guardar() {
    if (this.entregaForm.invalid) return;
  
    const nuevaEntrega = { ...this.entregaForm.value };
  
    if (this.editando) {
      this.entregas[this.indexEditando] = nuevaEntrega;
      this.entregas = [...this.entregas]; // 🚨 Importante: forzar redibujo
      this.snack.open('Entrega actualizada', 'Cerrar', { duration: 2000 });
    } else {
      this.entregas = [...this.entregas, nuevaEntrega]; // 🚨 Esto también forza redibujo
      this.snack.open('Entrega registrada', 'Cerrar', { duration: 2000 });
    }
  
    this.resetear();
  }
  
  

  editar(index: number) {
    this.editando = true;
    this.indexEditando = index;
  
    // aqui clone para evitar edición directa del array
    const entrega = { ...this.entregas[index] };
    this.entregaForm.patchValue(entrega);
  }
  

  eliminar(index: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { mensaje: '¿Estás seguro de eliminar esta entrega?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.entregas.splice(index, 1);
        this.entregas = [...this.entregas]; // 🚨 aqui forze el redibujo de la tabla
        this.snack.open('Entrega eliminada', 'Cerrar', { duration: 2000 });
      }
    });
  }

  resetear() {
    this.entregaForm.reset();
    this.entregaForm.markAsPristine();
    this.entregaForm.markAsUntouched();
    this.editando = false;
    this.indexEditando = -1;
  }
  
  exportarExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.entregas);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Entregas');
  
    XLSX.writeFile(workbook, 'entregas.xlsx');
  }
  
  exportarPDF() {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Cliente', 'Dirección', 'Estado']],
      body: this.entregas.map(e => [e.cliente, e.direccion, e.estado]),
    });
    doc.save('entregas.pdf');
  }
  
  exportarJSON() {
    const dataStr = JSON.stringify(this.entregas, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'entregas.json';
    a.click();
  
    window.URL.revokeObjectURL(url);
  }
  
}
