import { Component, OnInit } from '@angular/core';
import { Tarea } from '../../models/tarea';
import { TareaService } from '../../services/tarea.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tarea-list',
  standalone: true,
  imports: [NgFor,RouterLink ],
  templateUrl: './tarea-list.component.html',
  styleUrl: './tarea-list.component.css'
})
export class TareaListComponent implements OnInit{

  tareas?: Tarea[];//navegación segura

  constructor (private tareaService: TareaService) {}

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void{
    this.tareaService.getAllTareas().subscribe(tarea =>{
      this.tareas = tarea;
    })
  }

  eliminarTarea(id?: number):void{
    this.tareaService.deleteTarea(id!).subscribe(()=>{
      this.cargarTareas();
    })
  }

}
