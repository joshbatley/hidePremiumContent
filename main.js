const url = window.location.host;

const blockedContent = '.svgIcon--star';

window.addEventListener('load', function () {
    chrome.tabs.getSelected(null,function(tab){
        myURL=tab.url;
    });
// window.alert(url)
const isMedium = url.includes('medium');

let parents = [].slice.call(document.querySelectorAll(blockedContent)).map(i => i.closest('.streamItem'));

if (isMedium) {
  chrome.browserAction.setIcon({path: './icons/icon_16.png'});
}

parents.forEach(e => {
  console.log(e);
  while(e.firstElementChild) {
    e.removeChild(e.firstElementChild)
  }
})
