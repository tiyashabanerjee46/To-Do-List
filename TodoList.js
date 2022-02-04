import React, {useState, useEffect} from 'react';
import CreateTask from '../modals/CreateTask';
import Card from './Card';

const TodoList =() => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = React.useState([])
  // const [checked, setChecked] = React.useState(false); 
  // const checkTask = props.onText; 

  useEffect(() => {
    let arr = localStorage.getItem("taskList")
   
    if(arr){
        let obj = JSON.parse(arr)
        setTaskList(obj)
    }
}, [])//not want to repeated everytime

    const deleteTask = (index) => {
      let tempList = taskList
      tempList.splice(index, 1)
      localStorage.setItem("taskList", JSON.stringify(tempList))
      setTaskList(tempList)
      window.location.reload()
    }
   
    const updateListArray = (obj, index) => {
      let tempList = taskList
      tempList[index] = obj
      localStorage.setItem("taskList", JSON.stringify(tempList))
      setTaskList(tempList)
      window.location.reload()
  }

  // const checkTask = (index) => {
  //   let tempList = taskList
  //   tempList.splice(index, 1)
  //   localStorage.setItem("taskList", JSON.stringify(tempList))
  //   setTaskList(tempList)
  //   window.location.reload()
  // }
 

  const toggle = () => {
    setModal(!modal);
}

const saveTask = (taskObj) => {
  let tempList = taskList
  tempList.push(taskObj)
  localStorage.setItem("taskList", JSON.stringify(tempList))
  setTaskList(tempList)
  setModal(false)
}

  return (
      <>
         <div className ="header text-center">
            <h4>ToDo List</h4>
            <button className = "btn btn-primary mt-2" onClick = {() => setModal(true)} >Create Task</button>
         </div>
         <div className = "task-container">
             {taskList.map((obj, index) => <Card taskObj = {obj} index = {index} deleteTask = {deleteTask} updateListArray = {updateListArray}/>)} 
             {/* checkTask ={checkTask} */}
         </div>
         <CreateTask toggle = {toggle} modal = {modal} save = {saveTask} />
      </>
  );
};

export default TodoList;
