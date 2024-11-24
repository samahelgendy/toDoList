var enterText = document.querySelector(".enterText")
var btn = document.querySelector(".btnName");
var addName = document.querySelector(".task");
var showAlert = document.querySelector(".alert");
var btnClose = document.querySelector(".btn-close");
var alertdel = document.querySelector(".alertdel");
var btnhide = document.querySelector(".btnhide");

var arrayNameValue = [];
// check tasks
if(localStorage.getItem('tasks')) {
    arrayNameValue = JSON.parse(localStorage.getItem('tasks'));
}

getElementToLocalStorage();
// close successful message
btnClose.onclick = () =>{
    showAlert.classList.remove('show');
    showAlert.classList.add('hide');
}
// close deleting message
btnhide.onclick = () =>{
    alertdel.classList.remove('show');
    alertdel.classList.add('hide');
}

btn.onclick = function(){
    
   if(enterText.value !== ""){

    addArrayName(enterText.value);
    // open successful message
    showAlert.classList.add('show');
    showAlert.classList.remove('hide');
    // input is empty
    enterText.value = ""; 
   }

}

function addArrayName(textNames){
    // do object to add Element in array
   var tasks ={
    id : Date.now(), 
    name : textNames , 
    completed : false
   }
//    add object in array
   arrayNameValue.push(tasks);
    // function to do elements
   addElementToPage(arrayNameValue);
//    function to add Element in LocalStorage
   setElementToLocalStorage(arrayNameValue);

}
function addElementToPage(arrayOfTasks){
    // donot repeat name entered
    addName.innerHTML = "";
    arrayOfTasks.forEach(task => {
        // create div container
        var div = document.createElement("div");
        // create class to div container
        div.className = 'con-task';
        // create Attribute to div container
        div.setAttribute('data-id' , task.id);
        // add name enter div container
        div.appendChild(document.createTextNode(task.name));
        //  create span inside div container
        var span = document.createElement('span');
        span.className='del';
        // addition text inside span
        span.appendChild(document.createTextNode("X"));
        // addition span inside div container
        div.appendChild(span);
        // addition div container inside main div
        addName.appendChild(div);

    });
}
// function to addition elements inside LocalStorage
function setElementToLocalStorage(Value){
  window.localStorage.setItem('tasks' , JSON.stringify(Value));
}
// function to get elements from LocalStorage
function getElementToLocalStorage(){
    let data = window.localStorage.getItem('tasks');
    // check find data
    if(data){
       let tasks = JSON.parse(data);
    //    function addition elements in main div
       addElementToPage(tasks)
    }
  }
  addName.addEventListener('click' , (e) => {
    if(e.target.classList.contains('del')){
        // remove container div from main div
        e.target.parentElement.remove();
        // show the deletion message
        alertdel.classList.add("show");
        alertdel.classList.remove("hide");
    }

    if(e.target.classList.contains('con-task')){
        // to toggle class done
        e.target.classList.toggle('done');
       
    }
     removeElementFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
     toggleTaskWith(e.target.getAttribute("data-id"));
  });
 function removeElementFromLocalStorage(nameId){
    
    arrayNameValue = arrayNameValue.filter((task) => task.id != nameId);
    
    setElementToLocalStorage(arrayNameValue);

  }
  function toggleTaskWith(taskId){
    for(let i = 0; i < arrayNameValue.length; i++){
      if(arrayNameValue[i].id == taskId){
        arrayNameValue[i].completed == false ? (arrayNameValue[i].completed = true) : (arrayNameValue[i].completed = false);
        
      }
    }
    setElementToLocalStorage(arrayNameValue);
  }