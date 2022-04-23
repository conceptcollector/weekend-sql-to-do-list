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
            $('#task-table').append(`
                <tr data-id=${task.id}>
                <td>${task.name}</td>
                <td><button class="completeButton">Complete</button></td>
                <td><button class="deleteButton">Delete</button></td>
                </tr>
            `);
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
    }).then( function(response){
        getItems();
    }).catch( function(dbError){
        alert('addTask isn\'t working', dbError);
    })
}

function markComplete() {
    console.log('Mark Complete button');
    let taskIdToUpdate = $(this).closest('tr').data('id');
    $(this).closest('tr').data('id').addClass('.complete');
    console.log('taskIdToUpdate', taskIdToUpdate);
  $.ajax({
    method: 'PUT',
    url: `/todo/${taskIdToUpdate}`,
    data: {completeStatus: !completeStatus}
  }).then(function(response) {
    getTasks();
  }).catch(function(error) {
    console.log('markComplete isn\'t working', error);
  })
}

function deleteTask() {
    const id = $(this).data('id');
    console.log('in deleteTask:', id);
    $.ajax({
        type: 'DELETE',
        url: `/todo/${ id }`
    }).then( function(response){
        getItems();
    }).catch( function(dbError){
        alert('deleteTask isn\'t working', dbError);
    })
}