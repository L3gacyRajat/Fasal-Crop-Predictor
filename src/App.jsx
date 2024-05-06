import React, { useState } from "react";

function App() {
  const [nitrogen, setNitrogen] = useState("");
  const [phosporus, setPhosporus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [ph, setPh] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("nitrogen", nitrogen);
    formData.append("phosporus", phosporus);
    formData.append("potassium", potassium);
    formData.append("temperature", temperature);
    formData.append("humidity", humidity);
    formData.append("ph", ph);
    formData.append("rainfall", rainfall);

    fetch("http://127.0.0.1:5000", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => setResult(result));
  };

  return (
    <div>
      <h1>Crop Prediction</h1>
      <form onSubmit={handleSubmit}>
        <label>Nitrogen:</label>
        <input
          type="number"
          value={nitrogen}
          onChange={(e) => setNitrogen(e.target.value)}
        />
        <br />
        <label>Phosporus:</label>
        <input
          type="number"
          value={phosporus}
          onChange={(e) => setPhosporus(e.target.value)}
        />
        <br />
        <label>Potassium:</label>
        <input
          type="number"
          value={potassium}
          onChange={(e) => setPotassium(e.target.value)}
        />
        <br />
        <label>Temperature:</label>
        <input
          type="number"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />
        <br />
        <label>Humidity:</label>
        <input
          type="number"
          value={humidity}
          onChange={(e) => setHumidity(e.target.value)}
        />
        <br />
        <label>pH:</label>
        <input
          type="number"
          value={ph}
          onChange={(e) => setPh(e.target.value)}
        />
        <br />
        <label>Rainfall:</label>
        <input
          type="number"
          value={rainfall}
          onChange={(e) => setRainfall(e.target.value)}
        />
        <br />
        <button type="submit">Predict</button>
      </form>
      {result && <p>{result.result}</p>}
    </div>
  );
}

export default App;
