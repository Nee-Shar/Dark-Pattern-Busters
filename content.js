// Get all span elements on the page
const spanElements = document.querySelectorAll("span");

// Extract text content from each span element, remove empty spaces, and merge multiple spaces
const spanTexts = Array.from(spanElements).map((span) =>
  span.innerText.replace(/ +/g, " ").trim()
);

// Log all spans before sending to the FastAPI backend
console.log("All Spans:", spanTexts);

// Prepare the data to be sent to the FastAPI backend
const postData = {
  texts: spanTexts,
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
  })
  .catch((error) => {
    console.error("Error:", error);
  });
