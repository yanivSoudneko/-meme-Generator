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


function onEditMemeText(inputText, gSelectedLine) {
    const txt = inputText.value;
    updateMemeTxt(gSelectedLine, txt);
    updateMemeTxt(gSelectedLine, txt);
    drawImgFromlocal();
}



function drawImgFromlocal() {
    const img = new Image()
    img.src = getImgSrc();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        const txt = getImgTxt();
        for (var i = 0; i < gMeme.lines.length; i++) {
            gSelectedLine = i
            addMemeText(txt, gMeme.lines[i].coords[0].posX, gMeme.lines[i].coords[0].posY)
        }
    }
}

function onNewLine() {
    newLine()
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
    drawImgFromlocal()

}

function biggerFont() {
    gFontSize += 5
    drawImgFromlocal()

}

function lowerFont() {
    gFontSize -= 5
    drawImgFromlocal()

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
    drawImgFromlocal()

}

function alignCenter() {
    gMeme.lines[gSelectedLine].coords[0].posX = 200
    drawImgFromlocal()

}

function alignRight() {
    gMeme.lines[gSelectedLine].coords[0].posX = 400
    drawImgFromlocal()
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



function addMemeText(selected = 0) {
    var text = gMeme.lines[gSelectedLine].txt;
    var x = gMeme.lines[gSelectedLine].coords[0].posX;
    var y = gMeme.lines[gSelectedLine].coords[0].posY;
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = gLineColor
    gCtx.fillStyle = gColor
    gCtx.font = gFontSize + 'px ' + gFont
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)



    gCtx.strokeStyle = selected ? 'green' : 'black'
    var lineHeight = gFontSize * 1.25
    var textWidth = gCtx.measureText(text).width;
    gCtx.strokeRect(gMeme.lines[gSelectedLine].coords[0].posX - textWidth / 2 - 10, gMeme.lines[gSelectedLine].coords[0].posY - lineHeight + 10, textWidth + 20, lineHeight);

}



function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-canvas.jpg'
}