import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css']
})
export class TasksPageComponent implements OnInit{
  showDecoration!: boolean;

  ngOnInit(): void { this.showDecoration = false; }
  
  onFocusEvent(): void
  {
     this.showDecoration = true;
     const card = document.getElementById('card');
     card?.classList.add('card-container');
  }

  onFocusOutEvent(): void
  {
    this.showDecoration = false;
    const card = document.getElementById('card');
     card?.classList.remove('card-container');
   }
}
