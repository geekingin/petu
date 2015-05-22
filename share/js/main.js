
$(function() {
	var postUrl = 'http://keemo360.com/PETU/v1.0/api/post/post';
	var commentsUrl = 'http://keemo360.com/PETU/v1.0/api/post/comments';
	
	// var commentsUrl = './comments.json';
	// var postUrl = './post.json';

	// var postUrl='/PETU/v1.0/api/post/post';
	// var commentsUrl='/PETU/v1.0/api/post/comments';

	var CommentTemplate = $($('#template__comment').html());
	var postId=getParam('postId',location.search);
	console.log(postId);
	$.get(postUrl, {
		postId: postId,
		vkey: 'PETU'
	}, function(data) {
		data = (typeof data == 'string') ? JSON.parse(data) : data

		$('.post__user-avatar').css('background-image', 'url(' + data.body.portait + ')');
		$('.post__uname').text(data.body.uname);
		$('.post__time').text(transTime(data.body.time));

		$('.post__content').text(data.body.content);
		$('.post').show();
		data.body.small_imgs.forEach(function(src, i) {
			var img = $('<img/>');
			img.attr('src', src);
			img.appendTo('.images');
		});
	});

	$.get(commentsUrl, {
		postId: postId,
		rn: 3,
		baseId: 0,
		vkey: 'PETU'
	}, function(data) {
		data = (typeof data == 'string') ? JSON.parse(data) : data
		
		var list=data.body.list;

		list.forEach(function(comment,i){
			var div=CommentTemplate.clone();
			div.find('.comment__user-avatar').css('background-image','url('+comment.img_url+')');
			div.find('.comment__uname').text(comment.uname);
			div.find('.comment__time').text(transTime(comment.time));
			div.find('.comment__content').text(comment.content);
			div.appendTo('.comments');
		});
	});
});

function transTime(unixTimeStamp){
	var time=new Date(unixTimeStamp*1000);
	return time.getFullYear()+'-'+time.getMonth()+'-'+time.getDate()+'  '+time.getHours()+':'+time.getMinutes();
}
function getParam(param,str){
	var params=str.slice(1).split('&');
	var returnValue='';
	params.forEach(function(e,i){
		var pair=e.split('=');
		if (pair[0]==param){
			returnValue=pair[1];
		}
	});
	return returnValue;
}
