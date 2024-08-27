const container = document.querySelector(".container");
container.setAttribute("style", "width: 100%;")
for (let i = 0; i < 140; i++) {
  let column = document.createElement("div");
  column.classList.add("column");
  column.setAttribute("style", "display:flex;");
  container.appendChild(column);
  for (let j = 0; j < 140; j++) {
    let row = document.createElement("div");
    row.classList.add("row");
    row.setAttribute("style", "flex: 1; aspect-ratio : 1 / 1; background-color: white;");
    column.appendChild(row);
  }
}
let isPointerDown = false;
let isErasing = false;
let selectedColor = "hsl(0, 100%, 50%)"; // Default color (Red)

const rows = document.querySelectorAll(".row");
const colorButtons = document.querySelectorAll(".color-btn");

// Initialize each row's original color
rows.forEach((row) => {
  row.dataset.originalColor = "hsl(0, 0%, 100%)"; // White as the original color
});

// Handle pointer down (for mouse and touch devices)
document.addEventListener("pointerdown", (event) => {
  isPointerDown = true;

  // Check if the right mouse button is pressed for erasing
  isErasing = event.button === 2;
});

// Handle pointer up (reset flags)
document.addEventListener("pointerup", () => {
  isPointerDown = false;
  isErasing = false;
});

// Prevent the default context menu on right-click (for desktops)
document.addEventListener("contextmenu", (event) => event.preventDefault());

// Handle color selection from the palette
colorButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedColor = btn.dataset.color;
  });
});

// Add a pointer move event to color rows as you drag
rows.forEach((row) => {
  row.addEventListener("pointermove", () => {
    if (isPointerDown) {
      if (isErasing) {
        row.style.backgroundColor = row.dataset.originalColor; // Restore the original color
      } else {
        row.style.backgroundColor = selectedColor; // Apply the selected color
      }
    }
  });
  
  // Ensure the initial click also colors the tile
  row.addEventListener("pointerdown", () => {
    if (isErasing) {
      row.style.backgroundColor = row.dataset.originalColor; // Restore the original color
    } else {
      row.style.backgroundColor = selectedColor; // Apply the selected color
    }
  });
});