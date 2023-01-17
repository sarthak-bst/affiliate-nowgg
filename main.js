const slider = document.getElementById("slider");

const response = await fetch("./data.json");
const data = await response.json();

renderItems(data.games);

function renderItems(data) {
  data.map((game) => {
    const container = document.createElement("div");
    container.classList.add(
      "app-card",
      "border",
      "border-light",
      "hover:border-2",
      "hover:border-white",
      "overflow-hidden",
      "relative",
      "rounded-xl",
    );

    const img = document.createElement("img");
    img.classList.add("w-full", "h-full");
    img.src = game.icon_url;
    img.alt = game.game_name;

    const content = document.createElement("div");
    content.classList.add(
      "card-content",
      "pb-4",
      "px-4",
      "absolute",
      "bottom-0",
      "flex-col",
      "flex",
      "gap-y-2.5",
      "inset-x-0",
      "items-center"
    );

    const details = document.createElement("div");
    details.classList.add("min-w-full");

    const gameName = document.createElement("span");
    gameName.classList.add("text-center", "font-bold", "text-lg", "text-white");
    gameName.textContent = game.game_name;

    const gameType = document.createElement("span");
    gameType.classList.add(
      "bg-background-10",
      "ml-2",
      "px-2",
      "py-0.5",
      "rounded-full",
      "text-center",
      "text-white",
      "text-xs"
    );
    gameType.textContent = game.type;

    details.appendChild(gameName);
    details.appendChild(gameType);

    const button = document.createElement("a");
    button.classList.add(
      "bg-primary",
      "bottom-4",
      "font-bold",
      "inset-x-4",
      "min-w-full",
      "px-6",
      "py-2.5",
      "rounded-lg",
      "text-center",
      "text-lg",
      "text-white",
      "cursor-pointer"
    );
    button.textContent = "Play Now";
    button.target = "_blank";
    button.href = game.play_url;

    content.appendChild(details);
    content.appendChild(button);

    container.appendChild(img);
    container.appendChild(content);

    slider.appendChild(container);
  });
}

// Handeling slider
const leftHandle = document.querySelector(".left-handle");
const rightHandle = document.querySelector(".right-handle");

document.addEventListener("click", (e) => {
  if (e.target.matches(".handle")) {
    onHandleClick(e.target);
  }
});

const totalChilds = slider.children.length;
const items_per_screen = parseInt(
  getComputedStyle(slider).getPropertyValue("--items-per-screen")
);
const expression = totalChilds % items_per_screen;

// if (expression !== 0) {
//   const additionalData = data.games.slice(0, expression);
//   renderItems(additionalData);
// }

function onHandleClick(handle) {
  const maxIndex = Math.ceil(slider.children.length / 6) - 1;

  const sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index")
  );

  if (sliderIndex !== 0) {
    if (handle.classList.contains("left-handle")) {
      slider.style.setProperty("--slider-index", sliderIndex - 1);
    }
  }

  if (sliderIndex !== maxIndex) {
    if (handle.classList.contains("right-handle")) {
      slider.style.setProperty("--slider-index", sliderIndex + 1);
    }
  }

  buttonState(maxIndex);
}

function buttonState(maxIndex) {
  const sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index")
  );

  if (sliderIndex === 0) {
    leftHandle.disabled = true;
  }

  if (sliderIndex > 0) {
    leftHandle.disabled = false;
  }

  if (sliderIndex === maxIndex) {
    rightHandle.disabled = true;
  }

  if (sliderIndex < maxIndex) {
    rightHandle.disabled = false;
  }
}

// Tailwind config
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: "#FF42A5",
        "hover-accent": "#ff339e",
        light: "#76797C",
        "background-10": " rgba(255, 255, 255, 0.1)",
      },
      dropShadow: {
        card: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
};
