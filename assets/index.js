 jQuery(function ($) {
    const todosArray = [];
    const todoList = $('#todoList');
    const inputAdd = $('input');
    const loadMore = $('#loadMore');



     function addTodo (value) {
         todosArray.push(value);
         renderTodos();
     }

    function renderTodos (art) {
        todoList.empty();
        $.each(todosArray, function (i) {
            todoList.prepend(
                `<li>
                            ${this || art}
                            <input class="checkbox" type="checkbox">
                            <button id="remmove" data-index="${i}">X</button>
                        </li>`);
        });
    }

    function removeTodo (index) {
        todosArray.splice(index, 1);
        renderTodos();
    }

    inputAdd.on('change', function () {
        addTodo(this.value);
        this.value = '';
    });

    $(document).on('click', '#remmove', function (){
        const index = $(this).data('index');
        removeTodo(index);
    });

     $(document).on('change', '.checkbox', function() {
         if ($(this).attr('checked')) {
             $(this).removeAttr('checked');
         } else {
             $(this).attr('checked', 'checked');
         }

         $(this).parent().toggleClass('completed');
     });

     $(document).on('click', '#edit', function (){
         const index = $(this).data('index');
         editTodo(index);
     });


     loadMore.on('click', request);

     function request() {
         var xhr = new XMLHttpRequest();

         xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos', false);

         xhr.send();
         if (xhr.status != 200) {
             alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
         } else {
             const user = JSON.parse(xhr.responseText);
             console.log(user);
             return user;
         }

     }


 });



