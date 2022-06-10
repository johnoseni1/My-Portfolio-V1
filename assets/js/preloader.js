const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasSize = () => {
	return {
		width: window.innerWidth * window.devicePixelRatio,
		height: window.innerHeight * window.devicePixelRatio
	}
} 

const resizeCanvas = () => {
	const { width, height } = canvasSize()
	canvas.width = width
	canvas.height = height
}

resizeCanvas()

let tick = 0
let rotation = 0

const createPoint = (i, r) => {
	const angleStep = (Math.PI * 6) / 300
	
	/* Center the spiral */
	const xPosition = canvas.width / 2
	const yPosition = canvas.height / 2
	
	return {
		x: xPosition + Math.cos(i * angleStep) * r,
		y: yPosition + Math.sin(i * angleStep) * r
	}
}

const drawCircle = (tick, point) => {
	/* Hue */
	const h = tick * 4
	
	/* Radius of the circle */
	const radius = tick < 200 ? tick / 2 : 200
	
	ctx.strokeStyle = `hsla(${h}, 70%, 50%)`
	
	/* Increment line width, but set a min and max */
	ctx.lineWidth = tick * 0.05 < 0.5 ? 0.5 : tick * 0.05 > 20 ? 20 : tick * 0.05
	
	/* Draw the circle */
	ctx.beginPath()
	ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI)
	ctx.stroke()
}

let isIncrementing = true

const draw = () => {
	window.requestAnimationFrame(draw)
	
	const { width, height } = canvas
	
	/* Position */
	const positionFromCenter = Math.pow(tick, 1.18)
	const point = createPoint(rotation, positionFromCenter)
	const point2 = createPoint(rotation + 150, positionFromCenter)
	
	/* Clear canvas and redraw */
	ctx.fillStyle = 'rgba(8, 8, 13, 0.05)'
	ctx.fillRect(0, 0, width, height)
	
	drawCircle(tick, point)
	drawCircle(tick, point2)
	
	if (tick < 150 && isIncrementing) {
		tick = tick + 0.5
	}
	
	if (tick === 150 && isIncrementing) {
		isIncrementing = false
	}
	
	if (tick === 0 && !isIncrementing) {
		isIncrementing = true
	}
	
	if (tick > 0 && !isIncrementing) {
		tick = tick - 0.5
	}
	
	rotation = rotation + 0.5
}

window.addEventListener('resize', () => {
	resizeCanvas()
})

/* Initial canvas background */
ctx.fillStyle = 'rgba(8, 8, 13, 1)'
ctx.fillRect(0, 0, canvas.width, canvas.height)

draw()
