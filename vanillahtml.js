
function html(selector, cb) {
    
    if (typeof cb !== "function") return;
    
    var exoel = function(element) {
        element.vhtmlid = html.idcounter++;
        cb.call(element);
    };
    var exoall = function() {
        this.document.querySelectorAll(selector).forEach(exoel);
    };
    
    html.onready(exoall);
    html.onelementadded(selector, exoel);
}

html.idcounter = 1;
html.elementaddedhandlers = [];

html.onready = function(cb) {
    if (document.readyState === "complete") { 
        cb();
    }
    else {
        window.addEventListener("load", cb);
    }
};
html.onelementadded = function(selector, cb) {
    html.elementaddedhandlers.push({
        selector: selector,
        cb: cb
    });
};

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}
if (Element.prototype.msMatchesSelector && !Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
}

html.onready(function() {
    if (typeof MutationObserver !== 'function' || typeof Element.prototype.matches !== 'function') {
        console.warn("MutationObserver isn't supported on this Browser. DOM updates won't be registered!");
        return;
    }

    html.docObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(element) {
                html.elementaddedhandlers.forEach(function(handler) {
                    if (element.matches(handler.selector)) {
                        handler.cb(element);
                    }
                });
            });
        });
    }).observe(document.body, { childList: true });
});