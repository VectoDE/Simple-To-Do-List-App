import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, id: Date.now() }]);
      setNewTodo('');
    }
  };

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (todo) => {
    setIsEditing(true);
    setCurrentTodo(todo);
  };

  const handleEditInputChange = (event) => {
    setCurrentTodo({ ...currentTodo, text: event.target.value });
  };

  const saveEdit = () => {
    setTodos(todos.map(todo => (todo.id === currentTodo.id ? currentTodo : todo)));
    setIsEditing(false);
  };

  return (
    <div className="App">
      <div className="todo-container">
        <h1>ToDo List</h1>
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTodo}
          onChange={handleInputChange}
        />
        <button onClick={addTodo}>Add</button>
        <section>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                {todo.text}
                <div className="button-container">
                  <button onClick={() => editTodo(todo)}>Edit</button>
                  <button className="delete-button" onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
        {isEditing && (
          <div className="edit-popup">
            <input
              type="text"
              value={currentTodo.text}
              onChange={handleEditInputChange}
            />
            <button onClick={saveEdit}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
