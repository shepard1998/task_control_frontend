import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Task } from "../dto/task";
import { Tag } from "../dto/tag";

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

    public getTaskTags(taskId: any): Observable<any>
    {
        return this.http.put(this.url + "tag/task/" + taskId, "");
    }

    public addNewTask(task: Task): Observable<any>
    {
        return this.http.post<Task>(this.getUrl() + "task", task);
    }

    public addNewTag(tag: Tag): Observable<any>
    {
        return this.http.post<Tag>(this.url + "tag", tag);
    }

    public assignTaskToTag(idTask: any, idTag: any): Observable<any>
    {
        return this.http.put(this.url
             + "tag/"
             + idTag + "/"
             + "task/"
             + idTask, 
             "");
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