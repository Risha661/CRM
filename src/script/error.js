export const displayErrorMessages = (errorMessage) => {
  const table = document.querySelector(".table__body");
  const errorContainer = document.createElement("div");

  errorContainer.innerHTML = "";
  errorContainer.style.display = "none";
  errorContainer.style.position = "fixed";
  errorContainer.style.top = "50%";
  errorContainer.style.left = "50%";
  errorContainer.style.transform = "translate(-50%, -50%)";
  errorContainer.style.width = "400px";
  errorContainer.style.height = "400px";
  errorContainer.style.backgroundColor = "#F2F0F9";
  errorContainer.style.flexDirection = "column";
  errorContainer.style.alignItems = "center";
  errorContainer.style.justifyContent = "center";
  errorContainer.style.zIndex = "1000";
  errorContainer.style.padding = "20px";
  errorContainer.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";

  const messageDiv = document.createElement("div");
  messageDiv.textContent = errorMessage;
  messageDiv.style.fontSize = "14px";
  messageDiv.style.fontWeight = "500";

  const closeButton = document.createElement("button");
  closeButton.innerHTML = `
  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="m2 2 20 20M2 22 22 2" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path></svg>`;

  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";
  closeButton.style.border = "none";
  closeButton.style.backgroundColor = "transparent";
  closeButton.style.cursor = "pointer";
  closeButton.style.padding = "0";
  closeButton.style.width = "auto";
  closeButton.style.height = "auto";

  closeButton.addEventListener("click", () => {
    table.removeChild(errorContainer);
  });

  errorContainer.append(closeButton);
  errorContainer.append(messageDiv);

  errorContainer.style.display = "flex";
  table.append(errorContainer);
};
