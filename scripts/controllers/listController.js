'use strict';

angular.module('ContactsApp')
  .controller('ListCtrl', function ($scope, $location, $timeout, ContactsService, $rootScope) {
		$rootScope.PAGE = "all";
		$scope.fields = ['firstName', 'lastName']; //TODO: concat with options.dispalyed_fields

		$rootScope.contacts = ContactsService.getContacts();

		$scope.sort = function (field) {
			$scope.sort.field = field;
			$scope.sort.order = !$scope.sort.order;
		};

		$scope.sort.field = 'firstName';
		$scope.sort.order = false;

		$scope.show = function(id) {
			$location.url('/contact/' + id);
		}
  });
