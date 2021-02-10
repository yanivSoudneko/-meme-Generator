'use strict'

var gCurrImg;
console.log(gCurrImg);
renderCanvas()

function renderCanvas() {
    var imgs = getImgs()
    var strHtml = imgs.map(function(img) {
        return `
        <img src="${img.url}" class="img-${img.id}" onclick="onEditor(${img.id})"/>`
    })
    document.querySelector('.grid-container').innerHTML = strHtml.join('')
}


function onEditor(id) {
    var currImg = getImgById(id)
    gCurrImg = currImg.id
    console.log(gCurrImg);

    return gCurrImg
}

function getCurrImg() {
    return gCurrImg
}