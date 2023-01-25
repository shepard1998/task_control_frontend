import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-task-footer',
  templateUrl: './task-footer.component.html',
  styleUrls: ['./task-footer.component.css']
})
export class TaskFooterComponent {

  @Output() messageEvent = new EventEmitter();

  addTask(): void{ this.messageEvent.emit(); }
}
