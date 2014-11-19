/*global Firebase*/
(function(angular) {
	'use strict';

	angular.module('ContactsApp')
	//rootScope is parent scope from which all othe scopes inherit from. Can access through other scopes
		.controller('LoginCtrl', function($scope, $firebaseSimpleLogin, FBURL, $window, $rootScope, $location) {
			var fbRef = new Firebase(FBURL);
			$scope.simpleLogin = $firebaseSimpleLogin(fbRef);
			$scope.errors = [];
			$rootScope.user;

			$scope.user = {
				email: '',
				password: ''
			};

			$scope.login = function() {
				// clear out errors when button is clicked
				$scope.errors = [];

				if ($scope.user.email === ''){
					$scope.errors.push('Please enter your email');
				}

				if ($scope.user.password === ''){
					$scope.errors.push('Please enter your password');
				}

				// if errors present, do not proccess login
				if ($scope.errors.length > 0){
					return;
				}

				// first parameter is to specify firebase password login method
				var promise = $scope.simpleLogin.$login('password', {
					email: $scope.user.email,
					password: $scope.user.password
				});

				promise.then(function(user){
					// rootScope is parent scope from which all othe scopes inherit from
					$rootScope.user = user;
					// route to home page
					$location.path('/contacts');
				}, function(error){
					console.error(error);
					if (error.code === 'INVALID_EMAIL') {
						$scope.errors.push('The email is invalid');
					}
					if (error.code === 'INVALID_USER') {
						$scope.errors.push('The email is invalid');
					}
					if (error.code === 'INVALID_PASSWORD') {
						$scope.errors.push('The password is invalid');
					}
				});
			};
		});
}(window.angular));