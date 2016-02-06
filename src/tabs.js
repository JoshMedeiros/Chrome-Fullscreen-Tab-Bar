function changeTab(tab, action) {
    port.postMessage({
        tab: parseInt(tab),
        action: action
    });
}

function tabScroll(e) {
    var tabs = document.querySelector('#tabs');
    var active = document.querySelector('.active');
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

function updateTabs(data) {
    var tabs = document.querySelector('#tabs');
    tabs.innerHTML = data.tabs;
    for (var i = 0; i < tabs.children.length; i++) {
        if (tabs.children[i].dataset.id == data.tabId) {
            tabs.children[i].className += ' active';
        }
        tabs.children[i].onclick = function(e) {
            changeTab(this.dataset.id, e.button == 1 ? 'close' : 'activate');
        };
        tabs.onmousewheel = tabScroll;
    }
}

var port = chrome.runtime.connect({name: 'tabs'});
port.onMessage.addListener(updateTabs);
