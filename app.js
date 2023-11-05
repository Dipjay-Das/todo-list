console.log("hello")
const createTask = document.querySelector(".create");
const todoHead = document.querySelector(".heading");
const popUp = document.querySelector(".pop-up");
const popDelete = document.querySelector(".popup-head i");
const taskInput = popUp.querySelector("input");
const addBtn = document.querySelector(".add");
const btnText = addBtn.innerText;
const cancelBtn = document.querySelector(".cancel");
const alltodoInfo = document.querySelectorAll(".task-info");
const tskDetails = document.querySelectorAll(".task-details");
const listRec = document.querySelector(".list-container");
const listRec2 = document.querySelector(".in-progress");

createTask.addEventListener("click", () => {
    todoHead.style.display = "none";
    popUp.style.display = "flex";
})

cancelBtn.addEventListener("click", () => {
    popUp.style.display = "none";
    todoHead.style.display = "block";
    taskInput.value = "";
})

popDelete.addEventListener("click", () => {
    popUp.style.display = "none";
    todoHead.style.display = "block";
    taskInput.value = "";
})

let userArray = [];
let edit_id = null;

let objStr = localStorage.getItem('users');
if (objStr != null) {
    userArray = JSON.parse(objStr);
}

addBtn.addEventListener("click", () => {
    const name = taskInput.value;
    if (edit_id != null) {
        userArray.splice(edit_id, 1, { 'name': name });
        edit_id = null
    }
    else {
        userArray.push({ 'name': name });

    }

    if (taskInput.value.length == "") {
        alert("Enter a task name");
    } else {
        saveInfo(userArray);
        displayInfo();
        taskInput.value = '';
        addBtn.innerText = btnText
    }
}
)
function displayInfo() {
    let statement = '';
    userArray.forEach((user, i) => {
        statement +=
            `<li class="list-item" draggable="true">
            <input type="text" value="${user.name}">
                 <div class="icons">
                      <i class="fa-regular fa-pen-to-square" onclick = 'editInfo(${i})' ></i>
                      <i class="fa-solid fa-trash" onclick = 'deleteInfo(${i})'></i>
                 </div>
            </li>`
    })
    listRec.innerHTML = statement;

    listRec.addEventListener("dragstart", dragstart);
    listRec.addEventListener("dragend", dragend);
}

function saveInfo(userArray) {
    let str = JSON.stringify(userArray);
    localStorage.setItem('users', str);
}
function deleteInfo(id) {
    userArray.splice(id, 1);
    saveInfo(userArray);
    displayInfo();
}

function editInfo(id) {
    popUp.style.display = "flex";
    edit_id = id;
    console.log(edit_id);
    taskInput.value = userArray[id].name;
    addBtn.textContent = "Save";
}

displayInfo()

const draggable = document.querySelectorAll(".list-item");
let draggablesTodo = null;

draggable.forEach((task) => {
    task.addEventListener("dragstart", dragstart);
    task.addEventListener("dragend", dragend);
    saveInfo(userArray);
});

function dragstart(e) {
    draggablesTodo = e.target;
    console.log("drag start");
    // console.log(draggablesTodo);
}

function dragend() {
    draggablesTodo = null;
    console.log("drag end");
}


tskDetails.forEach((item, ip) => {
    item.addEventListener("dragover", (e) => {
        e.preventDefault();
    });
    item.addEventListener("dragenter", () => {
        console.log("drag enter");
    });
    item.addEventListener("dragleave", () => {
        console.log("drag leave");
    })
    item.addEventListener("drop", dragDrop);
    
});

function dragDrop() {
    this.appendChild(draggablesTodo);
    console.log("droppped");
    draggablesTodo = null;
}
