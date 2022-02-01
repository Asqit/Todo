var submit;
var removeTask = function (id) {
    var todos = loadData();
    todos = todos.filter(function (todo) {
        return todo.id != id;
    });
    localStorage.setItem("TODOS", JSON.stringify(todos));
    renderData(loadData());
};
var renderData = function (data) {
    var output = document.getElementById("output");
    output.innerHTML = "";
    data.sort(function (a, b) {
        return b.priority - a.priority;
    });
    data.forEach(function (task) {
        output.innerHTML += "\n      <li>\n        <b>".concat(task.title, "</b>\n        <input type=\"checkbox\" id=\"dropdown").concat(task.id, "\" class=\"dropdown\" style=\"display:none\"/>\n        <div>\n            <label for=\"dropdown").concat(task.id, "\" class=\"btn\">details</label>\n            <span class=\"btn remove\" onclick=\"removeTask(").concat(task.id, ")\">remove</span>\n        </div>\n        <div class=\"details\">\n            <b>priority:").concat(task.priority, "</b>\n            <p>\n                ").concat(task.description, "\n            </p>\n        </div>\n      </li>");
    });
};
var loadData = function () {
    var payload = JSON.parse(localStorage.getItem("TODOS"));
    return payload;
};
var saveData = function (task) {
    if (task.title.length > 0) {
        if (localStorage.length > 0) {
            var payload = JSON.parse(localStorage.getItem("TODOS"));
            payload.push(task);
            localStorage.setItem("TODOS", JSON.stringify(payload));
        }
        else {
            var payload = [task];
            localStorage.setItem("TODOS", JSON.stringify(payload));
        }
        if (localStorage.length > 0)
            return true;
        else {
            console.error("ERROR:Failed to save data");
            return false;
        }
    }
    else {
        alert("Please, fill out all required input fields");
        return true;
    }
};
var fetchData = function () {
    var title = document.getElementById("input-title");
    var desc = document.getElementById("input-descr");
    var priority = document.getElementById("input-priority");
    var id = JSON.parse(localStorage.getItem("TODOS")).length;
    var result = {
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
var handleSubmit = function (e) {
    e.preventDefault();
    if (saveData(fetchData()))
        renderData(loadData());
    else {
        console.error("ERROR:Failed to save data");
        alert("an error occured, please try again later");
    }
};
var switchMode = function () {
    var all = document.querySelectorAll(".section");
    document.querySelector(".App").classList.toggle("dark");
    all.forEach(function (a) { return a.classList.toggle("dark"); });
};
var main = function (e) {
    submit = document.getElementById("input-save");
    submit.addEventListener("click", handleSubmit);
    if (localStorage.length > 0)
        renderData(loadData());
    else
        localStorage.setItem("TODOS", "[]");
    var d = new Date();
    document.querySelector("#copy-year").innerHTML = d.getFullYear().toString();
    if (d.getHours() >= 19 && d.getHours() <= 7)
        switchMode();
};
window.addEventListener("load", main);