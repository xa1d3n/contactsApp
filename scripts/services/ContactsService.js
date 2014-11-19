/*global Firebase*/
(function(angular) {
	'use strict';

	// $q helps deal with deffereds
	angular.module('ContactsApp').service('ContactsService', function(FBURL, MSGURL, OPTIONSURL, $q, $firebase) {
		var messageRef = new Firebase(MSGURL); // get messages tag

		var fbRef = new Firebase(FBURL); // fire base tag

		// check current user
		var user = fbRef.getAuth();
		var userRef;

 		// If no current user send to register page
        if (!user) {
            routeTo('register');
            return;
        }

        var contactsRef = fbRef.child('users').child(user.uid).child('contacts');

        var settingsRef = fbRef.child('users').child(user.uid).child('settings');

        var fireSettings = $firebase(settingsRef);

        var fireContacts = $firebase(contactsRef);

        // Load user info
        userRef = fbRef.child('users').child(user.uid);
        userRef.once('value', function (snap) {
            var user = snap.val();
            if (!user) {
                return;
            }
        });





		// get the angularfire api
		var fireMessage = $firebase(messageRef);

		return {
			getContacts: function childAdded() {
				return fireContacts.$asArray();
			},

			addContact: function addContact(contact) {
				//fbRef.child('users').child(user.uid).child('contacts').set(contact);
				return fireContacts.$push(contact);
			},

			updateContact: function updateContact(field, text, id) {
				//return fireContacts.$update( {: text });
				return fireContacts.$ref().child(id).child(field).update( { '0' : text} );
			},

			addField: function addField(id, field, text, type) {
				return fireContacts.$ref().child(id).child(field).update( { '0' : text, '1' : type } ) ;
			},

			removeContact: function removeContact(id) {
				return fireContacts.$ref().child(id).remove();
			},

			removeField: function removeField(id, field) {
				return fireContacts.$ref().child(id).child(field).remove();
			},

			addSettingFields: function addSettingFields(options) {
				return fireSettings.$ref().update(options);
			},

			getSettings: function childAdded() {
				return fireSettings.$asArray();
			},

			changeFieldSetting: function changeFieldSetting(field, state) {
				return fireSettings.$ref().child(field).update({1: state});
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