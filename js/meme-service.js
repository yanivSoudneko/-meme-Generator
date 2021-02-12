'use strict'
var gKeywords = { politic: 3, animal: 3, kids: 3, tv: 7, sport: 1, toys: 1 };

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
                posY: 50
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

console.log(gMeme.lines.length);


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
    gMeme.lines[gSelectedLine].txt;
    drawImgFromlocal()
}

function updateMemeTxt(lnIdx, txt) {
    gMeme.lines[lnIdx].txt = txt;
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


function saveCurrImg(img) {
    saveToStorage(IMG_KEY, img);
}