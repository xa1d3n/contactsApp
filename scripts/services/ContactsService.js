/*global Firebase*/
(function(angular) {
	'use strict';

	// $q helps deal with deffereds
	angular.module('ContactsApp').service('ContactsService', function(FBURL, MSGURL, $q, $firebase) {
		var messageRef = new Firebase(MSGURL); // get messages tag
		// get the angularfire api
		var fireMessage = $firebase(messageRef);
		return {
			getContacts: function childAdded() {
				return fireMessage.$asArray();
			},

			add: function addMessage(message) {
				return fireMessage.$push(message);
			},

			off: function turnMessagesOff() {
				fireMessage.$off();
			},
			getContactById : function(key) {
				list = this.getContacts();
				for(var i = 0, len = list.length; i < len; i++) {
				    if( list[i].$id === key ) {
				      return i;
				    }
				  }
				return -1;
			}
		}
	});

})(window.angular);