// *** SELECT ELEMENT ***
// header content
const form = document.querySelector('form');
const input = document.querySelector('input');
// body content
const bodyContent = document.querySelector('.body__content');
// delete all button
const deleteAll = document.querySelector('.delete-all');

let items;

// ? event listeners
eventListener();
function eventListener(){
    // submit events
    form.addEventListener('submit', addNewItem);

    // delete item
    bodyContent.addEventListener('click', deleteItem);

    // delete all items
    deleteAll.addEventListener('click', deleteAllItems);
}

// load items
loadItems();


// ! event listener functions
// LOAD ITEM
function loadItems(){
    items = getItemsFromLS();
    items.forEach(function(item){
        createItem(item);
    })
};

// get items from local storage
function getItemsFromLS(){
    if(localStorage.getItem('items') === null){
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'))
    }
}

// set items from local storage
function setItemToLS(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

// CREATE ITEM
function createItem(item){
    // Create New İtem
    const toDoItem = document.createElement('div');
    toDoItem.className = 'to-do-item';
    
    const toDoItemText = document.createElement('div');
    toDoItemText.className = 'to-do-item__text';

    const deleteBtnSingle = document.createElement('button');
    deleteBtnSingle.className = 'delete-btn-single';
    deleteBtnSingle.innerHTML = '<i class="delete-icon uil uil-times-circle"></i>'

    // -- append Child
    toDoItem.appendChild(toDoItemText);
    toDoItem.appendChild(deleteBtnSingle);

    toDoItemText.textContent = item;

    // bodyContent append Child
    bodyContent.appendChild(toDoItem);
}

// ADD NEW ITEM
function addNewItem(e){
    e.preventDefault();

    if(input.value == ''){
        alert('Boş bir değer girdiniz.');
    } else{
        // Create New Item
        createItem(input.value);
    }

    // save to LS
    setItemToLS(input.value);

    // input value clear
    input.value = ''
}

// DELETE ITEM
function deleteItem(e){
    if(e.target.className === 'delete-btn-single'){
        e.target.parentElement.remove();
    } else if(e.target.className === 'delete-icon uil uil-times-circle'){
        e.target.parentElement.parentElement.remove();
    }
}

// DELETE ALL ITEMS
function deleteAllItems(){
    bodyContent.innerHTML = '';
}