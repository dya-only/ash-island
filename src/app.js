const albumDir = './src/assets/albums/'
const musicDir = './src/assets/musics/'

// banner
const banner = document.querySelector('.banner')

let cnt = 1;
const getBanner = () => {
  if (cnt === 6) cnt = 1
  banner.src = `./src/assets/banner${cnt++}.jpg`
}

const init = () => {
  getBanner()
  setInterval(getBanner, 4990);
}
init()


// menu
const menuBtn = document.querySelector('.menu-btn')
const menuWindow = document.querySelector('.menu-window')
const body = document.querySelector('body')
let isMenu = false

const menu = () => {
  menuBtn.classList.toggle("change");

  if (isMenu) {
    menuWindow.style.display = 'none'
    body.style.overflowY = 'auto'
    isMenu = false
  }
  else {
    menuWindow.style.display = 'block'
    body.style.overflowY = 'hidden'
    isMenu = true
  }
}

const move = (location) => {
  menuWindow.style.display = 'none'
  body.style.overflowY = 'auto'
  isMenu = false
  menuBtn.classList.toggle("change");
}

// dynamic island
const selectMusic = document.querySelector('audio')

const diMain = document.querySelector('.di-main')
const diAlbum = document.querySelector('.di-album')
const diVisualizer = document.querySelector('.di-visualizer')
const diBG = document.querySelector('.test')
const diMenu = document.querySelector('.menu-btn')
const diTitle = document.querySelector('.di-title')
const diArtist = document.querySelector('.di-artist')
const diBegin = document.querySelector('.di-begin')
const diEnd = document.querySelector('.di-end')
const diProgress = document.querySelector('.di-progress')
const diProgressBar = document.querySelector('.di-bar')
const diProgressContainer = document.querySelector('.di-progress-container')
const diPlay = document.querySelector('.di-play')
const diPlayImg = document.querySelector('.di-play-img')
const diPrev = document.querySelector('.di-prev')
const diNext = document.querySelector('.di-next')

diProgress.addEventListener('mouseover', () => {
  diProgress.style.height = '10px';
  diProgressBar.style.height = '10px';
}, false)
diProgress.addEventListener('mouseout', () => {
  diProgress.style.height = '6px';
  diProgressBar.style.height = '6px';
}, false)

let nowPlaying = ''
let isPlay = false
let isPause = false
let sec = 0
let viewSec = 0

// Main Menu
diMain.addEventListener('mouseover', () => {
  if (!isPlay) {
    document.querySelector('.menu-btn').style.display = 'inline-block'
  }
}, false)

diMain.addEventListener('mouseout', () => {
  if (!isPlay) {
    document.querySelector('.menu-btn').style.display = 'none'
  }
}, false)

// Music Player
const dipause = () => {
  isPause = isPause ? false : true
  if (isPause) {
    selectMusic.pause()
    diPlayImg.src = './src/assets/play.png'
    const interval_id = window.setInterval(function () { }, Number.MAX_SAFE_INTEGER);
    for (let i = 1; i < interval_id; i++) {
      window.clearInterval(i);
    }
  } else {
    selectMusic.play()
    diPlayImg.src = './src/assets/pause.png'
    let interval = setInterval(() => {
      diBegin.innerText = getTimeLooksModern(sec++)
      viewSec += 100 / +selectMusic.duration
      // diProgressBar.style.width = `${sec / selectMusic.duration}%`
      diProgressBar.style.width = `${viewSec}%`

      if (sec >= +selectMusic.duration) {
        sec = 0
        clearInterval(interval)
      }
    }, 1000)
  }
}

