const btnContainer = document.getElementById("btn-container");

const allButton = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await res.json();
  console.log(data.data);
  const cards = data.data;
  cards.forEach((card) => {
    //console.log(card)
    const newButton = document.createElement("button");
    newButton.className = "btn btn-ghost bg-slate-700 text-white";
    newButton.innerText = card.category;
    newButton.addEventListener("click", () => newAllButton(card.category_id));
    btnContainer.appendChild(newButton);
  });
};
const newAllButton=(categoryID)=>{
  console.log(categoryID)
}
allButton();
