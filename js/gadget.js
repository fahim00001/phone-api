const loadSearch = () => {
    const searchField = document.getElementById('search-field');
    //just for clear phone details
    const phoneFeature = document.getElementById('phone-details');
    phoneFeature.textContent = '';
    const searchText = searchField.value;
    searchField.value = '';
    if (searchText == '') {
        console.log('oy');
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResults(data.data.slice(0, 20)))
    }
}

const displaySearchResults = phones => {
    console.log(phones);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (phones.length === 0) {
        console.log('sorry we have no phone');
    }
    else {
        phones.forEach(phone => {
            const div = document.createElement('div');
            const phoneIdName = phone.slug;
            console.log(phoneIdName);
            div.classList.add('col');
            div.innerHTML = `
        <div class="card">
            <img  src="${phone.image}" class="card-img-top w-50 mx-auto mt-2" alt="...">
           <div class="card-body ">
               <h3 class="card-title text-center my-3">${phone.phone_name}</h3>
               <h2 class="text-center">${phone.brand}</h2>
           </div>
           <div class="mx-auto pb-3 ">
               <button onclick="loadPhoneDetails('${phoneIdName}')" type="button" class="btn btn-primary px-3 fs-5 ">Details</button>
           </div>
         </div>
           `
            searchResult.appendChild(div)
        });
    }
}
const loadPhoneDetails = phoneId => {
    //console.log(phoneId);
    const url = ` https://openapi.programming-hero.com/api/phone/${phoneId}`
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayloadDetails(data.data))
}

const displayloadDetails = phone => {
    const phoneFeature = document.getElementById('phone-details');
    phoneFeature.textContent = '';



    const div = document.createElement('div');
    div.classList.add('row', 'container', 'mx-auto', 'gx-5', 'my-5')
    div.innerHTML = `
    <div class="col-lg-5">
        <div class=" mx-auto ">
        <img  src="${phone.image}" class=" w-75 mx-3  mt-5" alt="...">
        <h6 class="text-center my-3">${phone.releaseDate}</h6>
        </div>
    </div>
    <div class="col-lg-7">
        <div class="p-3  border bg-light">
        <p class="text-center fw-bold my-1">Phone Feature</p>
         <h5 class="card-title">Name : ${phone.name}</h5>
         <p class="card-text">Brand : ${phone.brand}</p>
         <p class="card-text">ReleaseDate : ${phone.releaseDate}</p>
         <p class="card-text">DisplaySize : ${phone.mainFeatures.displaySize}</p>
         <p class="card-text">ChipSet : ${phone.mainFeatures.chipSet}</p>
        <p class="card-text">Storage : ${phone.mainFeatures.storage}</p>
         <p class="card-text">Memory : ${phone.mainFeatures.memory}</p>
         <p class="card-text">Sensors : ${phone.mainFeatures.sensors}</p>
         if()
         <p class="card-text">WLAN : ${phone?.others?.WLAN}</p>
        <p class="card-text">Bluetooth : ${phone?.others?.Bluetooth}</p>
         <p class="card-text">GPS : ${phone?.others?.GPS}</p>

        </div>
    </div>
  
        `
    phoneFeature.appendChild(div);
}