// load and display categories 
const loadCategories = async () => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/categories`)
        const data = await response.json();

        displayCategories(data.categories)
    }
    catch (error) {
        console.log("data load error");
    }
}

const displayCategories = (categories) => {

    const categoryContainer = document.getElementById('categories');

    categories.map((item) => {
        // console.log(item)
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `

        <button id="btn-${item.category_id}" class="btn category-btn" onclick="loadCategoryVideos(${item.
                category_id})">${item.category}</button>

        `
        categoryContainer.classList = 'flex justify-center gap-4 py-3';
        categoryContainer.appendChild(buttonContainer);
    })
}

// load and display videos
const loadVideos = async () => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos`);
        const data = await res.json();

        displayVideos(data.videos)
    }
    catch (error) {
        console.log("videos load error!");
    }
}

// load category wise videos
const loadCategoryVideos = async (id) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
    const data = await res.json();

    // first remove all the styles
    removeActiveClass();
    // check the active button
    const activeBtn = document.getElementById(`btn-${id}`);
    activeBtn.classList.add("active");


    displayVideos(data.category);
}

// load details
const loadDetails = async (videoId) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
    const data = await res.json();

    displayDetails(data.video)
}
// display details
const displayDetails = (video) => {
    const detailsContainer = document.getElementById('modal-content');



    detailsContainer.innerHTML = `
        <img class="w-full" src=${video.thumbnail} alt="">
        <p>${video.description}</p>
    `

    // way-1
    // document.getElementById('showModalData').click();

    // way-2
    document.getElementById('customModal').showModal();

}


const displayVideos = (videos) => {

    const videoContainer = document.getElementById('videos');
    // in the beginning make the container empty
    videoContainer.innerHTML = "";

    if (videos.length === 0) {

        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `  
            <div class="min-h-[400px] flex flex-col gap-5 justify-center items-center">
                <img src="./assets/Icon.png" alt="">
                <h2 class="font-bold">No Content available in this category.</h2>

            </div> `
        return;
    }
    else {
        videoContainer.classList.add("grid");
    }

    videos.map((video) => {
        console.log(video)

        const card = document.createElement('div');
        card.classList = 'card'
        card.innerHTML = `
        
        <figure class="h-[200px] relative">
            <img class="h-full w-full object-cover" src=${video.thumbnail} alt="video" />

            ${video.others.posted_date.length === 0 ? "" : `<span class="absolute right-2 bottom-2 bg-gray-500 text-white p-1 rounded">${getTimeString(video.others.posted_date)} </span>`}

        </figure>

        <div class="flex gap-2 py-3">
            
            <div>
                <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} alt="">
            </div>
            <div>
                <h3 class=" font-bold">${video.title}</h3>
                <div class="flex gap-2 items-center">
                    <p class="text-gray-400">${video.authors[0].profile_name}</p>

                   <p> ${video.authors[0].verified === true ? `<img class="w-4" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt="">` : ""}
                   </p>

                </div>
                <p class="text-gray-400">${video.others.views}</p>
                <button onclick ="loadDetails('${video.video_id}')" class="btn btn-sm btn-error text-white">Details</button>
            </div>

        </div>
        
        `
        videoContainer.append(card);
    })
}

// function to get the time string
function getTimeString(time) {
    const month = parseInt(time / (30 * 24 * 60 * 60)); // Approximate month
    let remainingSec = time % (30 * 24 * 60 * 60);

    const day = parseInt(remainingSec / (24 * 60 * 60));
    remainingSec %= (24 * 60 * 60);

    const hour = parseInt(remainingSec / (60 * 60));
    remainingSec %= (60 * 60);

    const minute = parseInt(remainingSec / 60);

    if (month > 0) {
        return `${month}mo ${day}d ${hour}h ${minute}m ago`;
    } else if (day > 0) {
        return `${day}d ${hour}h ${minute}m ago`;
    } else if (hour > 0) {
        return `${hour}h ${minute}m ago`;
    } else {
        return `${minute}m ago`;
    }
}

//get all buttons to remove the styles 
function removeActiveClass() {
    const buttons = document.getElementsByClassName("category-btn");
    // console.log(buttons)
    for (const btn of buttons) {
        // console.log(btn)
        btn.classList.remove("active");
    }
}

// global call to the loading functions
loadCategories();
loadVideos();