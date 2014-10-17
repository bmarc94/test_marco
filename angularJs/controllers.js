var app = angular.module('test', []);

app.controller('formCtr', function($scope,$location){
	$scope.location = $location;
	$scope.forms = [{name:'Entreprise', inputs:[{label:"Raison Sociale",required:true},{label:"Contact"},{label:"Téléphone"}],datas:[]},
					{name:'Particuliers', inputs:[{label:"Nom",required:true},{label:"Prénom"},{label:"Téléphone"}],datas:[]}
					];
	
					
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
		
		/*Ajout d'un item pour les anciennes entrées.
		SALE ? */
		for (var i in form.datas){
			while(form.datas[i].length < formInputsLength){
				form.datas[i].push('');
			}
		}	
	}
	$scope.addForm=function(){ 
		var newForm  = createForm($scope.newFormName); /* newFormName : déclarée dans le html*/
		
		$scope.forms.push(newForm);
		$location.path(newForm.name);
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
		$scope.displayedForm = path.replace('/','');
	})
	
	var createForm = function(formName/*str*/,inputs/*list arr*/, datas/*string arr*/){
		form = {};
		form['name'] = formName;
		form['inputs'] = datas || [];
		form['datas'] = inputs || [];
		
		return form;
	}
});