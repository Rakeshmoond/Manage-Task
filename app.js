const clear=document.querySelector(".clear");
const dateElement=document.getElementById("date");
const list=document.getElementById("list");
const input=document.getElementById("input");
const CHECK="fa-check-circle";
const UNCHECK="fa-circle-thin";
const LINET="lineThrough";
// variables
let List,id;

// get item from localStorage 

   let data=localStorage.getItem("ToDo");
//    check idf data is not empty 
if(data){
    List=JSON.parse(data);
    // set id to the last one in the list 
    id=List.length; 
    loadList(List);
    // load list to the user interface 
}
else{
    List=[];
    id=0;
}
// load item to user interface ?
function loadList(array){
    array.forEach(function(item) {
        addToDo(item.name,item.id, item.done, item.trash);
    });
}
// clear the localStorage 
clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
})

let options={weekday:"long",month:"short",day:"numeric"};
const today=new Date();
dateElement.innerHTML=today.toLocaleDateString("en-US",options); 
function addToDo(toDo,id,done,trash){
    if(trash){return ;}
    const Done=done?CHECK:UNCHECK;
    const Line=done?LINET:" ";
const item=`<li class="item">
<i class="fa ${Done} co" job="complete" id="${id}"></i>
        <p class="text ${Line}"> ${toDo}</p>
        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
        </li> `;
    const position="beforeend";
    list.insertAdjacentHTML(position,item)
}
// add a item to the list user the enter key 
document.addEventListener("keyup",function(even){
if(event.keyCode == 13) {
    const toDo=input.value;
    // if the input is not empty
    if(toDo){
        addToDo(toDo,id,false,false);
        List.push({
            name:toDo,
            id:id, 
            done:false,
            trash:false
        });
        // add item to localStorage  
        localStorage.setItem("TODO",JSON.stringify(List)); 
        id++;
    }
    input.value="";
}
});
// complete to do 
function completeTODo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINET);
    List[element.id].done=List[element.id].done? false:true;
}
// remove to do ?
function removeToDo(element){
element.parentNode.parentNode.removeChild(element.parentNode);
List[element.id].trash=true;
}
// target the items create dynamically 
list.addEventListener("click",function(event){ 
    const element=event.target;
    //  return the clicked element in the list 
    const elementJob=element.attributes.job.value;
    if (elementJob=="complete") {
        completeTODo(element);
    }
    else if (elementJob=="delete") {
        removeToDo(element);
    }
    // add item to localStorage (this code must be added where the list array )
    localStorage.setItem("TODO",JSON.stringify(List)); 
});


