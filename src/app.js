//grab dom elements
const item = document.querySelector('#item');
const form = document.querySelector('form');
const list = document.querySelector('ul');
const taskList = document.querySelectorAll('li');
const startPage = document.querySelector('.start-page');
const activeListPage = document.querySelector('.active-list-page');

window.addEventListener('load', () => {
  //define todo list from storage if it exists
  todos = JSON.parse(localStorage.getItem('todos')) || [];
  console.log(todos);
  //add new task
  form.addEventListener('submit', (e) => {
    e.preventDefault;
    // check for text in form
    if (item.value === '') {
      alert('You must write something...');
    } else {
      //add todo to list in local storage
      const todo = {
        content: item.value,
        checked: false,
      };
      todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(todos));

      //reset text value
      item.value = '';
    }
  });

  displayList();
  createList();
});

let createList = () => {
  todos.forEach((todo) => {
    const listItem = document.createElement('li');
    listItem.className =
      'list-group-item d-flex justify-content-between align-items-center border-0 rounded h5';
    listItem.innerText = todo.content;
    const span = document.createElement('span');
    const x = document.createTextNode('\u00D7');
    span.className = 'close';
    span.appendChild(x);
    listItem.appendChild(span);
    list.appendChild(listItem);

    //checking off list items
    //statefulness
    if (todo.checked) {
      listItem.classList.add('checked');
    } else {
      listItem.classList.remove('checked');
    }

    listItem.addEventListener('click', (e) => {
      todo.checked = todo.checked ? false : true;
      localStorage.setItem('todos', JSON.stringify(todos));

      console.log(todos);
    });

    //deleting
    span.addEventListener('click', (e) => {
      //remove item from list
      let div = span.parentElement;
      div.classList.toggle('removed');
      setTimeout(() => {
        div.remove();
        paintList();
        displayList();
      }, 100);
      //remove deleted item from local storage
      todos = todos.filter((t) => t != todo);
      localStorage.setItem('todos', JSON.stringify(todos));
    });
  });
  paintList();
};

//toggle start or active screen
let displayList = () => {
  if (todos.length > 0 && activeListPage.classList.contains('d-none')) {
    startPage.classList.toggle('d-none');
    activeListPage.classList.toggle('d-none');
  } else if (todos.length === 0) {
    startPage.classList.remove('d-none');
    activeListPage.classList.add('d-none');
  }
};

//zebra stripe refresh function
let paintList = () => {
  let taskList = document.querySelectorAll('li');
  for (i = 0; i < taskList.length; i++) {
    let task = taskList.item(i);
    if (i % 2 == 0) {
      task.classList.add('stripe');
    } else {
      task.classList.remove('stripe');
    }
  }
};

//check elements when clicked on
list.addEventListener(
  'click',
  function (e) {
    //must be uppercase because html docs return uppercase tags
    if (e.target.tagName === 'LI') {
      //toggle style
      e.target.classList.toggle('checked');
    }
  },
  false
);
