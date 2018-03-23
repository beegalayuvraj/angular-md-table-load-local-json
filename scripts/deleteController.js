angular.module('faqApp')
.controller('deleteController', [ 'faqs','$faq' ,'$mdDialog', '$scope', function (faqs, $faq,$mdDialog, $scope) {
  'use strict';
  
  this.cancel = $mdDialog.cancel;
  this.deleteDessert = deleteDessert;
  function deleteDessert() {
      $faq.deleteItem(faqs[0],function(response){
			console.log(response);
			  hide(response);
      });
   
  };
  
 function hide(response) {
 	 $mdDialog.hide(response);
 }
  
}])