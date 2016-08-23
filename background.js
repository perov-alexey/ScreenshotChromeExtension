function helloWorld() {
    alert("Hello World!!!");
}

chrome.pageAction.onClicked.addListener(function (tab) {
    helloWorld();
});