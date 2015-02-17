/**
 * Created by SRIN on 2/5/2015.
 */
(function() {
	'use strict';

	var app = angular.module('app', ['ngMaterial']);

	app.config(function($mdThemingProvider) {
		$mdThemingProvider.theme('default')
			.primaryPalette('blue')
			.accentPalette('pink');
	});

	app.controller('MovieCtrl', ['$scope', '$http', '$mdToast',
		function($scope, $http, $mdToast) {
			$scope.movie = {};
			$scope.loading = false;

			var fetchMovies = function() {
				$scope.loading = true;
				var req = {
					method: 'GET',
					url: 'https://sphirelabs-imdb-unofficial.p.mashape.com/1.php?movie=2012',
					headers: {
						'X-Mashape-Key': 'U8ooE0SmIOmshY60BVRiAmaWA5Wep1lEIA4jsnSVs6pMMtoopD',
						'Accept': 'application/json'
					}
				}

				$http(req)
					.success(function(data) {
						console.log(data);
						$scope.movie = data;

						$mdToast.show(
							$mdToast.simple()
								.content('Movie is loaded')
								.position('top right')
								.hideDelay(3000)
						);
						$scope.loading = false;
					})
					.error(function(data, status, headers, config) {
						$mdToast.show(
							$mdToast.simple()
								.content('Failed to load movies data')
								.position('top right')
								.hideDelay(3000)
						);
						$scope.loading = false;
					})
			}

			$scope.init = function() {
				fetchMovies();
			}

			$scope.refresh = function() {
				fetchMovies();
			}
		}
	]);


})();