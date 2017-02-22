'use strict';
angular.
module('app').
component('dogPage', {
  templateUrl: 'app/layout/dog-page/dog-page.html',
  controller: ['$http', '$scope', '$window', 'imagesService', 'generalService', 'geoLocationFactory',
  function mainCtrl($http, $scope, $window, imagesService, generalService, geoLocationFactory) {

    $scope.result = 'web';

    var lastImage = imagesService.getLastImage();
    if (lastImage && generalService.matchDateObjectAgainstNow(lastImage['date'])) {
      imagesService.setBackgroundImage(lastImage.url);
    } else {
      setNewImage();
    }

    function setNewImage() {
      imagesService.getRandomImageUrl(function(url, idx){
        if (url){
          imagesService.setBackgroundImage(url);
          imagesService.setLastImage(url, idx);
        } else {
          alert('Failed to get images');
        }
      });
    };

    $scope.nextImage = function() {
      imagesService.getNextImage(function(img, idx) {
        if (img) {
          imagesService.setBackgroundImage(img);
          imagesService.setLastImage(img, idx);
        } else {
          alert("Could not get next image");
        }
      })
    }

    $scope.searchBox = function(query, radioValue) {
      imagesService.searchBox(query, radioValue, function(cb) {
        var searchResultUrl = cb;
        $window.location.href = searchResultUrl;
      })
    }

    geoLocationFactory.get(function(position) {
      if (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        generalService.getCityApi(latitude,longitude, function(res) {
          var location = res.data.results[1].formatted_address;
          initWeather(location);
        })
      }
    })

    function initWeather(location) {
      $.simpleWeather({
        location: location,
        woeid: '',
        unit: 'c',
        success: function(weather) {
          $scope.$apply(function() {
            $scope.weather = weather;
          });
        },
        error: function(error) {
          $(".weather-widget").html('<p> Error: '+error+'</p>');
        }
      });
    }

  }]
});
