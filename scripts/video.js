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
        console.log(item)

        const button = document.createElement('button');
        button.classList = 'btn';
        button.innerText = item.category;
        categoryContainer.classList = 'flex justify-center gap-4 py-3';
        categoryContainer.appendChild(button);
    })

}

loadCategories();