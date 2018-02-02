var newItem = document.querySelector(".newItem");
var submit = document.querySelector(".submit");
var toDoList = document.querySelector(".toDoList");
var doneList = document.querySelector(".doneList");
var p = document.querySelector("p");
var li = document.getElementsByTagName("li");

//renderHTML from localStorage if there is anything
var data = (localStorage.getItem("toDo")) ? JSON.parse(localStorage.getItem("toDo")): {
  todo : [],
  completed:[]
};
console.log(data)
renderToDoList()

//add new item
submit.addEventListener("click", function(){
  var value = newItem.value;
  var item =
  `<li>
  <button id="tick" class="buttons" onClick="turnOn(this)"><div class="circle green"></div></button>
  <span>${value}</span>
  <button id="x" onclick="remove(this)" class="buttons"><div class="circle red"></div></button>
  </li>`
  if(value){
    toDoList.insertAdjacentHTML('afterbegin', item)
    data.todo.push(value);
    }
    newItem.value="";
    dataUpdated()
})

  //complete list item
  function turnOn(el){
    var value = el.parentNode.childNodes[3].innerText;
    data.completed.push(value)
    data.todo.splice(data.todo.indexOf(value),1)
    el.parentNode.parentNode.removeChild(el.parentNode);
    var item =
    `<li>
    <button id="tick" class="buttons on"><div class="circle green"></div></button>
    <span>${value}</span>
    <button id="x" onclick="removeCompleted(this)" class="buttons"><div class="circle red"></div></button>
    </li>`
    doneList.insertAdjacentHTML('afterbegin', item)
    dataUpdated()
  }

 //remove item list and remove from array- very hacky, sort your html out!
  function remove(el){
   alert("clicked remove");
   var text = el.parentNode.childNodes[3].innerText
   data.todo.splice(data.todo.indexOf(text),1)
   el.parentNode.parentNode.removeChild(el.parentNode);
   dataUpdated()
  }

  //remove item from done list
  function removeCompleted(el){
    alert("clicked clear");
    el.parentNode.parentNode.removeChild(el.parentNode);
    var value = el.parentNode.childNodes[3].innerText;
    data.completed.splice(data.completed.indexOf(value),1)
    dataUpdated()
  }

 //storing in localStorage
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
     <button id="tick" class="buttons" onclick="turnOn(this)"><div class="circle green"></div></button>
     <span>${value}</span>
     <button id="x" onclick="remove(this)" class="buttons"><div class="circle red"></div></button>
     </li>`
     toDoList.insertAdjacentHTML('afterbegin', item)
    }

   for(var j=0; j<data.completed.length; j++){
      var value = data.completed[j];
      console.log("this is completed of i "+ value)
      var item =
      `<li>
      <button id="tick" class="buttons on"><div class="circle green"></div></button>
      <span>${value}</span>
      <button id="x" onclick="clear(this)" class="buttons"><div class="circle red"></div></button>
      </li>`
      doneList.insertAdjacentHTML('afterbegin', item)
    }
  }
