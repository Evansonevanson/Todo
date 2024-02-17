let form = document.getElementById(`form`);
let input = document.getElementById(`input`);
let button = document.getElementById(`button`);
let bottomContainer = document.getElementById(`bottom-container`);

let todoItems = [];

// Form Action ------------------------------------------------
const formAction = (event) => {
  event.preventDefault();
  let todoText = input.value;
  let todoObjects = {
    todoName: todoText,
    checked: false,
  };
  if (todoText.length < 5) {
  } else {
    todoItems.push(todoObjects);
    form.reset();
    localStorage.setItem(`todo`, JSON.stringify(todoItems));
    fetchTodo();
    displayTodo();
  }
};

// Fetch Todo Items --------------------------------------------------
const fetchTodo = () => {
  if (localStorage.getItem(`todo`)) {
    todoItems = JSON.parse(localStorage.getItem(`todo`));
  }
};
fetchTodo();

// Display on UI ------------------------------------------------------
const displayTodo = () => {
  bottomContainer.innerHTML = ``;

  todoItems.forEach((item, index) => {
    let textItem = item.todoName;

    let todoContainer = document.createElement(`div`);
    todoContainer.classList = `todo-container`;
    todoContainer.setAttribute(`id`, `${index}`);

    let checkIconContainer = document.createElement(`div`);
    checkIconContainer.classList = `check-icons`;
    checkIconContainer.setAttribute(`id`, `check-icons`);

    let unCheckedIcon = document.createElement(`i`);
    unCheckedIcon.classList = `bi-square`;
    unCheckedIcon.setAttribute(`id`, `unchecked`);
    unCheckedIcon.setAttribute(`data-action`, `check`);

    let CheckedIcon = document.createElement(`i`);
    CheckedIcon.classList = `bi-check-square-fill`;
    CheckedIcon.setAttribute(`id`, `checked`);
    CheckedIcon.setAttribute(`data-action`, `check`);

    let textContainer = document.createElement(`div`);
    textContainer.classList = `todo-text`;
    textContainer.setAttribute(`id`, `todo-text`);
    textContainer.setAttribute(`data-action`, `check`);

    let text = document.createElement(`p`);
    text.textContent = textItem;

    let actionIconContainer = document.createElement(`div`);
    actionIconContainer.classList = `action-icons`;
    actionIconContainer.setAttribute(`id`, `action-icons`);

    let editIcon = document.createElement(`i`);
    editIcon.classList = `bi-pencil-square`;
    editIcon.setAttribute(`id`, `edit`);
    editIcon.setAttribute(`data-action`, `edit`);

    let deleteIcon = document.createElement(`i`);
    deleteIcon.classList = `bi-trash`;
    deleteIcon.setAttribute(`id`, `delete`);
    deleteIcon.setAttribute(`data-action`, `delete`);

    if (!item.checked) {
      checkIconContainer.append(unCheckedIcon);
      textContainer.append(text);
      actionIconContainer.append(editIcon, deleteIcon);
      todoContainer.append(
        checkIconContainer,
        textContainer,
        actionIconContainer
      );
      bottomContainer.append(todoContainer);
    } else {
      checkIconContainer.append(CheckedIcon);
      textContainer.append(text);
      textContainer.classList.add(`checked`);
      actionIconContainer.append(editIcon, deleteIcon);
      todoContainer.append(
        checkIconContainer,
        textContainer,
        actionIconContainer
      );
      bottomContainer.append(todoContainer);
    }
  });
};

// Setting click target ---------------------------------------
bottomContainer.addEventListener(`click`, (event) => {
  let userTarget = event.target;
  let targetContainer = userTarget.parentElement.parentElement;
  if (targetContainer.className !== `todo-container`) return;

  let newTarget = targetContainer;
  let todoID = Number(newTarget.id);

  let dataAction = userTarget.dataset.action;

  if (dataAction === `check`) {
    checkTodo(todoID, newTarget);
  } else if (dataAction === `edit`) {
    editTodo(todoID);
  } else if (dataAction === `delete`) {
    deleteTodo(todoID);
  }
});

// Todo Action ------------------------------------------------
const checkTodo = (todoID, newTarget) => {
  todoItems = todoItems.map((object, index) => {
    if (todoID == index) {
      return {
        todoName: object.todoName,
        checked: !object.checked,
      };
    } else {
      return {
        todoName: object.todoName,
        checked: object.checked,
      };
    }
  });
  storageUpdate();
};

const editTodo = (todoID) => {
  let newText = prompt("Edit the todo:", todoItems[todoID].todoName);
  if (newText !== null) {
    todoItems[todoID].todoName = newText;
    storageUpdate();
  }
};

const deleteTodo = (todoID) => {
  const confirmation = confirm("Are you sure you want to delete this todo?");
  if (confirmation) {
    todoItems.splice(todoID, 1);
    storageUpdate();
  }
};

const storageUpdate = () => {
  localStorage.setItem("todo", JSON.stringify(todoItems));
  fetchTodo();
  displayTodo();
};

document.addEventListener("DOMContentLoaded", () => {
  fetchTodo();
  displayTodo();
});

form.addEventListener(`submit`, formAction);
