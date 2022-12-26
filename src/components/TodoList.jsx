import React, { useState } from 'react';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');

    const handleChange = (event) => {
        setTodo(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setTodos([...todos, todo]);
        setTodo('');
    };

    const handleDelete = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    return (
        <div className="container mt-5">
            <h1 className="todos-title text-center mb-5">TODOS</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="todo"
                        placeholder='What needs to be done?'
                        value={todo}
                        onChange={handleChange}
                    />
                </div>
            </form>
            <ul className="list-group mt-5">
                {todos.length === 0 ? (
                    <li className="list-group-item text-center">No tasks, add a task</li>
                ) : (
                    todos.map((todo, index) => (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            {todo}
                            <button
                                type="button"
                                className="btn-close delete-button"
                                onClick={() => handleDelete(index)}
                            >
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default TodoList;

