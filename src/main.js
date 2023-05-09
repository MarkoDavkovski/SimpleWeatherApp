export function main() {
	const btn = document.querySelector('button');
	const input = document.querySelector('input');

	const cityDiv = document.getElementById('city');
	const temperatureDiv = document.getElementById('temperature');
	const conditionDiv = document.getElementById('condition');
	const feelsLikeDiv = document.getElementById('feelsLike');
	const humidityDiv = document.getElementById('humidity');
	const windDiv = document.getElementById('wind');

	async function weather(iv) {
		if (iv === '' || iv === undefined) iv = 'Skopje';

		let resJson;
		try {
			let response = await fetch(
				`http://api.weatherapi.com/v1/current.json?key=1d84d36f98094b9ea12181117230505&q=${iv}&aqi=no`,
				{ mode: 'cors' }
			);
			resJson = await response.json();
		} catch (err) {
			console.log(err);
		}

		cityDiv.innerHTML = `<i class="fa-solid fa-location-dot"></i> <div><p>Location</p> ${resJson.location.name} </div>`;
		conditionDiv.innerHTML = `<i class="fa-solid fa-fan"></i> <div><p>Condition</p> ${resJson.current.condition.text}</div>`;
		temperatureDiv.innerHTML = `<i class="fa-solid fa-temperature-three-quarters"></i><div> <p>Temperature</p>${resJson.current.temp_c}C°</div>`;
		feelsLikeDiv.innerHTML = `<i class="fa-solid fa-temperature-three-quarters"></i> <div><p>Feels like</p> ${resJson.current.feelslike_c}C°</div>`;
		humidityDiv.innerHTML = `<i class="fa-solid fa-droplet"></i> <div><p>Humidity</p>${resJson.current.humidity}%</div>`;
		windDiv.innerHTML = ` <i class="fa-solid fa-wind"></i> <span class='wind-number'>${resJson.current.wind_kph}</span> <div><p>wind</p><span class='kph'>km/h</span></div>`;
	}

	weather('Skopje');
	btn.addEventListener('click', () => weather(input.value));
	input.addEventListener('keydown', (e) => {
		if (e.keyCode === 13) {
			weather(input.value);
		}
	});
}
