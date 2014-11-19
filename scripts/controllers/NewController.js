'use strict';

angular.module('ContactsApp')
  .controller('NewController', function ($scope, $rootScope, $location, $timeout, ContactsService) {
  		// new contact data
		$rootScope.PAGE = "new";
		$scope.contact = {
			firstName: ['', 'text', 'firstName'],
			lastName: ['', 'text', 'lastName'],
			email: ['', 'email', 'email'],
			homePhone: ['', 'tel', 'homePhone'],
			cellPhone: ['', 'tel', 'cellPhone'],
			birthday: ['', 'date', 'birthday'],
			website: ['', 'url', 'website'],
			address: ['', 'text', 'address']
		};

		$scope.options = {
			firstName: ['firstName', 'true'],
			lastName: ['lastName','true'],
			email: ['email', 'false'],
			homePhone: ['homePhone', 'false'],
			cellPhone: ['cellPhone', 'false'],
			birthday: ['birthday', 'false'],
			website: ['website', 'false'],
			address: ['address', 'false']
		};

		// save contact; perform validation
		$scope.save = function() {
			// newContact is name of form
			if ($scope.contact.$invalid) {
				$scope.$broadcast('record:invalid');
			} else {
				for (var i = 0; i < $scope.contact.length; i++){
					$scope.contact
				}


				ContactsService.addSettingFields($scope.options);

				ContactsService.addContact($scope.contact);
				//$scope.contact.$save();
				$location.url('/contacts');
			}
		};
  });
