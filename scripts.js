// scripts.js
// Puoi aggiungere script extra per animazioni o CMS in futuro
console.log("LECCESSO site loaded");

document.addEventListener("DOMContentLoaded", () => {

  const banner = document.getElementById("top-banner");
  if (banner) {
    banner.addEventListener("click", () => {
      const item = document.querySelector('[data-show="mostra-2"]');
      if (item) {
        item.click(); // Simula il click sull'art-item della mostra 2
      }
    });
  }

    const artItems = document.querySelectorAll(".art-item");
    const popup = document.getElementById("showcase-popup");
  
    const mostre = {
      "mostra-1": {
        titolo: "LARSURA OPENING",
        descrizione: "In the heart of the bathroom, a new era begins: Larsura. This exhibition is an ode to thirst, to the heat that disorients, to the longing that is not just for water, but for the soul. Amidst the sanitary fixtures bearing witness to silence and held breaths, the displayed works glorify the bar’s birth as a mirage in the desert. Inside, everything sweats. Even the art.",
        opere: [
          { img: "img/prima/opere-opening-05.jpg", titolo: "Carpi Bridge", artista: "Unknown Artist", data: "2025" },
          { img: "img/prima/opere-opening-04.jpg", titolo: "Oasi", artista: "Unknown Artist", data: "2025" },
          { img: "img/prima/opere-opening-06.jpg", titolo: "Always drink during the hottest hour", artista: "Unknown Artist", data: "2025" },
          { img: "img/prima/opere-opening-07.jpg", titolo: "Hot XXX", artista: "Unknown Artist", data: "2025" },
          { img: "img/prima/opere-opening-08.jpg", titolo: "Kinotto", artista: "Skiantos", data: "1974" },
          { img: "img/prima/opere-opening-09.jpg", titolo: "Second opening", artista: "Unknown Artist", data: "2025"},
          { img: "img/prima/opere-opening-10.jpg", titolo: "Arsura, Romania", artista: "source: Wikipedia" },
          { img: "img/prima/opere-opening-11.jpg", titolo: "Arsura V.I.P.", artista: "Unknown Artist", data: "2025" },
          { img: "img/prima/opere-opening-12.jpg", titolo: "Portobello", artista: "Unknown Artist", data: "2025" },
          { img: "img/prima/opere-opening-13.jpg", titolo: "Le Fauci Secche", artista: "Unknown Artist", data: "2025"  },
        ]
      },

      "mostra-2": {
        titolo: "LARSURA OPENING",
        descrizione: "In the heart of the bathroom, a new era begins: Larsura. This exhibition is an ode to thirst, to the heat that disorients, to the longing that is not just for water, but for the soul. Amidst the sanitary fixtures bearing witness to silence and held breaths, the displayed works glorify the bar’s birth as a mirage in the desert. Inside, everything sweats. Even the art.",
        opere: [
          { img: "img/prima/opere-opening-05.jpg", titolo: "Carpi Bridge", artista: "Unknown Artist", data: "2025" },
          { img: "img/prima/opere-opening-04.jpg", titolo: "Oasi", artista: "Unknown Artist", data: "2025" },
          { img: "img/prima/opere-opening-06.jpg", titolo: "Always drink during the hottest hour", artista: "Unknown Artist", data: "2025" },
          { img: "img/prima/opere-opening-07.jpg", titolo: "Hot XXX", artista: "Unknown Artist", data: "2025" },
          { img: "img/prima/opere-opening-08.jpg", titolo: "Kinotto", artista: "Skiantos", data: "1974" },
          { img: "img/prima/opere-opening-09.jpg", titolo: "Second opening", artista: "Unknown Artist", data: "2025"},
          { img: "img/prima/opere-opening-10.jpg", titolo: "Arsura, Romania", artista: "source: Wikipedia" },
          { img: "img/prima/opere-opening-11.jpg", titolo: "Arsura V.I.P.", artista: "Unknown Artist", data: "2025" },
          { img: "img/prima/opere-opening-12.jpg", titolo: "Portobello", artista: "Unknown Artist", data: "2025" },
          { img: "img/prima/opere-opening-13.jpg", titolo: "Le Fauci Secche", artista: "Unknown Artist", data: "2025"  },
        ]
      }

      
    };
  
    artItems.forEach(item => {
      item.addEventListener("click", () => {
        const showId = item.getAttribute("data-show");
        const mostra = mostre[showId];
  
        if (mostra && mostra.opere.length) {
          popup.innerHTML = `
            <div class="scroll-progress"></div>
            <div class="popup-header">
              <h2>${mostra.titolo}</h2>
              <p>${mostra.descrizione}</p>
              <div class="popup-close" id="popup-close">×</div>
            </div>
            <div class="popup-content">
            <div id="fullscreen-viewer" class="fullscreen-hidden"></div>
              ${mostra.opere.map(opera => `
                <div class="popup-item">
                  <img src="${opera.img}" alt="${opera.titolo}">
                  <div class="caption">
                    <h3>${opera.titolo}</h3>
                    <p>${opera.artista} – ${opera.data}</p>
                  </div>
                </div>
              `).join("")}
            </div>
          `;

        // Aggiungi il click per vedere l'immagine singola a schermo intero
        document.querySelectorAll('.popup-item img').forEach((img) => {
        img.addEventListener("click", () => {
        document.body.classList.add("fullscreen-image-open");
        const viewer = document.getElementById("fullscreen-viewer");
        viewer.innerHTML = `<img src="${img.src}" alt="">`;
        viewer.classList.add("active");
    
        // Chiudi con un qualsiasi click sullo schermo
        viewer.addEventListener("click", () => {
            document.body.classList.remove("fullscreen-image-open");
            viewer.classList.remove("active");
            viewer.innerHTML = "";
        }, { once: true }); // una sola volta
        });
    });

        popup.classList.add("active")
        popup.classList.add("active");
        popup.scrollTop = 0; // ✅ Resetta lo scroll in cima
        document.body.classList.add("popup-open");

        const scrollProgress = document.querySelector(".scroll-progress");

        popup.addEventListener("scroll", () => {
        const scrollTop = popup.scrollTop;
        const scrollHeight = popup.scrollHeight - popup.clientHeight;
        const percentScrolled = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.height = `${percentScrolled}%`;
        });

        const galleryOverlay = document.getElementById("fullscreen-gallery");
        let currentImageIndex = 0;
        let currentImageList = [];

        function openGallery(images, index) {
        currentImageList = images;
        currentImageIndex = index;

        galleryOverlay.innerHTML = `
            <span class="gallery-close" id="gallery-close">×</span>
            <img src="${images[index]}" id="gallery-img">
            <div class="touch-zone touch-left"></div>
            <div class="touch-zone touch-right"></div>
        `;
        galleryOverlay.classList.add("active");

        document.getElementById("gallery-close").addEventListener("click", closeGallery);
        document.querySelector(".touch-left").addEventListener("click", () => navigateGallery(-1));
        document.querySelector(".touch-right").addEventListener("click", () => navigateGallery(1));
        }

        function closeGallery() {
        galleryOverlay.classList.remove("active");
        galleryOverlay.innerHTML = "";
        }

        function navigateGallery(direction) {
        currentImageIndex = (currentImageIndex + direction + currentImageList.length) % currentImageList.length;
        document.getElementById("gallery-img").src = currentImageList[currentImageIndex];
        }
  
          // ✅ DISABILITA INTERAZIONE CON HEADER
          document.body.classList.add("popup-open");
  
          const closeBtn = popup.querySelector("#popup-close");
          if (closeBtn) {
            closeBtn.addEventListener("click", () => {
              popup.classList.add("slide-out-up");
              setTimeout(() => {
                popup.classList.remove("active", "slide-out-up");
                popup.innerHTML = "";
  
                // ✅ RIABILITA INTERAZIONE CON HEADER
                document.body.classList.remove("popup-open");
              }, 500);
            });
          }
  
          const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add("visible");
              }
            });
          }, { threshold: 0.2 });
  
          document.querySelectorAll('.popup-item').forEach(el => observer.observe(el));
  
          popup.addEventListener("scroll", closeOnScrollEnd);
        }
      });
    });
  
    function closeOnScrollEnd() {
      if (popup.scrollTop + popup.clientHeight >= popup.scrollHeight - 10) {
        popup.classList.add("slide-out-up");
        setTimeout(() => {
          popup.classList.remove("active", "slide-out-up");
          popup.innerHTML = "";
  
          // ✅ RIABILITA INTERAZIONE CON HEADER
          document.body.classList.remove("popup-open");
        }, 500);
        popup.removeEventListener("scroll", closeOnScrollEnd);
      }
    }

    


  });