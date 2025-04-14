// Import the components
import Input from "./Input.jsx";
import OutputMsg from "./OutputMsg.jsx";
import Results from "./Results.jsx";

// Import react functions
import { useState } from "react";

// Import API path
import apiPath from "./assets/apiPath.js"

function App() {
  // Define setters and getters
  const [data, setData] = useState([]); // Data obtained from the API
  const [status, setStatus] = useState("start"); // Status of the search (either start - when the user opens the page, or search - when the search is performed, or found, not found, empty)
  const [input, setInput] = useState(""); // Input provided by the user

  // Define a function performing the search
  async function handleSearch(inputValue, isAdvanced) {
    // Specify the input
    setInput(inputValue);

    // Check the input
    if (inputValue === "") {
      setStatus("empty");
    } else {
      setStatus("search"); // Change the status to search

      // Specify query parameters
      let queryParams = "";
      if (isAdvanced) { // Specify adavanced search if required
        queryParams = queryParams + "?advanced=1"
      }

      // Define the request query
      let reqText;
      if (isNaN(inputValue)) { // If the input is not a number, assume it is a name and encode it
        reqText = `${apiPath}/name/${encodeURI(inputValue)}${queryParams}`;
      } else { // Otherwise assume it represents the IDT
        reqText = `${apiPath}/IDT/${inputValue}${queryParams}`;
      };

      // Get the response
      const response = await fetch(reqText);
      if (!response.ok) { // If the request was unsuccessfull, indicate that there was an error
        setStatus("error");
      } else {
        const responseJSON = await response.json() // Parse the response to json
        setData(responseJSON); // Set the data equal to the json response
        if (responseJSON.length === 0) {
          setStatus("not found");
        } else {
          setStatus("found");
        }
      }
    }
  }

  return (
    <>
      <h1>Taneční databáze</h1>
      <Input searchHandler={handleSearch} />
      <OutputMsg input={input} status={status} dataLength={data.length} />
      <Results data={data} />
    </>
  )
}

export default App;
