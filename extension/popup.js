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

// chrome.runtime.onConnect.addListener((port) => {
//     console.log("dark pattenr")
//     port.onMessage.addListener((msg) => {
//       if (msg.darkPatternVariables) {
//         console.log(msg.darkPatternVariables)
//       }
//     });
//   });
// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Check if the message contains darkPatternVariables
  if (message.darkPatternVariables) {
    // Access the darkPatternVariables directly
    const {
      scarcity,
      forced,
      urgency,
      proof,
      sneaking,
      obstruction,
      misdirection,
      subtrap,
    } = message.darkPatternVariables;

    // Now you can use these variables as needed in your popup.js
    console.log("Received Variables:", sneaking, forced, urgency);
    // Do something with the variables here...
  }
});

// Request dark pattern variables from the background script
chrome.runtime.sendMessage(
  { action: "getDarkPatternVariables" },
  (response) => {
    if (response.darkPatternVariables) {
      // Access the darkPatternVariables directly
      const {
        scarcity,
        forced,
        urgency,
        proof,
        sneaking,
        obstruction,
        misdirection,
        subtrap,
      } = response.darkPatternVariables;

      // Now you can use these variables as needed in your popup.js
      console.log(
        "Received Variables:",
        sneaking,
        forced,
        urgency,
        proof,
        subtrap,
        scarcity,
        obstruction,
        misdirection
      );
      const totalCount =
        scarcity +
        forced +
        urgency +
        proof +
        sneaking +
        obstruction +
        misdirection +
        subtrap;

      // Display the total count in the element with ID "thispage"
      document.getElementById("thispage").innerText = `${totalCount}`;

      document.getElementById("scar").innerText = `${scarcity}`;
      document.getElementById("social").innerText = `${proof}`;
      document.getElementById("mis").innerText = `${misdirection}`;
      document.getElementById("ur").innerText = `${urgency}`;
      document.getElementById("obs").innerText = `${obstruction}`;
      document.getElementById("sneak").innerText = `${sneaking}`;
      document.getElementById("subs").innerText = `${subtrap}`;
      document.getElementById("force").innerText = `${forced}`;

      // Do something with the variables here...
    }
  }
);

console.log("hello world");
