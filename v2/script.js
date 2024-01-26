// document.addEventListener('DOMContentLoaded', () => {
//   openModal();
//   setupDragDrop();
//   populateStickers();
//   setupDeviceOptions();



// });


document.addEventListener('DOMContentLoaded', () => {
  showDescriptionModal();
  setupDragDrop();
  populateStickers();
  setupDeviceOptions();
});


function showDescriptionModal() {
  const descriptionModal = document.getElementById("descriptionModal");
  descriptionModal.style.display = "block";

  const understandButton = document.getElementById("understandButton");
  understandButton.onclick = () => {
    descriptionModal.style.display = "none";
    openDeviceModal();
  };
}


function openDeviceModal() {
  const deviceModal = document.getElementById("deviceModal");
  deviceModal.style.display = "block";
}

// function openModal() {
//   const modal = document.getElementById("deviceModal");
//   modal.style.display = "block";
// }

function closeModal() {
  const modal = document.getElementById("deviceModal");
  modal.style.display = "none";
}

function populateStickers() {
  const stickers = document.querySelector('.stickers');
  for (let i = 1; i <= 12; i++) {
      const sticker = document.createElement('div');
      sticker.className = 'sticker drag-drop';
      sticker.style.backgroundImage = `url('stickers/sticker${i}.png')`;
      stickers.appendChild(sticker);
  }
}

function setupDeviceOptions() {
  const btnMobile = document.getElementById('btnMobile');
  const btnLaptop = document.getElementById('btnLaptop');
  const deviceSelection = document.getElementById('deviceSelection');

  btnMobile.addEventListener('click', () => {
      deviceSelection.innerHTML = generateDeviceOptions('mobile');
  });

  btnLaptop.addEventListener('click', () => {
      deviceSelection.innerHTML = generateDeviceOptions('laptop');
  });
}

function generateDeviceOptions(deviceType) {
  let optionsHtml = '';
  if (deviceType === 'mobile') {
      optionsHtml += deviceOptionHTML('mobile1.png', 'iPhone 13', '5.78', '2.82'); // iPhone 13 dimensions in inches
  } else {
      optionsHtml += deviceOptionHTML('laptop1.png', 'MacBook Pro 16"', '14.09', '9.68'); // 16-inch screen dimensions in inches
      optionsHtml += deviceOptionHTML('laptop2.png', 'MacBook Pro 13"', '11.97', '8.36'); // 13-inch screen dimensions
      optionsHtml += deviceOptionHTML('laptop3.png', 'MacBook Pro 14"', '12.31', '8.71'); // 14-inch screen dimensions
  }
  return optionsHtml;
}

function deviceOptionHTML(image, name, width, height) {
  return `
      <div class="device-option" onclick="selectDevice('${image}', '${width}', '${height}')">
          <img src='${image}' alt='${name}'>
          <p>${name}</p>
      </div>`;
}

function selectDevice(deviceImage, widthInches, heightInches) {
  const dropzone = document.getElementById('Showdevices');
  const imageSize = calculateImageSize(widthInches, heightInches);
  // dropzone.innerHTML = `<img src='${deviceImage}' alt='Device' style='width: ${imageSize.width}px; height: ${imageSize.height}px;'>`;
  dropzone.innerHTML = `<img src='${deviceImage}' alt='Device'>`;

  closeModal();
}

function calculateImageSize(widthInches, heightInches) {
  // Convert inches to a suitable pixel size for the simulator
  const pixelPerInch = 10; // Adjust this value as needed for scaling
  let width = widthInches * pixelPerInch;
  let height = heightInches * pixelPerInch;
  return { width, height };
}

function anotherDevice() {
  const modal = document.getElementById("deviceModal");
  modal.style.display = "block";
}

// function populateStickers() {
//   const stickers = document.querySelector('.stickers');
//   for (let i = 1; i <= 12; i++) {
//       const sticker = document.createElement('div');
//       sticker.className = 'sticker drag-drop';
//       sticker.style.backgroundImage = `url('stickers/sticker${i}.png')`;
//       stickers.appendChild(sticker);
//   }
// }



