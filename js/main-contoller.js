'use strict';
var gElCanvas;
var gCtx;
var gCurrImg;
var gColor;
var gLineColor;
var gFont = 'Impact'
var gFontSize = 40
var gPos = { posX: 300, posY: 50 }


function init() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    var elGallery = document.querySelector('.grid-container')
    elGallery.classList.remove('hidden')
    var elMemes = document.querySelector('.canvas-container')
    elMemes.classList.add('hidden')
        // resizeCanvas()
    drawImgFromlocal()
    renderCanvas()
    renderGallery()
}


function renderGallery() {
    var imgs = getImgs()
    var strHtml = imgs.map(function(img) {
        return `
        <img src="${img.url}" class="img-${img.id}" onclick="onEditor(${img.id})"/>`
    })
    document.querySelector('.grid-container').innerHTML = strHtml.join('')
}


function getColor() {
    var elColor = document.getElementById('color').value
    gColor = elColor
}

function getOutLineColor() {
    var elLine = document.getElementById('outLine').value
    gLineColor = elLine
}


function onEditor(id) {
    var currImg = getImgById(id)
    console.log(currImg.id);
    gMeme.selectedImgId = currImg.id
    drawImgFromlocal()
    var elMemes = document.querySelector('.canvas-container')
    elMemes.classList.remove('hidden')
    var elGallery = document.querySelector('.grid-container')
    elGallery.classList.add('hidden')
}


function getCurrImg() {
    return gCurrImg
}


function onEditMemeText(inputText, idx) {
    const txt = inputText.value;
    updateMemeTxt(idx, txt);
    drawImgFromlocal();
}



function drawImgFromlocal() {
    const img = new Image()
    img.src = getImgSrc();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        const txt = getImgTxt();
        addMemeText(txt, gPos.posX, gPos.posY)
            // addMemeText(txt, 300, 700)

    }
}

function renderCanvas() {
    gCtx.fillStyle = "#ffcccc"
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function changeFont(font) {
    gFont = font
}

function biggerFont() {
    gFontSize += 5
}

function lowerFont() {
    gFontSize -= 5
}

function alignLeft() {
    gPos.posX = 50
}

function alignCenter() {
    gPos.posX = 300
}

function alignRight() {
    gPos.posX = 450
}

function addMemeText(text, ) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = gLineColor
    gCtx.fillStyle = gColor
    gCtx.font = gFontSize + 'px ' + gFont
    gCtx.textAlign = 'center'
    gCtx.fillText(text, gPos.posX, gPos.posY)
    gCtx.strokeText(text, gPos.posX, gPos.posY)
}


//For when I want to add download
function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-canvas.jpg'
}