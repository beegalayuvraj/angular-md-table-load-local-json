angular.module('faqApp')
.factory('$faq',faqService);

function faqService($http) {
	var funcs = {};
	funcs.addItem = function(item){
		   var response = JSON.parse(sessionStorage.getItem("faqData"));
		   response.push(item);
		   sessionStorage.setItem("faqData",JSON.stringify(response));

	};
	funcs.deleteItem = function(delItem,callBack) {
		var updatedData=[];
	    var response = JSON.parse(sessionStorage.getItem("faqData"));
 		for (var i = 0; i < response.length; i++) {
	        if (response[i].faqId === delItem.faqId) {
	        	 response.splice(i, 1);
	              sessionStorage.setItem("faqData",JSON.stringify(response));
	            break;
	        }
	           
	         }
      if(callBack){callBack(JSON.parse(sessionStorage.getItem("faqData")));}

      
	};
	funcs.updateItem = function(updatedItem,callBack) {
       var response = JSON.parse(sessionStorage.getItem("faqData"));
      for (var i = 0; i < response.length; i++) {
	        if (response[i].faqId === updatedItem.faqId) {
	        	response[i] = updatedItem;
               sessionStorage.setItem("faqData",JSON.stringify(response));
               break;
	        }
               
         }

        if(callBack){callBack(JSON.parse(sessionStorage.getItem("faqData")));}

	};
	funcs.getItems = function(callBack) {
		var items = [];
		if(sessionStorage.faqData === undefined || sessionStorage.faqData === "" ) { //
				var response = $http({method: 'GET', url: 'faqs.json'}).
			        then(function(response) {
			        	sessionStorage.setItem("faqData",JSON.stringify(response.data.data));
			           if(callBack){callBack(JSON.parse(sessionStorage.getItem("faqData")));}
			        }, function(response) {
			           
			      });
           return response;
		} else {
			return callBack(JSON.parse(sessionStorage.getItem("faqData")));
		}
    
	};
	funcs.getItem = function(index,item) {
        var items = getItems();
        return items[i];
	};
	return funcs;
}