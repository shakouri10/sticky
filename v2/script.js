const stickers = [
  {
    name: "Sticker_1",
    address: "stickers/sticker1.png",
    size:[ { widthCm: "6", heightCm: "4" },{ widthCm: "8", heightCm: "7" }]
  },
  {
    name: "Sticker_2",
    address: "stickers/sticker2.png",
    size:[ { widthCm: "6", heightCm: "4" },{ widthCm: "8", heightCm: "7" }]
  },
  {
    name: "Sticker_3",
    address: "stickers/sticker3.png",
    size:[ { widthCm: "6", heightCm: "4" },{ widthCm: "8", heightCm: "7" }]
  },
  {
    name: "Sticker_4",
    address: "stickers/sticker4.png",
    size:[ { widthCm: "6", heightCm: "4" },{ widthCm: "8", heightCm: "7" }]
  },
  {
    name: "Sticker_5",
    address: "stickers/sticker5.png",
    size:[ { widthCm: "6", heightCm: "4" },{ widthCm: "8", heightCm: "7" }]
  },
  {
    name: "Sticker_6",
    address: "stickers/sticker6.png",
    size:[ { widthCm: "6", heightCm: "4" },{ widthCm: "8", heightCm: "7" }]
  },
  {
    name: "Sticker_7",
    address: "stickers/sticker7.png",
    size:[ { widthCm: "6", heightCm: "4" },{ widthCm: "8", heightCm: "7" }]
  },
  {
    name: "Sticker_8",
    address: "stickers/sticker8.png",
    size:[ { widthCm: "6", heightCm: "4" },{ widthCm: "8", heightCm: "7" }]
  },
  {
    name: "Sticker_9",
    address: "stickers/sticker9.png",
    size:[ { widthCm: "6", heightCm: "4" },{ widthCm: "8", heightCm: "7" }]
  },
  {
    name: "Sticker_10",
    address: "stickers/sticker10.png",
    size:[ { widthCm: "6", heightCm: "4" },{ widthCm: "8", heightCm: "7" }]
  },
  {
    name: "Sticker_11",
    address: "stickers/sticker11.png",
    size:[ { widthCm: "6", heightCm: "4" },{ widthCm: "8", heightCm: "7" }]
  },
  {
    name: "Sticker_12",
    address: "stickers/sticker12.png",
    size:[ { widthCm: "6", heightCm: "4" },{ widthCm: "8", heightCm: "7" }]
  },
  {
    name: "Sticker_13",
    address: "stickers/sticker13.png",
    size:[ { widthCm: "6", heightCm: "4" },{ widthCm: "8", heightCm: "7" }]
  },
];

const devices = [
  {
    type: "mobile",
    models: [
      {
        name: "iPhone_13",
        address: "devices/iphone13.png",
        widthCm: "7.1628",
        heightCm: "14.6812"
      },
      // Add more mobile models here
    ]
  },
  {
    type: "laptop",
    models: [
      {
        name: "MacBook_Pro_16\"",
        address: "devices/macbookpro16.png",
        widthCm: "35.7886",
        heightCm: "24.5872"
      },
      {
        name: "MacBook_Pro_13\"",
        address: "devices/macbookpro13.png",
        widthCm: "30.4038",
        heightCm: "21.2344"
      },
      {
        name: "MacBook_Pro_14\"",
        address: "devices/macbookpro14.png",
        widthCm: "31.2674",
        heightCm: "22.1234"
      },

      // Add more laptop models here
    ]
  },
  // Add other device types as needed
];

