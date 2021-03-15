import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList from "./ToDolist";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "complete";


function App() {
console.log(v1());
console.log(v1());
console.log(v1());


const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "HTML", isDone: true },
        { id: v1(), title: "CSS", isDone: true },
        { id: v1(), title: "JAVASCRIPT", isDone: false },
        
    ]);


    function removeTask(taskID: string) {
        setTasks(tasks.filter(task => task.id !== taskID));
    }

    function addTask(title: string) {
        const task: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const newTasks = [task, ...tasks];
        setTasks(newTasks);

    }

    const [todoListFilter, setTodoListFilter] = useState<FilterValuesType>("all");

    function changeTodoListFilter(newFilterValue: FilterValuesType) {
        setTodoListFilter(newFilterValue);
    }


    function getTasksForTodoList() {
        switch(todoListFilter) {
            case 'active':
                return tasks.filter(task => !task.isDone)
            case 'complete':
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }

    return (
        <div className="App">
            <TodoList
                title = {'What to learn'}
                tasks={getTasksForTodoList()}
                addTask = {addTask}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
}



export default App;


