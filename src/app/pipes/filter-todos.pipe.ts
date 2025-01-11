import { Pipe, PipeTransform } from '@angular/core';
import { todoItem } from '../model/todo.type';

@Pipe({
  name: 'filterTodos'
})
export class FilterTodosPipe implements PipeTransform {

  transform(todos : todoItem[], searchTerm : string): todoItem[] {
    if(!searchTerm){
      return todos;
    }

    const text = searchTerm.toLowerCase();

    return todos.filter((todo) => {
      return todo.title.includes(text);
    })
  }

}
