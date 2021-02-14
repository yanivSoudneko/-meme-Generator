'use strict'
var gKeywords = { politic: 3, animal: 3, kids: 3, tv: 7, sport: 1, toys: 1 };
// const KEY = 'images'

const KEY = 'currImg'
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['politic'] },
    { id: 2, url: 'img/2.jpg', keywords: ['animal'] },
    { id: 3, url: 'img/3.jpg', keywords: ['animal'] },
    { id: 4, url: 'img/4.jpg', keywords: ['animal'] },
    { id: 5, url: 'img/5.jpg', keywords: ['kids'] },
    { id: 6, url: 'img/6.jpg', keywords: ['tv'] },
    { id: 7, url: 'img/7.jpg', keywords: ['kids'] },
    { id: 8, url: 'img/8.jpg', keywords: ['tv'] },
    { id: 9, url: 'img/9.jpg', keywords: ['kids'] },
    { id: 10, url: 'img/10.jpg', keywords: ['politic'] },
    { id: 11, url: 'img/11.jpg', keywords: ['sport'] },
    { id: 12, url: 'img/12.jpg', keywords: ['tv'] },
    { id: 13, url: 'img/13.jpg', keywords: ['tv'] },
    { id: 14, url: 'img/14.jpg', keywords: ['tv'] },
    { id: 15, url: 'img/15.jpg', keywords: ['tv'] },
    { id: 16, url: 'img/16.jpg', keywords: ['tv'] },
    { id: 17, url: 'img/17.jpg', keywords: ['politic'] },
    { id: 18, url: 'img/18.jpg', keywords: ['toys'] },
];
var gMeme = {
    selectedImgId: 3,
    selectedLineIdx: 0,
    lines: [{
            txt: 'line 1',
            size: 20,
            align: 'center',
            color: 'blue',
            isDragging: false,
            coords: [{
                line: '',
                order: 0,
                posX: 250,
                posY: 100
            }]
        },
        {
            txt: 'line 2',
            size: 40,
            align: 'center',
            color: 'blue',
            isDragging: false,
            coords: [{
                line: '',
                order: 1,
                posX: 250,
                posY: 450
            }]
        },
    ],
};



function searchImg() {
    renderGallery();
}

function returnImg() {
    return gImgs
}

function toggleMenu() {
    document.body.classList.toggle('open')
}

function getImgsForDisplay() {
    var imgs = [];
    imgs = filterImgs(gImgs)
    return imgs;
}

function getMeme() {
    return gMeme
}

function getColor() {
    var elColor = document.getElementById('color').value
    gColor = elColor
}

function getOutLineColor() {
    var elLine = document.getElementById('outLine').value
    gLineColor = elLine
}

function getImgSrc() {
    const idx = getImgIdxById();
    return gImgs[idx].url;
}

function getImgTxt() {
    const idx = getImgIdxById();
    gMeme.lines[gMeme.selectedLineIdx].txt;
    drawImgFromlocal()
}

function updateMemeTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}



function getImgIdxById() {
    return gImgs.findIndex((img) => gMeme.selectedImgId === img.id);
}

function getImgs() {
    return gImgs
}


function getImgById(imgId) {
    var img = gImgs.find(function(img) {
        return imgId === img.id
    })
    return img
}


function _saveImages() {
    saveToStorage(IMG_KEY);
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
    console.log(gMeme.selectedLineIdx);
    gMeme.lines[gMeme.selectedLineIdx].coords[0].posY += 10
    drawImgFromlocal()
}

function moveLineUp() {
    gMeme.lines[gMeme.selectedLineIdx].coords[0].posY -= 10
    drawImgFromlocal()
}

function moveLineRight() {
    gMeme.lines[gMeme.selectedLineIdx].coords[0].posX -= 10
    drawImgFromlocal()
}

function moveLineLeft() {
    gMeme.lines[gMeme.selectedLineIdx].coords[0].posX += 10
    drawImgFromlocal()
}


function alignLeft() {
    gMeme.lines[gMeme.selectedLineIdx].coords[0].posX = 50
    drawImgFromlocal()
}

function alignCenter() {
    gMeme.lines[gMeme.selectedLineIdx].coords[0].posX = 250
    drawImgFromlocal()
}

function alignRight() {
    gMeme.lines[gMeme.selectedLineIdx].coords[0].posX = 400
    drawImgFromlocal()
}

function renderText() {
    var currLineIdx = gMeme.selectedLineIdx;
    gMeme.lines.forEach((line, idx) => {
        gMeme.selectedLineIdx = idx;
        if (idx === currLineIdx) {
            addMemeText()
        } else addMemeText()
    })
    gMeme.selectedLineIdx = currLineIdx
}

function newLine() {
    var line = {
        txt: 'line 3',
        size: 20,
        align: 'center',
        color: 'blue',
        isDragging: false,
        coords: [{
            line: '',
            order: 0,
            posX: gElCanvas.width / 2,
            posY: gElCanvas.height / 2
        }]
    }

    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    drawImgFromlocal()
    renderText()
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)

    gElCanvas.addEventListener('mousedown', onDown)

    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)

    gElCanvas.addEventListener('touchstart', onDown)

    gElCanvas.addEventListener('touchend', onUp)
}



function onDown(ev) {
    const pos = getEvPos(ev)

    if (!isLineClicked(pos)) return
    console.log('Hey');
    gMeme.lines[gMeme.selectedLineIdx].isDragging = true
    document.body.style.cursor = 'grabbing'
    drawImgFromlocal()
}

function onMove(ev) {
    if (gMeme.lines.length !== 0 && gMeme.lines[gMeme.selectedLineIdx].isDragging) {
        var pos = getEvPos(ev)
        gMeme.lines[gMeme.selectedLineIdx].pos.x = pos.x;
        gMeme.lines[gMeme.selectedLineIdx].pos.y = pos.y;

        drawImgFromlocal()

    }
}

function onUp() {
    if (gMeme.lines.length === 0) return
    gMeme.lines[gMeme.selectedLineIdx].isDragging = false
    document.body.style.cursor = 'default'
    drawImgFromlocal()

}

// Get event position depending on event type (mouse / touch)
function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - (ev.target.offsetLeft + ev.target.clientLeft), // clientLeft, clientTop is the element's border width
            y: ev.pageY - (ev.target.offsetTop + ev.target.clientTop)
        }
    }
    return pos
}

function isLineClicked(clickedPos) {
    console.log('clickedPos', clickedPos.x);
    var currLineIdx = gMeme.lines.findIndex((line) => {
        var lineHeight = line.size * 1.3
        var textWidth = gCtx.measureText(line.txt).width;
        return clickedPos.x > line.coords.posX - textWidth / 2 - 10 &&
            clickedPos.x < line.coords.posX + textWidth / 2 + 20 &&
            clickedPos.y > line.coords.posY - lineHeight + 10 &&
            clickedPos.y < line.coords.posY + lineHeight + 10
    })
    if (currLineIdx !== -1) {
        gMeme.selectedLineIdx = currLineIdx
        return true
    }
}