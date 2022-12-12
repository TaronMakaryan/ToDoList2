import React, { useState } from 'react'
import './App.css';





function App() {
  const initialState = JSON.parse(localStorage.getItem("todos")) || []
  const[allTodos,setTodos]=React.useState(initialState)
  const[inputTodo,setTodo]=React.useState("")
  const[inpStyle, setStyle] = useState("inp_ok");
  const[warning54, setWarningState] = useState(false)
  const[hideCompleted, setHideCompleted] = useState(false)

  const[catchId,setcCatchId]=useState()


  React.useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(allTodos))
  },[allTodos])

  function inputChanged(event){
    if (event.target.value.length > 54){
      setStyle('inp_error')
      setWarningState(true)
    } else {
      setStyle('inp_ok')
      setWarningState(false)
    }
    setTodo(event.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()

    const newTodo = {
      id:new Date().getTime(),
      text:inputTodo,
      completed:false
    }

    setTodos([newTodo, ...allTodos])
    setTodo("")
  }

  function deleteTodo(id) {
    
    const updatedTodos = [...allTodos].filter((inputTodo)=>inputTodo.id !== id)

    setTodos(updatedTodos)
  }


  function toggleComplete(id){
    const updatedTodos=[...allTodos].map((todo) => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
    setTodos(updatedTodos)
  }


  function handleChange() {
    const checkBox = document.querySelector('#inpcheck')

    if (checkBox.checked) {
      setHideCompleted(true)
    } else {
      setHideCompleted(false)
    }
  }
  
  function catchID(elm){
    setcCatchId(elm)
  }




  return (

    <div className="App">

    


      <div id="inp3">
        <input type="checkbox" onChange={()=>handleChange()} value='checked' id='inpcheck' className='inputHide'/>
        <h4>Hide Completed</h4>
      </div>
      <form onSubmit={handleSubmit} className="form1">
        <h3 id="h31">Task</h3>
        <input className={inpStyle} id='inputter' type="text" placeholder='Write here' onChange={inputChanged}  value={inputTodo}/>
        <button className="btn1" type="submit" disabled={warning54}>Add Todo</button>
        <label className={warning54 ? "label1" : "hideLabel"}>Task Contenet Can Contain Max 54 Characters.</label>
      </form>    
      {allTodos.map((todo)=><div key={todo.id}>
        <div className='div1'> 
          <table className='tbl1'>
            <thead>
              <tr className={todo.completed && hideCompleted ? "taskHidden": ""}>
                <td>
                  <input type="checkbox" id="inp2" onChange={()=> toggleComplete(todo.id)} checked={todo.completed}></input>
                </td>
                <td id='td1'>
                  <h2 id="h222">{todo.text}</h2>
                </td>
                <td>
                  <div className="box">
	                  <a className="button" href="#popup1" onClick={()=>catchID(todo.id)}>X</a>
                  </div>
                  
                  <div id="popup1" className="overlay" > 
	                  <div className="popup">
		                  <h2>Are You Sure You Want to Delete?</h2>
		                    <a className="close" href="#">&times;</a>
                        <a className='button' onClick={(catchId)=>deleteTodo(todo.id)}>Yes</a>
                        <a className="button" href = "popup1">No</a>
	                  </div>
                  </div>
                </td>
              </tr>
            </thead>
          </table>
        </div>
        </div>)}
    </div>
  );
}

export default App;
