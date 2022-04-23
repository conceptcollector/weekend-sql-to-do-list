$(document).ready(onReady);

function onReady() {
    getTasks();
    $(document).on('click', '.completeButton', markComplete);
    $(document).on('click', '.deleteButton', deleteTask);
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
                <tr data-id=${task.id} data-rank=${task.pendingStatus}>
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

function markComplete() {
    console.log('Mark Complete button');
    let taskIdToUpdate = $(this).closest('tr').data('id');
    $(this).closest('tr').data('id').addClass('.complete');
    console.log('taskIdToUpdate', taskIdToUpdate);
  $.ajax({
    method: 'PUT',
    url: `/tasks/${taskIdToUpdate}`,
    data: {pendingStatus: !pendingStatus}
  }).then(function(response) {
    getTasks();
  }).catch(function(error) {
    console.log(error);
  })
}

function deleteTask() {
    const id = $(this).data('id');
    console.log('in deleteTask:', id);
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${ id }`
    }).then( function(response){
        getItems();
    }).catch( function(dbError){
        alert('Delete isn\'t working', dbError);
    })
}