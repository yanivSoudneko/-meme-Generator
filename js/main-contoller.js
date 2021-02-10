'use strict';
var gElCanvas;
var gCtx;
var gCurrImg;
var gColor;
var gLineColor;


function init() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
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
}


function getCurrImg() {
    return gCurrImg
}


function onEditMemeText(elTextInput) {
    const txt = elTextInput.value;
    updateMemeTxt(0, txt);
    drawImgFromlocal();
}

function onEditMemeTextDown(elTextInput) {
    const txt = elTextInput.value;
    updateMemeTxt(0, txt);
    drawImgFromlocal();
}

function drawImgFromlocal() {
    const img = new Image()
    img.src = getImgSrc();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        const txt = getImgTxt();
        addMemeText(txt, 300, 50)
        addMemeText(txt, 300, 700)

    }
}

function renderCanvas() {
    gCtx.fillStyle = "#ffcccc"
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function addMemeText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = gLineColor
    gCtx.fillStyle = gColor
    gCtx.font = '40px impact'
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}


//For when I want to add download
function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-canvas.jpg'
}