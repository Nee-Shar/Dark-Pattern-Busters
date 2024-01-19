// In your popup.js script

// // Listen for messages from the content script
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     // Check if the message contains darkPatternVariables
//     console.log(message);
//     if (message.darkPatternVariables) {
//         const {
//             scarcity,
//             forced,
//             urgency,
//             proof,
//             sneaking,
//             obstruction,
//             misdirection,
//             subtrap,
//         } = message.darkPatternVariables;

//         // Now you can use these variables as needed in your popup.js
//         console.log("Received Variables:", sneaking, forced, urgency);
//         console.log("message from content.js");
//         // Do something with the variables here...
//     }
// });

chrome.runtime.onConnect.addListener((port) => {
    console.log("dark pattenr")
    port.onMessage.addListener((msg) => {
      if (msg.darkPatternVariables) {
        console.log(msg.darkPatternVariables)
      }
    });
  });
  

console.log("hello world")