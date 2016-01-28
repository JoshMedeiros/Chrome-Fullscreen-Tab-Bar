(function() {
    function htmlEncode( html ) {
        return document.createElement( 'a' ).appendChild( 
        document.createTextNode( html ) ).parentNode.innerHTML;
    };
    function tabUpdate() {
        chrome.tabs.query({}, function(tabs) {
            var html = '';
            var even = false;
            for (var i in tabs) {
                var tab = tabs[i];
                html += '<div class="fullscreen-tab'
                        + (tab.active ? ' fullscreen-tab-active' : '') 
                        + ((even = !even) ? ' fullscreen-tab-even' : ' fullscreen-tab-odd')
                        + '" data-id="' + tab.id + '">'
                        + '<img src="' + tab.favIconUrl + '" onerror="this.style.display=\'none\'">' + htmlEncode(tab.title) + '</div>';
            }
            for (var i in tabs) {
                chrome.tabs.sendMessage(tabs[i].id, html);
            }
        });
    }

   chrome.tabs.onUpdated.addListener(tabUpdate); 
   chrome.tabs.onCreated.addListener(tabUpdate); 
   chrome.tabs.onRemoved.addListener(tabUpdate); 
   chrome.tabs.onActiveChanged.addListener(tabUpdate); 

   chrome.runtime.onMessage.addListener(function(data) {
        if (data.action == "activate") {
            chrome.tabs.update(data.tab, {active: true});
        } else if (data.action == "close") {
            chrome.tabs.remove(data.tab);
        }
   });
})();
