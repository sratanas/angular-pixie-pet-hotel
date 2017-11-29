console.log("JS Sourced")

$(document).ready(function() {
    console.log('jQ sourced');
    getUserPetTable();
    $('#addPetButton').on('click', addPet);








})

function getUserPetTable() {
    $.ajax({
        url: '/pets',
        method: 'GET'
    }).then(function(response) {
        console.log('response', response);
        $('#tableBody').empty();
        response.forEach(appendToDom);
    })
};

function appendToDom(ownerPetObject) {
    var $newOwnerPet = $('<tr></tr>');
    $newOwnerPet.append(`<td>${ownerPetObject.first_name} ${ownerPetObject.last_name}</td>
                        <td>${ownerPetObject.pet_name}</td><td>${ownerPetObject.breed}</td><td><${ownerPetObject.color}</td>`);
    $newOwnerPet.data('id', ownerPetObject.id)
    $('#tableBody').append($newOwnerPet);
}

// on click of addPetButton, this will post new pet to server and run getUserPetTable()
function addPet() {
    $.ajax({
        url: '/pets',
        type: 'POST',
        data: {
            pet_name: $('#petNameInput').val(),
            breed: $('#breedInput').val(),
            color: $('#colorInput').val(),
            owner_id: $('#ownerId').data().id
        },
        success: function(response){
          console.log( 'response to add pet POST req: ', response );
          getUserPetTable();
        } // end success
    }); // end ajax POST
} // end addPet()