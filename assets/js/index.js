import { Leon, Lobo, Oso, Serpiente, Aguila } from "./animales.js";

(async () => {
	const url = "animales.json";
	try {
		const res = await fetch(url);
		const data = await res.json();
		registerAnimalAndCreateInstance(data);
		getAnimalImagePreview(data);		
	} catch (error) {
		console.log(error);
	} finally {
		
	}
})();

const getAnimalImagePreview = (data) => {
	const animal = document.getElementById("animal");
	const preview = document.getElementById("preview");
	const { animales } = data;

	animal.addEventListener("change", (e) => {
		const findImage = animales.find((animal) => animal.name === e.target.value).imagen;
		document.getElementById("preview").setAttribute("class", "mx-auto mb-5");
		preview.innerHTML = `<img src="assets/imgs/${findImage}" alt="${e.target.value}" class="animal_preview_image">`;
	});
};

const registerAnimalAndCreateInstance = (data) => {
	const btnRegistrar = document.getElementById("btnRegistrar");

	let animalArray = [];
	btnRegistrar.addEventListener("click", (e) => {
		e.preventDefault();
		const animalx = document.getElementById("animal");
		const edad = document.getElementById("edad");
		const comentarios = document.getElementById("comentarios");
		const preview = document.getElementById("preview");

		let newAnimal;
		const { animales } = data;
		try {
			const instanceImage = animales.find((animal) => animal.name === animalx.value).imagen;
			const instanceSound = animales.find((animal) => animal.name === animalx.value).sonido;
			if (animalx.value === "Leon") {
				newAnimal = new Leon(`${animalx.value}`, `${edad.value}`, `assets/imgs/${instanceImage}`, `${comentarios.value}`, `assets/sounds/${instanceSound}`);
			} else if (animalx.value === "Lobo") {
				newAnimal = new Lobo(`${animalx.value}`, `${edad.value}`, `assets/imgs/${instanceImage}`, `${comentarios.value}`, `assets/sounds/${instanceSound}`);
			} else if (animalx.value === "Oso") {
				newAnimal = new Oso(`${animalx.value}`, `${edad.value}`, `assets/imgs/${instanceImage}`, `${comentarios.value}`, `assets/sounds/${instanceSound}`);
			} else if (animalx.value === "Serpiente") {
				newAnimal = new Serpiente(`${animalx.value}`, `${edad.value}`, `assets/imgs/${instanceImage}`, `${comentarios.value}`, `assets/sounds/${instanceSound}`);
			} else if (animalx.value === "Aguila") {
				newAnimal = new Aguila(`${animalx.value}`, `${edad.value}`, `assets/imgs/${instanceImage}`, `${comentarios.value}`, `assets/sounds/${instanceSound}`);
			}

			if (animalx.value != "Seleccione un animal" && edad.value != "Seleccione un rango de años" && comentarios.value != "" && instanceImage != "") {
				animalArray.push(newAnimal);
				drawAnimal(animalArray);
				animalx.selectedIndex = 0;
				edad.selectedIndex = 0;
				comentarios.value = "";
				preview.innerHTML = `<img src="assets/imgs/lion.svg" style="background-position: center top; background-size: contain; background-repeat: no-repeat;" height="200px">`;
			} else {
				document.getElementById("error").classList.remove("d-none");
				setTimeout(() => {
					document.getElementById("error").classList.add("d-none");
				}, 3000);
			}
		} catch (error) {
			document.getElementById("error").classList.remove("d-none");
			setTimeout(() => {
				document.getElementById("error").classList.add("d-none");
			}, 3000);
		}
	});
};

const drawAnimal = (animalArray) => {
	const animalesTabla = document.getElementById("animalesTabla");
	const animalesTemplate = document.getElementById("animalesTemplate").content;
	const fragment = document.createDocumentFragment();
	animalesTabla.innerHTML = "";

	animalArray.map((animal, index) => {
		const clone = animalesTemplate.cloneNode(true);
		clone.querySelector(".card-img-top").setAttribute("src", `${animal._img}`);
		clone.querySelector(".card-img-top").setAttribute("alt", `${animal._nombre}`);
		clone.querySelector(".card-img-top").setAttribute("data-bs-toggle", "modal");
		clone.querySelector(".card-img-top").setAttribute("data-bs-target", "#animalModal");
		clone.querySelector(".animal_sound_on_icon").dataset.nombreAudio = `${animal._nombre}Audio`;
		clone.querySelector(".card-img-top").dataset.nombreModal = `${animal._nombre}Modal`;
		clone.querySelector(".card-img-top").dataset.idAnimal = ++index;
		clone.querySelector(`.animal_card_audio`).setAttribute("src", `${animal._sonido}`);
		clone.querySelector(".animal_sound_on_icon").dataset.nombre = animal._nombre;
		fragment.appendChild(clone);
		cardAudio(animalArray);
		modalAnimal(animalArray, index);
	});
	animalesTabla.appendChild(fragment);
};

const cardAudio = (animalArray) => {
	document.addEventListener("click", (e) => {
		if (e.target.dataset.nombreAudio === "LeonAudio" && e.target.title === "on") {
			animalArray.find((item) => item._nombre === "Leon").Rugir();
		} else if (e.target.dataset.nombreAudio === "LoboAudio" && e.target.title === "on") {
			animalArray.find((item) => item._nombre === "Lobo").Aullar();
		} else if (e.target.dataset.nombreAudio === "OsoAudio" && e.target.title === "on") {
			animalArray.find((item) => item._nombre === "Oso").Grunir();
		} else if (e.target.dataset.nombreAudio === "SerpienteAudio" && e.target.title === "on") {
			animalArray.find((item) => item._nombre === "Serpiente").Sisear();
		} else if (e.target.dataset.nombreAudio === "AguilaAudio" && e.target.title === "on") {
			animalArray.find((item) => item._nombre === "Aguila").Chillar();
		}
	});
};

const modalAnimal = (animalArray) => {
	const animalesTabla = document.getElementById("animalesTabla");
	animalesTabla.addEventListener("click", (e) => {
		switch (e.target.dataset.nombreModal) {
			case "LeonModal":
				animalsModal(animalArray, e.target.dataset.idAnimal);
				break;
			case "LoboModal":
				animalsModal(animalArray, e.target.dataset.idAnimal);
				break;
			case "OsoModal":
				animalsModal(animalArray, e.target.dataset.idAnimal);
				break;
			case "SerpienteModal":
				animalsModal(animalArray, e.target.dataset.idAnimal);
				break;
			case "AguilaModal":
				animalsModal(animalArray, e.target.dataset.idAnimal);
				break;
			default:
				break;
		}
	});
};

function animalsModal(animalArray, id) {
	const animalModal = document.getElementById("animalModal");
	let genericHtml = "";
	const animal = animalArray.find((item) => item._idAnimal == id);
	genericHtml += `<div class="modal-dialog modal-dialog-centered w-25">
			<div class="modal-content bg-dark">
			  <img src="${animal._img}" class="card-img-top" alt="${animal._nombre}">
			  <div class="modal-body">
			   <p class="edadModal mb-2">${animal._edad}</p>
				<p class="comentariosTitleModal mb-0">Comentarios</p>
				<hr class="hrModal">
				<p class="comentariosModal">${animal._comentarios}</p>
			  </div>
			</div>
		  </div>`;
	animalModal.innerHTML = genericHtml;
}