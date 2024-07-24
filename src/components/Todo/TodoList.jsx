import React, { useEffect, useState } from 'react'
import './TodoList.css'
import axios from 'axios'
function TodoList() {
  const [todoList, setTodoList] = useState([])
  const [todoInput, setTodoInput] = useState("")

useEffect(() => {
 async function getTodos(){
  try{
const allTodos = await axios.get('http://localhost:3000/api/todo/get-all-todos')
setTodoList(allTodos.data.todos)
  }catch(error) {
    console.log(error)
  }
 }
 getTodos()
}, [])

const handleOnSubmit = async (e)=>{
e.preventDefault()
try{
  const newTodoList = await axios.post('http://localhost:3000/api/todo/create-new-todo', {todo: todoInput})
  setTodoList(newTodoList.data.todos)
  setTodoList("")
}catch (error) {
  console.log(error)
}
}

const handleTodoDone = async (id)=>{
  const updatedTodo = await axios.put('http://localhost:3000/api/todo/toggle-done-by-id/${id}')
  //setTodoList(...todoList.filter(item=>item.id !== id))
  const newArray = [...todoList]
  const foundTodo = newArray.find(item=>item.id === id)
  foundTodo.done = updatedTodo.data.payload.done
  setTodoList(newArray)
}
  return (
    <div>
      
    <div className="form-div">
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="todoInput"
          onChange={e => setTodoInput(e.target.value)}
            value = {todoInput}
              autoFocus/>
            
            <button type="submit">Submit</button>
      </form>
    </div>
      <div className='todolist-div'>
        <ul>
          {
            todoList.map(todo =>{
              return(
                <li onClick = {()=>handleTodoDone(todo.id)} style={{textDecoration: todo.done ? "line-through" : "none"}} key={todo.id}>
                  {todo.todo}
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default TodoList