// Funções utilitárias para localStorage
function getTodos() {
    return JSON.parse(localStorage.getItem('todos') || '[]');
}

function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    const todos = getTodos();
    todos.forEach((todo, idx) => {
        const li = document.createElement('li');
        li.className = 'todo-item';

        const span = document.createElement('span');
        span.className = 'todo-text' + (todo.done ? ' done' : '');
        span.textContent = todo.text;
        span.onclick = () => toggleDone(idx);

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'Remover';
        removeBtn.onclick = () => removeTodo(idx);

        li.appendChild(span);
        li.appendChild(removeBtn);
        todoList.appendChild(li);
    });
}

function addTodo(text) {
    const todos = getTodos();
    todos.push({ text, done: false });
    saveTodos(todos);
    renderTodos();
}

function toggleDone(idx) {
    const todos = getTodos();
    todos[idx].done = !todos[idx].done;
    saveTodos(todos);
    renderTodos();
}

function removeTodo(idx) {
    const todos = getTodos();
    todos.splice(idx, 1);
    saveTodos(todos);
    renderTodos();
}

document.getElementById('todo-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('todo-input');
    const text = input.value.trim();
    if (text) {
        addTodo(text);
        input.value = '';
        input.focus();
    }
});

document.addEventListener('DOMContentLoaded', renderTodos);
