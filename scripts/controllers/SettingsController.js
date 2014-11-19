'use strict';

angular.module('ContactsApp')
  .controller('SettingsController', function ($scope, $location, $timeout, ContactsService, $rootScope) {
		$rootScope.PAGE = "settings";

		$scope.settings = ContactsService.getSettings();

		$scope.toggle = function(field, state) {
			if (typeof(state) === "string") {
				state = (state === "true");
			}
			ContactsService.changeFieldSetting(field, !state);
		}
  });
