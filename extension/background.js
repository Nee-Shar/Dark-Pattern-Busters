// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     chrome.runtime.sendMessage(message);
// });
let darkPatternVariables;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.darkPatternVariables) {
    darkPatternVariables = message.darkPatternVariables;

    // Send a message to the popup script
    chrome.runtime.sendMessage({ darkPatternVariables });
  }
});

// Create a function to get the dark pattern variables when requested by the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getDarkPatternVariables") {
    sendResponse({ darkPatternVariables });
  }
});
