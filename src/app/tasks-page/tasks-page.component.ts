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
  tags?: string[] = [];

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

  public cancelTask(): void
  {
    this.showDecoration = false;
    const card = document.getElementById('card');
    card?.classList.remove('card-container');
    this.descriptionControl.setValue('');
   }

   public receiveMessage() {
    const newTask: Task = { description: this.descriptionControl.value };
    this.service.addNewTask(newTask).subscribe
    (
      data => this.tasks?.push(data)
    );
  }


  public onSpaceKeyPress() {
    console.log(this.descriptionControl.value)
    this.tags?.push(this.descriptionControl.value);
    this.descriptionControl.setValue('');

  }

  public typeOfTag(tag: string): string
  {
    const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    let type: string = "TYPE.plain";

    if (tag.startsWith("@")) { type = "TYPE.contact" }
    if (tag.startsWith("www.") && tag.endsWith(".com")) { type = "TYPE.link" }    
    if (regexExp.test(tag)) { type = "TYPE.email" }
    if (tag.startsWith("#")) { type = "TYPE.hashtag" }

    return type;
  }

}
