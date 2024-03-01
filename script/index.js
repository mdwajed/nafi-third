const btnContainer = document.getElementById("btn-container");
const cardContainer = document.getElementById("card-container");
const errorElement = document.getElementById("error-element");
let selectedCategory = 1000;
const allButton = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await res.json();
  const cards = data.data;
  cards.forEach((card) => {
    //console.log(card)
    const newButton = document.createElement("button");
    newButton.className = "btn btn-category btn-ghost bg-slate-700 text-white";
    newButton.innerText = card.category;
    newButton.addEventListener("click", () => {
      newAllButton(card.category_id);
      const allBtns = document.getElementsByClassName("btn-category");
      for (const allBtn of allBtns) {
        allBtn.classList.remove("bg-red-600");
      }
      newButton.classList.add("bg-red-600");
    });
    btnContainer.appendChild(newButton);
  });
};
const newAllButton = async (categoryID) => {
  selectedCategory = categoryID;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryID}`
  );
  const data = await res.json();
  //console.log(data)
  const cards = data.data;
  if (cards.length === 0) {
    errorElement.classList.remove("hidden");
  } else {
    errorElement.classList.add("hidden");
  }

  cardContainer.innerHTML = "";
  cards.forEach((video) => {
    let verifiedBadge = "";
    if (video.authors[0].verified) {
      verifiedBadge = `<img class="w-6 h-6" src="group.png" alt=""/>`;
    }
    console.log(video);
    const newCard = document.createElement("div");
    newCard.innerHTML = ` 
  <div class="card w-full bg-base-100 shadow-xl">
    <figure class="overflow-hidden h-72">
      <img
        class="w-full h-full"
        src="${video.thumbnail}"
        alt="Shoes"
        class="rounded-xl"
      />
      <h6 class="absolute bottom-[45%] right-12 bg-slate-800 rounded-sm text-white px-8 py-1">0 hr</h6>
    </figure>
    <div class="card-body">
      <div class="flex space-x-4 justify-start items-start">
        <div>
          <img
            class="w-12 h-12 rounded-full"
            src="${video.authors[0].profile_picture}"
            alt=""
          />
        </div>
        <h2>${video.title}</h2>
      </div>
      <div class="flex mt-2 ml-16">
        <p>${video.authors[0].profile_name} </p>
       ${verifiedBadge}
      </div>
      <p class="mt-2 ml-16">${video.others.views}</p>
    </div>
  </div>
</div>`;
    cardContainer.appendChild(newCard);
  });
};
allButton();
newAllButton();
