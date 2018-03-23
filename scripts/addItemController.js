angular.module('faqApp')
.controller('addItemController', ['faqs','$mdDialog', '$faq', '$scope', function (faqs,$mdDialog, $faq,$scope) {
  'use strict';
  	$scope.disableFaqId = false;
  	$scope.title = "ADD FAQ";
  	$scope.buttonText = "ADD FAQ";
   if(faqs === null) {
       $scope.faq = {};  
   } else {
   	 $scope.faq = faqs;
   	 $scope.disableFaqId = true;
   	 $scope.title = "EDIT FAQ";
   	 $scope.buttonText = "UPDATE FAQ";
   }
  this.cancel = $mdDialog.cancel;

  this.addItem = function () {
  	 $scope.item.form.$setSubmitted();
    if(faqs === null) {
    	if($scope.item.form.$valid) {
	     $faq.addItem($scope.faq);
	     $mdDialog.hide($scope.faq);
   	 }
    } else {
    	if($scope.item.form.$valid) {
	      $faq.updateItem($scope.faq,function(response){
			console.log(response);
			 $mdDialog.hide(response);
      });
   	 }
    }
    
  };
  
}]);
