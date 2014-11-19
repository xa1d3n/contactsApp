(function(angular) {
	angular.module('ContactsApp')
		.controller('LogoutCtrl', function($scope, $firebaseSimpleLogin, FBURL, $window, $location) {
			var fbRef = new Firebase(FBURL);
			$scope.simpleLogin = $firebaseSimpleLogin(fbRef);
			// logout
			$scope.simpleLogin.$logout();
			fbRef.unauth();

			// redirect
			//$window.location.href = '/#/';
			$window.location.reload();
			$location.path('/');
		});
}(window.angular));