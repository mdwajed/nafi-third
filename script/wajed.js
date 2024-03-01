const loadPhone = async (searchText) => {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    );
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones);
  };
  
  const displayPhone = (phones) => {
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.innerText = "";
    const shadowallContainer = document.getElementById("showall-container");
    if (phones.length > 12) {
      shadowallContainer.classList.remove("hidden");
    } else {
      shadowallContainer.classList.add("hidden");
    }
    phones = phones.slice(0, 12);
    phones.forEach((phone) => {
      //console.log(phone);
      const div = document.createElement("div");
      div.classList = "card bg-base-100 shadow-xl";
      div.innerHTML = `
      <figure><img src="${phone.image}" alt="Shoes" /></figure>
      <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
          <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
      </div>
      `;
      phoneContainer.appendChild(div);
    });
    toggleLoadingSpinner(false);
  };
  const handleSearch = () => {
    toggleLoadingSpinner(true);
    const search = document.getElementById("some-thing");
    searchText = search.value;
    search.value = "";
    //console.log(searchText);
    loadPhone(searchText);
  };
  // const handleSearch2 = () => {
  //   toggleLoadingSpinner(true);
  //   const search = document.getElementById("search-field");
  //   searchText = search.value;
  //   search.value = "";
  //   //console.log(searchText);
  //   loadPhone(searchText);
  // };
  const toggleLoadingSpinner = (isloading) => {
    const loadingSpinner = document.getElementById("load-spinner");
    if (isloading) {
      loadingSpinner.classList.remove("hidden");
    } else {
      loadingSpinner.classList.add("hidden");
    }
  };
  const showDetails = async (id) => {
    //console.log("wajed", id);
    const res = await fetch(
      ` https://openapi.programming-hero.com/api/phone/${id}`
    );
    const data = await res.json();
    //console.log(data);
    const phone = data.data;
    showPhoneDetails(phone);
  };
  const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById("show-phone-details");
    phoneName.innerText = phone.name;
    const showDetailsContainer = document.getElementById(
      "show-details-container"
    );
    showDetailsContainer.innerHTML = `
    <img src="${phone.image}" alt="" />
    <p><span>Brand : </span>${phone.brand}</p>
    <p><span>Storage : </span>${phone.mainFeatures.storage}</p>
    <p><span>DisplaySize : </span>${phone.mainFeatures.displaySize}</p>
    <p><span>Memory : </span>${phone.mainFeatures.memory}</p>
    <p><span>Chipset : </span>${phone.mainFeatures.chipSet}</p>
    <p><span>Bluetooth : </span>${phone.others.Bluetooth}</p>
    <p><span>GPS : </span>${phone.others.GPS}</p>
    <p><span>ReleaseDate : </span>${phone.releaseDate}</p>
  `;
    show_detail_modal.showModal();
  };
  loadPhone();
  