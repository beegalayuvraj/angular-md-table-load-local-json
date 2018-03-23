
angular.module('faqApp')
.controller('faqController', ['$mdEditDialog','$faq','$mdDialog','$q', '$scope', '$timeout', function ($mdEditDialog,$faq,$mdDialog, $q, $scope,$timeout) {
  'use strict';

  $scope.selected = [];
  $scope.limitOptions = [5, 10, 15];
    var bookmark;
  $scope.options = {
    rowSelection: true,
    multiSelect: true,
    autoSelect: true,
    decapitate: false,
    largeEditDialog: false,
    boundaryLinks: false,
    limitSelect: true,
    pageSelect: true
  };


  $scope.filter = {
    options: {
      debounce: 500
    }
  };

  $scope.query = {
    order: 'faqId',
    limit: 5,
    page: 1
  };
  $scope.faqs = [];
  $scope.allFaqs = [];
  $scope.getFaqs= function() {
    $faq.getItems(function(response){
     $scope.allFaqs = response;
     $scope.faqs = response;
     $scope.faqs.count = response.length;
       $scope.selected.length=0;
    });

  }

  $scope.editComment = function (event, dessert) {
    event.stopPropagation(); // in case autoselect is enabled

    var editDialog = {
      modelValue: dessert.comment,
      placeholder: 'Add a comment',
      save: function (input) {
        if(input.$modelValue === 'Donald Trump') {
          input.$invalid = true;
          return $q.reject();
        }
        if(input.$modelValue === 'Bernie Sanders') {
          return dessert.comment = 'FEEL THE BERN!'
        }
        dessert.comment = input.$modelValue;
      },
      targetEvent: event,
      title: 'Add a comment',
      validators: {
        'md-maxlength': 30
      }
    };

    var promise;

    if($scope.options.largeEditDialog) {
      promise = $mdEditDialog.large(editDialog);
    } else {
      promise = $mdEditDialog.small(editDialog);
    }

    promise.then(function (ctrl) {
      var input = ctrl.getInput();

      input.$viewChangeListeners.push(function () {
        input.$setValidity('test', input.$modelValue !== 'test');
      });
    });
  };

  $scope.toggleLimitOptions = function () {
    $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
  };

  $scope.getTypes = function () {
    return ['Candy', 'Ice cream', 'Other', 'Pastry'];
  };

  $scope.loadStuff = function () {
    $scope.promise = $timeout(function () {
      // loading
    }, 2000);
  }

  $scope.logItem = function (item) {
    console.log(item.name, 'was selected');
  };

  $scope.logOrder = function (order) {
    console.log('order: ', order);
  };

  $scope.logPagination = function (page, limit) {
    console.log('page: ', page);
    console.log('limit: ', limit);
  };
   $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addItemController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
          locals: { faqs: null },
      templateUrl: 'add-item-dialog.html',
    }).then( $scope.getFaqs);
  };

  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { faqs: $scope.selected },
      templateUrl: 'delete-dialog.html',
    }).then($scope.getFaqs);
  };

   $scope.editItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addItemController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { faqs: $scope.selected[0] },
      templateUrl: 'add-item-dialog.html',
    }).then($scope.getFaqs);
  };
  
  $scope.types = ['Any','faq','faq2'];
  $scope.searchType = 'Any';
  $scope.query.filter = '';
   $scope.removeFilter = function () {
    $scope.filter.show = false;
    $scope.query.filter = '';
    $scope.faqs = $scope.allFaqs;
    if($scope.filter.form.$dirty) {
      $scope.filter.form.$setPristine();
    }
  };

  $scope.doSearch = function(){
    $scope.faqs = [];
    console.log($scope.searchType);
    var results = [];
    var query = $scope.query.filter;
    if(!$scope.searchQuestion && !$scope.searchAnswer && !$scope.searchJourney && !$scope.searchTag){
      var subset = $scope.allFaqs;
      if($scope.searchType !== 'Any'){
        subset = subset.filter(function(faq){
            return faq.type.toLowerCase().includes($scope.searchType.toLowerCase());
        });
      }
      $scope.faqs = subset.filter(function(faq){
          return faq.question.toLowerCase().includes(query.toLowerCase()) || faq.answer.toLowerCase().includes(query.toLowerCase()) || faq.journey.toLowerCase().includes(query.toLowerCase()) ||  faq.tag.toLowerCase().includes(query.toLowerCase());
      });
    }else{
      results = [];
      var subset = $scope.allFaqs;
      if($scope.searchType !== 'Any'){
        subset = subset.filter(function(faq){
            return faq.type.toLowerCase().includes($scope.searchType.toLowerCase());
        });
      }
      if(!query.length){
        results = subset;
      }else{
        if($scope.searchTag){
          var _results  = subset.filter(function(faq){
              return faq.tag.toLowerCase().includes(query.toLowerCase());
          });
          results=results.concat(_results);
        }
        if($scope.searchQuestion){
          var _results  = subset.filter(function(faq){
              return faq.question.toLowerCase().includes(query.toLowerCase());
          });
          results=results.concat(_results);
        }
        if($scope.searchAnswer){
          var _results  = subset.filter(function(faq){
              return faq.answer.toLowerCase().includes(query.toLowerCase());
          });
          results=results.concat(_results);
        }
        if($scope.searchJourney){
          var _results  = subset.filter(function(faq){
              return faq.journey.toLowerCase().includes(query.toLowerCase());
          });
          results=results.concat(_results);
        }
      }

      $scope.faqs = Array.from(new Set(results));
    }


  }

  $scope.$watch('query.filter', function (newValue, oldValue) {
    if(!oldValue) {
      bookmark = $scope.query.page;
    }

    if(newValue !== oldValue) {
      $scope.query.page = 1;
    }

    if(!newValue) {
      $scope.query.page = bookmark;
    }

  });
  $scope.getFaqs();
}]);
