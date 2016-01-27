function changeTab(e) {
    chrome.runtime.sendMessage({
        tab: parseInt(this.dataset.id),
        action: e.button == 1 ? 'close' : 'activate'
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
        tabs.children[i].onclick = changeTab;
    }
});
