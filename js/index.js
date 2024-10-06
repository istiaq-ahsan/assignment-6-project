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

//-------------------------------------------3rd
//create loadCatagoryCard

const loadCategoryCards = async (categoryWise) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryWise}`)
    const data = await response.json();
    displayAllPets(data.data);
}

// ------------------------------------------------------------------------------------
// const cardDemo = {
//     {
//         "petId": 1,
//         "breed": "Golden Retriever",
//         "category": "Dog",
//         "date_of_birth": "2023-01-15",
//         "price": 1200,
//         "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
//         "gender": "Male",
//         "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
//         "vaccinated_status": "Fully",
//         "pet_name": "Sunny"
//     }
// }------------------------------------------------------------------------------------

//-------------------------------------------2nd, 4th
//displayAllPets

const displayAllPets = (pets) => {
    const allPetsContainer = document.getElementById("allPetsContainer");
    allPetsContainer.innerHTML = "";

    if (pets.length == 0) {
        allPetsContainer.classList.remove("grid")
        allPetsContainer.innerHTML = `
        <div class="min-h-[360px] w-[850px] flex flex-col gap-5 text-center items-center justify-center space-y-3 py-24 bg-gray-200 rounded-xl">
        <img src="./images/error.webp" alt="" />
        <h1 class="text-2xl font-bold">No Information Available</h1>
        <p class="w-[600px] mx-auto">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
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

        //create card
        const card = document.createElement("div");
        card.classList = "card border"
        card.innerHTML = `
        <figure class="px-5 pt-5">
                            <img src=${pet.image}
                                alt="" class="rounded-xl" />
                        </figure>
                        <div class="card-body">
                            <h2 class="text-xl font-bold">${pet.pet_name}</h2>
                            <p><i class="fa-solid fa-border-all"></i> ${pet.breed}</p>
                            <p><i class="fa-regular fa-calendar"></i> ${pet.date_of_birth}</p>
                            <p><i class="fa-solid fa-mercury"></i> ${pet.gender}</p>
                            <p><i class="fa-solid fa-dollar-sign"></i> ${pet.price}</p>
                            
                            <hr />

                            <div class="flex justify-around text-center">
                                <button class="btn bg-white border-gray-200"><i
                                        class="fa-regular fa-thumbs-up"></i></button>
                                <button class="btn bg-white border-gray-200">Adopt</button>
                                <button class="btn bg-white border-gray-200">Details</button>
                            </div>
                        </div>
        `;

        allPetsContainer.append(card);
    })
}

//---------------------------------------2nd
//create displayCatagories

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");

    categories.forEach((item) => {
        console.log(item);

        //create btn
        const buttonContainer = document.createElement("div");

        buttonContainer.innerHTML = `
        <button onclick="loadCategoryCards('${item.category.toLowerCase()}')" class="btn bg-white border-gray-300 lg:w-[260px] lg:h-[70px]">
        <img src=${item.category_icon} alt="" /> ${item.category}
        </button>
        `

        //append
        categoryContainer.append(buttonContainer);
    });
}

loadAllCategories();
loadALLCards();