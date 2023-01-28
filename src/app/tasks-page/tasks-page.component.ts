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
  tasks: Task[] = [];
  tags: string[] = [];

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
    this.service.getTasks().subscribe(tasks =>
       {
        this.tasks = tasks;
        this.splitDescriptionInTags();
      });
  }

  public splitDescriptionInTags(): void
  {
    for(let i = 0; i < this.tasks.length; i++)
    {
      this.tasks[i].splittedDescription = this.tasks[i].description.split(" ");
    }
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

   public receiveMessage()
  {
    const newTask: Task = { description: this.concatTags() };
    console.log(this.tags);
    this.service.addNewTask(newTask).subscribe
    (
      taskData =>
      {
        this.fillTasks();
        this.tags = [];
      }
    );
  }

  public concatTags(): string
  {
    let concat = "";
    
    for(let i = 0; i < this.tags.length; i++)
    {
      concat += this.tags[i] + " ";
    }
    
    return concat;
  }

  public onSpaceKeyPress() {
    
    let value = this.descriptionControl.value.replace(/ /g, '').trim();
    if (value != "")
    {         
      if(
        this.tags.length > 0
        &&
        this.typeOfTag(this.tags[this.tags.length-1]) == "TYPE.plain"
        &&
        this.typeOfTag(value) == "TYPE.plain"
      )
      {
        this.tags[this.tags.length-1] = this.tags[this.tags.length-1] + " " +   value;
      }
      else
      {
        this.tags.push(value);      
      }
      this.descriptionControl.reset();
    }
  }

  public typeOfTag(tag: string): string
  {
    return this.service.typeOfTag(tag);
  }

}
