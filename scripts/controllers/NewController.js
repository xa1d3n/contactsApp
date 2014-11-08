'use strict';

angular.module('ContactsApp')
  .controller('NewController', function ($scope, $rootScope, $location, $timeout, ContactsService) {
  		// new contact data
		$rootScope.PAGE = "new";
		$scope.contact = {
			firstName: ['', 'text'],
			lastName: ['', 'text'],
			email: ['', 'email'],
			homePhone: ['', 'tel'],
			cellPhone: ['', 'tel'],
			birthday: ['', 'date'],
			website: ['', 'url'],
			address: ['', 'text']
		};

		// save contact; perform validation
		$scope.save = function() {
			// newContact is name of form
			console.log($scope.contact.$invalid);
			if ($scope.contact.$invalid) {
				$scope.$broadcast('record:invalid');
			} else {
				ContactsService.add($scope.contact);
				//$scope.contact.$save();
				$location.url('/contacts');
			}
		};
  });
