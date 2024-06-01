// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
// we added a variable to rep a task button in global scope and added the .click method to it with the handleAddTask() as the method's parameter
const addTaskBtn = $('#formSubmit').click(handleAddTask)

// Todo: create a function to generate a unique task id
// this function is to set an incremental task id
function generateTaskId() {
    if (nextId === null) {
      nextId = 1
    } else {nextId++}
    localStorage.setItem('nextId', JSON.stringify(nextId))
    // key value pair
    
      
    return nextId
  // could start here
  // save id to local storage 
  // setItem in local storage
  // will need to be able look at local storage (id database) and then make a new id based off the previous
  // setItem as nextId
}

// Todo: create a function to create a task card
// for this snippet i just had to replace instances where 'project' was listed to the 'task' equivalent for this gven assignment
function createTaskCard(task) {
  // adding code from week 5 mini project as it is so similar to this project
  const taskCard = $('<div>')
    .addClass('card task-card draggable my-3')
    .attr('data-task-id', task.id);
  const cardHeader = $('<div>').addClass('card-header h4').text(task.taskName);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(task.taskDetails);
  const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-task-id', task.id);
  cardDeleteBtn.click(handleDeleteTask)
  // ? Sets the card background color based on due date. Only apply the styles if the dueDate exists and the status is not done.
  if (task.dueDate && task.taskStatus !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

    // ? If the task is due today, make the card yellow. If it is overdue, make it red.
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardDeleteBtn.addClass('border-light');
    }
  }

  // ? Gather all the elements created above and append them to the correct elements.
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  // ? Return the card so it can be appended to the correct lane.
  return taskCard;
  // call the info from local storage generated from the addTask function in order to have the values for creating the taskCard
  // append elements to the card and the append the card to document 
}



// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  // is this to make the cards visible on the page? also, how to implement a draggable function?
  
  if (!taskList) {
    taskList = []
  }
  // in general when doing dom manipulation it is recommended to assign variables in the given function
  const toDoCards = $('#todo-cards') 
  toDoCards.empty()
  const inProgressCards = $('#in-progress-cards')
  const doneCards = $('#done-cards')
  
  // will need a for loop to run through the data provided from local storage
  for (i = 0; i < taskList.length; i++) {
    toDoCards.append(createTaskCard(taskList[i]))

    for (let task of taskList) {
      if (task.status === 'to-do') {
        todoCards.append(createTaskCard(taskList));
      } else if (task.status === 'in-progress') {
        inProgressCards.append(createProjectCard(taskList));
      } else if (task.status === 'done') {
        doneCards.append(createTaskCard(taskList));
      }
    }
  }

  // this snippet was provided by the tutor and copied
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // function to clone the card being dragged so that the original card remains in place
    helper: function (e) {
      // check of the target of the drag event is the card itself or a child element if it is the card itself, clone it, otherwise find the parent card and clone that
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      return original.clone().css({
        maxWidth: original.outerWidth(),
      });
    },
  });
}



// Todo: create a function to handle adding a new task
function handleAddTask(event){
  event.preventDefault()

  const newTask = {
    // will need add id function and set it as a property (check)
    // objects have key value pairs
    id: generateTaskId(),
    taskName: $('#task-name').val(),
    dueDate: $('#due-date').val(),
    taskDetails: $('#task-details').val(),
    taskStatus: ''
  }
  // pushes the key value pairs from the newTask object into the taskLisk empty array
  taskList.push(newTask)
  // then we save the data in the local storage as a string (JSON.stringify()) for the sake of the browser being able to manipulate the data
  localStorage.setItem('tasks', JSON.stringify(taskList))
 
 $('#task-name').val('');
 $('#due-date').val('');
 $('#task-details').val('');
}




// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
  const taskId = $(this).attr('data-task-id');
  const tasks = taskList;
  // 


  // ? Remove project from the array. There is a method called `filter()` for this that is better suited which we will go over in a later activity. For now, we will use a `forEach()` loop to remove the project.
  tasks.forEach((task) => {

    if (tasks.id === taskId) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
console.log(tasks)
  

  // ? Here we use our other function to print projects back to the screen
  renderTaskList();
}



// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

  // ? Get the project id from the event
  const taskId = ui.draggable[0].dataset.taskId;
 console.log(typeof taskId)
  //  typeof is special in JS - tells type of variable
  // ? Get the id of the lane that the card was dropped into
  const newStatus = event.target.id;

  for (let task of taskList) {
    // ? Find the project card by the `id` and update the project status.
    if (task.id === parseInt(taskId)) {
      task.taskStatus = newStatus;
    }
  }
  // ? Save the updated projects array to localStorage (overwritting the previous one) and render the new project data to the screen.
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTaskList();
// I think with this one i will need to essentially recreate the card each time it is dropped into the new column - something like that
}



// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  // run renderTaskList so that I can see all my tasks
  renderTaskList()
  // submit
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });
});
