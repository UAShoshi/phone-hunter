const loadPhone = async(searchText, isShowAll) =>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
  const data = await res.json()
  const phones = data.data
  // console.log(phones);
  displayPhone(phones, isShowAll)
}
const displayPhone = (phones, isShowAll) =>{
  // console.log(phones);
  // 1: set id
  const phoneContainer = document.getElementById('phone-container')
  // cleare phone container
  phoneContainer.textContent = '';
  // show all button if there are more than 12 phone
  const showAllButton = document.getElementById('show-all-button');
  if (phones.length > 12 && !isShowAll) {
    showAllButton.classList.remove('hidden');
  }
  else{
    showAllButton.classList.add('hidden');
  }
  console.log('is show All', isShowAll);
  // display only first 12 phone
  if (!isShowAll) {
    phones = phones.slice(0, 12)
  }

  phones.forEach(phone => {
    console.log(phone);
    // 2: create a div
    const phoneCard = document.createElement('div')
    phoneCard.classList = `card bg-gray-100 shadow-xl`;
    // 3: set inner html
    phoneCard.innerHTML = `
    <figure><img src="${phone.image}" alt="" /></figure>
          <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
              <button onclick = "handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
          </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading Accent
  toggleLoadingAccent(false)
}
// handle search button
const handleSearch = (isShowAll) =>{
  toggleLoadingAccent(true)
  const searchField = document.getElementById('search-field')
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);
}
// loading accent toggle
const toggleLoadingAccent = (isLoading) => {
  const loadingAccent = document.getElementById('loading-accent');
  if (isLoading) {
    loadingAccent.classList.remove('hidden')
  }
  else{
    loadingAccent.classList.add('hidden')
  }
}

// Show All button setup
const handleShowAll = () =>{
  handleSearch(true);
}

//Show Detail button setup
const handleShowDetail = async (id) =>{
console.log('click', id);
// load a single data
const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
const data = await res.json();
const phone = data.data;

showPhoneDetail(phone)
}

//show modal detail
const showPhoneDetail = (phone) =>{
  console.log(phone);

  const showDetailPhoneName = document.getElementById('show-detail-phone-name');
  showDetailPhoneName.innerText = phone.name; 

  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
  <img src="${phone.image}" alt="">
  <p><span class="font-bold">Storage:</span>${phone.mainFeatures.storage}</p>
  <p><span class="font-bold">Display Size:</span>${phone.mainFeatures.displaySize}</p>
  <p><span class="font-bold">Chipset:</span>${phone.mainFeatures.chipSet}</p>
  <p><span class="font-bold">Memory:</span>${phone.mainFeatures.memory}</p>
  <p><span class="font-bold">Slug:</span>${phone.slug}</p>
  <p><span class="font-bold">Release data:</span>${phone.releaseDate}</p>
  <p><span class="font-bold">Brand:</span>${phone.brand}</p>
  <p><span class="font-bold">GPS:</span>${phone.others.GPS}</p>
  `
  show_detail_modal.showModal()
} 



loadPhone()
console.log('waw hunting phone added');