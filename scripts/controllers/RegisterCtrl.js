/*global Firebase*/
(function(angular) {
	'use strict';
	angular.module('ContactsApp')
		// dependencies
		.controller('RegisterCtrl', function($scope, $firebaseSimpleLogin, FBURL, $window, $location) {
			// firebase connection
			var fbRef = new Firebase(FBURL);
			// allows for login and logout of users
			$scope.simpleLogin = $firebaseSimpleLogin(fbRef);


			$scope.errors = [];
			$scope.registerUser = {
				email: '',
				password: '',
				confirmPassword: ''
			};

			// save user information
			fbRef.onAuth(function(authData) {
			  if (authData) {
			    // save the user's profile into Firebase so we can list users,
			    // use them in Security and Firebase Rules, and show profiles
			    fbRef.child('users').child(authData.uid).set(authData);
			  }
			});

			$scope.register = function() {
				var errors = [],
					user = $scope.registerUser;
				if (user.email === '') {
					errors.push('Please enter an email');
				}
				if (user.password === '') {
					errors.push('Password must not be blank');
				}
				else if (user.password !== user.confirmPassword) {
					errors.push('Passwords must match');
				}
				if (errors.length > 0) {
					$scope.errors = errors;
					return;
				}

				// provide email and password. Login after. third parameter can be specifed as true/false
				var promise = $scope.simpleLogin.$createUser($scope.registerUser.email, $scope.registerUser.password);

				promise.then(function(user) {

					// login user
					var promise =	$scope.simpleLogin.$login('password', {
						email: $scope.registerUser.email,
						password: $scope.registerUser.password
					});

					promise.then(function(x){
					// login successful - route to contacts page
					$location.path('/contacts');
					});

					
				}, function(error) {
					console.error(error);
				});
			};
		});
}(window.angular));