window.addEventListener('load', () => {
  const canvas = document.querySelector('#canvas')
  const ctx = canvas.getContext('2d')

  const bgImg = new Image()
  bgImg.src = '../images/road.png'

  const carImg = new Image()
  carImg.src = '../images/car.png'

  const carHeight = 80
  const carWidth = 40
  const carY = canvas.height - carHeight - 40

  let isMovingLeft = false
  let isMovingRight = false
  let carX = canvas.width / 2 - carWidth / 2

  let gameOver = false
  let animateId
  let obstacles = []

  class Obstacle {
    constructor(x) {
      this.xPos = x
      this.yPos = -50
      this.width = 200
      this.height = 50
    }

    move() {
      this.yPos += 1
    }

    draw() {
      ctx.beginPath()
      ctx.fillStyle = 'teal'
      // xPos, yPos, width, height
      ctx.rect(this.xPos, this.yPos, this.width, this.height)
      ctx.fill()
      ctx.closePath()
    }

    checkCollision() {
      if (
        carX < this.xPos + this.width &&
        carX + carWidth > this.xPos &&
        carY < this.yPos + this.height &&
        carHeight + carY > this.yPos
      ) {
        // Collision detected!
        // Game Over
        gameOver = true
        console.log('Collision')
      }
    }
  }

  const drawCar = () => {
    ctx.beginPath()
    ctx.fillStyle = 'teal'
    // img,xPos, yPos, width, height
    ctx.drawImage(carImg, carX, carY, carWidth, carHeight)
    ctx.fill()
    ctx.closePath()
  }

  /*   const checkCollision = () => {
    if (
      carX < obstacleX + obstacleWidth &&
      carX + carWidth > obstacleX &&
      carY < obstacleY + obstacleHeight &&
      carHeight + carY > obstacleY
    ) {
      // Collision detected!
      // Game Over
      gameOver = true
      console.log('Collision')
    }
  } */

  const animate = () => {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height)

    drawCar()

    const obstaclesStillInScreen = []

    console.log(obstacles)
    obstacles.forEach(obstacle => {
      obstacle.draw()
      obstacle.checkCollision()
      obstacle.move()
      // Is my obstacle still in the screen
      if (obstacle.yPos < canvas.height) {
        obstaclesStillInScreen.push(obstacle)
      }
    })
    obstacles = obstaclesStillInScreen

    if (animateId % 300 === 0) {
      obstacles.push(new Obstacle(Math.random() * (canvas.width - 200)))
    }

    if (isMovingLeft) {
      carX -= 1
    } else if (isMovingRight) {
      carX += 1
    }

    if (gameOver) {
      cancelAnimationFrame(animateId)
    } else {
      animateId = requestAnimationFrame(animate)
    }
  }

  const startGame = () => {
    document.querySelector('.game-intro').style.display = 'none'
    document.querySelector('#game-board').style.display = 'block'

    animate()
  }

  document.getElementById('start-button').addEventListener('click', () => {
    startGame()
  })

  document.addEventListener('keydown', event => {
    console.log(event)
    if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') {
      isMovingLeft = true
    }
    if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
      isMovingRight = true
    }
    console.log({ isMovingLeft, isMovingRight })
  })

  document.addEventListener('keyup', event => {
    console.log(event)
    if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') {
      isMovingLeft = false
    }
    if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
      isMovingRight = false
    }
    console.log({ isMovingLeft, isMovingRight })
  })
})
