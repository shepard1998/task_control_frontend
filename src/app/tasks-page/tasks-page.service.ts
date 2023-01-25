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
}