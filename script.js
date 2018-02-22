var newItem = document.querySelector(".newItem");
var addItems = document.querySelector(".addItems")
var submit = document.querySelector(".submit");
var toDoList = document.querySelector(".toDoList");
var doneList = document.querySelector(".doneList");

//renderHTML from localStorage if there is anything
var data = (localStorage.getItem("toDo")) ? JSON.parse(localStorage.getItem("toDo")): {
  todo : [],
  completed:[]
};

renderToDoList()

addItems.addEventListener("submit", addToDo)

function addToDo(){
  var value = newItem.value;
  var item =
  `<li>
  <button id="tick" class="buttons" onClick="turnOn(this)"><div class="greenCircle"></div></button>
  <span>${value}</span>
  <button id="x" class="buttons" onclick="remove(this)">x</button>
  </li>`

    // <button id="x" onclick="remove(this)" class="buttons"><div class="circle red"></div></button>
  if(value){
    toDoList.insertAdjacentHTML('afterbegin', item);
    data.todo.push(value);
    }
    newItem.value="";
    dataUpdated()
}

  //complete list item
  function turnOn(el){
    var value = el.parentNode.childNodes[3].innerText;
    data.completed.push(value);
    data.todo.splice(data.todo.indexOf(value),1);
    el.parentNode.parentNode.removeChild(el.parentNode);
    var item =
    `<li>
    <button id="tick" class="buttons completed">&#10003</button>
    <span>${value}</span>
    <button id="x" onclick="removeCompleted(this)" class="buttons">x</button>
    </li>`
    doneList.insertAdjacentHTML('afterbegin', item)
    dataUpdated()
  }

 //remove item list and remove from array- sort your html out!
  function remove(el){
   var text = el.parentNode.childNodes[3].innerText
   data.todo.splice(data.todo.indexOf(text),1)
   el.parentNode.parentNode.removeChild(el.parentNode);
   dataUpdated()
  }

  //remove item from done list & completed array
  function removeCompleted(el){
    el.parentNode.parentNode.removeChild(el.parentNode);
    var value = el.parentNode.childNodes[3].innerText;
    data.completed.splice(data.completed.indexOf(value),1)
    dataUpdated()
  }

 //store in localStorage
  function dataUpdated(){
    localStorage.setItem("toDo", JSON.stringify(data))
  }

  //render html
  function renderToDoList(){
    if(!data.todo.length && !data.completed.length) return;
    for(var i=0; i<data.todo.length; i++){
     var value = data.todo[i];
     var item =
     `<li>
     <button id="tick" class="buttons" onclick="turnOn(this)"><div class="greenCircle"></div></button>
     <span>${value}</span>
     <button id="x" onclick="remove(this)" class="buttons">x</button>
     </li>`
     toDoList.insertAdjacentHTML('afterbegin', item)
    }

   for(var j=0; j<data.completed.length; j++){
      var value = data.completed[j];
      var item =
      `<li>
      <button id="tick" class="buttons completed">&#10003</button>
      <span>${value}</span>
      <button id="x" onclick="removeCompleted(this)" class="buttons">x</button>
      </li>`
      doneList.insertAdjacentHTML('afterbegin', item)
    }
  }
