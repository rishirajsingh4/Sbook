Template.postSubmit.events({
    "click .post-button": function(){
		var body = document.getElementById("postInputBox").value;
		var post = {};
		post.body = body;

		//console.log(post.body);

		if (post.body == null || post.body == ""){
            window.alert("Please give your blog a TITLE");
            return false;
        }

        var user = Meteor.user();
        if(!user){
            window.alert("Please SignIn in to post.");
            return false;
        }

        Meteor.call('postInsert', post, function(error, result) {
            // display the error to the user and abort
            if (error)
                return alert(error.reason);

            if(result){
                $('#postInputBox').val("");       

            }
        });
	}
});

