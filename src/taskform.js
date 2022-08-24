import trashIcon from "./assets/trash-solid.svg";
import whiteFlag from "./assets/flag-solid.svg";
import redFlag from "./assets/flag-red.svg";
import orangeFlag from "./assets/flag-orange.svg";

import penIcon from "./assets/pen-to-square-solid.svg";

import createNewTask from "./task";
import { createNewProject } from "./project";
import { isThisWeek, isToday } from "date-fns";
import todoList from "./todolist";

const todolist = todoList();

const createFormInput = (name, type) => {
  const div = document.createElement("div");
  div.classList.add("form-element");

  const label = document.createElement("label");
  const input = document.createElement("input");

  label.textContent = `${name}:`;
  label.setAttribute("for", `${name.toLowerCase()}`);
  input.setAttribute("type", type);
  input.setAttribute("name", `${name.toLowerCase()}`);
  input.setAttribute("id", `${name.toLowerCase()}Input`);
  input.setAttribute("required", "");
  input.setAttribute("minlength", "1");

  div.appendChild(label);
  div.appendChild(input);

  return div;
};

const createFormTextarea = (name, type) => {
  const div = document.createElement("div");
  div.classList.add("form-element");

  const label = document.createElement("label");
  const textarea = document.createElement("textarea");

  label.textContent = `${name}:`;
  label.setAttribute("for", `${name.toLowerCase()}`);
  textarea.setAttribute("type", type);
  textarea.setAttribute("name", `${name.toLowerCase()}`);
  textarea.setAttribute("id", `${name.toLowerCase()}Input`);

  textarea.setAttribute("required", "");

  div.appendChild(label);
  div.appendChild(textarea);

  return div;
};

const createCalendar = (name, type) => {
  const div = document.createElement("div");
  div.classList.add("form-element");

  const label = document.createElement("label");
  const input = document.createElement("input");

  label.textContent = `${name}:`;
  label.setAttribute("for", `${name.toLowerCase()}`);
  input.setAttribute("type", type);
  input.setAttribute("name", `${name.toLowerCase()}`);
  input.setAttribute("id", `${name.toLowerCase()}Input`);
  input.setAttribute("max", "01-01-2025");
  input.setAttribute("min", "08-23-2022");
  input.setAttribute("required", "");
  input.setAttribute("value", `${name.toLowerCase()}`);

  div.appendChild(label);
  div.appendChild(input);

  return div;
};

const createFormSelect = (name) => {
  const createOption = (option) => {
    const opt = document.createElement("option");
    opt.text = option;
    opt.setAttribute("value", `${option.toLowerCase()}`);
    return opt;
  };

  const div = document.createElement("div");
  div.classList.add("form-element");

  const label = document.createElement("label");
  label.textContent = `${name}:`;
  label.setAttribute("for", `${name.toLowerCase()}`);

  const select = document.createElement("select");
  select.setAttribute("name", `${name.toLowerCase()}`);
  select.setAttribute("id", `${name.toLowerCase()}Input`);
  select.appendChild(createOption("Low"));
  select.appendChild(createOption("Medium"));
  select.appendChild(createOption("High"));

  select.firstChild.setAttribute("selected", "selected");

  div.appendChild(label);
  div.appendChild(select);

  return div;
};

const createFormButton = () => {
  const button = document.createElement("button");
  button.classList.add("add-btn");
  button.textContent = "Add";
  button.setAttribute("type", "submit");

  return button;
};

const createExitButton = () => {
  const span = document.createElement("span");
  span.classList.add("exit-btn");
  span.textContent = "×";

  return span;
};

