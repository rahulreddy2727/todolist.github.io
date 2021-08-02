var todos = [];

var addTodoForm = document.querySelector("#addTodoForm"); //form

var listGroup = document.querySelector(".list-group");

function createListItem(todoValue, todoIndex) {
  var li = document.createElement("li");
  li.setAttribute("class", "list-group-item d-flex justify-content-between");

  if (todos[todoIndex].completed) {
    li.classList.add("bg-secondary");
  }

  li.addEventListener("click", function () {
    if (todos[todoIndex].completed) {
      // Remove bg-secondary from Li
      li.classList.remove("bg-secondary");
      // set Completed to false
      todos[todoIndex].completed = false;
    } else {
      // add bg-secondary to Li
      li.classList.add("bg-secondary");
      // set completed true
      todos[todoIndex].completed = true;
    }

    localStorage.setItem("todos", JSON.stringify(todos));
  });

  // create Span
  var span = document.createElement("span");
  span.innerHTML = todoValue;

  // Create Icon
  var icon = document.createElement("i");
  icon.setAttribute("class", "fas fa-trash-alt");
  icon.addEventListener("click", function (event) {
    event.stopPropagation();
    event.target.parentElement.remove();
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  });

  li.appendChild(span);
  li.appendChild(icon);

  return li;
}
//to display the lest and asscess each individual value
function renderTodos(todos) {
  todos.forEach(function (todo, index) {
    var li = createListItem(todo.value, index, todo.completed);
    listGroup.appendChild(li);
  });
}
//check if todos exists in local storage
// if exists
//jason parse todos   after that
//loop over array , creat li elementand append to the dom

//Check is todo Exist in LocalStorage
var storedTodos = localStorage.getItem("todos");
// if Exist
if (storedTodos) {
  var parsedStoredTodos = JSON.parse(storedTodos);
  todos = parsedStoredTodos; //to be in sync with localstorge memory and todos array if not it will override(due to using set keyword in l.no 89)
  renderTodos(todos);
  // Loop over Array, create li Element and Append to the DOM
}

addTodoForm.addEventListener("submit", function (event) {
  // form submit button event will work in both ways by pressing (button or enter)
  event.preventDefault(); // it helps in stoping refresing of whole page by default

  var todoValue = addTodoForm.todo.value; //access input tag value

  todos.push({
    //helps in pusing the values into todo array
    value: todoValue, //from line 72
    completed: false,
  });

  addTodoForm.todo.value = ""; ///to reset the input values

  localStorage.setItem("todos", JSON.stringify(todos)); //we cannot store as array or object in localstorage so we use json.stringify(value)

  var li = createListItem(todoValue, todos.length - 1);
  listGroup.appendChild(li);
});
