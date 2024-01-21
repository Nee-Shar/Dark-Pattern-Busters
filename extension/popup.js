
document.getElementById("detectButton").addEventListener("click", function() {
  console.log("button clicked");

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "invokeContentFunction" });
  });
});


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
      
      console.log("hellllo");
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
 
      progress_bar();
      document.querySelector('.progressdiv').setAttribute('data-percent', totalCount);
    }
  }
);

console.log("hello world");


function progress_bar() {
  window.onload = function () {
    var totalProgress, progress, total, offuse;
    var path = document.querySelectorAll(".progress");

    for (var i = 0; i < path.length; i++) {
      totalProgress = path[i]
        .querySelector("path")
        .getAttribute("stroke-dasharray");
    
      progress = path[i].parentElement.getAttribute("data-percent");
      total = path[i].parentElement.getAttribute("total-data");
      offuse = path[i].parentElement.getAttribute("offuse-data");

      var percent = parseInt(
        document.querySelector(".progressdiv").getAttribute("data-percent")
      );
      var offsetData = parseInt(
        document.querySelector(".progressdiv").getAttribute("offuse-data")
      );
      var usedData = percent + offsetData;
      var all = (totalProgress * progress) / total;
      var act = totalProgress - all;
      path[i].querySelector(".online").style["stroke-dashoffset"] = act;

      var offdata = (totalProgress * usedData) / total;
      var offdatas = totalProgress - offdata;
      path[i].querySelector(".offline").style["stroke-dashoffset"] = offdatas;

      path[i].querySelector(".white1").style["stroke-dashoffset"] = act + 5;

     
    }
  };
}
