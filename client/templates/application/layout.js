Template.layout.helpers({
    avatar: function() {
        
        var user = Meteor.users.findOne(Meteor.user()._id);
        

        if(user.services.google){
        	return user.services.google.picture;
        } else {
            return "/pa3.jpg";
        }

    }
});