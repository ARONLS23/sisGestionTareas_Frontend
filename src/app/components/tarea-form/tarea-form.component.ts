import { Component, Inject, OnInit } from '@angular/core';
import { Tarea } from '../../models/tarea';
import { TareaService } from '../../services/tarea.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarea-form',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, FlexLayoutModule],
  templateUrl: './tarea-form.component.html',
  styleUrl: './tarea-form.component.css'
})
export class TareaFormComponent implements OnInit{

  form: FormGroup;
  id: number;
  operacion: string = '';

  constructor(private fb: FormBuilder, private tareaService: TareaService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any){
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      completado: ['', Validators.required]
    });
    this.id = this.data.productId;
    this.operacion = this.data.operation;
  }

  ngOnInit(): void {

    if (this.operacion ==='edit') {
      this.buscarTarea(this.id);
    }

  }


  buscarTarea(id: number){
    this.tareaService.getTareaById(id).subscribe( (data: Tarea) =>{
      this.form.patchValue({
        titulo: data.titulo,
        descripcion: data.descripcion,
        completado: data.completado
      })
    })
  }

  formTarea(): void {
    const tarea: Tarea = {
      id: this.id,
      titulo: this.form.value.titulo,
      descripcion: this.form.value.descripcion,
      completado: this.form.value.completado
    }

    if(this.operacion === 'edit'){
      this.tareaService.updateTarea(this.id, tarea).subscribe( () =>{
        Swal.fire("Tarea actualizada!");
        this.dialog.closeAll();
      })
    }else{
      this.tareaService.createTarea(tarea).subscribe( () => {
        Swal.fire("Tarea registrada!");
        this.dialog.closeAll();
      })
    }
  }

}