const diplay = async (title) => {
  const interval_id = window.setInterval(function () { }, Number.MAX_SAFE_INTEGER);
  for (let i = 1; i < interval_id; i++) {
    window.clearInterval(i);
  }

  if (selectMusic == null) selectMusic.src = musicDir + `${title}.mp3`

  if (nowPlaying !== title) {
    sec = 0
    viewSec = 0

    selectMusic.pause()
    selectMusic.src = musicDir + `${title}.mp3`
    await selectMusic.play()
  }
  diBG.style.display = 'block'
  diProgressContainer.style.display = 'none'
  diProgress.style.display = 'none'
  diEnd.innerText = getTimeLooksModern(selectMusic.duration)
  diBegin.style.display = 'none'
  diEnd.style.display = 'none'
  diPlay.style.display = 'none'
  diPrev.style.display = 'none'
  diNext.style.display = 'none'

  let interval = setInterval(() => {
    diBegin.innerText = getTimeLooksModern(sec++)
    viewSec += 100 / +selectMusic.duration
    diProgressBar.style.width = `${viewSec}%`

    if (sec >= +selectMusic.duration) {
      sec = 0
      viewSec = 0
      clearInterval(interval)
    }
  }, 1000)

  if (!isPlay) {
    isPlay = true
    selectMusic.play()
    nowPlaying = title
    diAlbum.src = albumDir + `${title}.jpg`

    diVisualizer.style.display = 'flex'
    diAlbum.style.display = 'block'
    diMain.classList.remove('di-main')
    diMain.classList.add('di-playing')

    document.querySelector('.di-playing').addEventListener('mouseover', () => {
      if (isPlay) {
        diAlbum.style.width = '60px'
        diAlbum.style.height = '60px'
        diAlbum.style.borderRadius = '15px'
        diAlbum.style.marginTop = '-100px'
        diAlbum.style.marginLeft = '20px'

        diVisualizer.style.display = 'none'

        diTitle.style.display = 'block'
        diTitle.style.marginTop = '-120px'
        diTitle.style.marginLeft = '100px'
        diTitle.innerText = title

        diArtist.style.display = 'block'
        diArtist.style.marginTop = '-75px'
        diArtist.style.marginLeft = '100px'

        diProgressContainer.style.display = 'flex'
        diProgress.style.display = 'block'
        diBegin.style.display = 'block'
        diEnd.style.display = 'block'
        diPlay.style.display = 'block'
        diPrev.style.display = 'block'
        diNext.style.display = 'block'

        document.querySelector('.test').style.marginLeft = '-8px'
        document.querySelector('.test').style.width = '400px'
        document.querySelector('.test').style.height = '220px'
        document.querySelector('.di-playing').style.backgroundImage = `url(${albumDir + title}.jpg)`
      }
    }, false)

    document.querySelector('.di-playing').addEventListener('mouseout', () => {
      if (isPlay) {
        diAlbum.style.width = '20px'
        diAlbum.style.height = '20px'
        diAlbum.style.borderRadius = '50%'
        diAlbum.style.marginTop = '0'
        diAlbum.style.marginLeft = '0'

        diVisualizer.style.display = 'flex'

        diTitle.style.display = 'none'

        diArtist.style.display = 'none'

        diBG.style.width = '200px'
        diBG.style.height = '35px'

        diProgressContainer.style.display = 'none'
        diBegin.style.display = 'none'
        diEnd.style.display = 'none'
        diPlay.style.display = 'none'
        diPrev.style.display = 'none'
        diNext.style.display = 'none'

        document.querySelector('.di-playing').style.background = 'black'
      }
    }, false)
  } else {
    isPlay = false
    diMain.classList.remove('di-playing')
    diMain.classList.add('di-main')

    clearInterval(interval)
    diAlbum.style.display = 'none'
    diVisualizer.style.display = 'none'
    diBG.style.width = '130px'
    diBG.style.display = 'none'
    diProgressContainer.style.display = 'none'
    diBegin.style.display = 'none'
    diEnd.style.display = 'none'
    diPlay.style.display = 'none'
    diPrev.style.display = 'none'
    diNext.style.display = 'none'

    selectMusic.pause()
  }
}

const getTimeLooksModern = (_sec) => {
  return new Date(_sec * 1000).toISOString().substring(14, 19)
}

const diprev = () => {
  if (selectMusic.currentTime < 15) {
    selectMusic.currentTime = 0
    sec = 0
    viewSec = 0
  }
  else {
    selectMusic.currentTime -= 15
    sec -= 15
    viewSec -= 100 / 15
  }
}
const dinext = () => {
  if (selectMusic.currentTime > selectMusic.duration - 15) {
    selectMusic.currentTime = selectMusic.duration
    sec = +selectMusic.duration
    viewSec = 100
  }
  else {
    selectMusic.currentTime += 15
    sec += 15
    viewSec += 100 / 15
  }
}