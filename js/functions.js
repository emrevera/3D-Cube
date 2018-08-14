document.addEventListener('DOMContentLoaded', function(){

	const cube = document.querySelector('.cube');

	function getPositions(element) {
		if(!element.style.transform){
			return {
				'positionX': 0,
			 	'positionY': 0,
			 	'scale': 0
			 }
		}

		const matrixPattern = /rotateX\((\-?[0-9]{1,3})deg\) rotateY\((\-?[0-9]{1,3})deg\) scale\(([1-6])\)/gi;
		let updatedPosition = matrixPattern.exec(element.style.transform);

		return {
			'positionX': updatedPosition[1],
			'positionY': updatedPosition[2],
			'scale': updatedPosition[3]
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
			currentPosition.scale = this.valueAsNumber;
		}

		cube.style.transform = `rotateX(${currentPosition.positionX}deg) rotateY(${currentPosition.positionY}deg) scale(${currentPosition.scale})`;
	}
	
	let sliders = document.querySelectorAll('input[name="rx"],input[name="ry"],input[name="scale"]');
	sliders.forEach(slider => slider.addEventListener('mousedown', updateElementXY));
	sliders.forEach(slider => slider.addEventListener('mousemove', updateElementXY));

});