function populateStickers() {
  const stickers = document.querySelector('.stickers');
  for (let i = 1; i <= 12; i++) {
    const sticker = document.createElement('div');
    sticker.className = 'sticker drag-drop';
    sticker.style.backgroundImage = `url('stickers/sticker${i}.png')`;
    sticker.setAttribute('data-rotation', '0');
    sticker.setAttribute('data-x', '0'); // Initial translation X
    sticker.setAttribute('data-y', '0'); // Initial translation Y
    sticker.onclick = (event) => toggleRotationMode(event.currentTarget);
    stickers.appendChild(sticker);
  }
}

function toggleRotationMode(stickerElement) {
  if (stickerElement.classList.contains('rotate-mode')) {
    stickerElement.classList.remove('rotate-mode');
    window.removeEventListener('keydown', stickerElement.rotationHandler);
    clearTimeout(stickerElement.rotationTimeout);
    hideRotationPopup();
  } else {
    stickerElement.classList.add('rotate-mode');
    stickerElement.rotationHandler = (event) => rotateSticker(event, stickerElement);
    window.addEventListener('keydown', stickerElement.rotationHandler);

    // Set a timeout to automatically disable rotation mode and show popup
    stickerElement.rotationTimeout = setTimeout(() => {
      stickerElement.classList.remove('rotate-mode');
      window.removeEventListener('keydown', stickerElement.rotationHandler);
      hideRotationPopup();
    }, 10000); // 3 seconds timeout

    // Show the popup after 2 seconds
    setTimeout(() => {
      if (stickerElement.classList.contains('rotate-mode')) {
        showRotationPopup();
      }
    }, 500); // 2 seconds timeout
  }
}
function rotateSticker(event, stickerElement) {
  let rotationDegree = parseInt(stickerElement.getAttribute('data-rotation'), 10);
  let x = parseFloat(stickerElement.getAttribute('data-x')) || 0;
  let y = parseFloat(stickerElement.getAttribute('data-y')) || 0;

  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    if (event.key === 'ArrowRight') {
      rotationDegree += 10;
    } else {
      rotationDegree -= 10;
    }

    stickerElement.style.transform = `translate(${x}px, ${y}px) rotate(${rotationDegree}deg)`;
    stickerElement.setAttribute('data-rotation', rotationDegree.toString());

    // Reset the timeout each time an arrow key is pressed
    clearTimeout(stickerElement.rotationTimeout);
    stickerElement.rotationTimeout = setTimeout(() => {
      stickerElement.classList.remove('rotate-mode');
      window.removeEventListener('keydown', stickerElement.rotationHandler);
    }, 3000); // 3 seconds timeout
  }
}


function showRotationPopup() {
  document.getElementById('rotationPopup').classList.add('show');
}

function hideRotationPopup() {
  document.getElementById('rotationPopup').classList.remove('show');
}




function setupDragDrop() {
  interact('.drag-drop').draggable({
      // Enable inertial throwing
      inertia: true,
      // Keep the element within the area of its parent
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true
        })
      ],
      // Enable autoScroll
      autoScroll: true,
      listeners: {
        // Call this function on every dragmove event
        move: dragMoveListener
      }
    });
  
    function dragMoveListener(event) {
      var target = event.target;
      // Keep the dragged position in the data-x/data-y attributes
      var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
  
      // Translate the element
      target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
  
      // Update the position attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }
  
    // Enable dropping on the ".dropzone" elements
    interact('.dropzone').dropzone({
      // Only accept elements matching this CSS selector
      accept: '.draggable',
      // Require a 75% element overlap for a drop to be possible
      overlap: 0.45,
      listeners: {
        drop(event) {
          // When a drop happens, add the "dropped" class to the draggable element
          event.relatedTarget.classList.add('dropped');
        }
      }
    });
  }