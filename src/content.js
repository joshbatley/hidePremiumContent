const blockedContent = '.svgIcon--star';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  let parents = [].slice
      .call(document.querySelectorAll(blockedContent))
      .map(i => i.closest('.streamItem'));
  if (request.command == "hide") {
    hideContent(parents)
    sendResponse({ type: "hiddem" });
  } else if (request.command == "show") {
    showContent(parents)
    sendResponse({ type: "showen" });
  }
});

function hideContent(nodes) {
  nodes.forEach((e) => {
    e.style.display = 'none';
  })
}

function showContent(nodes) {
  nodes.forEach((e) => {
    e.style.display = 'block';
  })
}
