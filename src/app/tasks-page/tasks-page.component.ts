import { Component, OnInit } from '@angular/core';
import { Task } from '../dto/task';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksPageService } from './tasks-page.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css'],
  providers: [TasksPageService]
})
export class TasksPageComponent implements OnInit{
 
  showDecoration!: boolean;
  tasks?: Task[];

  newTaskForm = new FormGroup({ description: new FormControl('', [Validators.required]) });
  
  constructor(private service: TasksPageService){ }

  get descriptionControl(): FormControl{ return this.newTaskForm.get('description') as FormControl; }

  public ngOnInit(): void
  {
     this.showDecoration = false;
     this.fillTasks(); 
  }

  public fillTasks(): void
  {
    this.service.getTasks().subscribe(tasks => {this.tasks = tasks});
  }
  
  public onFocusEvent(): void
  {
     this.showDecoration = true;
     const card = document.getElementById('card');
     card?.classList.add('card-container');
  }

  public onFocusOutEvent(): void
  {
    //this.showDecoration = false;
    //const card = document.getElementById('card');
    //card?.classList.remove('card-container');
   }

   public receiveMessage() {
    const newTask: Task = { description: this.descriptionControl.value };
    this.service.addNewTask(newTask).subscribe
    (
      data => this.tasks?.push(data)
    );
  }

}
