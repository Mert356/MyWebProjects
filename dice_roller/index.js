let number = parseInt(document.getElementById("input").value);
document.getElementById("roll").onclick = function () {
  document.getElementById("images").innerHTML = "";
  number = parseInt(document.getElementById("input").value);
  for (let i = 0; i < number; i++) {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    let image = document.createElement("img");
    image.src = "dice_images/" + randomNumber + ".png";
    document.getElementById("images").appendChild(image);
  }
};
