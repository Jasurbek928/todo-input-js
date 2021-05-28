let todoForm = document.querySelector('#todo-form');
let todoInput = document.querySelector('#todo-input');
let todoListGroup = document.querySelector('#todo-list-group');
let todosCount = document.querySelector('#todo-count')

let todos = [];
let todoInitialId = 0;

function TodoPrototype(text,id){
    this.id = id;
    this.text = text;
}

    function editTodo(todoText,todoId ) {
        for(i=0; i<todos.length; i++){
            if(todos[i].id == todoId){
               todos[i].text = todoText;
            }
    }
}
 function removeTodo(todoId){
   
  document.querySelector(`#todo-number_${todoId}`).remove();
   
    for(i=0; i<todos.length; i++){
    if(todos[i].id == todoId){
        todos.splice(i,1);
    }
  }
    todosCount.textContent = todos.length;
 }

function todoCreateDom(todoText,todoId){
   let listItem = document.createElement('li');
   let todoEditInput = document.createElement('input'); 
   let deleteBtn = document.createElement('button');

   listItem.setAttribute('class','list-group-item d-flex align-items-center justify-content-between');
   
   listItem.setAttribute('id',`todo-number_${todoId}`);


   deleteBtn.setAttribute('class','btn btn-outline-danger');
   deleteBtn.textContent = 'O\'chirish';
   todoEditInput.value = todoText;
   todoEditInput.setAttribute('class','todo-edit-input');
   todoEditInput.disabled = true;

   listItem.addEventListener('dblclick',function(){
    todoEditInput.disabled = false;
    todoEditInput.focus();
    todoEditInput.style.borderBottom = '1px solid blue';
   });
   todoEditInput.addEventListener('blur',function(){
     if(todoEditInput.value.length>0){
         editTodo(todoEditInput.value, todoId);
         todoEditInput.disabled=true;
         todoEditInput.style.borderBottom = '1px solid transparent';
     }else{
        todoEditInput.style.borderBottom = '1px solid #ff0000';
     }
   });
   todoEditInput.addEventListener('keypress',function(e){
        if((e.key === "Enter") && (todoEditInput.value.length>0)){
            editTodo(todoEditInput.value, todoId);
            todoEditInput.disabled = true;
            todoEditInput.style.borderBottom = '1px solid transparent';
            todoEditInput.blur();
        }else{
            todoEditInput.style.borderBottom = '1px solid #ff0000';
        }
   });

   todoEditInput.setAttribute('class', 'todo-edit-input')

   deleteBtn.addEventListener('click',function(){
    removeTodo(todoId);
   });
   listItem.append(todoEditInput)
   listItem.appendChild(deleteBtn);
   todoListGroup.appendChild(listItem);

}


function todoCreate(todoText, todoId){
    todoCreateDom(todoText,todoId);
    todos.push(new TodoPrototype(todoText,todoId));
    todosCount.textContent = todos.length;
};


todoForm.addEventListener('submit', function(e){
   e.preventDefault();
     
   if(todoInput.value.length > 0){
       todoCreate(todoInput.value, todoInitialId);
   }

    todoForm.reset();
    todoInitialId++;
    
});