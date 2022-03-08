"use strict";
let submit;
const removeTask = (id) => {
    let todos = loadData();
    todos = todos.filter((todo) => {
        return todo.id != id;
    });
    localStorage.setItem("TODOS", JSON.stringify(todos));
    renderData(loadData());
};
const renderData = (data) => {
    let output = document.getElementById("output");
    if (output) {
        output.innerHTML = "";
        data.sort((a, b) => {
            return b.priority - a.priority;
        });
        data.forEach((task) => {
            output.innerHTML += `
      <li>
        <b>${task.title}</b>
        <input type="checkbox" id="dropdown${task.id}" class="dropdown" style="display:none"/>
        <div>
            <label for="dropdown${task.id}" class="btn">details</label>
            <span class="btn remove" onclick="removeTask(${task.id})">remove</span>
        </div>
        <div class="details">
            <b>priority:${task.priority}</b>
            <p>
                ${task.description}
            </p>
        </div>
      </li>`;
        });
    }
    else {
        console.error("ERROR:Could not locate ul#output");
        alert("An error occupied, please try again later");
    }
};
const loadData = () => {
    let payload = JSON.parse(localStorage.getItem("TODOS"));
    return payload;
};
const saveData = (task) => {
    if (task.title.length > 0) {
        if (localStorage.length > 0) {
            let payload = JSON.parse(localStorage.getItem("TODOS"));
            payload.push(task);
            localStorage.setItem("TODOS", JSON.stringify(payload));
        }
        else {
            let payload = [task];
            localStorage.setItem("TODOS", JSON.stringify(payload));
        }
        if (localStorage.length > 0)
            return true;
        else {
            console.error(`ERROR:Failed to save data`);
            return false;
        }
    }
    else {
        alert("Please, fill out all required input fields");
        return true;
    }
};
const fetchData = () => {
    let title = document.getElementById("input-title");
    let desc = document.getElementById("input-descr");
    let priority = document.getElementById("input-priority");
    let id = JSON.parse(localStorage.getItem("TODOS")).length;
    let result = {
        id: id,
        title: title.value,
        description: desc.value || "",
        priority: priority.value,
    };
    title.value = "";
    desc.value = "";
    priority.value = "1";
    return result;
};
const handleSubmit = (e) => {
    e.preventDefault();
    if (saveData(fetchData()))
        renderData(loadData());
    else {
        console.error("ERROR:Failed to save data");
        alert("an error occured, please try again later");
    }
};
function time() {
    let d = new Date();
    let destination = document.querySelector(".time");
    destination.innerHTML = `<b>${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}<b>`;
}
function windowHandler() { }
const main = (e) => {
    submit = document.getElementById("input-save");
    submit.addEventListener("click", handleSubmit);
    setInterval(time, 1000);
    if (localStorage.length > 0)
        renderData(loadData());
    else
        localStorage.setItem("TODOS", "[]");
};
window.addEventListener("load", main);
