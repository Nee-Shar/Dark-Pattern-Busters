function detectDarkPatterns() {
  const spanElements = document.querySelectorAll("span");

  // Extract text content from each span element, remove empty spaces, and merge multiple spaces
  const spanTexts = Array.from(spanElements).map((span) =>
    span.innerText.replace(/\s+/g, " ").replace(/\n/g, "").trim()
  );

  console.log("All Spans:", spanTexts);

  // Prepare the data to be sent to the FastAPI backend
  const postData = {
    texts: spanTexts,
  };

  // Initialize darkPatternVariables to zero
  const darkPatternVariables = {
    scarcity: 0,
    forced: 0,
    urgency: 0,
    proof: 0,
    sneaking: 0,
    obstruction: 0,
    misdirection: 0,
    subtrap: 0,
  };

  // Make a POST request to the FastAPI backend
  fetch("http://localhost:8000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Predicted Categories:", data.predicted_categories);
      const predictedCategories = data.predicted_categories;
      // Assuming you have a function to handle the highlighting based on the predicted categories
      //handleHighlighting(data.predicted_categories, darkPatternVariables);
      for (let i = 0; i < spanTexts.length; i++) {
        // console.log(spanTexts[i], " -> ", predictedCategories[i], i);
        // Check if spanTexts[i] is defined and not empty
        if (!spanTexts[i] || spanTexts[i].length === 0) {
          continue;
        }

        if (spanTexts[i].innerText === "/" || spanTexts[i].length < 5) {
          continue;
        }
        if (predictedCategories[i] === "undefined") console.log("undefined");
        if (predictedCategories[i] !== "Not Dark Pattern") {
          // spanElements[i].style.border = "2px solid red";
          spanElements[i].style.backgroundColor = "aqua";
          console.log(spanTexts[i], " -> ", predictedCategories[i]);
        }

        if (predictedCategories[i] === "Scarcity")
          darkPatternVariables.scarcity++;

        if (predictedCategories[i] === "Forced Action")
          darkPatternVariables.forced++;

        if (predictedCategories[i] === "Urgency")
          darkPatternVariables.urgency++;

        if (predictedCategories[i] === "Social Proof")
          darkPatternVariables.proof++;

        if (predictedCategories[i] === "Sneaking")
          darkPatternVariables.sneaking++;

        if (predictedCategories[i] === "Obstruction")
          darkPatternVariables.obstruction++;

        if (predictedCategories[i] === "Misdirection")
          darkPatternVariables.misdirection++;

        if (predictedCategories[i] === "Subscription trap")
          darkPatternVariables.subtrap++;
      }

      // Send a message to the extension background script with the variables
      // chrome.runtime.sendMessage({ darkPatternVariables });
      // console.log("Message sent from content script");
      // console.log(darkPatternVariables);
      // setTimeout(() => {
      //     chrome.runtime.sendMessage({ darkPatternVariables });
      //   }, 10000); // 1000 milliseconds delay (adjust as needed)

      //   const port = chrome.runtime.connect({ name: "content-script" });
      //   port.postMessage({ darkPatternVariables });
      chrome.runtime.sendMessage({ darkPatternVariables });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  // No need to send a message here, as it's already sent inside the fetch's then block
}

function handleHighlighting(predictedCategories, darkPatternVariables) {
  const spanElements = document.querySelectorAll("span");

  // Extract text content from each span element, remove empty spaces, and merge multiple spaces
  const spanTexts = Array.from(spanElements).map((span) =>
    span.innerText.replace(/\s+/g, " ").replace(/\n/g, "").trim()
  );

  for (let i = 0; i < spanTexts.length; i++) {
    console.log(spanTexts[i], " -> ", predictedCategories[i], i);
    // Check if spanTexts[i] is defined and not empty
    if (!spanTexts[i] || spanTexts[i].length === 0) {
      continue;
    }

    if (spanTexts[i].innerText === "/" || spanTexts[i].length < 5) {
      continue;
    }
    if (predictedCategories[i] === "undefined") console.log("undefined");
    if (predictedCategories[i] !== "Not Dark Pattern") {
      // spanElements[i].style.border = "2px solid red";
      spanElements[i].style.backgroundColor = "aqua";
      console.log(spanTexts[i], " -> ", predictedCategories[i]);
    }

    if (predictedCategories[i] === "Scarcity") darkPatternVariables.scarcity++;

    if (predictedCategories[i] === "Forced Action")
      darkPatternVariables.forced++;

    if (predictedCategories[i] === "Urgency") darkPatternVariables.urgency++;

    if (predictedCategories[i] === "Social Proof") darkPatternVariables.proof++;

    if (predictedCategories[i] === "Sneaking") darkPatternVariables.sneaking++;

    if (predictedCategories[i] === "Obstruction")
      darkPatternVariables.obstruction++;

    if (predictedCategories[i] === "Misdirection")
      darkPatternVariables.misdirection++;

    if (predictedCategories[i] === "Subscription trap")
      darkPatternVariables.subtrap++;
  }
}

// Initiate the dark pattern detection when the content script is executed
detectDarkPatterns();
