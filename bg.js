const body = document.querySelector("body");

const IMG_NUMBER = 5;

function handleImage(){

}

function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber +1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
    image.addEventListener("loadend", handleImage);

}

function getRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER ) ; 
    return number;

}
function init(){
    const randdomNumber = getRandom();
    paintImage(randdomNumber);
}

init();