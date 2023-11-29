// Project mission: Create a todo app with a list of tasks
// Functions: Display tasks, Add task, Fetch thorught API, POST to API, DELETE from API, UPDATE API

// Schhol project at KYH.se (STOCKHOLM, Sweden 2023)
// Student: Jesper Ekerling (ekerling.com)




const API_URL = 'https://js1-todo-api.vercel.app/api/todos/'
const API_KEY = 'd0417e9b-dfeb-4c69-acc9-7fbb86ebfcfe'

const taskList = document.querySelector('#taskList')




/*
async function updateTaskList() {
  try {
    const response = await fetch('https://js1-todo-api.vercel.app/api/todos?apikey=d0417e9b-dfeb-4c69-acc9-7fbb86ebfcfe'); // replace with your API URL
    const data = await response.json();

    const taskList = document.querySelector("#taskList");
    taskList.innerHTML = "";

    data.forEach(todo => {
      // your existing code to create and append elements
    });
  } catch(err) {
    // your existing error handling code
  }
}

// Call this function initially to populate the task list
updateTaskList();

// After a successful POST request, call this function again
// For example:
async function addNewItem() {
  try {
    const response = await fetch('https://js1-todo-api.vercel.app/api/todos?apikey=d0417e9b-dfeb-4c69-acc9-7fbb86ebfcfe', {
      method: 'POST',
      // other fetch options...
    });

    if (response.ok) {
      // If the POST request was successful, update the task list
      updateTaskList();
    } else {
      // Handle error
    }
  } catch(err) {
    // Handle error
  }
}


*/


/* CREATE TASK

Functions:
- Save value from input "describe task" input to a variable
- Add the task to API

*/

const form = document.querySelector('#addTaskForm')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const addTask = {
    title: form['taskInput'].value,
    completed: false
  }
//  console.log(addTask)

  try {
    const apiresponse = await fetch("https://js1-todo-api.vercel.app/api/todos?apikey=d0417e9b-dfeb-4c69-acc9-7fbb86ebfcfe", {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(addTask)
    })
  
    console.log(apiresponse)
    if(res.status !== 201) {
      throw new Error('Could not create new to do note: ' + apiresponse.status)
    }



    const newTask = await apiresponse.json()
    
    //taskList.shift(newTask)
    //const newTaskTitle = document.querySelector("#taskInput")

    taskList.innerHTML = `<p>newTaskTitle</p>`

    taskList.insertAdjacentHTML('afterbegin', `
       <div class="task flex" id="${newTask.id}">
         <div class="todoText">${newTask.title}</p>
         <div class="buttons"></div>
       </div>
    `)

      form.reset()

      updateTaskList()
  } catch (err) {
    document.body.insertAdjacentHTML('beforeend', `
    <div class="pop" id="toast">
      Something went wrong
    </div>
    `)
    document.querySelector('#toast').addEventListener('animationend', e => {
      e.target.remove()
    })
    
  }
})




// Get tasks
const BASE_URL = 'https://js1-todo-api.vercel.app/api/todos?apikey=d0417e9b-dfeb-4c69-acc9-7fbb86ebfcfe'
const userList = document.querySelector('#user-list')

let users = []

const getTasks = async () => {
  try {
    const res = await fetch(BASE_URL)
    //console.log(res)
  
    if(res.status !== 200) {
      throw new Error('Something went wrong, status: ' + res.status)
    }

    const data = await res.json()


    //data.forEach(user => users.push(user))

    const taskList = document.querySelector("#taskList")
  
    taskList.innerHTML = ""

    
    // Sätta ID
    // Delete request
    
    data.forEach(todo => {
      
      
      const taskListItem = document.createElement("div")
      taskListItem.classList.add("task", "flex")
      
      const taskListItemTitle = document.createElement("div")
      taskListItemTitle.classList.add("todoText")
      taskListItemTitle.textContent = todo.title
      
      const taskListItemButtonsDiv = document.createElement("div")
      taskListItemButtonsDiv.classList.add("buttons")
      
      const taskListItemButtonChecked = document.createElement("button")
      taskListItemButtonChecked.classList.add("btn", "btn-success")
      taskListItemButtonChecked.textContent = "Done"
      
      const taskListItemButtonDelete = document.createElement("button")
      taskListItemButtonDelete.classList.add("btn", "btn-danger")
      taskListItemButtonDelete.textContent = "Delete"


      
      taskList.appendChild(taskListItem)
      taskListItem.appendChild(taskListItemTitle)
      taskListItem.appendChild(taskListItemButtonsDiv)
      taskListItemButtonsDiv.appendChild(taskListItemButtonChecked)
      taskListItemButtonsDiv.appendChild(taskListItemButtonDelete)

      
      
      console.log(taskList)

      
  
            
    })

  } catch(err) {
    document.body.insertAdjacentHTML('beforeend', `
    <div class="pop" id="toast">
      Something went wrong 1
    </div>
    `)
    document.querySelector('#toast').addEventListener('animationend', e => {
      e.target.remove()
    })
    //console.error(err.message)
  }
}

getTasks()






/*


function showTasks() {
  userList.innerHTML = data
  users.forEach(user => {
    users.insertAdjacentHTML('beforeend', `
    <div class="task flex" id="${users.id}">
         <div class="todoText">${users.title}</p>
         <div class="buttons"></div>
       </div>
      <button data-user-id="${_id}" id="${_id}" class="btn remove-btn"><i class="fa-solid fa-trash"></i></button>    </li>
    `)

    document.querySelector('#remove-' + user.id).addEventListener('click', async () => {

      try {
        const res = await fetch(BASE_URL + user.id, {
          method: 'DELETE'
        })
  
        console.log(res) 

        if(res.status !== 200) {
          throw new Error('Could not delete the user: ' + res.status)
        }

        // const data = await res.json()
        // console.log(data)
        
        users.splice(users.indexOf(user), 1)

        // users = users.filter(_user => _user.id !== data)
        showTasks()
      } 
      catch (error) {
        document.body.insertAdjacentHTML('beforeend', `
        <div class="pop" id="toast">
          Something went wrong 2
        </div>
        `)
        document.querySelector('#toast').addEventListener('animationend', e => {
          e.target.remove()
        })
        console.error(err.message)
      }
     

    })

  })
}


*/