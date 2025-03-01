import React, { useState, useEffect } from "react";
import "./App.css"
const TaskManager = () => {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskInput.trim()) return;
    const newTask = { id: Date.now(), name: taskInput };
    setTasks(prevTasks => [...prevTasks, newTask]);
    setTaskInput("");
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      <div className="input-container">
        <input 
          type="text" 
          value={taskInput} 
          onChange={(e) => setTaskInput(e.target.value)} 
          placeholder="Enter a task"
        />
        <button onClick={addTask} className="add-button">Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            <span>{task.name}</span>
            <button onClick={() => deleteTask(task.id)} className="delete-button">✖</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
