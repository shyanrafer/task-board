// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || []; //taskList is either getItem(tasks) or an empty array
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1; // using || 1 sets default id to 1
// we added a variable to rep a task button in global scope and added the .click method to it with the handleAddTask() function as the method's parameter
const addTaskBtn = $('#formSubmit').click(handleAddTask); //event that calls the later built function

// Todo: create a function to generate a unique task id
// this function is to set an incremental task id
function generateTaskId() {
  // simplified id generation
    const id = nextId++; // starts at 1 as defined above then incremenets
    localStorage.setItem('nextId', JSON.stringify(nextId));
    return id;
}


// Todo: create a function to create a task card
function createTaskCard(task) {
  // adding code from week 5 mini project as it is so similar to this project
  // for this snippet I just had to replace instances of 'project' to the 'task' equivalent
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
  cardDeleteBtn.click(handleDeleteTask); //sets delete function on a click event

  // Sets the card background color based on due date. Only apply the styles if the dueDate exists and the status is not done.
  if (task.dueDate && task.taskStatus !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'MM/DD/YYYY');

    // If the task is due today, make the card yellow. If it is overdue, make it red.
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      // cards are not turning red
      taskCard.addClass('bg-danger text-white');
      cardDeleteBtn.addClass('border-light');
    }
  }

  // Gather all the elements created above and append them to the correct elements.
  // append elements to the card and then append the card to document 
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  return taskCard;
}


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {  
  if (!taskList) {
    taskList = [];
  } //again telling the broswer to render an empty array if no taskList data is present
  // in general when doing dom manipulation it is recommended to assign variables in the given function
  const toDoCards = $('#todo-cards'); 
  const inProgressCards = $('#in-progress-cards'); // these variables represent the card columns on the page
  const doneCards = $('#done-cards');
 
  // removes card from previous column / without this the card is jsut cloned
  toDoCards.empty();
  inProgressCards.empty();
  doneCards.empty();
  
  // will need a for loop to run through the data provided from local storage
  // simpler loop
  for (let task of taskList) { // iterates over the task parameter
    const taskCard = createTaskCard(task);
    if (task.taskStatus === 'to-do') {
      toDoCards.append(taskCard);
    } else if (task.taskStatus === 'in-progress') {
      inProgressCards.append(taskCard);
    } else if (task.taskStatus === 'done') {
      doneCards.append(taskCard);
    }
  } // tells browser as one clicks and places a card in a different column to recreate the card in that column

  // this snippet was provided by the tutor and copied
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    helper: function (e) {
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
function handleAddTask(event) { //event as the parameter, all the data from the event is gathered from this function
  event.preventDefault();

  const newTask = {
    // objects have key value pairs
    id: generateTaskId(),
    taskName: $('#task-name').val(),
    dueDate: $('#due-date').val(),
    taskDetails: $('#task-details').val(),
    taskStatus: 'to-do' // Set a default status
  };
  taskList.push(newTask); // pushes the key value pairs from the newTask object into the taskList empty array

  // then we save the data in the local storage as a string (JSON.stringify()) for the sake of the browser being able to manipulate the data
  localStorage.setItem('tasks', JSON.stringify(taskList));
 
  // resets input fields to blank after hitting submit
  $('#task-name').val('');
  $('#due-date').val('');
  $('#task-details').val('');
  
  renderTaskList();
  // call renderTask to generate the task cards on the page
}


function handleDeleteTask() {
  // code inspired by week 5 mini project
  const taskId = $(this).attr('data-task-id'); //we pull the given task id from local storage 
  const parsedTaskId = parseInt(taskId); // and then parse it (turn into object)
  
  // Iterate over taskList and remove the task with the matching id
  taskList.forEach((task, index) => {
    if (task.id === parsedTaskId) { //then we compare id's here and if the given id matches the actual
      taskList.splice(index, 1); //  we remove that task from the array
    }
  });

   localStorage.setItem('tasks', JSON.stringify(taskList)); // sets a key value pair named tasks with the new value of tasklist
  renderTaskList(); // renders the task list after removal of task

}


// Todo: create a function to handle dropping a task into a new status lane
// snippet was coppied from week 5 mini project and edited to befit this one
function handleDrop(event, ui) {
  // Get the task id from the event
  const taskId = ui.draggable[0].dataset.taskId;
  // Get the id of the lane that the card was dropped into
  const newStatus = event.target.id;

  for (let task of taskList) {
    // Find the task card by the `id` and update the project status.
    if (task.id === parseInt(taskId)) {
      task.taskStatus = newStatus;
    }
  }
  // Save the updated tasks array to localStorage (overwriting the previous one) and render the new task data to the screen.
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTaskList();
}


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  // run renderTaskList so that I can see all my tasks as the page is manipulated
  renderTaskList();
  // code provided by tutor - allows the page to stay up to date upon a drag and drop event  
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });
});
