// État global du panier et du code promo
let isPackInCart = false;
let isPromoActive = false;
const itemPrice = 24.99;

// Ajouter le Pack Collector au chariot
function addPackToCart() {
    isPackInCart = true;
    updateInterface();
}

// Retirer le pack du chariot
function removePackFromCart() {
    isPackInCart = false;
    updateInterface();
}

// Vérifier et appliquer le code promo
function checkPromo() {
    const code = document.getElementById('promo-input').value.trim();
    const msg = document.getElementById('promo-status-msg');

    if (code === "XY2") {
        isPromoActive = true;
        msg.textContent = "Code XY2 activé : Panier réduit à 0€ ! 🎁";
        msg.className = "promo-status active";
    } else {
        isPromoActive = false;
        msg.textContent = "Code inconnu ou expiré.";
        msg.className = "promo-status";
        msg.style.color = "#ff3838";
        msg.style.display = "block";
    }
    updateInterface();
}

// Mettre à jour l'affichage visuel des totaux et du panier
function updateInterface() {
    const contentArea = document.getElementById('cart-content-area');
    const badgeCount = document.getElementById('badge-count');
    const subtotalText = document.getElementById('bill-subtotal');
    const discountRow = document.getElementById('row-discount');
    const totalText = document.getElementById('bill-total');

    if (isPackInCart) {
        // Mettre à jour le badge du menu haut
        badgeCount.textContent = "1";
        
        // Afficher l'élément dans la zone chariot
        contentArea.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; background:#181c24; padding:12px; border-radius:8px; border:1px solid #2d323f;">
                <div style="font-size:14px; text-transform:uppercase;">📦 Pack Collector</div>
                <button onclick="removePackFromCart()" style="background:none; border:none; color:#ff3838; cursor:pointer; font-weight:bold; font-size:12px; text-transform:uppercase;">[Retirer]</button>
            </div>
        `;
        
        subtotalText.textContent = `${itemPrice.toFixed(2)} €`;

        // Si le code promo magique est activé
        if (isPromoActive) {
            discountRow.style.display = "flex";
            totalText.textContent = "0.00 €";
            totalText.classList.add("free-price");
        } else {
            discountRow.style.display = "none";
            totalText.textContent = `${itemPrice.toFixed(2)} €`;
            totalText.classList.remove("free-price");
        }

    } else {
        // Si le panier est entièrement vide
        badgeCount.textContent = "0";
        contentArea.innerHTML = `<p class="cart-empty-text">Aucun article dans le panier</p>`;
        subtotalText.textContent = "0.00 €";
        discountRow.style.display = "none";
        totalText.textContent = "0.00 €";
        totalText.classList.remove("free-price");
    }
}

// Action sur le bouton final de confirmation
function processPayment() {
    if (!isPackInCart) {
        alert("Votre panier est actuellement vide !");
        return;
    }

    if (isPromoActive) {
        alert("Félicitations ! Grâce au code XY2, votre pack Brawl Stars passe à 0.00 € et vient d'être validé sans aucun paiement ! 🚀");
    } else {
        alert(`Ouverture de la fenêtre de paiement Supercell sécurisée pour un montant de ${itemPrice} €...`);
    }
    }

