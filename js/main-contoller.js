'use strict';
var gElCanvas;
var gCtx;
var gCurrImg;
var gColor;
var gLineColor;
var gFont = 'Impact'
var gFontSize = 40
var gPos = { posX: 300, posY: 150 }
var gCurrMeme = getMeme()
var gSelectedLine = gMeme.selectedLineIdx
console.log('line', gSelectedLine);

function init() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    var elGallery = document.querySelector('.grid-container')
    elGallery.classList.remove('hidden')
    var elMemes = document.querySelector('.canvas-container')
    elMemes.classList.add('hidden')
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


function onEditMemeText(inputText, gSelectedLine) {
    const txt = inputText.value;
    updateMemeTxt(gSelectedLine, txt);
    drawImgFromlocal();
}



function drawImgFromlocal() {
    const img = new Image()
    img.src = getImgSrc();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        const txt = getImgTxt();

        console.log('y', gMeme.lines[gSelectedLine].coords[0].posY);

        addMemeText(txt, gMeme.lines[gSelectedLine].coords[0].posX, gMeme.lines[gSelectedLine].coords[0].posY)


    }
}

function renderCanvas() {
    gCtx.fillStyle = "#ffcccc"
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function changeLine() {
    gSelectedLine += 1
    if (gSelectedLine > 1) {
        gSelectedLine = 0
        console.log('gSelectedLine', gSelectedLine);
    }
    drawImgFromlocal()
}


function changeFont(font) {
    gFont = font
    console.log(gFont);
}

function biggerFont() {
    gFontSize += 5
}

function lowerFont() {
    gFontSize -= 5
}

function moveLineDown() {
    console.log(gMeme.lines[0].coords[0].posY);
    gMeme.lines[gSelectedLine].coords[0].posY += 10
    drawImgFromlocal()
}

function moveLineUp() {
    console.log(gMeme.lines[0].coords[0].posY);
    gMeme.lines[gSelectedLine].coords[0].posY -= 10
    drawImgFromlocal()
}

function moveLineRight() {
    console.log(gMeme.lines[0].coords[0].posX);
    gMeme.lines[gSelectedLine].coords[0].posX -= 10
    drawImgFromlocal()
}

function moveLineLeft() {
    console.log(gMeme.lines[0].coords[0].posY);
    gMeme.lines[gSelectedLine].coords[0].posX += 10
    drawImgFromlocal()
}


function alignLeft() {
    gMeme.lines[gSelectedLine].coords[0].posX = 50
}

function alignCenter() {
    gMeme.lines[gSelectedLine].coords[0].posX = 300
}

function alignRight() {
    gMeme.lines[gSelectedLine].coords[0].posX = 450
}

function addMemeText(text, ) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = gLineColor
    gCtx.fillStyle = gColor
    gCtx.font = gFontSize + 'px ' + gFont
    gCtx.textAlign = 'center'
    gCtx.fillText(text, gMeme.lines[gSelectedLine].coords[0].posX, gMeme.lines[gSelectedLine].coords[0].posY)
    gCtx.strokeText(text, gMeme.lines[gSelectedLine].coords[0].posX, gMeme.lines[gSelectedLine].coords[0].posY)
}



function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-canvas.jpg'
}