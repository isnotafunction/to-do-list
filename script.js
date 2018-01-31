var newItem = document.querySelector(".newItem");
var submit = document.querySelector(".submit");
var toDoList = document.querySelector(".toDoList")
var completed = document.querySelectorAll("#tick");
console.log(completed)

submit.addEventListener("click", function(){
  var value = newItem.value;
  var item =
  `<li type="checkbox">
  ${value}
  <button onclick="turnOn(this)" id="tick" class="buttons"><div class="check"></div></button>
  <button onClick="this.parentNode.parentNode.removeChild(this.parentNode);" id="x"class="buttons">x</button>
  </li>`

  if(value){
    toDoList.insertAdjacentHTML('afterbegin', item)
  }
  newItem.value="";
})

function turnOn(el){
  el.classList.toggle("on")
}
