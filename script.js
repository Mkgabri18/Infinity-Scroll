const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let totalImages = 0
let photosArray = []
let initialLoad = true

// Usplash API fetch
const count = 10
const apiKey = 'oY-8K1nkbhhdR7pvcBwhNagn5FDbl6KqRwkbobiGEPo'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Check if image is loaded
function imageLoaded () {
    imagesLoaded++
    if(imagesLoaded === totalImages) {
        ready = true
        loader.hidden = true
        console.log('ready =', ready)
    }
}

// Helper func to set attribute DOM element
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create element for links & Photos
function displayPhotos() {
    imagesLoaded = 0
    totalImages = photosArray.length
    console.log('total images', totalImages)
    // Run ech onj on photosArray
    photosArray.forEach((photo) => {
        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // Trigger when each photo is load
        img.addEventListener('load', imageLoaded)
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}

// GEt photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos() 
    } catch (error) {
        // Catch Error
    }
}

// Check if scrolling bottom page to load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos()
    }
        
})

getPhotos();
