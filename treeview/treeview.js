function createElementAndAppend(elTagName,parentEl){
	var el = document.createElement(elTagName);
	parentEl.appendChild(el);
	return el;
}

/************/
/* Treeview */
/************/


/*base*/
function BaseTreeView(targetId,data){
	
	
	this.init = function(targetId,data){
		this.treeViewWrapper = document.getElementById(targetId);
		this.treeViewWrapper.id = targetId;
		this.data = data;
		this.selectedItem = null;
		
		for (var i in this.data){
			var item=this.createItem(this.data[i], i);
		}
	}
	
	this.createItem= function(item, index, parentId){
		var itemWrapper = createElementAndAppend("DIV",this.treeViewWrapper);
		var icon =  createElementAndAppend("IMG",itemWrapper);
		var span = createElementAndAppend("A",itemWrapper);
		var self =this;
		itemWrapper.id=parentId ? parentId + "["+index+"].sd" : "["+index+"].sd" ; //SALE !!!
		
		span.innerHTML = item.l;
		
		if(item.sd){
			icon.src = this.directorypath + "1ptrans.gif";
			icon.className="";
			icon.id = parentId ? parentId + "["+index+"].sd_IMG" : "["+index+"].sd_IMG";
			
			itemWrapper.onclick=function (){
				self.itemWrapper_click(this);
			};		
		}else{
			icon.src = this.directorypath + "1ptrans.gif";
			icon.className="";
			icon.id = parentId ? parentId + "["+index+"].sd_IMG" : "["+index+"].sd_IMG";
			
			itemWrapper.onclick=function(){self.itemOnclick(this);}
		}
		itemWrapper.appendChild(icon);
		itemWrapper.appendChild(span);
		return itemWrapper
	};
	this.toggleDisplayBranch = function(item){
		if(!item.nextSibling || item.nextSibling.className!='branch'){
			this.createBranch(item);
			return
		}
		if(item.nextSibling.style.display=="block"){
			item.nextSibling.style.display = "none";
			item.firstChild.className="";
		}else{
			item.nextSibling.style.display="block";
			item.firstChild.className="";
		}
	}
	
	this.createBranch = function(item){
		var itemLength;
		var branchDiv;
		if(item){
			var branchDiv =document.createElement("DIV");
			branchDiv.className= "branch";

			var branchItems = eval("this.data" + item.id); //SALE !!!
			var branchItemLength = branchItems.length;
			for (var i = 0; i< branchItemLength; i++){
				var itemCreated=this.createItem(branchItems[i], i, item.id);
				branchDiv.appendChild(itemCreated);
			};
			if (item.nextSibling){
				item.parentNode.insertBefore(branchDiv, item.nextSibling);
			}
			else{
				item.parentNode.appendChild(branchDiv);
			}
		}else{
			itemLength = this.items.length;
			for (var i = 0; i< itemLength; i++){
				var itemCreated=this.createItem(this.items[i], i);
				this.treeview.appendChild(itemCreated);
			}
		}
		
		item.nextSibling.style.position="inherit";
		item.nextSibling.style.display="block";
	}
	
	this.itemOnclick = function(item){
		if(this.selectedItem){
			this.selectedItem.children[1].style.background="";
		}
		this.selectedItem = item;
		this.selectedItem.children[1].style.background="blue";
	}
	
	this.itemWrapper_click = function(item){
		this.toggleDisplayBranch(item);
	}
	
	//this.init();
}


/*test héritage bidon*/


function treeView(){}
treeView.prototype = new BaseTreeView();


function treeView2(){
	BaseTreeView.apply(this);
	var self = this;

	/*TEST */
	var SuperItemOnclick = this.itemOnclick;
	
	this.itemOnclick = function(item){
		SuperItemOnclick(item); /*WTF? WORKS!!!!*/
		alert(self.data);
	}
	this.itemWrapper_click = function(item){
		this.toggleDisplayBranch(item);
	}
	
	/*var superToogle = this.toggleDisplayBranch;
	
	this.toggleDisplayBranch = function(item){
		superToogle(item); //WTF? DOESN'T WORK!!!!!!!!!!
		alert(item.innerHTML);
	}*/
}

