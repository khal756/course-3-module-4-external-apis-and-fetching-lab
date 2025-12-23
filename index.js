// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";
document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#state-input");
  const button = document.querySelector("#fetch-alerts");
  const alertsDisplay = document.querySelector("#alerts-display");
  const errorDiv = document.querySelector("#error-message");

  errorDiv.classList.add("hidden");

  async function fetchWeatherAlerts(state) {
    alertsDisplay.innerHTML = "";
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");

    try {
      const response = await fetch(`https://api.weather.gov/alerts/active?area=${state}`);
      if (!response.ok) {
        throw new Error("Failed to fetch alerts");
      }
      const data = await response.json();

      // Add the summary line first
      const summary = document.createElement("div");
      summary.textContent = `Weather Alerts: ${data.features.length}`;
      alertsDisplay.appendChild(summary);

      if (data.features.length === 0) {
        const noAlerts = document.createElement("div");
        noAlerts.textContent = "No active alerts for this state.";
        alertsDisplay.appendChild(noAlerts);
      } else {
        data.features.forEach((alert) => {
          const div = document.createElement("div");
          div.textContent = alert.properties.headline;
          alertsDisplay.appendChild(div);
        });
      }
    } catch (err) {
      errorDiv.textContent = err.message;
      errorDiv.classList.remove("hidden");
    }
  }

  button.addEventListener("click", () => {
    fetchWeatherAlerts(input.value.trim());
    input.value = ""; // clear input after click
  });
});

