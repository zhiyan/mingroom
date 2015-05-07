.controller('HeaderCtrl', function($http,$scope,$rootScope,$state,$timeout) {

	$scope.list = {
		'tab.camera' : {'placeholder' : '查找相机...','text':'','hasFilters':false},
		'tab.lens' : {'placeholder' : '查找镜头...','text':'','hasFilters':false},
	};

	$scope.submit = function( text ){
		if( !!text ){
			$scope.list[$scope.key].hasFilters = true;
		}else{
			$scope.list[$scope.key].hasFilters = false;
		}
		$rootScope.$broadcast( $scope.key + ".searchTextChange",text);
	}

	$scope.reset = function(){
		$scope.list[$scope.key].text = "";
		$scope.list[$scope.key].hasFilters = false;
	}

	$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
		
        $scope.search = false;

        if ( toState.name in $scope.list  ) {
            $scope.search = true;
            $scope.key = toState.name;
        }
	});


})