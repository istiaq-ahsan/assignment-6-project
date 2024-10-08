//create loadCategories ---------------global

const loadAllCategories = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/peddy/categories")
    const data = await response.json();
    displayCategories(data.categories);

}

//create loadALLCards--------------------------------global

const loadALLCards = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/peddy/pets")
    const data = await response.json();
    displayAllPets(data.pets);
}

//global for sort button 

const sortFunction = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/peddy/pets")
    const data = await response.json();
    sortPets(data.pets);
}


//spinner global--------------call from handle category click

const handleSpinner = (show) => {
    const spinner = document.getElementById("spinner");
    if (show) {
        spinner.style.display = "block";
    }
    else {
        spinner.style.display = "none";
    }
}

//call from the category button then from here go to load category

const handleCategoryClick = (categoryWise, button) => {

    handleSpinner(true);

    const allPetsContainer = document.getElementById("allPetsContainer");
    allPetsContainer.innerHTML = "";

    //delay
    setTimeout(() => {
        loadCategoryCards(categoryWise);
        handleSpinner(false);
    }, 2000);

    updateButtonStyles(button);
}

// create update button style function ----------------------

const updateButtonStyles = (activeButton) => {
    const buttons = document.querySelectorAll("#categories button");

    // Remove active styles from all buttons
    buttons.forEach(button => {
        button.classList.remove('bg-white');
        button.classList.remove('btn-neutral', 'rounded-full');

    });

    // Add active styles to the currently clicked button
    if (activeButton) {
        activeButton.classList.add('btn-neutral', 'rounded-full');
    }
};

//-----------------------------------for show category wise pet call from handle category click
//create loadCategoryCard

const loadCategoryCards = async (categoryWise) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryWise}`)
    const data = await response.json();
    displayAllPets(data.data);
}

//call from card and then go to create modal

const modalPetDetails = async (petId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    const data = await response.json();
    petDetails(data.petData);
}


//create displayAllPets-------------------------------------from 2nd global

const displayAllPets = (pets) => {
    const allPetsContainer = document.getElementById("allPetsContainer");

    allPetsContainer.innerHTML = "";

    if (pets.length == 0) {
        allPetsContainer.classList.remove("grid")
        allPetsContainer.innerHTML = `
        <div class="min-h-[360px] lg:w-[850px] flex flex-col gap-5 text-center items-center justify-center space-y-3 py-24 bg-gray-200 rounded-xl">
        <img src="./images/error.webp" alt="" />
        <h1 class="text-2xl font-bold">No Information Available</h1>
        <p class="lg:w-[600px] mx-auto">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.</p>
        </div>
        `;
        return;
    }
    else {
        allPetsContainer.classList.add("grid")
    }

    pets.forEach((pet) => {
        // console.log(pet);

        const name = pet.pet_name ? pet.pet_name : "Not provided";
        const breed = pet.breed ? pet.breed : "Unknown Breed";
        const birthDate = pet.date_of_birth ? pet.date_of_birth : "Not Available";
        const gender = pet.gender ? pet.gender : " Not specified";
        const price = pet.price ? pet.price : "Not Listed";

        //create card-------------

        const card = document.createElement("div");
        card.classList = "card border border-gray-300"
        card.innerHTML = `
        <figure class="px-5 pt-5">
                            <img class="w-full object-cover rounded-xl" src=${pet.image}
                                alt="" class="rounded-xl" />
                        </figure>
                        <div class="card-body">
                            <h2 class="text-xl font-bold">${pet.pet_name}</h2>
                            <p><i class="fa-solid fa-border-all"></i> Breed: ${breed}</p>
                            <p><i class="fa-regular fa-calendar"></i> Birth: ${birthDate}</p>
                            <p><i class="fa-solid fa-mercury"></i> Gender: ${gender}</p>
                            <p><i class="fa-solid fa-dollar-sign"></i> Price: ${price} $</p>
                            
                            <hr />

                            <div class="flex justify-center text-center gap-5">
                                <button id="addToList" onclick="shiftRight('${pet.image}')" class="btn bg-white border-gray-300"><i
                                        class="fa-regular fa-thumbs-up"></i></button>
                                <button onclick="modalCountdown(this)" class="btn bg-white border-gray-300">Adopt</button>
                                <button onclick="modalPetDetails(${pet.petId})" class="btn bg-white border-gray-300">Details</button>
                            </div>
                        </div>
        `;

        allPetsContainer.append(card);
    })
}

//right Side Shift --------------------------------call from card for show right side

const shiftRight = (petImage) => {
    const shiftRightContainer = document.getElementById("shiftRightContainer");

    const div = document.createElement("div");
    div.classList = "m-2"
    div.innerHTML = `<img class="p-2 border border-gray-300 rounded-xl" src=${petImage}>`

    shiftRightContainer.append(div);

}


//---------------------------------------from 1st global 
//create displayCatagories

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");

    categories.forEach((item) => {
        // console.log(item);

        //create btn
        const buttonContainer = document.createElement("div");


        buttonContainer.innerHTML = `
        <button onclick="handleCategoryClick('${item.category.toLowerCase()}',this)" id="buttonAll" 
        class="btn bg-white border-gray-300 w-[150px] h-[50px] md:w-[220px] md:h-[70px] lg:w-[260px] lg:h-[70px]">
        <img class="w-10 h-10" src=${item.category_icon} alt="" /> ${item.category}
        </button>
        `

        //append
        categoryContainer.append(buttonContainer);
    });
}

//sort button code--------------------

const sortPets = (pets) => {
    const sort = pets.sort((a, b) => (b.price - a.price));
    displayAllPets(sort);
}
const sortButton = document.getElementById("sort").addEventListener('click', function () {
    sortFunction();
    sorted();
})

const sorted = () => {
    const buttons = document.querySelectorAll("#categories button");

    // Remove active styles from all buttons
    buttons.forEach(button => {

        button.classList.remove('btn-neutral', 'rounded-full');

    });

};

//adopt modal countdown----------------------

const modalCountdown = (button) => {
    const countdown = document.getElementById("modal-countdown");


    const div = document.createElement("div");
    div.innerHTML = `
    
