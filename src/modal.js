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
  const modalBg = document.querySelector(".modal-bg");

  const inbox = document.querySelector(".inbox");
  const div = document.createElement("div");
  div.classList.add("inbox-element");

  const taskLeft = document.createElement("div");
  taskLeft.classList.add("task-left");
  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("name", "done");
  const label = document.createElement("label");
  label.setAttribute("for", "done");
  label.textContent = title;
  label.setAttribute("data-content", label.textContent);
  taskLeft.appendChild(input);
  taskLeft.appendChild(label);

  const taskRight = document.createElement("div");
  taskRight.classList.add("task-right");
  const image1 = document.createElement("img");
  image1.src = penIcon;
  image1.classList.add("edit");
  const image2 = document.createElement("img");
  image2.src = flagIcon;
  const image3 = document.createElement("img");
  image3.src = trashIcon;
  image3.classList.add("trash");
  taskRight.appendChild(image1);
  taskRight.appendChild(image2);
  taskRight.appendChild(image3);

  div.appendChild(taskLeft);
  div.appendChild(taskRight);

  inbox.appendChild(div);

  div.addEventListener("click", (e) => {
    if (
      div.childElementCount < 3 &&
      (e.target.className == "inbox-element" ||
        e.target.className == "task-left" ||
        e.target.localName == "label")
    ) {
      const elementDetails = document.createElement("div");
      elementDetails.classList.add("details");
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
    } else if (
      div.childElementCount > 2 &&
      (e.target.className == "inbox-element" ||
        e.target.className == "task-left" ||
        e.target.localName == "label")
    ) {
      div.removeChild(div.lastChild);
    }
  });

  const edit = document.querySelectorAll(".edit");
  edit.forEach((e) => {
    e.addEventListener("click", () => {
      modalBg.classList.add("bg-active");
    });
  });

  const trash = document.querySelectorAll(".trash");
  trash.forEach((e) =>
    e.addEventListener("click", () => {
      e.parentNode.parentNode.remove();
    })
  );
};

const modalHandlers = () => {
  const modalBg = document.querySelector(".modal-bg");
  const form = document.querySelector(".modal");

  const createTaskButton = document.querySelector("#add");
  createTaskButton.addEventListener("click", () => {
    modalBg.classList.add("bg-active");
  });

  const exit = document.querySelector(".exit-btn");
  exit.addEventListener("click", () => {
    modalBg.classList.remove("bg-active");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTask = createNewTask();
    createInboxElement(
      newTask.title,
      newTask.dueDate,
      newTask.notes,
      newTask.priority
    );
    modalBg.classList.remove("bg-active");
  });

  modalBg.addEventListener("click", (e) => {
    if (modalBg.classList.contains("bg-active") && e.target == modalBg) {
      modalBg.classList.remove("bg-active");
    }
  });
};

const modal = () => {
  const modalBg = document.createElement("div");
  modalBg.classList.add("modal-bg");

  const modalForm = document.createElement("form");
  modalForm.classList.add("modal");

  modalForm.appendChild(createFormInput("Title", "text"));
  modalForm.appendChild(createFormTextarea("Notes", "textarea"));
  modalForm.appendChild(createCalendar("Date", "date"));
  modalForm.appendChild(createFormSelect("Priority"));
  modalForm.appendChild(createFormButton());
  modalForm.appendChild(createExitButton());

  modalBg.appendChild(modalForm);

  return modalBg;
};

export default modal;
export { modalHandlers };
