'use strict';
var gElCanvas;
var gCtx;
var gCurrImg;
var gColor;
var gLineColor;
var gFont = 'Impact'
var gFontSize = 40
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
    renderGallery(gImgs)
}


function renderGallery() {
    var imgs = getImgsForDisplay();
    var strHtml = ''
    imgs.forEach(function(img) {
        strHtml += ` <img src="${img.url}" class="img-${img.id}" onclick="onEditor(${img.id})"/>`
    })
    document.querySelector('.grid-container').innerHTML = strHtml
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
        addMemeText(txt, gMeme.lines[gSelectedLine].coords[0].posX, gMeme.lines[gSelectedLine].coords[0].posY)
    }
}


function renderCanvas() {
    gCtx.fillStyle = "#ffcccc"
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function changeLine() {
    gSelectedLine++
    if (gSelectedLine > 1) {
        gSelectedLine = 0
    }
    drawImgFromlocal()
}

function onDeleteLine() {
    gMeme.lines[gSelectedLine].txt = ''
    drawImgFromlocal()
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

function moveLineDown() {
    gMeme.lines[gSelectedLine].coords[0].posY += 10
    drawImgFromlocal()
}

function moveLineUp() {
    gMeme.lines[gSelectedLine].coords[0].posY -= 10
    drawImgFromlocal()
}

function moveLineRight() {
    gMeme.lines[gSelectedLine].coords[0].posX -= 10
    drawImgFromlocal()
}

function moveLineLeft() {
    gMeme.lines[gSelectedLine].coords[0].posX += 10
    drawImgFromlocal()
}


function alignLeft() {
    gMeme.lines[gSelectedLine].coords[0].posX = 50
}

function alignCenter() {
    gMeme.lines[gSelectedLine].coords[0].posX = 200
}

function alignRight() {
    gMeme.lines[gSelectedLine].coords[0].posX = 400
}

function filterImgs(imgs) {
    var userSearch = document.getElementById('search').value;
    if (userSearch === '') return imgs;
    else return imgs.filter(function(img) {
        return img.keywords.some(function(keyword) {
            return keyword.substring(0, userSearch.length) === userSearch;
        });
    });
}


function addMemeText(text) {
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