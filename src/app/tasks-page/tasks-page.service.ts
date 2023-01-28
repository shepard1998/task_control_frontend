import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Task } from "../dto/task";

@Injectable ({
    providedIn: 'root'
})

export class TasksPageService
{
    private url = "http://localhost:8080/api/v1/";

    constructor(private http: HttpClient){}

    public getUrl()
    {
        return this.url;
    }

    public getTasks() : Observable<any>
    {
        return this.http.get(this.url + "task");
    }


    public addNewTask(task: Task): Observable<any>
    {
        return this.http.post<Task>(this.getUrl() + "task", task);
    }


    public typeOfTag(tag: string): string
  {
    const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regexLink = new RegExp(expression);
    let type: string = "TYPE.plain";    

    if (tag.startsWith("@")) { type = "TYPE.contact" }
    if (regexLink.test(tag)) { type = "TYPE.link" }    
    if (regexExp.test(tag)) { type = "TYPE.email" }
    if (tag.startsWith("#")) { type = "TYPE.hashtag" }

    return type;
  } 

  public splitDescriptionInTags(tasks: Task[]): void
  {
    for(let i = 0; i < tasks.length; i++)
    {
      tasks[i].splittedDescription = tasks[i].description.split(" ");
    }
  }

  public concatTags(tags: string[]): string
  {
    let concat = "";
    
    for(let i = 0; i < tags.length; i++)
    {
      concat += tags[i] + " ";
    }
    
    return concat;
  }
}