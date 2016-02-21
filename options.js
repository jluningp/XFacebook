var blackarray;

// Saves options to chrome.storage
function save_options() {
  var stalk = document.getElementById('stalk').checked;
  var liked = document.getElementById('liked').checked;
  var black = document.getElementById('black').value;
  if(check_same(black) && black != "") {
	blackarray[blackarray.length] = black;
  }
  chrome.storage.sync.set({
    stalk: stalk,
	liked: liked,
	blacklist: blackarray
  }, function() {
    // Update status to let user know options were saved.\	
	chrome.tabs.reload();
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
	  restore_options();
    }, 750);
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
    document.getElementById('stalk').checked = items.stalk;
	document.getElementById('liked').checked = items.liked;
	blackarray = items.blacklist;
	document.getElementById('black').value = "";
	document.getElementById('blacklist').innerHTML = "";
	for(var i = 0; i < blackarray.length; i++)
	{
		document.getElementById('blacklist').innerHTML += "<label class='bl' id='bl" + i + "'>&nbsp; - " + blackarray[i] + "<br>";
	}
  });
}

function check_same(str) {
	for(var i = 0; i < blackarray.length; i++) {
		if(str == blackarray[i]) return false;
	}
	return true;
}

function empty() {
	blackarray = [];
	save_options();
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
	
$("#black").keyup(function(event){
    if(event.keyCode == 13){
		save_options();
	}
});
	
document.getElementById("clear").addEventListener('click', empty);
