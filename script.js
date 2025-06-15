const tileContainer = document.getElementById("tile-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const resultText = document.getElementById("result");
const instruction = document.getElementById("instruction");

const imageClasses = ["img1", "img2", "img3", "img4", "img5"];
let selected = [];

function setupTiles() {
  resultText.textContent = "";
  instruction.textContent =
    "Please click on the identical tiles to verify that you are not a robot.";
  selected = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  tileContainer.innerHTML = "";

  const allTiles = [...imageClasses];
  const duplicate = allTiles[Math.floor(Math.random() * imageClasses.length)];
  allTiles.push(duplicate);
  allTiles.sort(() => Math.random() - 0.5);

  allTiles.forEach((className, i) => {
    const img = document.createElement("img");
    img.className = className;
    img.dataset.index = i;
    img.addEventListener("click", () => handleTileClick(img, className));
    tileContainer.appendChild(img);
  });
}

function handleTileClick(tile, className) {
  if (selected.length === 2 || tile.classList.contains("selected")) return;

  tile.classList.add("selected");
  selected.push({ tile, className });

  resetBtn.style.display = "inline";

  if (selected.length === 2) verifyBtn.style.display = "inline";
}

resetBtn.onclick = setupTiles;

verifyBtn.onclick = () => {
  verifyBtn.style.display = "none";
  const [a, b] = selected;
  if (a.className === b.className) {
    resultText.textContent = "You are a human. Congratulations!";
  } else {
    resultText.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
};

window.onload = setupTiles;