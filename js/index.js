let burger = document.querySelector('.burger')
let burgerMenu = document.querySelector('.burger_menu')
let nav = document.querySelector('.navigation_header')
let logo = document.querySelector('.logo')

burger.addEventListener('click', () => {
	burger.classList.toggle('active');
	burgerMenu.classList.toggle('active');
	nav.classList.toggle('active');
	logo.classList.toggle('active');
});

gsap.to(".circle-text", {
  rotate: 360,
  repeat: -1,
  duration: 10,
  ease: "linear"
});

const circleText = document.querySelectorAll('.circle-text span');
const totalChars = circleText.length;

document.documentElement.style.setProperty('--total-chars', totalChars);

circleText.forEach((span, index) => {
  span.style.setProperty('--n', index);
});

const texts = document.querySelectorAll('.typing-text');
let delayBetweenLoops = 3000; 

function typeTexts() {
  texts.forEach((text, index) => {
    setTimeout(() => {
      text.classList.remove('hidden');
      text.classList.add('visible');
    }, index);
  });

  setTimeout(() => {
    texts.forEach(text => {
      text.classList.remove('visible');
      text.classList.add('hidden');
    });
  }, 2500);
}

setInterval(typeTexts, delayBetweenLoops);
typeTexts();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const container = document.getElementById('3d-logo-container');

// Функция обновления размеров рендера под размеры контейнера
function resizeRenderer() {
	const containerWidth = container.clientWidth;
	const containerHeight = container.clientHeight;
	renderer.setSize(containerWidth, containerHeight);
	camera.aspect = containerWidth / containerHeight;
	camera.updateProjectionMatrix();
}

resizeRenderer();
container.appendChild(renderer.domElement);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(2, 3, 2);
directionalLight.castShadow = true;
scene.add(directionalLight);

directionalLight.shadow.mapSize.width = 3048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 1000;
directionalLight.shadow.camera.left = -20;
directionalLight.shadow.camera.right = 20;
directionalLight.shadow.camera.top = 20;
directionalLight.shadow.camera.bottom = -20;
directionalLight.shadow.radius = 5;

let model;
let initialRotationX = Math.PI / 80;
let initialRotationY = Math.PI / 5;

const loader = new THREE.GLTFLoader();
loader.load('.../img/ASAP_3D_LOGO.glb', function(gltf) {
    model = gltf.scene;
    model.traverse(function(child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.geometry.center();
        }
    });
    scene.add(model);
    model.position.set(0, 0, 0);
    model.scale.set(1, 1, 1);
    model.rotation.x = initialRotationX;
    model.rotation.y = initialRotationY;
    model.rotation.z = 0;
    animate();
}, undefined, function(error) {
    console.error(error);
});

const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -3;
plane.receiveShadow = true;
scene.add(plane);

camera.position.set(-1, 1, 9);

let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) / windowHalfX;
    mouseY = (event.clientY - windowHalfY) / windowHalfY;
});

function applyParallaxEffect() {
    if (model) {
        targetX = mouseX * 3;
        targetY = mouseY * 3;
        model.rotation.y = initialRotationY + (targetX - model.rotation.y) * 0.2;
        model.rotation.x = initialRotationX + (targetY - model.rotation.x) * 0.2;
    }
}

function updateModelScale() {
	if (window.innerWidth < 768) {
		model && model.scale.set(0.8, 0.8, 0.8);
		camera.position.set(-1, 1, 10);
	} else {
		model && model.scale.set(1, 1, 1);
		camera.position.set(-1, 1, 9);
	}
}

window.addEventListener('resize', () => {
	resizeRenderer();
	updateModelScale();
});

updateModelScale();

function animate() {
    requestAnimationFrame(animate);
    applyParallaxEffect();
    renderer.render(scene, camera);
}

animate();


gsap.registerPlugin(ScrollTrigger);

const horizontalScroll = gsap.to(".directions__wrapper", {
  xPercent: -100 * (document.querySelectorAll(".directions__item").length - 1), 
  ease: "none",
  scrollTrigger: {
    trigger: ".directions",
    pin: true,
    scrub: true,
    snap: {
      snapTo: 1 / (document.querySelectorAll(".directions__item").length - 1),
      duration: { min: 0.005, max: 0.9 },
      ease: "power1.inOut"
    },
    end: () => "+=" + document.querySelector(".directions__wrapper").offsetWidth
  }
});

window.addEventListener('scroll', () => {
  const element = document.querySelector('.showreel__img');
  const rect = element.getBoundingClientRect();
  
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    element.classList.add('active')
  } else {
    element.classList.remove('active')
  }
});

window.addEventListener('scroll', function () {
  const workWithUs = document.querySelector('.work_with_us');
  const callUs = document.querySelector('.call_us');
  const socialMedia = document.querySelector('.social_media');
  const header = document.querySelector('.header');

  const workWithUsTop = workWithUs.getBoundingClientRect().top;

  if (workWithUsTop <= 0) {
      callUs.classList.add('active');
      socialMedia.classList.add('active');
      header.classList.add('active');
      workWithUs.classList.add('rounded');

  } else {
      callUs.classList.remove('active');
      socialMedia.classList.remove('active');
      header.classList.remove('active');
      workWithUs.classList.remove('rounded');
  }
});

gsap.registerPlugin(ScrollTrigger);

const backgrounds = [
  'url(.../img/directions-bg/directions-bg.png)',
  'url(.../img/directions-bg/blue.png)',
  'url(.../img/directions-bg/pink.png)',
  'url(.../img/directions-bg/yellow.png)'
];

const directions = document.querySelector('.directions');
const bgElement = document.querySelector('.directions__bg');
const slides = document.querySelectorAll('.directions__item');
const totalSlides = slides.length;

bgElement.style.backgroundImage = backgrounds[0];

let lastSlideIndex = 0;

gsap.to(".directions__wrapper", {
  xPercent: -100 * (totalSlides - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".directions",
    pin: true,
    scrub: true,
    snap: {
      snapTo: 1 / (totalSlides - 1),
      duration: { min: 0.1, max: 0.9 },
      ease: "power1.inOut"
    },
    end: () => "+=" + document.querySelector(".directions__wrapper").offsetWidth,
    onUpdate: (self) => {
      let slideIndex = Math.round(self.progress * (totalSlides - 1));
      if (slideIndex !== lastSlideIndex) {
        gsap.to(bgElement, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            bgElement.style.backgroundImage = backgrounds[slideIndex];
            gsap.to(bgElement, { opacity: 1, duration: 0.5 });
          }
        });
        lastSlideIndex = slideIndex;
      }
    }
  }
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetID = this.getAttribute('href');
    const targetElement = document.querySelector(targetID);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
