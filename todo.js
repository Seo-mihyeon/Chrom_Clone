const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

function filterFn(toDo){
  return toDo.id === 1;
}

let toDos = [];

// list 삭제
function deleteToDo(event){
 const btn = event.target;
 const li = btn.parentNode;
 toDoList.removeChild(li);
 const cleanToDos = toDos.filter(function(toDo){
   return toDo.id !== parseInt(li.id); //li.id는 string 형식
 });

 toDos = cleanToDos;
 saveToDos();
}



function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));  //object를 string으로 변환
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);  //object로 변환
    parsedToDos.forEach(function(toDo) {  //하나씩 불러오기
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();