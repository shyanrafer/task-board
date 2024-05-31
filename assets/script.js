// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
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
function createTaskCard(task) {
  // adding code from week 5 mini project as it is so similar to this project
  const taskCard = $('<div>')
    .addClass('card project-card draggable my-3')
    .attr('data-project-id', project.id);
  const cardHeader = $('<div>').addClass('card-header h4').text(project.name);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(project.type);
  const cardDueDate = $('<p>').addClass('card-text').text(project.dueDate);
  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-project-id', project.id);

  // ? Sets the card background color based on due date. Only apply the styles if the dueDate exists and the status is not done.
  if (project.dueDate && project.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(project.dueDate, 'DD/MM/YYYY');

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
  // will need a for loo[ to run through the data provided from local storage
  // append elements to the card and the append the card to document 
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  event.preventDefault()
  
  

  const newTask = {
    // will need add id function and set it as a property (check)
    // objects have key value pairs
    id: generateTaskId(),
    taskName: $('#task-name').val(),
    dueDate: $('#due-date'),
    taskDetails: $('#task-details').val(),
    taskStatus: ''
  }
  // the values must be recieved here and then stored to local storage as key value pairs
 localStorage.setItem('tasks', JSON.stringify(newTask))
  
}




// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
  const projectId = $(this).attr('data-project-id');
  const projects = readProjectsFromStorage();


  // ? Remove project from the array. There is a method called `filter()` for this that is better suited which we will go over in a later activity. For now, we will use a `forEach()` loop to remove the project.
  projects.forEach((project) => {

    if (project.id === projectId) {
      projects.splice(projects.indexOf(project), 1);
    }
  });
console.log(projects)
  // ? We will use our helper function to save the projects to localStorage
  saveProjectsToStorage(projects);

  // ? Here we use our other function to print projects back to the screen
  printProjectData();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const projects = readProjectsFromStorage();

  // ? Get the project id from the event
  const taskId = ui.draggable[0].dataset.projectId;

  // ? Get the id of the lane that the card was dropped into
  const newStatus = event.target.id;

  for (let project of projects) {
    // ? Find the project card by the `id` and update the project status.
    if (project.id === taskId) {
      project.status = newStatus;
    }
  }
  // ? Save the updated projects array to localStorage (overwritting the previous one) and render the new project data to the screen.
  localStorage.setItem('projects', JSON.stringify(projects));
  printProjectData();
// I think with this one i will need to essentially recreate the card each time it is dropped into the new column - something like that
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  // run renderTaskList so that I can see all my tasks
  // submit
});
