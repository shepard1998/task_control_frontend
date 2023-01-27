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
        this.tasks = tasks
        for(var i = 0; i < this.tasks.length; i++)
        {
          console.log(this.tasks[i]);
          this.getTaskTags(this.tasks[i]);
          console.log(this.tasks[i]);
        }
      });
  }

  public getTaskTags(task: Task): void
  {
    this.service.getTaskTags(task.id).subscribe
    (
      data => task.tags = data
    )
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
    const newTask: Task = { };
    this.service.addNewTask(newTask).subscribe
    (
      taskData =>
      {
        for (var i = 0; i < this.tags.length; i++)
        {
          this.service.addNewTag({ text: this.tags[i] }).subscribe
          (
            tagData =>
            {
              console.log(tagData.id);
              this.service.assignTaskToTag(taskData.id, tagData.id).subscribe();
              this.fillTasks();
              this.tags = [];
            }
          )
        }
      }
    );
  }


  public onSpaceKeyPress() {
    
    let value = this.descriptionControl.value.replace(/ /g, '').trim();
    if (value != "")
    {      
      console.log(value);
      
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
