import React, {useState} from 'react';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';
import './App.css';
import TodoList from "./ToDolist";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "complete";

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string] : Array<TaskType>
}

function App() {

    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ]);

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JAVASCRIPT", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JAVASCRIPT", isDone: false},
        ],
    });


    // const [todoListFilter, setTodoListFilter] = useState<FilterValuesType>("all");
    function removeTask(taskID: string, todoListID: string) {
        const updatedTasks = tasks[todoListID].filter(task => task.id !== taskID);
        setTasks({
            ...tasks,
            [todoListID]: updatedTasks
        })
    }

    function addTask(title: string, todoListID: string) {

        const newTask = {
            id: v1(),
            title,
            isDone: false
        }
        const updatedTasks = [newTask, ...tasks[todoListID]]
        setTasks({
            ...tasks,
            [todoListID]: updatedTasks
        })
    }

    /*const task: TaskType = {
        id: v1(),
        title: title,
        isDone: false
    }
    setTasks([task, ...tasks])*/

    function changeTaskStatus(taskID: string, newIsDone: boolean, todoListID: string) {
        const updatedTasks = tasks[todoListID].map(task => task.id === taskID ? {...task, isDone: newIsDone} : task)
        setTasks({
            ...tasks,
            [todoListID]: updatedTasks
        })
    }

    
    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const updatedTasks = tasks[todoListID].map(task => task.id === taskID ? {...task, title} : task)
        setTasks({
            ...tasks,
            [todoListID]: updatedTasks
        })
    }

    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const updatedTodoLists = todoLists.map(tl => tl.id === todoListID ? {...tl, filter: newFilterValue} : tl)
        setTodoLists(updatedTodoLists)
        // setTodoListFilter(newFilterValue);
    }

    function removeTodoList(todoListID: string) {
        const updatedTodoLists = todoLists.filter(tl => tl.id !== todoListID)
        setTodoLists(updatedTodoLists)
        delete tasks[todoListID]
    }

    function getTasksForTodoList(todoList: TodoListType): Array<TaskType> {
        switch (todoList.filter) {
            case 'complete':
                return tasks[todoList.id].filter(task => task.isDone)
            case 'active':
                return tasks[todoList.id].filter(task => !task.isDone)
            default:
                return tasks[todoList.id]
        }
    }

    function addTodoList(title: string) {
        const newTodoListID = v1();
        const newTodoList: TodoListType = {
            id: newTodoListID, 
            title, 
            filter: "all"
        };
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }

    function changeTodoListTitle(title:string, todoListID: string) {
        const updatedTodoLists = todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl)
        setTodoLists(updatedTodoLists)
       
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} />
            {
                todoLists.map(tl => {
                    return (
                        <TodoList
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            todoListFilter={tl.filter}
                            tasks={getTasksForTodoList(tl)}
                            addTask={addTask}
                            removeTask={removeTask}
                            removeTodoList={removeTodoList}
                            changeTaskTitle={changeTaskTitle}
                            changeTodoListFilter={changeTodoListFilter}
                            changeTodoListTitle={changeTodoListTitle}
                            changeTaskStatus={changeTaskStatus}
                        />
                    )
                })
            }
        </div>
    );
}



export default App;


