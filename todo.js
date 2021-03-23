const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();
function eventListeners() {
  form.addEventListener("submit", addtodo);
  //Local Storage deki todoların sayfaya yüklenmesi
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);

  secondCardBody.addEventListener("click",deleteTodo);
  filter.addEventListener("keyup",filterTodos)
}
//localdeki todoların sayfaya foreach ile eklenmesi
function loadAllTodosToUI() {
  let todos = getTodosFromStorage();
  todos.forEach(function (todo) {
    addtodoToUI(todo);
  });
}
//filtreleme fonksiyonu
function filterTodos(e){
  const filtervalue=e.target.value.toLowerCase();
  const listItems= document.querySelectorAll(".list-group-item");
  listItems.forEach(function(listitem){
    const text=listitem.textContent.toLowerCase();
    if(text.indexOf(filtervalue)===-1){
      //bulamadı
      listitem.setAttribute("style","display: none !important");
    }
    else{
      listitem.setAttribute("style", "display:block")
    }
  });
}

//silme fonksiyonu
function deleteTodo(e){
  if(e.target.className==="fa fa-remove"){
    e.target.parentElement.parentElement.remove();
    //localden silinmesi
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success","Todo başarıyla silindi")
  }
}
function deleteTodoFromStorage(deleteTodo){
  let todos=getTodosFromStorage();
  todos.forEach(function(todo,index){
    if(todo===deleteTodo){
      todos.splice(index,1);
    }
  });

  localStorage.setItem("todos",JSON.stringify(todos))
}
function addtodo(e) {
  const newItem = todoInput.value.trim();
  if (newItem === "") {
    showAlert("danger", "Lütfen bir todo girin");
  } else {
    addtodoToUI(newItem);
    addtodoToStorage(newItem);
    showAlert("success", "Todo Eklendi");
  }

  e.preventDefault();
}

function getTodosFromStorage() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function addtodoToStorage(newItem) {
  let todos = getTodosFromStorage();
  todos.push(newItem);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type, message) {
  // <div class="alert alert-danger" role="alert">
  //   This is a danger alert—check it out!
  // </div>;

  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  firstCardBody.appendChild(alert);

  // 2 saniye sonra uyarı mesajnın silinmesi
  setTimeout(function () {
    alert.remove();
  }, 750);
}

function addtodoToUI(newTodo) {
  const listItem = document.createElement("li");
  listItem.className = "list-group-item d-flex justify-content-between";

  const silmeLink = document.createElement("a");
  silmeLink.href = "#";
  silmeLink.className = "delete-item";
  silmeLink.innerHTML = "<i class='fa fa-remove'></i>";

  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(silmeLink);
  todoList.appendChild(listItem);
}
