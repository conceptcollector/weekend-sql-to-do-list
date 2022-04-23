$(document).ready(onReady);

function onReady() {
    getTasks();
}

function getTasks() {
    console.log( 'in getTasks' );
    $('#viewKoalas').empty();
        $.ajax({
          method: 'GET',
          url: '/koalas'
        }).then(function(response) {
          console.log("GET /songs response", response);
          for (let koala of response) {
            console.log('koalas?', koala);
            $('#viewKoalas').append(`
              <tr data-id=${koala.id} data-rank=${koala.readyToTransfer}>
                     <td>${koala.name}</td>
                     <td>${koala.gender}</td>
                     <td>${koala.age}</td>
                     <td>${koala.readyToTransfer}</td>
                     <td>${koala.notes}</td>
                     <td><button class="transferButton">Ready to Transfer</button></td>
              </tr>
            `);
          }
        }).catch(function(error) {
          console.log('your GET is effed', error);
        })
      
        
  }
}