document.addEventListener('DOMContentLoaded', () => {
  showDescriptionModal();
  setupDragDrop();
  populateStickerSidebar(); // Populate sidebar instead of directly populating the stickers area
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
  const filteredDevices = devices.filter(device => device.type === deviceType);
  
  if (filteredDevices.length > 0) {
    filteredDevices[0].models.forEach((model) => {
      optionsHtml += deviceOptionHTML(model.address, model.name, model.widthCm, model.heightCm);
    });
  }

  return optionsHtml;
}

function deviceOptionHTML(image, name, widthCm, heightCm) {
  return `
      <div class="device-option" onclick="selectDevice('${image}', '${widthCm}', '${heightCm}')">
          <img src='${image}' alt='${name}'>
          <p>${name}</p>
      </div>`;
}

function selectDevice(deviceImage, widthCm, heightCm) {
  const dropzone = document.getElementById('Showdevices');
  const { width, height } = calculateImageSize(widthCm, heightCm);
  
  dropzone.innerHTML = `<img src='${deviceImage}' alt='Device' style='width: ${width}px; height: ${height}px;'>`;

  closeModal();
}

function calculateImageSize(widthCm, heightCm) {
  // Conversion factor: Adjust based on your display requirements
  const pixelPerCm = 30;

  let width = widthCm * pixelPerCm;
  let height = heightCm * pixelPerCm;

  return { width, height };
}

function calculateStickerSize(widthCm, heightCm) {
  // Example conversion factor: 10 pixels per cm
  const pixelPerCm = 30;
  let width = widthCm * pixelPerCm;
  let height = heightCm * pixelPerCm;
  return { width, height };
}

function anotherDevice() {
  const modal = document.getElementById("deviceModal");
  modal.style.display = "block";
}

function populateStickerSidebar() {
  const stickerList = document.getElementById('stickerList');
  stickers.forEach((sticker) => {
      const stickerImg = document.createElement('img');
      stickerImg.src = sticker.address;
      stickerImg.className = 'sticker-preview';
      stickerImg.alt = sticker.name;

      const addButton = document.createElement('button');
      addButton.innerText = '+';
      addButton.className = 'add-sticker-btn';
      addButton.onclick = () => promptStickerSizeSelection(sticker); // Adjusted to include size selection

      const stickerItem = document.createElement('div');
      stickerItem.appendChild(stickerImg);
      stickerItem.appendChild(addButton);
      stickerList.appendChild(stickerItem);
  });
}

function promptStickerSizeSelection(sticker) {
  // Generate a message string with size options
  let sizeOptionsString = sticker.size.map((size, index) => `${index + 1}: ${size.widthCm}cm x ${size.heightCm}cm`).join('\n');
  let userChoice = window.prompt(`Choose a size for ${sticker.name}:\n${sizeOptionsString}\nEnter number:`);
  let selectedIndex = parseInt(userChoice, 10) - 1;

  // Validate user choice and call addStickerToDropzone with selected size
  if (!isNaN(selectedIndex) && selectedIndex >= 0 && selectedIndex < sticker.size.length) {
      addStickerToDropzone(sticker, sticker.size[selectedIndex]);
  } else {
      alert("Invalid choice. Please try again.");
  }
}

function addStickerToDropzone(sticker, selectedSize) {
  const stickerDiv = document.createElement('div');
  stickerDiv.className = 'sticker drag-drop';
  stickerDiv.style.backgroundImage = `url('${sticker.address}')`;
  stickerDiv.setAttribute('data-rotation', '0');
  stickerDiv.setAttribute('data-x', '0'); // Initial translation X
  stickerDiv.setAttribute('data-y', '0'); // Initial translation Y
  stickerDiv.onclick = (event) => toggleRotationMode(event.currentTarget);

  const { width, height } = calculateStickerSize(selectedSize.widthCm, selectedSize.heightCm);
  stickerDiv.style.width = `${width}px`;
  stickerDiv.style.height = `${height}px`;

  // Create and append the remove button
  const removeButton = document.createElement('button');
  removeButton.innerText = '-';
  removeButton.className = 'remove-sticker-btn';
  removeButton.style.display = 'none'; // Initially hide the button
  removeButton.onclick = () => stickerDiv.remove();
  stickerDiv.appendChild(removeButton);

  // Show the remove button on hover
  stickerDiv.onmouseenter = () => removeButton.style.display = 'block';
  stickerDiv.onmouseleave = () => removeButton.style.display = 'none';

  document.getElementById('listSticker').appendChild(stickerDiv);
  setupDragDrop(); // Re-initialize drag and drop for the new sticker
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