angular.module('app')
.service('generalService', ['$http', function($http) {

	var self = this;

	self.getNowDateObject = function(){
		var d = new Date();
		return {
			year: d.getUTCFullYear(),
			month: d.getUTCMonth() + 1,
			day: d.getUTCDate()
		};
	};

	self.matchDateObjectAgainstNow = function(dateObj){
		var nowDateObj = self.getNowDateObject();
		if ((dateObj['day'] == nowDateObj['day']) && (dateObj['month'] == nowDateObj['month']) && (dateObj['year'] == nowDateObj['year'])) {
			return true;
		} else {
			return false;
		}
	};

	self.getCityApi = function(lat, lng, cb) {
		$http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat +"," + lng + "&key=AIzaSyDwh6TeuryVIS90sxo1cwJYL32foEXck3c").
		then(function(res) {
			if (res) {
				cb(res);
			}	else {
				alert('Could not get city from API');
			}
		})
	}
	
}]);
