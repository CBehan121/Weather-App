window.addEventListener("load", () => {
	let long;
	let lat;
	let temperatureDescription = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('.temperature-degree')
	let locationTimezone = document.querySelector('.location-timezone')
	let humidd = document.querySelector('.humid')
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position =>{
			long = position.coords.longitude;
			lat = position.coords.latitude;
			const proxy =`https://cors-anywhere.herokuapp.com/`
			const api = `${proxy}https://api.darksky.net/forecast/11b7fbe6baddf9209c46a3c1d4dae2f1/${lat},${long}`;
			fetch(api)
			.then(response =>{
				return response.json();

			})
			.then(data => {
				console.log(data);
				const{temperature, summary, icon, humidity} = data.currently;
				temperatureDegree.textContent = temperature;
				temperatureDescription.textContent = summary;
				locationTimezone.textContent = data.timezone;
				humidd.textContent = humidity;
				setIcons(icon, document.querySelector(".icon"));
			});

			});


	}
	function setIcons(icon,iconID){
		const skycons = new Skycons({color: "pink"});
		const currentIcon = icon.replace(/-/g,"_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});