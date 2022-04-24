////////////////////////////////////////////////////////////////////////////////

$(document).ready(onReady);

function onReady() {
    getTasks();
    $('#submitButton').on('click', addTask);
    $(document).on('click', '.completeButton', markComplete);
    $(document).on('click', '.deleteButton', deleteTask);
}

function getTasks() {
    console.log('in getTasks');
    $('#task-table').empty();
    $.ajax({
        method: 'GET',
        url: '/todo'
    }).then(function(response) {
        console.log("GET /todo response", response);
        for (let task of response) {
            if (task.completeStatus === true) {
                $('#task-table').append(`
                <tr class= "complete" data-id=${task.id}>
                <td>${task.name}</td>
                <td class="completeColumn"><button class="completeButton"
                data-complete="${task.completeStatus}">
                Complete</button></td>
                <td class="deleteColumn"><button class="deleteButton">Delete</button></td>
                </tr>
            `);
            } else {
            $('#task-table').append(`
                <tr data-id=${task.id}>
                <td>${task.name}</td>
                <td><button class="completeButton"
                data-complete="${task.completeStatus}">
                Complete</button></td>
                <td><button class="deleteButton">Delete</button></td>
                </tr>
            `);
            }
        }
    }).catch(function(error) {
        console.log('getTasks isn\'t working', error);
    })    
}

function addTask() {
    let task = {
        name: $('#taskInput').val()
    }
    console.log('in addTask:', task);
    $.ajax({
        type: 'POST',
        url: '/todo',
        data: task
    }).then(function(response){
        $('input').val('');
        getTasks();
    }).catch(function(dbError){
        alert('addTask isn\'t working', dbError);
    })
}

function markComplete() {
    console.log('Mark Complete button');
    let taskIDToUpdate = $(this).closest('tr').data('id');
    let completeStatus = $(this).data('complete');
    console.log('taskIdToUpdate', taskIDToUpdate);
  $.ajax({
    method: 'PUT',
    url: `/todo/${taskIDToUpdate}`,
    data: {completeStatus: !completeStatus}
  }).then(function(response) {
    getTasks();
  }).catch(function(error) {
    console.log('markComplete isn\'t working', error);
  })
}

function deleteTask() {
    const taskIDToDelete = $(this).closest('tr').data('id');
    console.log('in deleteTask:', taskIDToDelete);
    $.ajax({
        type: 'DELETE',
        url: `/todo/${taskIDToDelete}`
    }).then( function(response){
        getTasks();
    }).catch( function(dbError){
        alert('deleteTask isn\'t working', dbError);
    })
}