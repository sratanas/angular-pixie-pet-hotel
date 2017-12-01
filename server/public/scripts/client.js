var app = angular.module('PetHotelApp', []);

app.controller('PixieController', ['$http', function($http){
    console.log('PixieController has been loaded');
    var self = this;
    self.petsArray = []
    self.ownersArray = []
    self.allArray = []

    
    self.getPets = function(){
        $http({
            url: '/pets/pets',
            method: 'GET'

        }).then(function(response) {
            console.log('response', response);
            self.petsArray = response.data;
        })
    };
    
    self.getPets();

    self.getOwners = function(){
        $http({
            url: '/pets/owners',
            method: 'GET'
        }).then(function(response){
            console.log('response',response);
            self.ownersArray = response.data;
            
        })
    }
    self.getOwners();

    self.getAll = function(){
        $http({
            method: 'GET',
            url: '/pets/all',
        }).then(function(response){
            console.log('response', response);
            self.allArray = response.data;
        })
    }
    self.getAll()

    self.addNewOwners = function(newOwner){
        $http({
            url: '/pets/owners',
            method: 'POST',
            data: newOwner
        }).then(function(response){
            console.log('response',response);
            self.newOwner = {};
        
        })
    }

    self.addNewPets = function(newOwner){
        $http({
            url: '/pets/pets',
            method: 'POST',
            data: newOwner
        }).then(function(response){
            console.log('response',response);
            self.newPet = {};
        
        })
    }
}])