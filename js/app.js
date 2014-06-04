App = Ember.Application.create();


App.Router.map(function(){
	this.resource('about');
	this.resource('posts', function(){
		this.resource('post', {path: ':post_id'});
	});
})

App.PostsRoute = Ember.Route.extend({
	model: function(){
		return posts;
	}
});

App.PostRoute = Ember.Route.extend({
	model: function(params) {
		return posts.findBy('id', params.post_id)
	}
});



App.PostController = Ember.ObjectController.extend({
	isEditing: false,

	actions: {
		edit: function() {
			this.set('isEditing', true);
		},

		doneEditing: function() {
			this.set('isEditing', false);
		}
	}
});

Ember.Handlebars.helper('format-date', function(date){
	return moment(date).fromNow();
});

var converter = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input){
	return new Handlebars.SafeString(converter.makeHtml(input));
});

var posts = [{
	id:'1',
	title:"My life, Kinda",
	author: {name:"BCBanger", age:"32"},
	date: new Date("12-27-2012"),
	excerpt: "Oh boy this is a dousy",
	body: "Yeah... I'm not really going to write anything for this one"
}, {
	id:'2',
	title:"Where in the world is Carmen Sandiego?",
	author: {name:"Carmen S.", age:"44"},
	date: new Date("12-24-2012"),
	excerpt: "Hint: She's not in America",
	body: "Yeah... I'm not really going to write anything for this one either"
}];