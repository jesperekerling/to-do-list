// Project mission: Create a todo app with a list of tasks
// Functions: Display tasks, Add task, Fetch thorught API, POST to API, DELETE from API, UPDATE API

// Schhol project at KYH.se (STOCKHOLM, Sweden 2023)
// Student: Jesper Ekerling (ekerling.com)




const API_URL = 'https://js1-todo-api.vercel.app/api/todos/'
const API_KEY = 'd0417e9b-dfeb-4c69-acc9-7fbb86ebfcfe'

const taskList = document.querySelector('#taskList')





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
    const newTaskTitle = document.querySelector("#taskInput")

    taskList.innerHTML = `<p>newTaskTitle</p>`

    taskList.insertAdjacentHTML('afterbegin', `
       <div class="task flex" id="${newTask.id}">
         <div class="todoText">${newTask.title}</p>
         <div class="buttons"></div>
       </div>
    `)

      form.reset()

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


    data.forEach(user => users.push(user))


    data.forEach(todo => {
      const taskListParent = document.createElement("div")
      const taskListItem = document.createElement("div")
      
      taskListItem.classList("task")

      taskListItem.textContent = todo.title
      taskListItem.setAttribute("id", todo._id)
      console.log(todo)
      append
    })

  } catch(err) {
    document.body.insertAdjacentHTML('beforeend', `
    <div class="pop" id="toast">
      Something went wrong
    </div>
    `)
    document.querySelector('#toast').addEventListener('animationend', e => {
      e.target.remove()
    })
    //console.error(err.message)
  }

}
getTasks()



function renderUsers() {
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
        renderUsers()
      } 
      catch (error) {
        document.body.insertAdjacentHTML('beforeend', `
        <div class="pop" id="toast">
          Something went wrong
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



/*

function createTaskElement () {
  const form2 = document.querySelector("#addTaskForm2")
  form2.addEventListener('submit', async (e) => {
    e.preventDefault()
    const div = document.createElement("div")
    const taskInput2 = document.getElementById("taskInput2").value

    const t = document.createTextNode(taskInput2)
    div.appendChild(t)
    console.log("HERE??j")
  })
}
// GET POSTS
*/



/*
async function getTasks () {
  console.log("hej")
  const tasks = await fetch("https://js1-todo-api.vercel.app/api/todos?apikey=d0417e9b-dfeb-4c69-acc9-7fbb86ebfcfe", {
  method: 'GET',
  headers: {'Content-type': 'application/json'},
  body: JSON.stringify(tasks)
  })

  const displayTasks = await Response.json();
  console.log(displayTasks)
  console.log("hej2")
}

getTasks()

*/


























// POST TASK 
// Add a new task to the API.





/*


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const ul = document.getElementById("taskList");
    const li = document.createElement("li");
    li.appendChild(document.createTextNode("Element 4"));
})


async function createTask() {
    const taskName = document.querySelector('#taskInput').value
    

    const task = {
        taskName,
        completed: false
    }

    try {

        const res = await fetch(`https://js1-todo-api.vercel.app/api/todos/{id}?apikey=d0417e9b-dfeb-4c69-acc9-7fbb86ebfcfe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
        console.log(res)
        if(res.status !== 201) {
            throw new Error(res.status)
        }
        

    } catch (error) {
        console.log(res) 
        if(res.status !== 201) {
            console.log(res.status)
            document.querySelector('#form-error').classList.add('invalid')
        }
    }
    
}
*/