console.log("JS Sourced")

$(document).ready(function() {
    console.log('jQ sourced');
    getUserPetTable();
    $('#addPetButton').on('click', addPet);



    $('#registerButton').on('click', addUser);    




    $('#tableBody').on('click', '.deleteButton', deletePet);
    getUserNames();
})

function getUserPetTable() {
    $.ajax({
        url: '/pets',
        method: 'GET'
    }).then(function(response) {
        console.log('response', response);
        $('#tableBody').empty();
        response.forEach(appendToDomTable);
    })
};

function appendToDomTable(ownerPetObject) {
    var $newOwnerPet = $('<tr></tr>');
    $newOwnerPet.append(`<td>${ownerPetObject.first_name} ${ownerPetObject.last_name}</td>
                        <td>${ownerPetObject.pet_name}</td><td>${ownerPetObject.breed}</td><td>${ownerPetObject.color}</td>
                        <td><button class="goButton">Go</button></td>
                        <td><button class="deleteButton">Delete</button></td>
                        <td><button class="inButton">In</button></td>`);
    $newOwnerPet.data('id', ownerPetObject.id)
    $('#tableBody').append($newOwnerPet);
}

// on click of addPetButton, this will post new pet to server and run getUserPetTable()
function addPet() {
    console.log('in addPet()');
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
















function addUser() {
    $.ajax({
        url: '/pets/users',
        type: 'POST',
        data: {
            firstName: $('#firstNameInput').val(),
            lastName: $('#lastNameInput').val()
        },
        success: function(response){
          console.log( 'response to add pet POST req: ', response );
          getUserPetTable();
        }
    });
} 




function getUserNames() {
    $.ajax({
        url: 'pets/users',
        method: 'GET'
    }).then(function(response) {
        console.log('user name response', response);
        $('#ownderId').empty();
        response.forEach(appendOwnersToDom);
    })
}

function appendOwnersToDom(ownerObject) {
    var $newOwner = $('<option></option>')
    $newOwner.append(`${ownerObject.first_name} ${ownerObject.last_name}`)
    $newOwner.data('id', ownerObject.id);
    $('#ownderId').append($newOwner);
}

function deletePet() {

    var petIdToRemove = $('#ownderId').data('id');
    $.ajax({
        url: '/pets/' + petIdToRemove,
        method: 'DELETE',
        success: function (response) {
            getUserPetTable();
        }
    })
}

