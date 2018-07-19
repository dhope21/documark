$(function () {
	$('#name').keyup(function () {
		$('#greet').text('Hello ' + $('#name').val())
	});

	/**This piece of code detects all click functions and 
	 * toggles the visiblity of child elements on 
	 * click of parent.
	 * Special care is take to toggle only the elements clicked
	 * and not those above it.
	 * */
	$(document).unbind().on("click", "li", function (data) {
		if (data.target.id == data.currentTarget.id) {
			let liId = data.target.id;
			let parentId = liId.substr(2);
			console.log("Clicked.", liId, parentId);
			$("#ul" + parentId).toggle();
		}
	});

	/**
	 * This function accepts children elements from the bookmark tree
	 * and convert them into ordered list creating unique ids
	 * which help them for identifying for further events
	 * 
	 * @param {a} parent 
	 * @param {*} grandParentId 
	 * @param {*} parentId 
	 */
	function giveBirth(parent, grandParentId, parentId) {
		var addUl;
		if (parentId) {
			addUl = "<ul id=ul" + parentId + "></ul>";
			$("#li" + parentId).append(addUl);
			$("#ul" + parentId).hide();
		} else {
			parentId = "rootParent";
			addUl = "<ul id=ul" + parentId + "></ul>"
			$(grandParentId).append(addUl);
		}
		for (let i = 0; i < parent.length; i++) {
			// console.log("inside birth",parent[i].id);
			const element = parent[i];
			let liElement = "<li id=li" + parent[i].id + ">" + parent[i].title + "</li>";
			$("#ul" + parentId).append(liElement);
			if (parent[i].children && parent[i].children.length > 0) {
				var childParent = parent[i].children;
				var childParentId = parent[i].id;
				// console.log("inside birth",parentId,childParentId);
				giveBirth(childParent, parentId, childParentId);
			}
		}

	};

	/**
	 * This code is the entry point for creating the 
	 * bookmark tree
	 */
	chrome.bookmarks.getTree(function (bookmarkData) {
		var bookParent = bookmarkData[0].children;
		console.log("parent", bookParent);
		giveBirth(bookParent, "#bookbar");
	});

});