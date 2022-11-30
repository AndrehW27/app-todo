import { Component, DoCheck, OnInit } from '@angular/core';

//Interface
import { TaskList } from 'src/app/modules/model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');

  constructor() { }

  ngDoCheck() {
    this.setLocalStorage();
  }

  ngOnInit(): void {
  }

  public setEmitItemTaskList(event: string){
    this.taskList.push({task: event, checked: false});
  }
  
  public deleteItemTaskList(event: number){
    this.taskList.splice(event, 1)
  }

  public deleteAll(){
    const confirm = window.confirm("Você deseja realmente apagar tudo?")
    if (confirm) {
         this.taskList = [];
    } 
  }

  public validationInput(event: string, index: number) {
    if (!event.length) {
      const confirm = window.confirm("Task está vazia, deseja deletar?")
      if (confirm) {
        this.deleteItemTaskList(index);        
      }      
    }
  }

  public setLocalStorage() {   
      this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked));
      localStorage.setItem("list", JSON.stringify(this.taskList));    
  }
}
