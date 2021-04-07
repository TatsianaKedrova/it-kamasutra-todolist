import React, { ChangeEvent } from 'react';
import {FilterValuesType, TaskType, } from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

// 
type TodoListPropsType = {
    id: string,
    title: string,
    todoListFilter: FilterValuesType,
    tasks: Array<TaskType>,
    addTask: (title: string, todoListID: string) => void,
    removeTask: (taskID: string, todoListID: string) => void,
    removeTodoList: (todoListID: string) => void,
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void,
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListID: string) => void,
    changeTodoListTitle: (title:string, todoListID: string) => void,
    changeTaskStatus: (taskID: string,  newIsDone: boolean, todoListID: string) => void
}



function TodoList(props: TodoListPropsType) {

    // const [title, setTitle] = useState<string>("");
    // const [error, setError] = useState<string | null>(null)
    const tasks = props.tasks.map( task => {
        const removeTask = () => props.removeTask(task.id, props.id)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(task.id, title, props.id)
        }
        return (
            <li key={task.id}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={changeStatus}/>
                <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                {/* <span>{task.title}</span> */}
                
                
                <button
                className="btn-remove"
                onClick={removeTask}>X</button>
            </li>
        ) 

    });

    const removeToDoList = () => {
        props.removeTodoList(props.id)
    }

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }
    const setAllFilterValue = () => props.changeTodoListFilter("all", props.id);
    const setActiveFilterValue = () => props.changeTodoListFilter("active", props.id);
    const setCompleteFilterValue = () => props.changeTodoListFilter("complete", props.id);
    // const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    //     setError(null)
    //     setTitle(e.currentTarget.value);
    // }
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    // const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if(e.key === "Enter") {
    //         addTask();
    //     }
    // }

    return (
        <div>
            <h3>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={removeToDoList}>X</button>
            </h3> 
            {/* //{props.title} */}
            <AddItemForm addItem = {addTask}/>
            <ul>
                {tasks}
            </ul>
            <div>
                <button
                    className = {(props.todoListFilter === "all" ) ? "active-filter" : ""}
                    onClick={setAllFilterValue}
                >All</button>
                <button
                    className = {props.todoListFilter === "active" ? "active-filter" : ""}
                    onClick={setActiveFilterValue}>Active</button>
                <button
                    className = {props.todoListFilter === "complete" ? "active-filter" : ""}
                    onClick={setCompleteFilterValue}>Completed</button>
            </div>
        </div>

    );
}

export default TodoList;

// className={task.isDone ? "is-done" : ""}


