'use strict';
angular.module('thesis',['ngRoute'])
	.controller( 'GoogleCtrl', function ( $scope, auth) {

  $scope.auth = auth;

});