(function () {
'use strict';

angular.module('MenuCategoriesApp', [])
.controller('MenuCategoriesController', MenuCategoriesController)
.service('MenuCategoriesService', MenuCategoriesService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('found', foundDirective);


function foundDirective() {
  var ddo = {
    templateUrl: 'foundList.html',
    scope: {
      founditems: '<',
      onRemove: '&'
    },
    controller: MenuCategoriesController,
    controllerAs: 'menu',
    bindToController: true
  };

  return ddo;
}
MenuCategoriesController.$inject = ['MenuCategoriesService'];
function MenuCategoriesController(MenuCategoriesService) {
	
  var menu = this;
  menu.itemName="";
menu.addItem=function()
{
	
		MenuCategoriesService.getMenuCategories(menu.itemName);
}
menu.categories=MenuCategoriesService.getItems();
menu.removeItem = function (itemIndex) {
    MenuCategoriesService.removeItem(itemIndex);
  };
}
MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
function MenuCategoriesService($http, ApiBasePath) {
  var service = this;
  var founditems=[];
  var count=0;
  var message="";
  var items;
  service.getMenuCategories = function (finditem) {
	  $http.get("https://davids-restaurant.herokuapp.com/menu_items.json").then(function(response) {
    items = response.data.menu_items;
	if(finditem==""||finditem===null)
	console.log("No display");	
	console.log(items);
	for(var i=0;i<items.length;i++ )
	  {
		  var discp=items[i].description;
		  console.log(discp+" includes "+ discp.includes("finditem") );
		 var item = {
       name: items[i].name,
       short_name:items[i].short_name,
	   description:items[i].description
     };
	  if(discp.includes(finditem)===true&&finditem!==""&&finditem!==null)
	  {
		  count++;
    founditems.push(item);
	  }
	  
      }
  });
 
  };
  service.removeItem = function (itemIdex) {
    founditems.splice(itemIdex, 1);
  };
   service.getItems = function () {
    return founditems;
  };
}
})();
