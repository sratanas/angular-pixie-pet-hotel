console.log("JS Sourced")

$(document).ready(function() {
    console.log('jQ sourced');
    getUserPetTable();
    
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