document.addEventListener('DOMContentLoaded', () => {
  openModal();
  setupDragDrop();
  populateStickers();
  setupDeviceOptions();
});



function openModal() {
  const modal = document.getElementById("deviceModal");
  modal.style.display = "block";
}

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

function populateStickers() {
  const stickers = document.querySelector('.stickers');
  for (let i = 1; i <= 12; i++) {
      const sticker = document.createElement('div');
      sticker.className = 'sticker drag-drop';
      sticker.style.backgroundImage = `url('stickers/sticker${i}.png')`;
      stickers.appendChild(sticker);
  }
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