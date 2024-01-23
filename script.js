// // Store the position for each sticker
// const positions = {};

// interact('.drag-drop').draggable({
//   listeners: {
//     start(event) {
//       let id = event.target.getAttribute('data-id');
//       if (!positions[id]) {
//         positions[id] = { x: 0, y: 0 };
//       }
//     },
//     move(event) {
//       let id = event.target.getAttribute('data-id');
//       positions[id].x += event.dx;
//       positions[id].y += event.dy;

//       event.target.style.transform =
//         `translate(${positions[id].x}px, ${positions[id].y}px)`;
//     },
//   }
// });



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
      overlap: 0.1,
      listeners: {
        drop(event) {
          // When a drop happens, add the "dropped" class to the draggable element
          event.relatedTarget.classList.add('dropped');
        }
      }
    });
  });
  