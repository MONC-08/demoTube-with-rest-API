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
        const button = document.createElement('button');
        button.classList = 'btn';
        button.innerText = item.category;
        categoryContainer.classList = 'flex justify-center gap-4 py-3';
        categoryContainer.appendChild(button);
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


// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }


const displayVideos = (videos) => {

    const videoContainer = document.getElementById('videos');

    videos.map((video) => {
        console.log(video)

        const card = document.createElement('div');
        card.classList = 'card border-2'
        card.innerHTML = `
        
        <figure class="h-[200px] relative">
            <img class="h-full w-full object-cover" src=${video.thumbnail} alt="video" />

            <span class="absolute right-2 bottom-2 bg-gray-500 text-white p-1 rounded">${video.others.posted_date} </span>
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
            </div>

        </div>
        
        `
        videoContainer.append(card);
    })
}


// global call to the loading functions
loadCategories();
loadVideos();