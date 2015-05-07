app.controller('AccountCtrl', function($http,$scope,$state,$rootScope) {
	// $rootScope.pageTitle = "关于";
})


app.controller('CameraCtrl', function($http,$scope,$state,$rootScope,$fireQuery,$ionicLoading,$firebaseArray,$data) {
	var limit = 0, // 下拉刷新限制条数
		step = 10; //下拉刷新递进条数

	$scope.total = 0;
	$scope.loaded = false;

	var ref = $data.child("camera").orderByKey();

	$scope.refresh = function(){
		limit += step;
		var arr = $firebaseArray(ref.limitToFirst( limit ));
		arr.$loaded(function(data){
			$scope.loaded = true;
			$scope.data = arr;
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$ionicLoading.hide();
		})
	}

	$ionicLoading.show({
      template: '加载中...'
    });

    $scope.go = function( key ){
    	$state.go("tab.cameraDetail",{
    		id:key
    	});
    }

    $scope.$on("tab.camera.searchTextChange",function( obj, text ){
    	$fireQuery("camera",text,function(res){
    		$scope.data = res;
    		$scope.$digest();
    	})
    })

})

app.controller('CameraDetailCtrl', function($http,$scope,$state,$rootScope,$ionicLoading,$stateParams,$data,$firebaseObject) {

	var ref = $data.child("camera").orderByKey().equalTo($stateParams.id);

	var obj = $firebaseObject(ref);

	obj.$loaded(function(x){
		$scope.data = x[$stateParams.id];
		$ionicLoading.hide();
	});

	$ionicLoading.show({
      template: '加载中...'
    });

})


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
app.controller('LensCtrl', function($http,$scope,$state,$rootScope,$fireQuery,$ionicLoading,$firebaseArray,$data) {
	var limit = 0, // 下拉刷新限制条数
		step = 10; //下拉刷新递进条数

	$scope.total = 0;	
	$scope.loaded = false;


	var ref = $data.child("lens").orderByKey();

	$scope.refresh = function(){
		limit += step;
		var arr = $firebaseArray(ref.limitToFirst( limit ));
		arr.$loaded(function(data){
			$scope.loaded = true;
			$scope.data = arr;
			console.log(arr)
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$ionicLoading.hide();
		})
	}

	$ionicLoading.show({
      template: '加载中...'
    });

    $scope.go = function( key ){
    	$state.go("tab.lensDetail",{
    		id:key
    	});
    }

    $scope.$on("tab.lens.searchTextChange",function( obj, text ){
    	$fireQuery("lens",text,function(res){
    		$scope.data = res;
    		$scope.$digest();
    	})
    })

})

app.controller('LensDetailCtrl', function($http,$scope,$state,$rootScope,$ionicLoading,$stateParams,$data,$firebaseObject) {

	var ref = $data.child("lens").orderByKey().equalTo($stateParams.id);

	var obj = $firebaseObject(ref);

	obj.$loaded(function(x){
		$scope.data = x[$stateParams.id];
		$ionicLoading.hide();
	});

	$ionicLoading.show({
      template: '加载中...'
    });

})


app.controller('TabsCtrl', function($scope, $rootScope, $state) {
        $rootScope.$on('$ionicView.beforeEnter', function() {

        	var hides = ['tab.cameraDetail','tab.lensDetail'];

            $rootScope.hideTabs = false;

            if ( ~hides.indexOf( $state.current.name )  ) {
                $rootScope.hideTabs = true;
            }
        });
    });