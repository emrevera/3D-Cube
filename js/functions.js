document.addEventListener('DOMContentLoaded', function(){

	const cube = document.querySelector('.cube');

	function getPositions(element) {
		if(!element.style.transform || !element.parentNode.style.transform){
			return {
				'positionX': 0,
			 	'positionY': 0,
			 	'scale': 1
			 }
		}

		const matrixPattern = /rotateX\((\-?[0-9]{1,3})deg\) rotateY\((\-?[0-9]{1,3})deg\)/gi;
		let updatedPosition = matrixPattern.exec(element.style.transform);

		let updatedScale = /scale\(([0-9\.]+)\)/gi.exec(element.parentNode.style.transform);

		return {
			'positionX': updatedPosition[1],
			'positionY': updatedPosition[2],
			'scale': updatedScale[1]
		}
	}


	function updateElementXY(e){
		console.log(e.target.name);

		let currentPosition = getPositions(cube);

		if (this.name == "rx") {
			currentPosition.positionX = this.valueAsNumber * 360 / 10;
		}
		
		else if (this.name == "ry") {
			currentPosition.positionY = this.valueAsNumber * 360 / 10;
		}

		else if (this.name == "scale") {
			currentPosition.scale = this.valueAsNumber / 10;
			if (currentPosition.scale < 1 ){
				currentPosition.scale = 1;
			}
			cube.parentNode.style.transform = `scale(${currentPosition.scale})`; 
		}

		cube.style.transform = `rotateX(${currentPosition.positionX}deg) rotateY(${currentPosition.positionY}deg)`;
	}
	
	let sliders = document.querySelectorAll('input[name="rx"],input[name="ry"],input[name="scale"]');
	sliders.forEach(slider => slider.addEventListener('input', updateElementXY));

});