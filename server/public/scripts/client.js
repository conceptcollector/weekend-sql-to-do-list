$(document).ready(onReady);

function onReady() {
    getTasks();
}

function getTasks() {
    console.log( 'in getTasks' );
    $('#task-table').empty();
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function(response) {
        console.log("GET /tasks response", response);
        for (let task of response) {
            console.log('tasks?', task);
            $('#task-table').append(`
                <tr data-id=${task.id} data-rank=${koala.pendingStatus}>
                <td>${task.name}</td>
                <td><button class="completeButton">Complete</button></td>
                <td><button class="deleteButton">Delete</button></td>
                </tr>
            `);
        }
    }).catch(function(error) {
        console.log('GET isn\'t working', error);
    })    
}

