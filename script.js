// Project mission: Create a todo app with a list of tasks
// Functions: Display tasks, Add task, Fetch thorught API, POST to API, DELETE from API, UPDATE API

// Schhol project at KYH.se (STOCKHOLM, Sweden 2023)
// Student: Jesper Ekerling (ekerling.com)



// URL for GET, POST
const API_URL = 'https://js1-todo-api.vercel.app/api/todos?apikey=d0417e9b-dfeb-4c69-acc9-7fbb86ebfcfe'

// URL for GET ID, PUT ID and DELETE
const API_URL2 = 'https://js1-todo-api.vercel.app/api/todos/${id}?apikey=d0417e9b-dfeb-4c69-acc9-7fbb86ebfcfe'



const taskList = document.querySelector('#taskList')
const createTaskForm = document.querySelector('#addTaskForm')

    // Sätta ID
    // Delete request


/* CREATE TASK

Functions:
- Save value from input "describe task" input to a variable
- Send input data to API

*/


createTaskForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const addTask = {
    title: createTaskForm['taskInput'].value,
    completed: false
  }

  try {
    const apiresponse = await fetch(API_URL, {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(addTask)
    })
  
    if(res.status !== 201) {
      throw new Error('Could not create new to do note: ' + apiresponse.status)
    }
    console.log("hej")
    const newTask = await apiresponse.json()

  } catch (err) {
    document.createElement('beforeend', `
    <div class="fade-out" id="status-message">
      <p>Something with your input is wrong.</p>
    </div>
    `)
    updateTasks()
    createTaskForm.reset()
    document.querySelector('#status-message').addEventListener('animationend', e => {
      e.target.remove()
    })
    
  }
})




// Get tasks

const updateTasks = async () => {
  try {
    const res = await fetch(API_URL)
    //console.log(res)
  
    if(res.status !== 200) {
      throw new Error('Something went wrong, status: ' + res.status)
    }

    const data = await res.json()
  
    taskList.innerHTML = ""
    
    data.forEach(todo => {
      
      // Creates the task list HTML with JavaScript
      const taskListItem = document.createElement("div")
      taskListItem.classList.add("task", "flex", todo.completed) // Adding current status from API to our task list item, to be able to style true status with CSS
      taskListItem.setAttribute("id", todo._id);
      
      const taskListItemTitle = document.createElement("div")
      taskListItemTitle.classList.add("todoText")
      taskListItemTitle.textContent = todo.title
      
      const taskListItemButtonsDiv = document.createElement("div")
      taskListItemButtonsDiv.classList.add("buttons")
      
      const taskListItemButtonStatus = document.createElement("button")
      taskListItemButtonStatus.classList.add("btn", "btn-success")
      taskListItemButtonStatus.setAttribute("title", "Mark task as completed")
      taskListItemButtonStatus.textContent = "Done"
      taskListItemButtonStatus.insertAdjacentHTML("afterbegin", "<i class=\"las la-check\"></i> ")
      
      const taskListItemButtonDelete = document.createElement("button")
      taskListItemButtonDelete.classList.add("btn", "btn-danger")
      taskListItemButtonDelete.setAttribute("title", "Delete Task")
//      taskListItemButtonDelete.textContent = "Delete" // Option if we want icon and text in the delete button
      taskListItemButtonDelete.insertAdjacentHTML("afterbegin", "<i class=\"las la-trash\"></i> ")

      
      taskList.appendChild(taskListItem)
      taskListItem.appendChild(taskListItemTitle)
      taskListItem.appendChild(taskListItemButtonsDiv)
      taskListItemButtonsDiv.appendChild(taskListItemButtonStatus)
      taskListItemButtonsDiv.appendChild(taskListItemButtonDelete)
      
      taskListItemButtonDelete.setAttribute("id", todo._id);


      


      // AddEventListener for the status button
      taskListItemButtonStatus.addEventListener('click', async () => {

        await updateTodo(todo._id, todo.completed);

        if(todo.completed === true) {
          console.log("Completed status changed to " + todo.completed)
          const updateMessage = document.querySelector('#status-message')
          updateMessage.classList.toggle("fade-out")
          updateMessage.textContent = "Task marked as uncompleted"
        }
        else if(todo.completed === false) {      
          // Printing out the status of the task in the console
          console.log("Completed status changed to " + todo.completed)
          const updateMessage = document.querySelector('#status-message')
          updateMessage.classList.toggle("fade-out")
          updateMessage.textContent = "Task marked as completed"

        }
        return        
      });

      // AddEventListener for the delete button
      taskListItemButtonDelete.addEventListener('click', async () => {
        if(todo.completed === true) {
          await deleteTodo(todo._id);
          const updateMessage = document.querySelector('#status-message')
          updateMessage.classList.toggle("fade-out")
          updateMessage.textContent = "Task item deleted."
          return
        }
        else if(todo.completed === false){
          // Status message display when task item is deleted
          const updateMessage = document.querySelector('#status-message')
          updateMessage.classList.toggle("fade-out")
          updateMessage.textContent = "Task must be marked as completed, before deleting it."
          return
        }
      });
      
      
    })

  } catch(err) {
    document.body.insertAdjacentHTML('beforeend', `
    <div class="fade-out" id="status-message">
      Something went wrong. Please try again or contact System Administrator.
    </div>
    `)
    document.querySelector('#status-meessage').addEventListener('animationend', e => {
      e.target.remove()
    })
  }
}

updateTasks()


// DELETE
const deleteTodo = async (id) => {

  //Not sure why I have to set this API_URL2 again (it has a value from start).. Need to looking into it.
  const API_URL2 = `https://js1-todo-api.vercel.app/api/todos/${id}?apikey=d0417e9b-dfeb-4c69-acc9-7fbb86ebfcfe`
  const apiResponse2 = await fetch(API_URL2, {
      method: 'DELETE'
  });
  
  if(!apiResponse2.ok) {
      console.log(apiResponse2)
      return;
  }

  const todoId = await apiResponse2.json();
  


  updateTasks()
}



const updateTodo = async (id, status) => {
  const updateTask = {
    completed: true
  }

  //Not sure why I have to set this API_URL2 again (it has a value from start).. Need to looking into it.
  const API_URL = `https://js1-todo-api.vercel.app/api/todos/${id}?apikey=d0417e9b-dfeb-4c69-acc9-7fbb86ebfcfe`
  const apiResponse3 = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !status,
        
      })
  });
  
  if(!apiResponse3.ok) {
      console.log(apiResponse3)
      const updateMessage = document.querySelector('#status-message')
        //updateMessage.classList.toggle("fade-out")
        updateMessage.textContent = "Hello " + todo.completed

      return
  }

  const todoId2 = await apiResponse3.json();
  
  
  updateTasks()
}
