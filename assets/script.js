// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId(id) {
    for (let i = 0; i < 100_000; i++)
    return id++
  // could start here
  // save id to local storage 
  // setItem in local storage
  // will need to be able look at local storage (id database) and then make a new id based off the previous
  // setItem as nextId
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const taskCard = $('div')
  // call the info from local storage generated from the addTask function in order to have the values for creating the taskCard
  // will need a for loo[ to run through the data provided from local storage
  // append elements to the card and the append the card to document 
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  event.preventDefault()
  
  const addTaskButton = $('#addTaskButton')
  addTaskButton.onClick()
  const task = {
    id: generateTaskId(),
    task: '',

// the values must be recieved here and then stored to local storage as key value pairs
  }
  
  // objects have key value pairs
}

  // will need add id function and set it as a property



// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
// I think with this one i will need to essentially recreate the card each time it is dropped into the new column - something like that
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  // run renderTaskList so that I can see all my tasks
  // submit
});
