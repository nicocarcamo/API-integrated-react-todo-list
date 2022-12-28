import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');
    const [username, setUsername] = useState('');

    const handleChange = (event) => {
        setTodo(event.target.value);
    };

    const handleSubmitUser = async (event) => {
        event.preventDefault();
        console.log(event);
        const inputFieldValue = event.target.elements.inputField.value;
        try {
          const response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${inputFieldValue}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todo: todo }),
          });
          const data = await response.json();
          if (data.result) {
            toast.success('User Successfully Created!', {
              position: "top-left",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            toast.error("Couldn't Create. User Already Exists!", {
              position: "top-left",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        } catch (error) {
          console.log(error);
        }
        event.target.reset();
      };
      
      const handleGetUser = async (event) => {
        event.preventDefault();
        console.log(event);
        const inputFieldValue = event.target.elements.inputField.value;
        setUsername(inputFieldValue);
        try {
          const response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${inputFieldValue}`);
          if (response.ok) {
            const data = await response.json();
            setTodos(data);
            toast.success("User & Todo's Successfully Fetched From The Server!", {
              position: "top-left",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
              theme: "light"
            });
          } else {
            throw new Error(response.statusText);
          }
        } catch (error) {
          console.log(error);
          toast.error("Couldn't fetch. User Doesn't Exist!", {
            position: "top-left",
            autoClose: 2500,
            hideProgressBar: false,
            draggable: true,
            progress: undefined,
            theme: "light"
          });
        }
        event.target.reset();
      };
      
            
      const handleSubmit = async (event) => {
        event.preventDefault();
        if (todo.trim() !== '') {
          try {
            const response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`);
            const data = await response.json();
            const newTodos = [...data, { label: todo, done: false }];
            const putResponse = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
              method: 'PUT',
              body: JSON.stringify(newTodos),
              headers: {
                'Content-Type': 'application/json'
              }
            });
            console.log(putResponse)
            toast.success('Todo List Updated Successfully!', {
              position: "top-left",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
              theme: "light"
            });
            setTodos(newTodos);
            setTodo('');
          } catch (error) {
            console.log(error);
            toast.error("You Have To Fetch A User From The API First!", {
                position: "top-left",
                autoClose: 2500,
                hideProgressBar: false,
                draggable: true,
                progress: undefined,
                theme: "light"
              });
          }
        }
      };
      

      const handleDelete = async (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
        try {
          const response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
            method: 'PUT',
            body: JSON.stringify(newTodos),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = await response.json();
          if (data.result) {
            toast.success('Todo List Updated Successfully!', {
              position: "top-left",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
              theme: "light"
            });
          } else {
            console.error('Error updating todo list:', data.message);
          }
        } catch (error) {
          console.log(error);
        }
      };
      

      const handleDeleteAll = async () => {
        try {
          const response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
            method: 'DELETE'
          });
          const data = await response.json();
          if (data.result === 'ok') {
            toast.success("User & Todo's Successfully Deleted!", {
              position: "top-left",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
              theme: "light"
            });
            setTodos([]);
          } else {
            console.error('Error deleting user and todo list:', data.message);
          }
        } catch (error) {
          console.log(error);
        }
      };
      

    return (
        <div className="container my-5">
            <h1 className="todos-title text-center mb-5">TODOS</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        name="inputField"
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
                    <li className="list-group-item text-center">No tasks, add a task.</li>
                ) : (
                    todos.map((todo, index) => (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            {todo.label}
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
            <button type="button" className="btn btn-danger mt-3 mb-5" onClick={handleDeleteAll}>
                Delete User & Todos
            </button>
            <form className="d-flex my-2" onSubmit={handleSubmitUser}>
                <input className="form-control user-input" type="text" name="inputField" id="inputField" placeholder="Enter new username..." />
                <button className="btn btn-secondary btn-sm ms-2" type="submit">Create New User</button>
            </form>
            <form className="d-flex my-2" onSubmit={handleGetUser}>
                <input className="form-control user-input" type="text" name="inputField" id="inputField" placeholder="Enter username..." />
                <button className="btn btn-secondary btn-sm ms-2" type="submit">Get User Todos List</button>
            </form>
            <ToastContainer
                position="top-left"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="light"
            />
        </div>
    );
}

export default TodoList;

