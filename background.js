const DisablePublishButton = () => {
    const button1 = document.querySelector(`button[data-testid="ContentFormHeaderPublishButton"]`)
    const button2 = document.querySelector(`button[data-testid="SaveAndPublishDropdownButton"]`)
    if(button1) button1.setAttribute('disabled', true)
    if(button2) button2.setAttribute('disabled', true)
}

const EnablePublishButton = () => {
    const button1 = document.querySelector(`button[data-testid="ContentFormHeaderPublishButton"]`)
    const button2 = document.querySelector(`button[data-testid="SaveAndPublishDropdownButton"]`)
    if(button1) button1.removeAttribute('disabled')
    if(button2) button2.removeAttribute('disabled')
}

const GetTabInfo = (tabId, callback) => {
    chrome.tabs.get(tabId, tab => callback(tab))
}

chrome.tabs.onActivated.addListener(({ tabId }) => {
    GetTabInfo(tabId, tab => {
        if(!tab.url.includes("https://app.hygraph.com")) return
        chrome.scripting.executeScript({
            target: { tabId },
            function: DisablePublishButton
        })
    })
})
 
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(!tab.url.includes("https://app.hygraph.com")) return
    chrome.scripting.executeScript({
        target: { tabId },
        function: DisablePublishButton
    })
})

chrome.action.onClicked.addListener(tab => {
    if(!tab.url.includes("https://app.hygraph.com")) return
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: EnablePublishButton
    })
})
