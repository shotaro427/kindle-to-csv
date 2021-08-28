function download() {
  if (!confirm('Kindleをダウンロード')){
    return 
  } else {
    const coverEle = document.getElementById('cover')
    const items = Array.from(coverEle.getElementsByTagName('li'))

    const csvs = items.map((item) => {
      const texts = item.getElementsByTagName('p')
      const title = texts[0] ? texts[0].innerHTML.replaceAll(',', '') : ''
      const author = texts[1] ? texts[1].innerHTML.replaceAll(',', '') : ''
      const imageUrl = item.getElementsByTagName('img')[0] ? item.getElementsByTagName('img')[0].src : ''
  
      return [
        title,
        author,
        imageUrl
      ]
    })
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const content = csvs.map(row => row.join(',')).join('\n')
    const blob = new Blob([bom, content], { type: 'text/csv' })
  
    const url = window.URL.createObjectURL(blob);
  
    const aElement = document.createElement('a');
    aElement.href = url;
    aElement.download = 'kindle.csv';
  
    aElement.click();
  }
}

chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: download
	});
});
