//all code is owned by Joshua Edwards @ quicksilver web ltd. please email Joshua@quicksilverweb.uk, re-use is prohibited
angular
.module('sosstation')
.controller('QuoteController', [
  '$state', '$rootScope', '$scope', 'dataService','Upload', '$stateParams',
  function($state, $rootScope, $scope, dataService, Upload, $stateParams) {   
    $scope.$parent.carouselShow = false;
    
    $scope.selectedItemDisplayed = "Station-Orange.png";
    $scope.selectedItemPackage == "none";
    $scope.selectedItemColour == "Orange";
    
    $scope.updatePackage = function () {
        if ($scope.selectedItemPackage == "none"){
            if ($scope.selectedItemColour == "Orange") {
                $scope.selectedItemDisplayed = "Station-Orange.png";
            } else if ($scope.selectedItemColour == "Blue") {
                $scope.selectedItemDisplayed = "Station-Blue.png";
            } else if ($scope.selectedItemColour == "Green") {
                $scope.selectedItemDisplayed = "Station-Green.png";
            } else if ($scope.selectedItemColour == "Yellow") {
                $scope.selectedItemDisplayed = "Station-Yellow.png";
            }
        } else if ($scope.selectedItemPackage == "standard") {
            if ($scope.selectedItemColour == "Orange") {
                $scope.selectedItemDisplayed = "StandardPackageStation-Orangecopy.png";
            } else if ($scope.selectedItemColour == "Blue") {
                $scope.selectedItemDisplayed = "StandardPackageStation-Bluecopy.png";
            } else if ($scope.selectedItemColour == "Green") {
                $scope.selectedItemDisplayed = "StandardPackageStation-Greencopy.png";
            } else if ($scope.selectedItemColour == "Yellow") {
                $scope.selectedItemDisplayed = "StandardPackageStation-Yellowcopy.png";
            }
        } else if ($scope.selectedItemPackage == "full") {
            if ($scope.selectedItemColour == "Orange") {
                $scope.selectedItemDisplayed = "FullPackageStation-Orangecopy.png";
            } else if ($scope.selectedItemColour == "Blue") {
                $scope.selectedItemDisplayed = "FullPackageStation-Bluecopy.png";
            } else if ($scope.selectedItemColour == "Green") {
                $scope.selectedItemDisplayed = "FullPackageStation-Greencopy.png";
            } else if ($scope.selectedItemColour == "Yellow") {
                $scope.selectedItemDisplayed = "FullPackageStation-Yellowcopy.png";
            }
        }
    }
    
    $scope.items = {};
    
    $scope.list8 = [
      { 'drag': true, 'url': 'server/images/product-animation-images/Accident-Report-Book.png', 'name': 'Accident Report Book' },
      { 'drag': true, 'url': 'server/images/product-animation-images/Biohazard-Waste-Bags.png', 'name': 'Biohazard Waste Bags' },
      { 'drag': true, 'url': 'server/images/product-animation-images/Burns-Kit.png', 'name': 'Burns Kit' },
      { 'drag': true, 'url': 'server/images/product-animation-images/Chemical-Spill-Kit.png', 'name': 'Chemical Spill Kit' },
      { 'drag': true, 'url': 'server/images/product-animation-images/Defib-Cabinet.png', 'name': 'Defib Cabinet' },
      { 'drag': true, 'url': 'server/images/product-animation-images/Earplug-Dispenser.png', 'name': 'Earplug Dispenser' },
      { 'drag': true, 'url': 'server/images/product-animation-images/Extinguishe-Assembly.png', 'name': 'Extinguishe Assembly' }
  ];
  
  $scope.list7 = [
      { 'drag': true, 'url': 'server/images/product-animation-images/Eyewash-Kit.png', 'name': 'Eyewash Kit' },
      { 'drag': true, 'url': 'server/images/product-animation-images/Fire-Extinguisher-CO2.png', 'name': 'Fire Extinguisher CO2' },
      { 'drag': true, 'url': 'server/images/product-animation-images/Fire-Extinguisher-Dry-Powder.png', 'name': 'Extinguisher Dry Powder' },
      { 'drag': true, 'url': 'server/images/product-animation-images/Fire-Extinguisher-Foam.png', 'name': 'Fire Extinguisher Foam' },
      { 'drag': true, 'url': 'server/images/product-animation-images/Fire-Extinguisher-Water.png', 'name': 'Fire Extinguisher Water' },
      { 'drag': true, 'url': 'server/images/product-animation-images/Fire-Log-Book.png', 'name': 'Fire Log Book' },
      { 'drag': true, 'url': 'server/images/product-animation-images/First-Aid-Kit.png', 'name': 'First Aid Kit' }
  ];
  
  $scope.list6 = [
      { 'drag': true, 'url': 'server/images/product-animation-images/Gas-Horn.png', 'name': 'Gas Horn' },
      { 'drag': true, 'url': 'server/images/product-animation-images/Linked-Battery-Operated-Fire-System.png', 'name': 'Linked Fire System' },
      { 'drag': true, 'url': 'server/images/product-animation-images/Oil-Spill-Kit.png', 'name': 'Oil Spill Kit' },
      { 'drag': true, 'url': 'server/images/product-animation-images/Safety-Spectical-Dispenser.png', 'name': 'Spectical Dispenser' },
      { 'drag': true, 'url': 'server/images/product-animation-images/Stretcher-Case.png', 'name': 'Stretcher Case' },
      { 'drag': true, 'url': 'server/images/product-animation-images/Stretcher.png', 'name': 'Stretcher' },
      { 'drag': true, 'url': 'server/images/product-animation-images/Waterproof-Document-Holder.png', 'name': 'Document Holder' }
  ];

     
    $scope.insertQuote = function () {
      var name = $scope.name;
      var email = $scope.email;
      var number = $scope.phone;
      var business = $scope.business; 
      var message = $scope.message;
      var quote = [];
      var config = $scope.selectedItem.substring(0, $scope.selectedItem.length - 4);
                    
      angular.forEach($scope.items, function(value, key){
          quote.push(key);
      });

      dataService.insertQuote(name, email, number, business, message, quote, config).then(
          function (response) {
              $scope.status = response.status;
              if (response == 1) {
                  alert('Thank you for your interest!');

              } else {
                  alert('Quote failed, please contact admin!');
              }
          }, function (err) {
              $scope.status = 'Unable to load data ' + err;
          }   
      );
    };
        
        
}]);
