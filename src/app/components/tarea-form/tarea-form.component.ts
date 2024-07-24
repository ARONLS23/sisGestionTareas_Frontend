import { Component, OnInit } from '@angular/core';
import { Tarea } from '../../models/tarea';
import { TareaService } from '../../services/tarea.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tarea-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tarea-form.component.html',
  styleUrl: './tarea-form.component.css'
})
export class TareaFormComponent implements OnInit{

  tarea: Tarea = new Tarea();

  constructor(private tareaService: TareaService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    
    const tareaId = +this.route.snapshot.paramMap.get('id')!;//transformar string a numero '+'

    if (tareaId) {
      this.tareaService.getTareaById(tareaId).subscribe(tarea =>{
        this.tarea = tarea;
      })
    }

  }
  

  onSaveTarea():void{
    if (this.tarea.id) {
      this.tareaService.updateTarea(this.tarea.id, this.tarea).subscribe(updateTarea =>{
        this.router.navigate(['/tareas']);
      });
    }else{
      this.tareaService.createTarea(this.tarea).subscribe(savedTarea => {
        this.router.navigate(['/tareas']);
      })
    }
  }

}
