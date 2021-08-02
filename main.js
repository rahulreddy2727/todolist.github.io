var todos = [];
var addTodoForm = document.querySelector("#addTodoForm");
var listGroup = document.querySelector(".list-group");

function createListItem(todoValue, todoIndex) {
  var li = document.createElement("li");
  li.setAttribute("class", "list-group-item d-flex justify-content-between");
  if (todos[todoIndex].completed) {
    li.classList.add("bg-secondary");
  }
  li.addEventListener("click", function () {
    // console.log(todos[todoIndex]);

    if (todos[todoIndex].completed) {
      //remove bj -sec from li
      li.classList.remove("bg-secondary");
      //set completed to false
      todos[todoIndex].completed = false;
    } else {
      //add bj-secondary class to li
      li.classList.add("bg-secondary");
      //set completed true
      todos[todoIndex].completed = true;
      //
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  });
  //creat span
  var span = document.createElement("span");
  span.innerHTML = todoValue;
  //creat icon
  var icon = document.createElement("i");
  icon.setAttribute("class", "fas fa-trash-alt");

  icon.addEventListener("click", function (event) {
    event.stopPropagation();
    //remove li from dom
    // console.log(event.target);
    event.target.parentElement.remove();
    //remove li from todos array
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    //remove li from local storage
  });
  li.appendChild(span);
  li.appendChild(icon);

  return li;
}

function renderTodos(todos) {
  todos.forEach(function (todo, index) {
    var li = createListItem(todo.value, index);
    listGroup.appendChild(li);
  });
}
//check if the todo exsit in localStore
var storedTodos = localStorage.getItem("todos");
//if exits
if (storedTodos) {
  var parseStoredTodos = JSON.parse(storedTodos);
  todos = parseStoredTodos; //to be in sync with local storage
  renderTodos(todos);
  //console.log(parseStoredTodos);
}
//json.parse todos
//loop over array, creat li element and appent to dom
addTodoForm.addEventListener("submit", function (event) {
  event.preventDefault(); //it prevents the brouwser default values
  //console.log("hi");
  //access input tag values
  //console.log(addTodoForm.todo.value);
  //push todo array
  var todoValue = addTodoForm.todo.value;
  todos.push({
    //pusiging the input value into the empty array
    value: todoValue,
    completed: false,
  });

  addTodoForm.todo.value = ""; //to reset the given input value
  //create li elements
  //set in inner elemetn valule
  //set list gropu item'
  localStorage.setItem("todos", JSON.stringify(todos));
  var li = createListItem(todoValue, todos.length - 1);
  listGroup.appendChild(li);
});
