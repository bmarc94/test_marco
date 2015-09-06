var app = angular.module('test', []);

app.controller('formCtr', function($scope,$location){
	$scope.location = $location;
	$scope.template = [{menu:'Accueil'},
					   {menu:'Nos Whiskeys', subMenus:[{subMenu:'aberlour'},{subMenu:'ici'},{subMenu:'ici'}]},
					   {menu:'Nos Vins', subMenus:[{subMenu:'gigondas'},{subMenu:'ici'},{subMenu:'ici'}]},
					   {menu:'Nos Bi�res', subMenus:[{subMenu:'leffe'},{subMenu:'ici'},{subMenu:'ici'}]}
					];
					
	var newForm = function(formName/*str*/,inputs/*list arr*/, datas/*string arr*/){
		form = {name:formName,
				/*useless*/
				inputs:datas || [],
				datas:inputs || []
				};		
		return form;
	}
					
	$scope.submitForm=function(form){
		var newEntry = [];
		form.inputs.forEach(function(input){
			newEntry.push(input.value);
			input.value = "";
		})
		form.datas.push(newEntry);
	}
	$scope.addLabel=function(form){
		var newInput={};
		var formInputsLength; 
		
		newInput['label']=form.newLabel;
		form.newLabel='';
		
		form.inputs.push(newInput);
		formInputsLength = form.inputs.length;
		
		/*Ajout d'un item pour les anciennes entr�es.
		SALE ? */
		for (var i in form.datas){
			while(form.datas[i].length < formInputsLength){
				form.datas[i].push('');
			}
		}	
	}
	$scope.addForm=function(){ 
		var form  = newForm($scope.newFormName); /* newFormName : d�clar�e dans le html*/
		
		$location.path(form.name);
		$scope.newFormName = '';
	}
	$scope.deleteData=function(datas, index){
		datas.splice(index,1);
	}
	$scope.editData=function(form, data){
		data.isEditing = true;
	}
	$scope.saveData=function(data){
		data.isEditing = false;
	}
	$scope.labelOnFocus = function(elem){
		elem.isFocus = true;
	}
	$scope.labelOnBlur = function(elem){
		elem.isFocus = false;
	}
	$scope.$watch("location.path()",function(path){
		alert(path);
		$scope.displayedMenu = path.replace('/','');
	})
});