const renderTask = (title, notes, date, priority) => {
  const inbox = document.querySelector(".inbox");
  const formBg = document.querySelector(".modal-bg");
  const form = document.querySelector(".modal");
  const div = document.createElement("div");
  const tasksContainer = document.querySelector(".tasks-container");

  div.classList.add("inbox-element");

  const taskLeft = document.createElement("div");
  taskLeft.classList.add("task-left");
  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("name", "done");
  const label = document.createElement("label");
  label.setAttribute("for", "done");
  label.setAttribute("data-content", title);
  label.textContent = title;

  input.addEventListener("click", () => {
    if (input.hasAttribute("checked")) {
      input.removeAttribute("checked");
    } else {
      input.setAttribute("checked", "");
    }
  });

  taskLeft.appendChild(input);
  taskLeft.appendChild(label);

  const taskRight = document.createElement("div");
  taskRight.classList.add("task-right");
  const edit = document.createElement("img");
  edit.src = penIcon;
  edit.classList.add("edit");

  const flag = document.createElement("img");
  if (priority == "low") {
    flag.src = whiteFlag;
  } else if (priority == "medium") {
    flag.src = orangeFlag;
  } else if (priority == "high") {
    flag.src = redFlag;
  }

  const trash = document.createElement("img");
  trash.src = trashIcon;
  trash.classList.add("trash");
  taskRight.appendChild(edit);
  taskRight.appendChild(flag);
  taskRight.appendChild(trash);

  div.appendChild(taskLeft);
  div.appendChild(taskRight);

  const elementDetails = document.createElement("div");
  elementDetails.classList.add("details");
  elementDetails.classList.add("hidden");

  const titleDetail = document.createElement("h4");
  titleDetail.textContent = "Title: " + title;

  const notesDetail = document.createElement("h4");
  notesDetail.textContent = "Notes: " + notes;

  const dateDetail = document.createElement("h4");
  dateDetail.textContent = "Deadline: " + date;

  const priorityCapitalized =
    priority.charAt(0).toUpperCase() + priority.slice(1);

  const priorityDetail = document.createElement("h4");
  priorityDetail.textContent = "Priority: " + priorityCapitalized;

  elementDetails.appendChild(titleDetail);
  elementDetails.appendChild(notesDetail);
  elementDetails.appendChild(dateDetail);
  elementDetails.appendChild(priorityDetail);

  div.appendChild(elementDetails);

  div.addEventListener("click", (e) => {
    if (
      elementDetails.classList.contains("hidden") &&
      (e.target.className == "inbox-element" ||
        e.target.className == "task-left" ||
        e.target.localName == "label")
    ) {
      elementDetails.classList.remove("hidden");
    } else if (
      !elementDetails.classList.contains("hidden") &&
      (e.target.className == "inbox-element" ||
        e.target.className == "task-left" ||
        e.target.localName == "label")
    ) {
      elementDetails.classList.add("hidden");
    }
  });

  trash.addEventListener("click", () => {
    trash.parentNode.parentNode.remove();
    console.log("before");
    console.log(
      todolist
        .getProjects()
        .find(
          (project) =>
            project.name.toUpperCase() ==
            inbox.firstChild.textContent.toUpperCase()
        )
        .getTasks()
    );

    todolist
      .getProjects()
      .find(
        (project) =>
          project.name.toUpperCase() ==
          inbox.firstChild.textContent.toUpperCase()
      )
      .deleteTask(title);

    todolist.getProjects()[1].deleteTask(title);

    todolist.getProjects()[2].deleteTask(title);

    console.log("after");
    console.log(
      todolist
        .getProjects()
        .find(
          (project) =>
            project.name.toUpperCase() ==
            inbox.firstChild.textContent.toUpperCase()
        )
        .getTasks()
    );
  });

  edit.addEventListener("click", () => {
    formBg.firstChild.lastChild.textContent = "Edit";
    formBg.classList.add("bg-active");

    document.getElementById("titleInput").value = title;
    document.getElementById("notesInput").value = notes;
    const datoo = new Date(date);
    document.getElementById("dateInput").value = datoo
      .toISOString()
      .substr(0, 10);
    document.getElementById("priorityInput").value = priority;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (formBg.firstChild.lastChild.textContent == "Edit") {
        formBg.classList.remove("bg-active");
        const newTask = createNewTask();
        const newElement = renderTask(
          newTask.title,
          newTask.notes,
          newTask.dueDate,
          newTask.priority
        );

        // edit.parentNode.parentNode.replaceWith(newElement);
        tasksContainer.replaceChild(newElement, edit.parentNode.parentNode);

        if (
          !edit.parentNode.parentNode.lastChild.classList.contains("hidden")
        ) {
          newElement.lastChild.classList.remove("hidden");
        }

        const index = todolist
          .getProjects()
          .find(
            (project) =>
              project.name.toUpperCase() ==
              inbox.firstChild.textContent.toUpperCase()
          )
          .getTasks()
          .findIndex((task) => task.title == title);

        todolist
          .getProjects()
          .find(
            (project) =>
              project.name.toUpperCase() ==
              inbox.firstChild.textContent.toUpperCase()
          )
          .getTasks()[index] = newTask;

        const indexToday = todolist
          .getProjects()[1]
          .getTasks()
          .findIndex((task) => task.title == title);

        todolist.getProjects()[1].getTasks()[indexToday] = newTask;

        const indexWeek = todolist
          .getProjects()[2]
          .getTasks()
          .findIndex((task) => task.title == title);

        todolist.getProjects()[2].getTasks()[indexWeek] = newTask;

        if (isToday(new Date(newTask.dueDate)) && indexToday == -1) {
          todolist.getProjects()[1].addTask(newTask);
        }

        if (isThisWeek(new Date(newTask.dueDate)) && indexWeek == -1) {
          todolist.getProjects()[2].addTask(newTask);
        }

        todolist.getProjects()[1].updateToday();
        todolist.getProjects()[2].updateWeek();
      }
    });
  });

  return div;
};

