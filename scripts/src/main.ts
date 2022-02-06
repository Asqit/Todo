/* * * * * * * * * * * * * * * * * * * * * * * *
 *   Todo source                          V0.1
 *   Andrew Tuček                     1.2.2022
 * * * * * * * * * * * * * * * * * * * * * * * */

let submit: HTMLInputElement;
interface Todo {
  id: number;
  title: string;
  description?: string;
  priority: number;
}
//--------------------------------------------------------
const removeTask = (id: number) => {
  let todos: Todo[] = loadData();

  todos = todos.filter((todo) => {
    return todo.id != id;
  });

  localStorage.setItem("TODOS", JSON.stringify(todos));

  renderData(loadData());
};
//--------------------------------------------------------
const renderData = (data: Todo[]): void => {
  let output = document.getElementById("output");
  output.innerHTML = "";

  // sort array by priority
  data.sort((a, b) => {
    return b.priority - a.priority;
  });

  // for each element we create li element
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
};
//--------------------------------------------------------
const loadData = (): Todo[] => {
  let payload = JSON.parse(localStorage.getItem("TODOS"));
  return payload;
};
//--------------------------------------------------------
const saveData = (task: Todo): boolean => {
  if (task.title.length > 0) {
    if (localStorage.length > 0) {
      let payload: Todo[] = JSON.parse(localStorage.getItem("TODOS"));
      payload.push(task);
      localStorage.setItem("TODOS", JSON.stringify(payload));
    } else {
      let payload: Todo[] = [task];
      localStorage.setItem("TODOS", JSON.stringify(payload));
    }

    // Final check
    if (localStorage.length > 0) return true;
    else {
      console.error(`ERROR:Failed to save data`);
      return false;
    }
  } else {
    alert("Please, fill out all required input fields");
    return true;
  }
};
//--------------------------------------------------------
const fetchData = (): Todo => {
  let title = document.getElementById("input-title") as HTMLInputElement;
  let desc = document.getElementById("input-descr") as HTMLInputElement;
  let priority = document.getElementById("input-priority") as HTMLInputElement;
  let id = JSON.parse(localStorage.getItem("TODOS")).length;

  let result: Todo = {
    id: id,
    title: title.value,
    description: desc.value || "",
    priority: <number>(<unknown>priority.value),
  };

  title.value = "";
  desc.value = "";
  priority.value = "1";

  return result;
};
//--------------------------------------------------------
const handleSubmit = (e?: any): void => {
  e.preventDefault();
  if (saveData(fetchData())) renderData(loadData());
  else {
    console.error("ERROR:Failed to save data");
    alert("an error occured, please try again later");
  }
};
//--------------------------------------------------------
const main = (e?: any): void => {
  submit = document.getElementById("input-save") as HTMLInputElement;
  submit.addEventListener("click", handleSubmit);

  if (localStorage.length > 0) renderData(loadData());
  else localStorage.setItem("TODOS", "[]");
};

window.addEventListener("load", main);
