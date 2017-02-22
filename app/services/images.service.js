angular.module('app')
.service('imagesService', ['$http', 'generalService', function($http, generalService) {

	var self = this;

	// google API URL for dogs images.
	const API_URL = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyDwh6TeuryVIS90sxo1cwJYL32foEXck3c&cx=007583034508236357269:bnynvjnd-_w&searchType=image&q=dogs';
	var queuedRequests = [];

	// get saved images from localStorage
	var savedImages = localStorage.getItem('savedImages');
	if (!savedImages) {
		// get from google API
		$http.get(API_URL).then(function(res) {
			if (res && res.status == 200) {
				savedImages = res.data.items;
				localStorage.setItem('savedImages', JSON.stringify(savedImages));
				handleQueuedRequests();
			}
		})
	}
	//get images from local storage.
	else {
		savedImages = JSON.parse(savedImages);
		handleQueuedRequests();
	}

	function handleQueuedRequests(){
		queuedRequests.forEach(function(cb){
			cb(savedImages);
		});
	}

	function getImages(cb) {
		if (savedImages) {
			cb(savedImages);
		} else {
			queuedRequests.push(cb);
		}
	}

	self.getRandomImageUrl = function(cb) {
		getImages(function(images) {
			var rndImgIdx = Math.floor((images.length - 1) * Math.random() + 1);
			cb(images[rndImgIdx]['link'], rndImgIdx);
		});
	};

	// get the next image
	self.getNextImage = function(cb) {
		var currentIdx = self.getLastImage().index;
		var imageIndex = (currentIdx + 1 < savedImages.length) ? currentIdx + 1 : 0 ;
		var nextImage = savedImages[imageIndex]['link'];
		cb(nextImage, imageIndex);
	}

	// get last image from storage
	self.getLastImage = function(){
		var lastImage = localStorage.getItem('lastImage');
		if (lastImage){
			lastImage = JSON.parse(lastImage);
		}
		return lastImage;
	};

	// set last image to storage
	self.setLastImage = function(url, idx){
		var lastImage = {
			url: url,
			date: generalService.getNowDateObject(),
			index: idx
		};
		localStorage.setItem('lastImage', JSON.stringify(lastImage));
	};

	// search function for google web, image and video querys.
	self.searchBox = function(query, searchType, cb) {
		if(query && searchType == "image") {
			var imageSearch = ' https://www.google.com/search?tbm=isch&q=' + query;
			cb(imageSearch);
		}
		else if(query && searchType == "web") {
			var webSearch = 'https://www.google.com/search?q=' + query;
			cb(webSearch);
		}
		else if(query && searchType == "video") {
			var videoSearch = 'https://www.google.com/search?tbm=vid&q=' + query;
			cb(videoSearch);
		}
	}

	// set background image
	self.setBackgroundImage = function(url){
		$('body').css({
			'background-image': 'url('+ url +')',
			'background-size':'cover',
			'-webkit-background-size': 'cover',
			'-moz-background-size': 'cover',
			'-o-background-size': 'cover'
		});
	}

}]);
