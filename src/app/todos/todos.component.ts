import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { TodosService } from '../services/todos.service';
import { todoItem } from '../model/todo.type';
import { catchError } from 'rxjs';
import { NgIf } from '@angular/common';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { FilterTodosPipe } from '../pipes/filter-todos.pipe';

@Component({
  selector: 'app-todos',
  imports: [NgIf, TodoItemComponent, FormsModule, FilterTodosPipe],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  todoService = inject(TodosService);
  todoItems = signal<Array<todoItem>>([]);
  searchTerm = signal('');

  ngOnInit(): void {
    this.todoService
      .getTodoItemsFromAPI()
      .pipe(
        catchError((error) => {
          console.log(error);
          throw error;
        })
      )
      .subscribe((todos) => {
        this.todoItems.set(todos);
      });
  }

  updateTodoItem = (todoItem : todoItem) => {
    this.todoItems.update((todos) => {
      return todos.map(todo => {
        if(todo.id == todoItem.id){
          return {
            ...todo,
            completed: !todo.completed
          }
        }
        
        return todo;
      })
    })
  }
}
