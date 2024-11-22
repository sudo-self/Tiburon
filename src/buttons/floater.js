// Floater.js source code by J.R.

(function() {
   var style = document.createElement('style');
   style.innerHTML = `
     .btn-1732205165-floating-button {
       position: fixed;
       bottom: 20px;
       right: 20px;
       display: flex;
       justify-content: center;
       align-items: center;
       cursor: pointer;
       box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
       transition: background-color 0.3s ease;
       z-index: 1000;
       border-radius: 50%;
       width: 60px;
       height: 60px;
       background-image: url('https://magazin.rikoribnica.com/wp-content/uploads/2023/10/Screenshot-2023-11-02-at-16.49.58-940x560.jpg');
       background-size: cover;
       background-position: center;
       background-repeat: no-repeat;
     }

     .btn-1732205165-floating-button:hover {
       background-color: rgba(75, 0, 130, 0.8);
     }

     .btn-1732205165-popup {
       display: none;
       position: fixed;
       top: 50%;
       left: 50%;
       transform: translate(-50%, -50%);
       width: 80%;
       max-width: 600px;
       background-color: #2d3748;
       color: #e5e7eb;
       padding: 20px;
       border-radius: 8px;
       box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
       z-index: 1001;
       opacity: 0;
       transition: opacity 0.3s ease;
     }

     .btn-1732205165-popup iframe {
       width: 100%;
       height: 400px;
       border: none;
     }

     .btn-1732205165-close-button {
       position: absolute;
       top: 10px;
       right: 10px;
       background-color: #e74c3c;
       border: none;
       color: #ffffff;
       border-radius: 50%;
       width: 30px;
       height: 30px;
       display: flex;
       justify-content: center;
       align-items: center;
       cursor: pointer;
     }

     .btn-1732205165-tooltip {
       position: absolute;
       bottom: 70px;
       left: 50%;
       transform: translateX(-50%);
       background-color: rgba(0, 0, 0, 0.7);
       color: #f8f8f2;
       border-radius: 5px;
       padding: 5px 10px;
       font-size: 12px;
       white-space: nowrap;
       opacity: 0;
       transition: opacity 0.3s ease;
       pointer-events: none;
       z-index: 1002;
     }

     .btn-1732205165-tooltip.visible {
       opacity: 1;
     }

     .btn-1732205165-floating-button.long-press {
       animation: rumble 0.3s ease forwards;
     }

     @keyframes rumble {
       0%, 100% { transform: translate(0); }
       25% { transform: translate(-2px, 2px); }
       50% { transform: translate(2px, -2px); }
       75% { transform: translate(-2px, -2px); }
     }
   `;
   document.head.appendChild(style);

   var button = document.createElement('div');
   button.className = 'btn-1732205165-floating-button';
   document.body.appendChild(button);

   var tooltip = document.createElement('div');
   tooltip.className = 'btn-1732205165-tooltip';
   tooltip.innerText = 'this cool button';
   button.appendChild(tooltip);

   let longPressTimeout;

   button.addEventListener('mousedown', startLongPress);
   button.addEventListener('touchstart', function(e) {
     e.preventDefault();
     startLongPress();
   });

   function startLongPress() {
     longPressTimeout = setTimeout(() => {
       button.classList.add('long-press');
       if (navigator.vibrate) {
         navigator.vibrate(200);
       }
       openPopup();
     }, 500);
   }

   button.addEventListener('mouseup', endLongPress);
   button.addEventListener('mouseleave', endLongPress);
   button.addEventListener('touchend', endLongPress);

   function endLongPress() {
     clearTimeout(longPressTimeout);
     button.classList.remove('long-press');
   }

   var popup = document.createElement('div');
   popup.id = 'btn-1732205165-popup';
   popup.className = 'btn-1732205165-popup';
   popup.innerHTML = `
     <button class="btn-1732205165-close-button" onclick="closePopup()">×</button>
     <iframe src="https://github.com" title="Floater Content"></iframe>
   `;
   document.body.appendChild(popup);

   function openPopup() {
     popup.style.display = 'block';
     popup.style.opacity = '1';
   }

   function closePopup() {
     popup.style.opacity = '0';
     setTimeout(() => {
       popup.style.display = 'none';
     }, 300);
   }

   button.addEventListener('click', openPopup);

   var closeButton = popup.querySelector('.btn-1732205165-close-button');
   closeButton.addEventListener('click', closePopup);

   button.addEventListener('mouseover', () => {
     tooltip.classList.add('visible');
   });
   button.addEventListener('mouseout', () => {
     tooltip.classList.remove('visible');
   });

   button.addEventListener('touchstart', () => {
     tooltip.classList.add('visible');
   });
   button.addEventListener('touchend', () => {
     tooltip.classList.remove('visible');
   });

   let isDragging = false;
   let offsetX, offsetY;

   function startDrag(e) {
     isDragging = true;
     const clientX = e.clientX || e.touches[0].clientX;
     const clientY = e.clientY || e.touches[0].clientY;
     offsetX = clientX - button.getBoundingClientRect().left;
     offsetY = clientY - button.getBoundingClientRect().top;
     document.addEventListener('mousemove', onMouseMove);
     document.addEventListener('mouseup', onMouseUp);
     document.addEventListener('touchmove', onTouchMove);
     document.addEventListener('touchend', onTouchEnd);
   }

   function onMouseMove(e) {
     if (isDragging) {
       const newLeft = e.clientX - offsetX;
       const newTop = e.clientY - offsetY;
       button.style.left = `${newLeft}px`;
       button.style.top = `${newTop}px`;
     }
   }

   function onMouseUp() {
     isDragging = false;
     document.removeEventListener('mousemove', onMouseMove);
     document.removeEventListener('mouseup', onMouseUp);
   }

   function onTouchMove(e) {
     if (isDragging) {
       const touch = e.touches[0];
       const newLeft = touch.clientX - offsetX;
       const newTop = touch.clientY - offsetY;
       button.style.left = `${newLeft}px`;
       button.style.top = `${newTop}px`;
     }
   }

   function onTouchEnd() {
     isDragging = false;
     document.removeEventListener('touchmove', onTouchMove);
     document.removeEventListener('touchend', onTouchEnd);
   }

   button.addEventListener('mousedown', startDrag);
   button.addEventListener('touchstart', (e) => {
     e.preventDefault();
     startDrag(e);
   });
 })();
