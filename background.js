// open 'index' in a new tab on extesion icon clicked
chrome.browserAction.onClicked.addListener(function(activeTab){
  var newURL = "index.html";
  chrome.tabs.create({ url: newURL });
});

// print 'installed' once the extesion is installed
chrome.runtime.onInstalled.addListener(function (){
  console.log('Extension Installed!');
});

// print 'PING' every 3 hours
setInterval(function(){
  console.log('PING');
}, 1000 * 60 * 60 * 3);
