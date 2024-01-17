document.addEventListener('DOMContentLoaded', function() {
    var stickers = document.querySelectorAll('.sticker');
    var laptopContainer = document.getElementById('laptop-container');
    var laptopRect = laptopContainer.getBoundingClientRect();
    var selectedSticker = null;

    stickers.forEach(function(sticker) {
        sticker.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', e.target.id);
        });
    });

    laptopContainer.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    laptopContainer.addEventListener('drop', function(e) {
        e.preventDefault();
        var data = e.dataTransfer.getData('text');
        console.log(data)
        var originalSticker = document.getElementById(data);

        if (!originalSticker) {
            console.error('Sticker not found:', data);
            return;
        }

        var clone = originalSticker.cloneNode(true);
        clone.id.remove
        clone.id = data+data
        clone.classList.add('on-laptop');
        clone.style.position = 'absolute';

        var x = e.clientX - laptopRect.left - (clone.offsetWidth / 2);
        var y = e.clientY - laptopRect.top - (clone.offsetHeight / 2);

        clone.style.left = x + 'px';
        clone.style.top = y + 'px';

        laptopContainer.appendChild(clone);

        // Add click listener to toggle selection of the sticker
        clone.addEventListener('click', function() {
            if (selectedSticker === this) {
                selectedSticker.classList.remove('selected');
                selectedSticker = null;
            } else {
                if (selectedSticker) {
                    selectedSticker.classList.remove('selected');
                }
                selectedSticker = this;
                // let e = 3;
                // selectedSticker.style.left = (e - 1) + 'px';
                selectedSticker.classList.add('selected');
            }
        });
    });

    // Move selected sticker with arrow keys
    document.addEventListener('keydown', function(e) {
        if (!selectedSticker) return;
        let left = window.getComputedStyle(selectedSticker,null).getPropertyValue("left");
        let top = window.getComputedStyle(selectedSticker,null).getPropertyValue("top");;
        left = parseInt(left)
        top = parseInt(top)

        switch (e.key) {
            case 'ArrowLeft':
                selectedSticker.style.left = (left - 1) + 'px';
                break;
            case 'ArrowRight':
                selectedSticker.style.left = (left + 1) + 'px';
                break;
            case 'ArrowUp':
                selectedSticker.style.top = (top - 1) + 'px';
                break;
            case 'ArrowDown':
                selectedSticker.style.top = (top + 1) + 'px';
                break;
        }
    });
});
