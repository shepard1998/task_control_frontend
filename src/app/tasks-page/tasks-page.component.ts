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
  placeholder: string = 'Type to add a new task';
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
     const input = document.getElementById('input-task');
     card?.classList.add('card-container');
  }

  public cancelTask(): void
  {
    this.showDecoration = false;
    const card = document.getElementById('card');
    card?.classList.remove('card-container');
    this.descriptionControl.setValue('');
  }

  public deleteTag(): void
  {
    if (this.tags.length > 0 && (this.descriptionControl.value == null || this.descriptionControl.value == ""))
    {
      this.tags.pop();
      if (this.tags.length == 0) { this.placeholder = "Type to add a new task" }
    }
  }

   public receiveMessage()
  {
    let concatText = this.concatTags();

    if (this.descriptionControl.value != null){ concatText += this.descriptionControl.value };

    const newTask: Task = { description: concatText };

    this.service.addNewTask(newTask).subscribe
    (
      taskData =>
      {
        this.fillTasks();
         this.tags = [];
         this.descriptionControl.reset();
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
      this.tags.push(value);
      this.placeholder = "";  
      this.descriptionControl.reset();
    }
  }

  public typeOfTag(tag: string): string
  {
    return this.service.typeOfTag(tag);
  }

}
