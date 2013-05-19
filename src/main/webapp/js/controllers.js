'use strict';

function ProfileCtrl($scope, $http, Navigation, Preferences) {
  $scope.Navigation = Navigation;
  $scope.prefer = [];
  $scope.prefer.colors = [];
  $scope.prefer.prints = [];
  $scope.prefer.hiStreetBrand = [];
  $scope.prefer.luxurybrands = [];
  $scope.prefer.fastFashionBrand = [];
  $scope.prefer.indieDesigner = [];
  
  $scope.preferences = Preferences.getPreferences();
  console.log("Profile Ctrl ");
  console.log($scope.preferences);
  
 // $scope.preferences = {colors:[{color:42}]};
  $scope.profile = {
    gender: undefined
  };

  $scope.selectFemale = function() {
    $scope.profile.gender = "F";
  };

  $scope.selectMale = function() {
    $scope.profile.gender = "M";
  };
  
  $scope.selectColor = function(color) {
	  $scope.prefer.colors.push(color);
	   // $scope.profile.color = color;
  };
  
  $scope.selectPrints = function(print) {
	  $scope.prefer.prints.push(print);
	   // $scope.profile.color = color;
  };
  
  $scope.selectHiStreetBrand = function(hiStreetBrand) {
	  $scope.prefer.hiStreetBrand.push(hiStreetBrand);
  };

  $scope.selectluxurybrands = function(luxuryBrands) {
	  $scope.prefer.luxurybrands.push(luxuryBrands);
  };
  
  $scope.selectFastFashionBrand = function(fastFashionBrand) {
	  $scope.prefer.fastFashionBrand.push(fastFashionBrand);
  };

  
  $scope.selectIndieDesigner = function(indieDesigner) {
	  $scope.prefer.indieDesigner.push(indieDesigner);
  };



  $scope.isMale = function() {
    return $scope.profile.gender == 'M';
  };

  $scope.isFemale = function() {
    return $scope.profile.gender == 'F';
  };
  
  $scope.saveProfile = function(){
	  var method = 'POST';
	  var url = 'http://localhost:8080/stylepopz/api/user/setPreference';
	  $scope.codeStatus = "";
	  
	  var object = {
			  id: Preferences.getId(),
			  Sex: $scope.profile.gender,
			  color: $scope.prefer.colors,
			  prints: $scope.prefer.prints,
			  luxurybrands: $scope.prefer.luxurybrands,
			  hiStreetBrand: $scope.prefer.hiStreetBrand,
			  fastFashionBrand: $scope.prefer.fastFashionBrand,
			  indieDesigner:  $scope.prefer.indieDesigner
      };
		
	  
	  var json = JSON.stringify(object);
	  console.log(json);
	  
	  $http({
	      method: method,
	      url: url,
	      params: {'preference':json},
	      data: {'preference':json},
	      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    }).
	    success(function(response) {
	    	console.log(response);
//	        $scope.codeStatus = response.data;
	    }).
	    error(function(response) {
	        $scope.codeStatus = response || "Request failed";
	    });
	   
	  
	  
	  console.log("ID: "+Preferences.getId());
	  console.log("Sex: "+$scope.profile.gender);
	  console.log("Color "+ $scope.prefer.colors);
	  console.log("Prints "+$scope.prefer.prints);
	  console.log("Luxury "+ $scope.prefer.luxurybrands);
	  console.log("Hi Street "+ $scope.prefer.hiStreetBrand);
	  console.log("FastFashionBrand "+ $scope.prefer.fastFashionBrand);
	  console.log("IndieDesigner "+ $scope.prefer.indieDesigner);
	  
	  
  }
}

function preferencesCtrl($scope, $location, $http) {
	var _URL_ = 'http://localhost:8080/stylepopz-rs/rest/prefs/getProfile/123';
	$scope.save = function() {
	}
}

function loadPreferences($scope, $http, $location,Preferences){
	// var _URL_ = 'json/preferences.json';    
    var _URL_ = "http://localhost:8080/stylepopz/api/user/getPreference/";
     
    //var _URL_ = "http://stylepops.herokuapp.com/api/user/getPreference/100000591379521";  
  	_URL_ = _URL_+Preferences.getId();
     alert(_URL_);

     console.log("Hello from loadPreferences");
     console.log(Preferences.getId());
  
     $http.get(_URL_).success(function(data) {
     		console.log(data);
     		$scope.id = data.id;
     		$scope.preferences = data;
     		Preferences.setPreferences(data);
//     		console.log($scope.preferences.colors[0].id);
     		$location.path('preferences');
	 }).
     error(function(data, status) {
    	console.log(status);
    	console.log(data);
    	$scope.preferences = data
    	alert('failed '+data);
    });
	
}

function LoginCtrl($scope, $location, $http, $rootScope,Preferences) {
	var _URL_ = 'http://localhost:8080/stylepopz/api/auth/';
	//var _URL_ = 'http://stylepops.herokuapp.com/api/auth/';
	
	$scope.saveuser = function() {
		alert('username'+$scope.loginname);
		alert('password'+$scope.password);
	}
	
	$scope.save = function() {
		_URL_ = _URL_+this.model.name;
        alert(_URL_);
		$http.get(_URL_).success(function(data) {
			alert(data);
			var status = 200;
	    	if (status == 200) {
    			$scope.users = data;
    			alert('before redirect 200-'+data);
    			Preferences.setId(data);
    			loadPreferences($scope,$http,$location,Preferences);
	    	}
	    	
	    	if (status == 220) {
    			$scope.users = data;
    			alert('before redirect 220-'+data);
    			$location.path('displayproducts');
	    	}
	    }).
	    error(function(data, status) {
	    	alert('***failed '+data);
		    $scope.data = data || "Request failed";
		    $scope.status = status;
		    loadPreferences($scope,$http,$location,Preferences);
		    //$location.path('displayproducts');
	    });
   }
}

function DisplayBloggerCtrl($scope,$http,Blogger) {
	 $scope.users = Blogger.query();
     $scope.orderProp = 'id';
}

function BloggerDetailCtrl($scope, $routeParams, BloggerDetail) {
	 $scope.user = BloggerDetail.get({userId: $routeParams.userId,rank: $routeParams.rank}, function(user) {
	 $scope.mainImageUrl = user.imageUrl;
	 //console.log(user);
});
 $scope.setImage = function(imageUrl) {
	  console.log(this.user.collection.images[this.$index]);
	  $scope.user.collection.images[this.$index] =  $scope.mainImageUrl; 
	  $scope.mainImageUrl = imageUrl;
	  
 };
}

function DisplayProductsController($scope, $http){
    $scope.items = [
        {text:'Enter ur Fav!!', deleted: false}
    ];
    
    $scope.addNewItem = function(){
        $scope.newItem = {
            text: $scope.itemText,
            deleted: false
        }
        $scope.items.push(newItem);

        // clear the form text, 2-way binding \o/
        $scope.itemText = '';
    }
      $scope.deleteItem = function(item){
        item.deleted = true;
    }
    
     $scope.name = "Controller ";
}