import React, { ChangeEvent, FC, useState } from "react";
import "./App.css";
import { ITask } from "./components/Interface/interface";
import TodoTask from "./components/todoList/TodoTask";


const App:FC = () => {
    const [task, setTask] = useState<string>("");
    const [deadline, setDeadline] = useState<number>(0);
    const [todoList, setTodoList] = useState<ITask[]>([]);
  
  const handleChange = (event:ChangeEvent<HTMLInputElement>):void =>{
  if(event.target.name==="task"){
    setTask(event.target.value)
  }else{
    setDeadline(Number(event.target.value))
  }
  } ;
  
  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName !== taskNameToDelete;
      })
    );
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline };
    setTodoList( [ ...todoList,  newTask] );
    setTask("");
    setDeadline(0);
  };
  return (
    <div className="dashboard">
	<div className="dashboard-left">
		<div className="left-header">
			<h3>Create a task!</h3>
		</div>
		<div className="left-task">
			<div className="task-info task-item">
				<label  className="task-label">Task</label>
				<input onChange={handleChange}
        name="task" type="text"
         className="task-info-input task-input" 
        placeholder='Go to the gym...' required
        
        />
				<label  className="task-label">Tag</label>
				<input onChange={handleChange} 
        name="deadline"  type="number"
         className="task-input task-type-input"
          placeholder="Deadline.." required/>
			</div>
			<button onClick={addTask} className="task-add">Add Task</button>
		</div>
	</div>
	<div className="dashboard-right">
  {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}

	</div>
</div>
  );
};

export default App;