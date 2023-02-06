//grab dom elements
const item = document.querySelector('#item');
const form = document.querySelector('form');
const list = document.querySelector('ul');
let taskList = [];
const startPage = document.querySelector('.start-page');
const activeListPage = document.querySelector('.active-list-page');

//toggle start or active screen
let displayList = () => {
  let taskList = document.querySelectorAll('li');
  if (taskList.length > 0 && activeListPage.classList.contains('d-none')) {
    startPage.classList.toggle('d-none');
    activeListPage.classList.toggle('d-none');
  } else if (taskList.length === 0) {
    startPage.classList.toggle('d-none');
    activeListPage.classList.toggle('d-none');
  }
};

//zebra stripe refresh function
let paintList = () => {
  let taskList = document.querySelectorAll('li');
  for (i = 0; i < taskList.length; i++) {
    let task = taskList.item(i);
    if (i % 2 == 0) {
      task.classList.add('gray');
    } else {
      task.classList.remove('gray');
    }
  }
};

//add close button to all elements already in list
for (let i = 0; i < taskList.length; i++) {
  let span = document.createElement('span');
  let x = document.createTextNode('\u00D7');
  span.className = 'close';
  span.appendChild(x);
  taskList[i].appendChild(span);
}

//close element fn
let close = document.getElementsByClassName('close');

for (let i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    let div = this.parentElement;
    div.classList.toggle('removed');
    setTimeout(() => {
      div.remove();
      paintList();
      displayList();
    }, 100);
  };
}

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

//add new task to list
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = document.createElement('li');
  newTask.className =
    'list-group-item d-flex justify-content-between align-items-center border-0 rounded h3';
  const inputValue = item.value;
  const task = document.createTextNode(inputValue);

  newTask.appendChild(task);
  //check for text in form
  if (item.value === '') {
    alert('You must write something...');
  } else {
    list.append(newTask);
    paintList();
    displayList();
  }
  //reset text value
  item.value = '';

  //add close button to new list item
  let span = document.createElement('span');
  let x = document.createTextNode('\u00D7');
  span.className = 'close';
  span.appendChild(x);
  newTask.appendChild(span);

  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.classList.toggle('removed');
      setTimeout(() => {
        div.remove();
        paintList();
        displayList();
      }, 100);
      // div.remove();
    };
  }
});
