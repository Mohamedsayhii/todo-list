import trashIcon from "./assets/trash-solid.svg";
import flagIcon from "./assets/flag-solid.svg";
import penIcon from "./assets/pen-to-square-solid.svg";

import { createNewTask } from "./todoItem";

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
  input.setAttribute("max", "01/01/2025");

  input.setAttribute("required", "");

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

const createInboxElement = (title, date, notes, priority) => {
  const formBg = document.querySelector(".modal-bg");
  const div = document.createElement("div");
  const form = document.querySelector(".modal");

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
  taskLeft.appendChild(input);
  taskLeft.appendChild(label);

  const taskRight = document.createElement("div");
  taskRight.classList.add("task-right");
  const edit = document.createElement("img");
  edit.src = penIcon;
  edit.classList.add("edit");
  const flag = document.createElement("img");
  flag.src = flagIcon;
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

  const dateDetail = document.createElement("h4");
  dateDetail.textContent = "Deadline: " + date;

  const notesDetail = document.createElement("h4");
  notesDetail.textContent = "Notes: " + notes;

  const priorityDetail = document.createElement("h4");
  priorityDetail.textContent = "Priority: " + priority;

  elementDetails.appendChild(titleDetail);
  elementDetails.appendChild(dateDetail);
  elementDetails.appendChild(notesDetail);
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
  });

  edit.addEventListener("click", () => {
    console.log(edit.parentNode.parentNode.childNodes[2]);
    formBg.firstChild.lastChild.textContent = "Edit";
    formBg.classList.add("bg-active");

    document.getElementById("titleInput").value = title;
    document.getElementById("notesInput").value = notes;
    document.getElementById("dateInput").value = date;
    document.getElementById("priorityInput").value = priority;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (formBg.firstChild.lastChild.textContent == "Edit") {
        formBg.classList.remove("bg-active");
        const newTask = createNewTask();
        const newElement = createInboxElement(
          newTask.title,
          newTask.dueDate,
          newTask.notes,
          newTask.priority
        );
        edit.parentNode.parentNode.replaceWith(newElement);
      }
    });
  });

  return div;
};

const formHandlers = () => {
  const inbox = document.querySelector(".inbox");
  const formBg = document.querySelector(".modal-bg");
  const form = document.querySelector(".modal");

  const createTaskButton = document.querySelector("#add");
  createTaskButton.addEventListener("click", () => {
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
      const newElement = createInboxElement(
        newTask.title,
        newTask.dueDate,
        newTask.notes,
        newTask.priority
      );
      inbox.appendChild(newElement);
    }
  });

  formBg.addEventListener("click", (e) => {
    if (formBg.classList.contains("bg-active") && e.target == formBg) {
      formBg.classList.remove("bg-active");
    }
  });
};

const loadForm = () => {
  const formBg = document.createElement("div");
  formBg.classList.add("modal-bg");

  const form = document.createElement("form");
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

export { loadForm, formHandlers };
