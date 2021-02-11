'use strict'
var gKeywords = { crazy: 2, angry: 1, funny: 5, cute: 2 };
var gImgs = [
    { id: 1, url: 'img/1.jpg' },
    { id: 2, url: 'img/2.jpg' },
    { id: 3, url: 'img/3.jpg' },
    { id: 4, url: 'img/4.jpg' },
    { id: 5, url: 'img/5.jpg' },
    { id: 6, url: 'img/6.jpg' },
    { id: 7, url: 'img/7.jpg' },
    { id: 8, url: 'img/8.jpg' },
    { id: 9, url: 'img/9.jpg' },
    { id: 10, url: 'img/10.jpg' },
    { id: 11, url: 'img/11.jpg' },
    { id: 12, url: 'img/12.jpg' },
    { id: 13, url: 'img/13.jpg' },
    { id: 14, url: 'img/14.jpg' },
    { id: 15, url: 'img/15.jpg' },
    { id: 16, url: 'img/16.jpg' },
    { id: 17, url: 'img/17.jpg' },
    { id: 18, url: 'img/18.jpg' },
];
var gMeme = {
    selectedImgId: 3,
    selectedLineIdx: 0,
    lines: [{
            txt: '',
            size: '20',
            align: 'center',
            color: 'blue',
            coords: [{
                line: '',
                order: 0,
                posX: 250,
                posY: 50
            }]
        },
        {
            txt: '',
            size: '30',
            align: 'center',
            color: 'blue',
            coords: [{
                line: '',
                order: 1,
                posX: 250,
                posY: 450
            }]
        },
    ],
};



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
    return gMeme.lines[0].txt;
}

function updateMemeTxt(lnIdx, txt) {
    gMeme.lines[lnIdx].txt = txt;
}



function getImgIdxById() {
    console.log();
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