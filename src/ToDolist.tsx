import React, { ChangeEvent } from 'react';
import {FilterValuesType, TaskType, } from './App';
import { useState, KeyboardEvent } from 'react';

// 
type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>,
    addTask: (title: string) => void,
    removeTask: (taskID: string) => void,
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void;
}



function TodoList(props: TodoListPropsType) {

    const [title, setTitle] = useState<string>("");


    const tasks = props.tasks.map( task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button
                className="btn-remove"
                onClick={() => props.removeTask(task.id)}>X</button>
            </li>
        ) 

    });

    
    const setAllFilterValue = () => props.changeTodoListFilter("all");
    const setActiveFilterValue = () => props.changeTodoListFilter("active");
    const setCompleteFilterValue = () => props.changeTodoListFilter("complete");
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value); 
    const addTask = () => {
        props.addTask("Task");
        setTitle("");
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            addTask();
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}
                />
                <button onClick = {addTask}>+</button>
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button
                    onClick={setAllFilterValue}
                >All</button>
                <button onClick={setActiveFilterValue}>Active</button>
                <button onClick={setCompleteFilterValue}>Completed</button>
            </div>
        </div>

    );
}




export default TodoList;




