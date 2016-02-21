var nolike;
var blackarray;
var noBlack = window.setInterval(removeBlack, 100);
var noLiked;

function removeLiked() {
	$('.userContentWrapper:contains( liked this.)').each(function() {
			$(this).html("<div style='text-align: center'><br>Liked post hidden.</div><br>")
		});
}

function removeBlack() {
	for(var i = 0; i < blackarray.length; i++)
	{
		$('.userContentWrapper:contains(' + blackarray[i] + ')').each(function() {
			$(this).html("<div style='text-align: center'><br>Hidden for containing \"" + blackarray[i] + "\".</div><br>")
		});
	}
}

function removeLike() {
	var pathname = window.location.pathname;
	var test = pathname.replace("https://www.facebook.com/", "")
	if(test.length > 1) {
		$('._42nr').each(function() {
			$(this).replaceWith("<span class='disable'>Safe Stalk Mode Enabled. Click to Disable.</span>");
		});
		$('.UFIAddComment').each(function() {
			$(this).remove();
		});
	}
	$('.disable').each( function() {
		$(this).click(function() {
			save_options();
		});
	});
}

// Saves options to chrome.storage
function save_options() {
  chrome.storage.sync.set({
    stalk: false
  }, function() {
	location.reload();
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    stalk: false,
	liked: false,
	blacklist: []
  }, function(items) {
	if(items.stalk) {
		nolike = window.setInterval(removeLike, 100);
	}
	if(items.liked) {
		noLiked = window.setInterval(removeLiked, 100);
	}
	blackarray = items.blacklist;
  });
}
restore_options();
document.addEventListener('DOMContentLoaded', restore_options);