'use strict';

angular.module('ContactsApp')
  .controller('SettingsController', function ($scope, $location, $timeout, ContactsService, $rootScope) {
		$rootScope.PAGE = "settings";

		$scope.allFields = [];
		$scope.fields = options.displayed_fields;//user displayed fields

		$scope.toggle = function(field) {
			var i = options.displayed_fields.indexOf(field);// check if it's checked

			if (i > -1) {
				options.displayed_fields.splice(i, 1); // remove it
			} else {
				options.displayed_fields.push(field); // put it in
			}

			FIelds.set(options.displayed_fields); //push to server

		}
  });