<dialog id="my_modal_2" class="modal flex justify-center items-center">
  <div class="modal-box space-y-3 text-center">
  <img class="mx-auto" src="https://img.icons8.com/?size=100&id=q6BlPrJZmxHV&format=png&color=000000" alt="" />
    <h3 class="text-2xl font-bold">Congrates</h3>
    <p class="text-xl">Adoption Process is Start For your Pet</p>
    <p id="countdown-display" class="py-4 font-bold text-5xl"></p>
  </div>
  <form method="dialog">
    
  </form>
</dialog>
    `
    countdown.append(div);

    my_modal_2.showModal();

    let countStart = 3;
    const countDisplay = document.getElementById("countdown-display");
    countDisplay.innerHTML = `${countStart}`;

    const interval = setInterval(() => {

        if (countStart > 1) {
            countStart--;
            countDisplay.innerHTML = `${countStart}`;
        }
        else {
            clearInterval(interval);
            countdown.innerHTML = "";
            button.innerHTML = "Adopted";
            button.disabled = "true";
        }
    }, 1000);


}


//petDetails modal----------------------------------again call from card details

const petDetails = (details) => {

    const { breed, gender, vaccinated_status, date_of_birth, price, image, pet_name, pet_details } = details;

    const name = pet_name ? pet_name : "Not provided";
    const petBreed = breed ? breed : "Unknown Breed";
    const petBirthDate = date_of_birth ? date_of_birth : "Not Available";
    const petGender = gender ? gender : " Not specified";
    const petPrice = price ? price : "Not Listed";
    const vaccine = vaccinated_status ? vaccinated_status : "Not provided";
    const description = pet_details ? pet_details : "Description unavailable";

    const modalContainer = document.getElementById("modal-container");

    modalContainer.innerHTML = "";

    const div = document.createElement("div");
    div.innerHTML = `
    <dialog id="my_modal_1" class="modal">
        <div class="modal-box">
            
        <div>
            <img class="object-cover w-full rounded-xl" src=${image} alt="" />
        </div>
        <div class="my-5">
            <h2 class="text-xl font-bold">${pet_name}</h2>
                    <div class="grid grid-cols-2">
                            <p><i class="fa-solid fa-border-all"></i> Breed: ${petBreed}</p>
                            <p><i class="fa-solid fa-mercury"></i> Gender: ${petGender}</p>
                            <p><i class="fa-solid fa-mercury"></i> Vaccinated Status: ${vaccine}</p>
                            <p><i class="fa-regular fa-calendar"></i> Birth: ${petBirthDate}</p>
                            <p><i class="fa-solid fa-dollar-sign"></i> Price: ${petPrice} $</p>
                    </div>        
        </div>
        <hr />
        <div class="my-5">
        <h2 class="text-xl font-bold">Details Information</h2>
        <p>${pet_details}</p>
        </div>
            <div class="modal-action justify-center">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn w-80 lg:w-96">Cancel</button>
                </form>
            </div>
        </div>
    </dialog>
    `

    modalContainer.append(div);

    my_modal_1.showModal()
}

loadAllCategories();
loadALLCards();

