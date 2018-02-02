var newItem = document.querySelector(".newItem");
var submit = document.querySelector(".submit");
var toDoList = document.querySelector(".toDoList");
var p = document.querySelector("p");
var li = document.getElementsByTagName("li");

//renderHTML from localStorage
var data = (localStorage.getItem("toDo")) ? JSON.parse(localStorage.getItem("toDo")): {
  todo : [],
};
console.log(data)
renderToDoList()

//add new item
submit.addEventListener("click", function(){
  var value = newItem.value;
  var item =
  `<li>
  <button id="tick" class="buttons" onclick="turnOn(this)"><div class="circle green"></div></button>
  <span>${value}</span>
  <button id="x" onClick="remove(this)" class="buttons"><div class="circle red"></div></button>
  </li>`
  if(value){
    toDoList.insertAdjacentHTML('afterbegin', item)
    data.todo.push(value);
    }
    newItem.value="";
    dataUpdated()
})

  //tick off list item
  function turnOn(el){
    console.log(this)
    el.classList.toggle("on")
    el.parentNode.classList.toggle("done")
  }

 //remove item list and remove from array- very hacky, sort your html out!
  function remove(el){
   var text = el.parentNode.childNodes[3].innerText
   data.todo.splice(data.todo.indexOf(text),1)
   el.parentNode.parentNode.removeChild(el.parentNode);
   dataUpdated()
  }

 //storing in localStorage
  function dataUpdated(){
    localStorage.setItem("toDo", JSON.stringify(data))
  }

  //render html
  function renderToDoList(){
    if(!data.todo.length) return;
    for(var i=0; i<data.todo.length; i++){
     var value = data.todo[i];
     var item =
     `<li>
     <button id="tick" class="buttons" onclick="turnOn(this)"><div class="circle green"></div></button>
     <span>${value}</span>
     <button id="x" onClick="remove(this)" class="buttons"><div class="circle red"></div></button>
     </li>`
     toDoList.insertAdjacentHTML('afterbegin', item)
    }
  }
