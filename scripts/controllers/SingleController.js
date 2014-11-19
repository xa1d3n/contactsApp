'use strict';

angular.module('ContactsApp')
  .controller('SingleController', function ($scope, $location, $timeout, ContactsService, $routeParams, $rootScope) {
  		//$scope.contact = Contact.get({ id: parseInt($routeParams.id, 10)});
  		$rootScope.PAGE = "single";
  		var id = $routeParams.id;
  		if (isNaN) {

  		} else{
  			parseInt(id, 10)
  		}

  		 $scope.getContactById = function(key) {
				for(var i = 0, len = $rootScope.contacts.length; i < len; i++) {
				    if( $rootScope.contacts[i].$id === key ) {
				      return $rootScope.contacts[i];
				    }
				  }
				return -1;
		};


  		$scope.contact = $scope.getContactById(id);
  		$scope.delete = function() {
  			//$scope.contact.$delete();
        ContactsService.removeContact($scope.contact.$id);
  			$location.url('/contacts');

  		};
 });
