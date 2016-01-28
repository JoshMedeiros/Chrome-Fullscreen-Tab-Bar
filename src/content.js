function changeTab(tab, action) {
    chrome.runtime.sendMessage({
        tab: parseInt(tab),
        action: action
    });
}

chrome.runtime.onMessage.addListener(function(html) {
    var tabs = document.getElementById('fullscreen-tab-bar');
    if (!tabs) {
        tabs = document.createElement('div');
        tabs.setAttribute('id', 'fullscreen-tab-bar');
        document.documentElement.appendChild(tabs);
    }
    tabs.innerHTML = html;
    for (var i in tabs.children) {
        tabs.children[i].onclick = function(e) {
            changeTab(this.dataset.id, e.button == 1 ? 'close' : 'activate');
        };
    }
    tabs.onmousewheel = function(e) {
        var active = document.querySelector('#fullscreen-tab-bar .fullscreen-tab-active');
        var tabId = 0;
        if (e.wheelDelta > 0) {
            if (active.previousSibling != null) {
                tabId = active.previousSibling.dataset.id;
            } else {
                tabId = tabs.children[tabs.children.length - 1].dataset.id;
            }
        } else if (e.wheelDelta < 0) {
            if (active.nextSibling != null) {
                tabId = active.nextSibling.dataset.id;
            } else {
                tabId = tabs.children[0].dataset.id;
            }
        }
        changeTab(tabId, 'activate');
        return false;
    }
});
