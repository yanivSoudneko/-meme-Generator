'use strict';
const gMouseEvs = ['click', 'mousedown', 'mouseup', 'mousemove']
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gElCanvas;
var gCtx;
var gCurrImg;
var gColor;
var gLineColor;
var gFont = 'Impact'
var gFontSize = 40
var gCurrMeme = getMeme()

console.log('line', gMeme.selectedLineIdx);

function init() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    var elGallery = document.querySelector('.grid-container')
    elGallery.classList.remove('hidden')
    var elMemes = document.querySelector('.canvas-container')
    elMemes.classList.add('hidden')
    addListeners()
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
    drawImgFromlocal()

}

function getOutLineColor() {
    var elLine = document.getElementById('outLine').value
    gLineColor = elLine
    drawImgFromlocal()

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


function onEditMemeText(elInput) {
    const txt = elInput.value;
    updateMemeTxt(txt);
    drawImgFromlocal();
}



function drawImgFromlocal() {
    const img = new Image()
    img.src = getImgSrc();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        for (let i = 0; i < gMeme.lines.length; i++) {
            addMemeText(gMeme.lines[i].txt, gMeme.lines[i].coords[0].posX, gMeme.lines[i].coords[0].posY)
        }
    }
}

function saveImage() {
    var elImg = gElCanvas.toDataURL('image/jpeg')
    saveToStorage(KEY, elImg)
}

function onNewLine() {
    newLine()
}

function renderCanvas() {
    // var elImg = gElCanvas.toDataURL('image/jpeg')
    gCtx.fillStyle = "#ffcccc"
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
        // loadFromStorage(KEY, elImg)

}

function changeLine() {
    var idx = gMeme.selectedLineIdx
    console.log('idx', idx);
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) {
        gMeme.selectedLineIdx += 1
    } else {
        gMeme.selectedLineIdx = 0
    }
    // drawImgFromlocal()
    gCtx.strokeStyle = 'black'
    var lineHeight = gFontSize * 1.25
    var textWidth = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width;
    gCtx.strokeRect(gMeme.lines[gMeme.selectedLineIdx].coords[0].posX - textWidth / 2 - 10, gMeme.lines[gMeme.selectedLineIdx].coords[0].posY - lineHeight + 10, textWidth + 20, lineHeight);

}

function onDeleteLine() {
    gMeme.lines[gMeme.selectedLineIdx].txt = ''
    drawImgFromlocal()
}

function changeFont(font) {
    gFont = font
}

function getBiggerFont() {
    biggerFont()
}

function getLowerFont() {
    lowerFont()
}

function getMoveLineDown() {
    moveLineDown()
}

function getMoveLineUp() {
    moveLineUp()
}

function getMoveLineRight() {
    moveLineRight()
}

function getMoveLineLeft() {
    moveLineLeft()
}


function getAlignLeft() {
    alignLeft()
}

function getAlignCenter() {
    alignCenter()
}

function getAlignRight() {
    alignRight()
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

function showMemes() {
    var elMemes = document.querySelector('.canvas-container')
    elMemes.classList.remove('hidden')
    var elGallery = document.querySelector('.grid-container')
    elGallery.classList.add('hidden')
}



function addMemeText(text, x, y) {
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = gLineColor
    gCtx.fillStyle = gColor
    gCtx.font = gFontSize + 'px ' + gFont
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}



function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-canvas.jpg'
}