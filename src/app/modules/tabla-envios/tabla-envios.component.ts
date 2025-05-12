import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-tabla-envios',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './tabla-envios.component.html',
  styleUrls: ['./tabla-envios.component.css']
})
export class TablaEnviosComponent {
  displayedColumns: string[] = ['id', 'cliente', 'direccion', 'estado', 'fecha'];
  dataSource = new MatTableDataSource<Envio>([
    { id: 1, cliente: 'Juan Pérez', direccion: 'Calle A #123', estado: 'Entregado', fecha: '2024-05-01' },
    { id: 2, cliente: 'Ana López', direccion: 'Av. Central 45', estado: 'Pendiente', fecha: '2024-05-02' },
    { id: 3, cliente: 'Carlos Ruiz', direccion: 'Zona Industrial', estado: 'En ruta', fecha: '2024-05-03' },
    // aqui puedo agregar más datos o cargarlos luego de un archivo CSV/JSON
  ]);

  estados = ['Todos', 'Entregado', 'Pendiente', 'En ruta'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  aplicarFiltro(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  filtrarEstado(estado: string) {
    this.dataSource.filterPredicate = (data, filter) => {
      return filter === 'Todos' || data.estado === filter;
    };
    this.dataSource.filter = estado;
  }
}

interface Envio {
  id: number;
  cliente: string;
  direccion: string;
  estado: string;
  fecha: string;
}
