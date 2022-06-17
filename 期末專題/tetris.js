//繪製俄羅斯方塊背景大小
const view = {
  creatGirds() {
    const grid = document.querySelector('.grid')
    let girds = ''
    for (let i = 0; i < 210; i++) {
      if (i < 200) {
        girds += '<div></div>'
      } else {
        girds += '<div class="taken"></div>'
      }
    }
    grid.innerHTML = girds
    const miniGrid = document.querySelector('.mini-grid') 
    miniGrids = ''
    for (let j = 0; j < 16; j++) {
      miniGrids += '<div class=""></div>'
    }
    miniGrid.innerHTML = miniGrids
  },
  draw() {
    model.currentTetromino.forEach(index => model.squares[model.currentPosition + index].classList.add('tetromino'))
    model.currentTetromino.forEach(index => model.squares[model.currentPosition + index].style.backgroundColor = model.colors[model.index])
  },
  undraw() {
    model.currentTetromino.forEach(index => model.squares[model.currentPosition + index].classList.remove('tetromino'))
    model.currentTetromino.forEach(index => model.squares[model.currentPosition + index].style.backgroundColor = '')
  },
  displayNextTetromino() {
    const displaySquares = document.querySelectorAll('.mini-grid div')
    displaySquares.forEach(square => {
      square.classList.remove('tetromino')
      square.style.backgroundColor = ''
    })
    model.nextTetromino.forEach(index => {
      displaySquares[1 + index].classList.add('tetromino')
      displaySquares[1 + index].style.backgroundColor = model.colors[model.nextIndex]
    })
  },
  //移動俄羅斯方塊
  checkAndRemoveGrids() {
    for (let i = 0; i < 200; i += model.width) {
      const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]
      const isARowTetrominoes = row.every(index => model.squares[index].classList.contains('taken'))
      if (isARowTetrominoes) {
        model.numOfRemovedRow++
        const grid = document.querySelector('.grid')
        row.forEach(index => {
          model.squares[index].classList.remove('tetromino', 'taken')
          model.squares[index].style.backgroundColor = ''
        })
        const squaresRemoved = model.squares.splice(i, model.width)
        model.squares = squaresRemoved.concat(model.squares)
        model.squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }
}

const controller = {
  displayGame() {
    model.initiGame()
    view.draw()
    model.createNextNextTetromino()
    view.displayNextTetromino()
    document.addEventListener('keyup', controller.control)
    document.addEventListener('keydown', controller.rush)
    model.timerId = setInterval(this.moveDown, model.speed)
    this.pause()
  },
  moveDown() {
    const currentPosition = model.currentPosition
    const current = model.currentTetromino
    const squares = model.squares
    const width = model.width
    const isCollision = current.some(index => squares[currentPosition + index + width].classList.contains('taken'))
    if (isCollision) {
      controller.freeze()
    } else {
      view.undraw()
      model.currentPosition += model.width
      view.draw()
    }
  },
  rush(event) {
    switch (event.keyCode) {
      case 40:
        controller.moveDown()
        break;
    }
  },
  freeze() {
    const currentPosition = model.currentPosition
    const width = model.width
    const current = model.currentTetromino
    const squares = model.squares
    const isCollision = current.some(index => squares[currentPosition + index + width].classList.contains('taken'))
    if (isCollision) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      model.renewTetromino()
      model.createNextNextTetromino()
      view.displayNextTetromino()
      view.checkAndRemoveGrids()
      view.draw()
      model.addScore()
      this.gameOver()
    }
  },
  moveLeft() {
    const current = model.currentTetromino
    const width = model.width
    const squares = model.squares
    const currentPosition = model.currentPosition

    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    const isCollision = current.some(index => squares[currentPosition + index - 1].classList.contains('taken'))
    if (!isAtLeftEdge && !isCollision) {
      view.undraw()
      model.currentPosition--
      view.draw()
    }
  },
  moveRight() {
    const width = model.width
    const squares = model.squares
    const current = model.currentTetromino
    const currentPosition = model.currentPosition
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
    const isCollision = current.some(index => squares[currentPosition + index + 1].classList.contains('taken'))
    if (!isAtRightEdge && !isCollision) {
      view.undraw()
      model.currentPosition++
      view.draw()
    }
  },
  rotate() {
    const width = model.width
    const squares = model.squares
    const currentPosition = model.currentPosition
    const nextRotation = model.currentRotation + 1 === model.currentTetromino.length ? 0 : model.currentRotation + 1

    const nextTetromino = model.createTetromino(nextRotation)
    const nextIsAtLeftEdge = nextTetromino.some(index => (currentPosition + index) % width === 0)
    const nextIsAtRightEdge = nextTetromino.some(index => (currentPosition + index) % width === width - 1)

    const current = model.currentTetromino
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1 || (currentPosition + index) % width === width - 2)
    const backWard = nextTetromino.filter(index => (currentPosition + index) % width === 0 || (currentPosition + index) % width === 1)
    const isCollision = nextTetromino.some(index => squares[currentPosition + index].classList.contains('taken'))
    if (isCollision) {
      return
    } else {
      view.undraw()
      if (nextIsAtLeftEdge & isAtRightEdge) {        
        model.currentPosition -= backWard.length
      } else if (nextIsAtRightEdge & isAtLeftEdge) {
        model.currentPosition++
      }
      model.currentRotation++
      if (model.currentRotation === model.currentTetromino.length) {
        model.currentRotation = 0
      }
      model.currentTetromino = model.createTetromino()
      view.draw()
    }
  },
  control(event) {
    switch (event.keyCode) {
      case 37:
        controller.moveLeft()
        break;
      case 38:
        controller.rotate()
        break;
      case 17:
        controller.rotate()
        break;
      case 39:
        controller.moveRight()
        break;
      case 40:
        controller.moveDown()
        break;
    }
  },
  pause() {
    const startBtn = document.getElementById('start-button')
    startBtn.addEventListener('click', () => {
      if (model.timerId) {
        clearInterval(model.timerId)
        model.timerId = null
      } else {
        model.timerId = setInterval(this.moveDown, model.speed)
      }
    })
    const startBtn1 = document.getElementById('start-button1')
    startBtn1.addEventListener('click', () => {
      if (model.timerId) {
        clearInterval(model.timerId)
        model.timerId = null
      } else {
        model.timerId = setInterval(this.moveDown, model.speed)
      }
    })
  },
  gameOver() {
    const score = document.querySelector('h3')
    const isCollision = model.currentTetromino.some(index => model.squares[model.currentPosition + index].classList.contains('taken'))
    if (isCollision) {
      score.innerText = 'Game Over！'
      clearInterval(model.timerId)
    }
  }
}
//俄羅斯方塊的形狀跟顏色
const model = {
  tetrominoes(width = this.width) {
    const tetrominoJ = [
      [1, width + 1, width * 2 + 1, 2],
      [width, width + 1, width + 2, width * 2 + 2],
      [1, width + 1, width * 2 + 1, width * 2],
      [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]
    const tetrominoL = [
      [0, 1, width + 1, width * 2 + 1],
      [width, width + 1, width + 2, 2],
      [1, width + 1, width * 2 + 1, width * 2 + 2],
      [width, width + 1, width + 2, width * 2]
    ]
    const tetrominoS = [
      [0, width, width + 1, width * 2 + 1],
      [width + 1, width + 2, width * 2, width * 2 + 1],
      [0, width, width + 1, width * 2 + 1],
      [width + 1, width + 2, width * 2, width * 2 + 1]
    ]
    const tetrominoZ = [
      [1, width, width + 1, width * 2],
      [width, width + 1, width * 2 + 1, width * 2 + 2],
      [1, width, width + 1, width * 2],
      [width, width + 1, width * 2 + 1, width * 2 + 2]
    ]
    const tetrominoT = [
      [1, width, width + 1, width + 2],
      [1, width + 1, width + 2, width * 2 + 1],
      [width, width + 1, width + 2, width * 2 + 1],
      [1, width, width + 1, width * 2 + 1]
    ]
    const tetrominoO = [
      [0, 1, width, width + 1],
      [0, 1, width, width + 1],
      [0, 1, width, width + 1],
      [0, 1, width, width + 1]
    ]
    const tetrominoI = [
      [1, width + 1, width * 2 + 1, width * 3 + 1],
      [width, width + 1, width + 2, width + 3],
      [1, width + 1, width * 2 + 1, width * 3 + 1],
      [width, width + 1, width + 2, width + 3]
    ]
    return [
      tetrominoJ,
      tetrominoL,
      tetrominoS,
      tetrominoZ,
      tetrominoT,
      tetrominoO,
      tetrominoI
    ]
  },
  width: 10,
  currentPosition: 4,
  currentRotation: 0,
  currentTetromino() {
    return this.createTetromino()
  },
  currentTetromino: [],
  nextTetromino: [],
  index: -1,
  nextIndex: -1,
  score: 0,
  speed: 1000,
  numOfRemovedRow: 0,
  timerId: null,
  colors: ['yellow', 'greenyellow', 'orange', 'pink', 'cyan', 'darksalmon', 'cornflowerblue'],
  createTetromino(currentRotation = this.currentRotation, index = this.index, width) {
    return this.tetrominoes(width)[index][currentRotation]
  },
  renewTetromino() {
    
    model.currentTetromino = model.createTetromino(0, model.nextIndex, model.width)
    
    model.currentPosition = 4
    
    model.index = model.nextIndex
    
    model.nextIndex = utility.randomIndex(model.tetrominoes())
  },
  initiGame() {
    view.creatGirds()
    model.index = utility.randomIndex(model.tetrominoes())
    model.currentTetromino = model.createTetromino()
    model.squares = Array.from(document.querySelectorAll('.grid div'))
  },
  createNextNextTetromino() {
    model.nextIndex = utility.randomIndex(model.tetrominoes())
    model.nextTetromino = model.createTetromino(0, model.nextIndex, 4)
  },
  addScore() {
    const score = document.getElementById('score')
    switch (model.numOfRemovedRow) {
      case 0:
        break
      case 1:
        model.score += 2
        model.speed = model.speed < 100 ? 100 : model.speed - 10
        break
      case 2:
        model.score += 4
        model.speed = model.speed < 100 ? 100 : model.speed - 20
        break
      case 3:
        model.score += 8
        model.speed = model.speed < 100 ? 100 : model.speed - 40
        break
      case 4:
        model.score += 16
        model.speed = model.speed < 100 ? 100 : model.speed - 80
        break
    }
    clearInterval(model.timerId)
    model.timerId = null
    model.timerId = setInterval(controller.moveDown, model.speed)
    model.numOfRemovedRow = 0
    score.innerText = model.score
  }
}

const utility = {
  randomIndex(array) {
    return Math.floor(Math.random() * array.length)
  },
  addController(name, movement) {
    const site = document.querySelector(`.${name}`)
    console.log(site)
    site.addEventListener('click', () => {
      movement[name]()
    })
  }
}

controller.displayGame()


