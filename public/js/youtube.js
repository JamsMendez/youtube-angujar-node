var youtube = angular.module('youtubeApp', []);

youtube.config(function ($routeProvider, $httpProvider) {
	$routeProvider
	.when('/', {controller: 'YoutubeCtrl', templateUrl:'js/partials/list.html'})
	.otherwise({ redirectTo: '/' });	
});

var controllers = {};

controllers.YoutubeCtrl = function ($scope, $http){

	$scope.ModuleYoutube = {};

	$scope.ModuleYoutube.searchVideo = function (){
		var value = $scope.ModuleYoutube.search;
		
		$.ajax({
		  dataType: 'json',
		  url: 'http://gdata.youtube.com/feeds/videos?vq=' + value + '&max-results=5&alt=json-in-script&callback=?',
		  success: function (data){
		  	var videos = data.feed.entry.map(function (obj){
		  		return{
		  			title: obj.title.$t,
		  			url: obj.media$group.media$thumbnail[0].url	
		  		}
		  	});

		  	$scope.ModuleYoutube.videos = videos;
		  },
		  error: function (data){
		  	console.log(data);
		  }
		});
	}
}

youtube.controller(controllers);

