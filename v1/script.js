document.addEventListener('DOMContentLoaded', (event) => {
    // Target elements with the "draggable" class
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
  });

  
  document.addEventListener('DOMContentLoaded', (event) => {
    // Show the modal when the page loads
    var modal = document.getElementById("deviceModal");
    modal.style.display = "block";

    // Close the modal when the user clicks on <span> (x)
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Close the modal if the user clicks anywhere outside of it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});


function anotherDevice(){
    document.getElementById("deviceModal").style.display = "block";
    document.getElementById("Showdevices").innerHTML = '';

}

function showDeviceOptions(deviceType) {
    var btnMobile = document.getElementById("btnMobile");
    var btnLaptop = document.getElementById("btnLaptop");
    var optionsDiv = document.getElementById("optionsContainer");
    var deviceOptionsDiv = document.getElementById("deviceOptions");
    var mobileBox = document.getElementById("mobile");
    var laptopBox = document.getElementById("laptop");

    // Reset active class
    btnMobile.classList.remove("active");
    btnLaptop.classList.remove("active");

    // optionsDiv.innerHTML = ""; // Clear previous options
    mobileBox.style.display = "none";
    laptopBox.style.display = "none";

    deviceOptionsDiv.style.display = "block";

    if (deviceType === "mobile") {
        btnMobile.classList.add("active");
        mobileBox.style.display = "flex";

        // optionsDiv.innerHTML = "<p>موبایل خود را انتخاب کنید</p> ...";
        // optionsDiv.innerHTML += "<div class='model-box' onclick='selectModel(\"Model-1-M\")'>Model 1</div>";
        // optionsDiv.innerHTML += "<div class='model-box' onclick='selectModel(\"Model-2-M\")'>Model 2</div>";   
     } else if (deviceType === "laptop") {
        btnLaptop.classList.add("active");
        laptopBox.style.display = "flex";
        // optionsDiv.innerHTML = "<p>لپتاپ خود را انتخاب کنید</p>";
        // optionsDiv.innerHTML += "<div class='model-box' onclick='selectModel(\"Model-1-L\")'>Model 1</div>";
        // optionsDiv.innerHTML += "<div class='model-box' onclick='selectModel(\"Model-2-L\")'>Model 2</div>";
        // Add more models as needed
    }
}

function selectModel(modelName) {
    var laptopDiv = document.getElementById("Showdevices");
    console.log(modelName);
    laptopDiv.innerHTML = '<img src="'+modelName+'.png">';
    // Close modal
    document.getElementById("deviceModal").style.display = "none";
}

function goBack() {
    document.getElementById("deviceOptions").style.display = "none";
}