const taskFormHandlers = () => {
  const inbox = document.querySelector(".inbox");
  const formBg = document.querySelector(".modal-bg");
  const form = document.querySelector(".modal");

  const addTaskButton = document.querySelector("#add");
  addTaskButton.addEventListener("click", () => {
    formBg.firstChild.lastChild.textContent = "Add";
    formBg.classList.add("bg-active");
    document.getElementById("titleInput").value = "";
    document.getElementById("notesInput").value = "";
    document.getElementById("dateInput").value = "";
    document.getElementById("priorityInput").value =
      document.querySelector("select").firstChild.value;
  });

  const exit = document.querySelector(".exit-btn");
  exit.addEventListener("click", () => {
    formBg.classList.remove("bg-active");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (formBg.firstChild.lastChild.textContent == "Add") {
      formBg.classList.remove("bg-active");
      const newTask = createNewTask();
      if (isToday(new Date(newTask.dueDate))) {
        todolist.getProjects()[1].addTask(newTask);
      }
      if (isThisWeek(new Date(newTask.dueDate))) {
        todolist.getProjects()[2].addTask(newTask);
      }
      todolist
        .getProjects()
        .find(
          (project) =>
            project.name.toUpperCase() ==
            inbox.firstChild.textContent.toUpperCase()
        )
        .addTask(newTask);
      renderProject(inbox.firstChild.textContent);
    }
  });

  formBg.addEventListener("click", (e) => {
    if (formBg.classList.contains("bg-active") && e.target == formBg) {
      formBg.classList.remove("bg-active");
    }
  });
};

const loadTaskForm = () => {
  const formBg = document.createElement("div");
  formBg.id = "taskmodal-bg";
  formBg.classList.add("modal-bg");

  const form = document.createElement("form");
  form.id = "taskmodal";
  form.classList.add("modal");

  form.appendChild(createFormInput("Title", "text"));
  form.appendChild(createFormTextarea("Notes", "textarea"));
  form.appendChild(createCalendar("Date", "date"));
  form.appendChild(createFormSelect("Priority"));
  form.appendChild(createExitButton());
  form.appendChild(createFormButton());

  formBg.appendChild(form);

  return formBg;
};

function renderProjectSidebar(text) {
  const div = document.createElement("div");
  div.classList.add("project-element");
  const h4 = document.createElement("h4");
  h4.textContent = text;
  const trash = document.createElement("img");
  trash.src = trashIcon;
  div.appendChild(h4);
  div.appendChild(trash);

  trash.addEventListener("click", (e) => {
    if (e.target.localName == "img") {
      trash.parentNode.remove();
      const toRemove = todolist
        .getProjects()
        .find((project) => project.name.toUpperCase() == text.toUpperCase())
        .getTasks();

      todolist.getProjects()[1].update(toRemove);
      todolist.getProjects()[2].update(toRemove);

      todolist.deleteProject(text);
      console.log(todolist.getProjects().length);

      if (todolist.getProjects().length >= 3) {
        renderProject("Home");
      }
    }
  });

  div.addEventListener("click", (e) => {
    if (e.target.localName != "img") {
      renderProject(text);

      // console.log(todolist.getProjects());
    }
  });

  return div;
}

const renderProject = (text) => {
  const inbox = document.querySelector(".inbox");
  const tasksContainer = document.querySelector(".tasks-container");
  const h4 = document.querySelector(".inbox > h4");

  tasksContainer.innerHTML = "";

  h4.textContent = text;

  todolist
    .getProjects()
    .find(
      (project) =>
        project.name.toUpperCase() == inbox.firstChild.textContent.toUpperCase()
    )
    .getTasks()
    .map((task) =>
      tasksContainer.appendChild(
        renderTask(task.title, task.notes, task.dueDate, task.priority)
      )
    );
};

const projectFormHandlers = () => {
  const formBg = document.querySelector("#projectmodal-bg");
  const form = document.querySelector("#projectmodal");
  const sideBar = document.querySelector(".sidebar");

  const addProjectButton = document.querySelector("#addProject");
  addProjectButton.addEventListener("click", () => {
    formBg.firstChild.lastChild.textContent = "Add";
    formBg.classList.add("bg-active");
  });

  const exit = document.querySelector("#projectmodal .exit-btn");
  exit.addEventListener("click", () => {
    formBg.classList.remove("bg-active");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newProject = createNewProject();
    todolist.addProject(newProject);
    const newSideBarElement = renderProjectSidebar(newProject.name);
    sideBar.appendChild(newSideBarElement);
    formBg.classList.remove("bg-active");
  });

  formBg.addEventListener("click", (e) => {
    if (formBg.classList.contains("bg-active") && e.target == formBg) {
      formBg.classList.remove("bg-active");
    }
  });
};

const loadProjectForm = () => {
  const formBg = document.createElement("div");
  formBg.id = "projectmodal-bg";
  formBg.classList.add("modal-bg");

  const form = document.createElement("form");
  form.id = "projectmodal";
  form.classList.add("modal");

  form.appendChild(createFormInput("Project", "text"));
  form.appendChild(createExitButton());
  form.appendChild(createFormButton());

  formBg.appendChild(form);

  return formBg;
};

export {
  loadTaskForm,
  taskFormHandlers,
  loadProjectForm,
  projectFormHandlers,
  renderProject,
};
