'use strict';

window.onload = function () {
    const form = document.querySelector('form');
    const inputForm = document.querySelector('.input-form');
    const listItems = document.querySelector('.todo-list-items');
    let todosStore;

    form.addEventListener('submit', addTask);

    listItems.addEventListener('click', changeItemList);


    function store() {
        todosStore = listItems.innerHTML;
        window.localStorage.myitems = todosStore;
    }

    function addTask(e) {
        e.preventDefault();
        if (inputForm.value.length) {
            listItems.appendChild(
                createItemTask(inputForm.value)
            );
            store();
            inputForm.value = '';
        }


    }

    function createItemTask(textTask) {
        const itemTask = document.createElement('li');
        const inputCheck = document.createElement('input');
        const removeBtn = document.createElement('button');

        itemTask.className = 'itemTask list-group-item d-flex justify-content-between align-items-center';

        itemTask.setAttribute('data-click', 'changeTask');

        inputCheck.setAttribute('type','checkbox');
        inputCheck.setAttribute('data-click', 'checkbox');

        removeBtn.className = 'itemTask btn btn-danger';
        removeBtn.setAttribute('data-click', 'remove');

        const textBtnRemove = document.createTextNode('delete');
        removeBtn.appendChild(textBtnRemove);
        const text = document.createTextNode(textTask);

        itemTask.appendChild(inputCheck);
        itemTask.appendChild(text);
        itemTask.appendChild(removeBtn);

        store(itemTask);

        return itemTask;
    }

    function changeItemList(e){
        const target = e.target.getAttribute('data-click');
        console.dir(e.target);
        switch (target) {
            case 'checkbox':
                const el = e.target.parentNode;
                el.classList.toggle('checked');
                store();
                break;
            case 'changeTask':
                console.dir(e.target.childNodes[1].data);
                inputForm.value = e.target.childNodes[1].data;
                const li = e.target;
                li.remove();
                store();
                break;
            case 'remove':
                const elem = e.target.parentNode;
                elem.remove();
                store();
                break;
            default: null
                break;

        }
        if (target === 'checkbox') {

        }

    }

    function getValues() {
        const storedValues = window.localStorage.myitems;
        if(!storedValues) {
            listItems.innerHTML = null;
        }
        else {
            listItems.innerHTML = storedValues;
        }
    }
    getValues();
};



