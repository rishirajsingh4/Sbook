Template.postSubmit.events({
    "click .post-button": function(){
		var body = document.getElementById("postInputBox").value;
		var post = {};
		post.body = body;

		console.log(post.body);

		if (post.body == null || post.body == ""){
            window.alert("Please give your blog a TITLE");
            return false;
        }

        Meteor.call('postInsert', post, function(error, result) {
            // display the error to the user and abort
            if (error)
                return alert(error.reason);

            //Router.go('textList');
        });
	}
});

