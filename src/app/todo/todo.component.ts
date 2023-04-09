import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  tasks: string[] = [];
  newTask: string = '';
  completedTasks: boolean[] = [];
  editIndex: number = -1;

  ngOnInit() {
    this.loadTasks();
  }

  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push(this.newTask.trim());
      this.completedTasks.push(false);
      this.newTask = '';
      this.saveTask();
    }
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
    this.completedTasks.splice(index, 1);
    this.saveTask();
  }

  saveTask() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('completedTasks', JSON.stringify(this.completedTasks));
  }

  loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }

    const savedCompletedTasks = localStorage.getItem('completedTasks');
    if (savedCompletedTasks) {
      this.completedTasks = JSON.parse(savedCompletedTasks);
    }
  }

  editTask(index: number) {
    this.editIndex = index;
  }

  saveEditedTask(index: number, editedTask: string) {
    this.tasks[index] = editedTask;
    this.editIndex = -1;
    this.saveTask();
  }

  cancelEdit() {
    this.editIndex = -1;
  }
}
