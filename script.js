// Project mission: Create a todo app with a list of tasks
// Functions: Display tasks, Add task, Fetch thorught API, POST to API, DELETE from API, UPDATE API

// Schhol project at KYH.se (STOCKHOLM, Sweden 2023)
// Student: Jesper Ekerling (ekerling.com)



// URL for GET, POST
const API_URL = 'https://js1-todo-api.vercel.app/api/todos?apikey=d0417e9b-dfeb-4c69-acc9-7fbb86ebfcfe'

// URL for GET ID, PUT ID and DELETE
const API_URL2 = 'https://js1-todo-api.vercel.app/api/todos/{id}?apikey=d0417e9b-dfeb-4c69-acc9-7fbb86ebfcfe'



const taskList = document.querySelector('#taskList')
const createTaskForm = document.querySelector('#addTaskForm')




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
    <div class="pop" id="toast">
      Something with your input is wrong.
    </div>
    `)
    updateTasks()
    createTaskForm.reset()
    document.querySelector('#toast').addEventListener('animationend', e => {
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

  
    // Sätta ID
    // Delete request
    
    data.forEach(todo => {
      
      // Creates the task list HTML with JavaScript
      const taskListItem = document.createElement("div")
      taskListItem.classList.add("task", "flex")
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
//      taskListItemButtonDelete.textContent = "Delete"
      taskListItemButtonDelete.insertAdjacentHTML("afterbegin", "<i class=\"las la-trash\"></i> ")

      
      taskList.appendChild(taskListItem)
      taskListItem.appendChild(taskListItemTitle)
      taskListItem.appendChild(taskListItemButtonsDiv)
      taskListItemButtonsDiv.appendChild(taskListItemButtonStatus)
      taskListItemButtonsDiv.appendChild(taskListItemButtonDelete)
      


      taskListItemButtonDelete.setAttribute("id", todo._id);



      //CHANGES FOR CHECKS HERE

      
      // check for the completed status and if completed is false, show the popup and don't delete the todo
      // if completed is true, delete the todo
      taskListItemButtonDelete.addEventListener('click', async () => {
          if(todo.completed === true) {
              popup.classList.add("open-popup");
              closeBtn.addEventListener('click', () => {
                  popup.classList.remove("open-popup");
              })
              
              return;
          }
          else if(todo.completed === false){
              await deleteTodo(todo._id);
          }
      });

      taskListItemButtonStatus.addEventListener('click', async () => {
        if(todo.completed === true) {
            //popup.classList.add("open-popup");
            closeBtn.addEventListener('click', () => {
                popup.classList.remove("open-popup");
            })
            
            return;
        }
        else if(todo.completed === false){
            await updateTodo(todo.completed);
        }
    });

      
      
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
  }
}

updateTasks()


//DELETE (Delete a todo from the server and from the page)
const deleteTodo = async (id) => {

  //Not sure why I have to set this API_URL2 again (it has a value from start).. Need to looking into it.
  const API_URL2 = `https://js1-todo-api.vercel.app/api/todos/${id}?apikey=d0417e9b-dfeb-4c69-acc9-7fbb86ebfcfe`;
  const apiResponse2 = await fetch(API_URL2, {
      method: 'DELETE'
  });
  
  if(!apiResponse2.ok) {
      console.log(apiResponse2)
      return;
  }

  const todoId = await apiResponse2.json();
  console.log("Task item deleted: " + todoId)
  
  updateTasks()
}



const updateTodo = async (id, status) => {
  const updateTask = {
    completed: true
  }

  //Not sure why I have to set this API_URL2 again (it has a value from start).. Need to looking into it.
  const API_URL = 'https://js1-todo-api.vercel.app/api/todos/{id}?apikey=d0417e9b-dfeb-4c69-acc9-7fbb86ebfcfe'
  const apiResponse3 = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: status
      })
  });
  
  if(!apiResponse3.ok) {
      console.log(apiResponse3)
      return
  }

  const todoId2 = await apiResponse3.json();
  console.log("Task item updated: " + todoId2)
  
  updateTasks()
}




/*

const completed = document.getElementById("button")

completed.addEventListener("click", (event) => {
  event.target.classList.add("completed", todo._id);
})
  //completed.classList.add("completed");



function markAsCompleted () {
  const completed = document.getElementById("button")
  completed.addEventListener("click", (event) => {
    event.target.classList.add("completed", todo._id);
  })
}

*/