
chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'teamskeet.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'spyfam.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'realitykings.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'naughtyamerica.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'familysinners.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'bangbros.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'brazzers.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'vixen.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'digitalplayground.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'tushy.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'propertysex.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'babes.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'twistys.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'mylf.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'mofos.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'data18.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'thirdmovies.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'videosz.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'nubiles-porn.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'exotic4k.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'tiny4k.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'pornpros.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'povd.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'lubed.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'puremature.com'
                    },
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'lubed.com'
                    },
                }),new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostSuffix: 'castingcouch-x.com'
                    },
                })
            ],
            // ... show the page action.
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.pageAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript({
        file: 'createnfo.js'
    });
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if(request.action === 'downloadUrl'){
            chrome.downloads.download(request.downObj);
        }
        
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        sendResponse({
            farewell: "goodbye"
        });
    });