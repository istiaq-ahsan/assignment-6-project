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

//-------------------------------------------for show catagory wise pet
//create loadCatagoryCard

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
        console.log(pet);

        //create card-------------

        const card = document.createElement("div");
        card.classList = "card border"
        card.innerHTML = `
        <figure class="px-5 pt-5">
                            <img class="w-full object-cover rounded-xl" src=${pet.image}
                                alt="" class="rounded-xl" />
                        </figure>
                        <div class="card-body">
                            <h2 class="text-xl font-bold">${pet.pet_name}</h2>
                            <p><i class="fa-solid fa-border-all"></i> Breed: ${pet.breed}</p>
                            <p><i class="fa-regular fa-calendar"></i> Birth: ${pet.date_of_birth}</p>
                            <p><i class="fa-solid fa-mercury"></i> Gender: ${pet.gender}</p>
                            <p><i class="fa-solid fa-dollar-sign"></i> Price: ${pet.price}</p>
                            
                            <hr />

                            <div class="flex justify-around text-center gap-2">
                                <button id="addToList" onclick="shiftRight('${pet.image}')" class="btn bg-white border-gray-200"><i
                                        class="fa-regular fa-thumbs-up"></i></button>
                                <button class="btn bg-white border-gray-200">Adopt</button>
                                <button onclick="modalPetDetails(${pet.petId})" class="btn bg-white border-gray-200">Details</button>
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
    div.innerHTML = `<img src=${petImage}>`

    shiftRightContainer.append(div);

}


//---------------------------------------from 1st global 
//create displayCatagories

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");

    categories.forEach((item) => {
        console.log(item);

        //create btn
        const buttonContainer = document.createElement("div");

        buttonContainer.innerHTML = `
        <button onclick="loadCategoryCards('${item.category.toLowerCase()}')" class="btn bg-white border-gray-300 w-[150px] h-[50px] lg:w-[260px] lg:h-[70px]">
        <img class="w-10 h-10" src=${item.category_icon} alt="" /> ${item.category}
        </button>
        `

        //append
        categoryContainer.append(buttonContainer);
    });
}

//petDetails modal----------------------------------again call from card details

const petDetails = (details) => {

    const { breed, gender, vaccinated_status, date_of_birth, price, image, pet_name, pet_details } = details

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
                            <p><i class="fa-solid fa-border-all"></i> Breed: ${breed}</p>
                            <p><i class="fa-solid fa-mercury"></i> Gender: ${gender}</p>
                            <p><i class="fa-solid fa-mercury"></i> Vaccinated Status: ${vaccinated_status}</p>
                            <p><i class="fa-regular fa-calendar"></i> Birth: ${date_of_birth}</p>
                            <p><i class="fa-solid fa-dollar-sign"></i> Price: ${price}</p>
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
                    <button class="btn w-72">Cancel</button>
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