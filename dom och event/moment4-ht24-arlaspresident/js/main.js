"use strict"

// hämta element från DOM
let newTodoInput = document.getElementById('newtodo');
let newTodoButton = document.getElementById('newtodobutton');
let todoList = document.getElementById('todolist');
let clearButton = document.getElementById('clearbutton');
let messageDiv = document.getElementById('message');

//ladda in lagrad lista från localStorage när siddan laddas
window.addEventListener('load', function() {
    init ();
    loadToDoList ();

});

// lägg till ett nytt att göra objekt när knappen klickas
newTodoButton.addEventListener('click', addItem);

newTodoInput.addEventListener('input', function() {
    checkItemText(newTodoInput.value.trim());
});

// rensa hela listan när rensa knappen klickas
clearButton.addEventListener('click', clearStorage);


// start funktion
function init(){
    console.log('initierar...')
    newTodoButton.disabled = true;
}
// funktion för att lägga till ett nytt objekt i listan 
function addItem (){
    let todoText = newTodoInput.value.trim();

    if (checkItemText (todoText)){
        let article = document.createElement('article');
        article.textContent = todoText;
        article.addEventListener('click', deleteItem); //lägg till eventlistener för att ta bort objekt
        todoList.appendChild(article);

        storeItem(todoText); //spara i local storage
        newTodoInput.value =''; 
        newTodoButton.disabled = true;
        showMessage('Saken har lagts till');

    }
}
// kontrollera om texten är tillräckligt lång
function checkItemText(text) {
    if (text.length >= 5) {
        messageDiv.innerHTML = "";
        newTodoButton.disabled = false; 
        return true;
    
    } else {
        messageDiv.innerHTML = "Ange minst 5 tecken";
        newTodoButton.disabled = true;
        return false;
    }
}

// ta bort en specifik att göra punkt och uppdatera local storage
function deleteItem(event) {
    let item = event.target;
    todoList.removeChild(item);
   
    let updatedTodos = [];
    let todoItems = todoList.querySelectorAll('article');

    todoItems.forEach(todo => {
        updatedTodos.push(todo.textContent);
    });

    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    
    showMessage("Saken har tagits bort");

    
}

// spara i local storage
function storeItem(todoText) {
    let storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    storedTodos.push(todoText);
    localStorage.setItem('todos', JSON.stringify(storedTodos));

}
function loadToDoList() {
    let storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    storedTodos.forEach(todo => {
        let article = document.createElement('article');
        article.textContent = todo;
        article.addEventListener('click', deleteItem);
        todoList.appendChild(article);
    });
}

// rensa listan och localStorage
function clearStorage() {
    localStorage.removeItem('todos');
    todoList.innerHTML = ''; // ta bort alla element i listan
    showMessage('Listan har rensats.');
}

function showMessage(message, type) {
    messageDiv.innerHTML = message;
    messageDiv.className = type;
}
