import { Component, OnInit, ViewChild } from '@angular/core';
import { Tarea } from '../../models/tarea';
import { TareaService } from '../../services/tarea.service';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TareaFormComponent } from '../tarea-form/tarea-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarea-list',
  standalone: true,
  imports: [MaterialModule, FormsModule, FlexLayoutModule ],
  templateUrl: './tarea-list.component.html',
  styleUrl: './tarea-list.component.css'
})
export class TareaListComponent implements OnInit{

  tareas?: Tarea[];//navegación segura

  displayedColumns = ['titulo', 'descripcion', 'completado', 'accion'];
  dataSource = new MatTableDataSource<Tarea>();

  @ViewChild(MatSort) ordenamiento?: MatSort;
  @ViewChild(MatPaginator) paginador?: MatPaginator;

  constructor (private tareaService: TareaService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cargarTareas();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.ordenamiento ?? null;
    this.dataSource.paginator = this.paginador ?? null;
  }

  cargarTareas(): void{
    this.tareaService.getAllTareas().subscribe((tarea) => {
      this.dataSource.data = tarea;
    })
  }

  abrirDialog(operation: string, productId?: number): void {
    const dialogRef = this.dialog.open(TareaFormComponent, {
      width: '550px',
      data: { operation, productId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.cargarTareas();
    });
  }

  buscar(event: KeyboardEvent) {
    const inputBuscar = event.target as HTMLInputElement;
    this.dataSource.filter = inputBuscar.value.trim().toLowerCase();
  }

  eliminarTarea(id?: number):void{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#716add",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.tareaService.deleteTarea(id!).subscribe(()=>{
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          }).then(() => {
            this.cargarTareas();
          })
        });
      }
    });
  }

}
