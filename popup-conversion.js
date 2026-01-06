/**
 * 🦅 DIGIYLYFE - POPUP DE CONVERSION GUEST → COMPTE
 * ================================================
 * Script réutilisable pour tous les modules
 * À inclure après une réservation guest réussie
 * 
 * Usage:
 * <script src="popup-conversion.js"></script>
 * <script>
 *   showGuestConversionPopup({
 *     bookingId: 'abc123',
 *     phone: '+221771234567',
 *     name: 'Astou Diop',
 *     module: 'driver'
 *   });
 * </script>
 */

(function() {
  'use strict';

  /* 🎨 STYLES DE LA POP-UP */
  const styles = `
    .digiy-conversion-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 20px;
      animation: fadeIn 0.3s ease;
    }

    .digiy-conversion-popup {
      background: #ffffff;
      border-radius: 24px;
      padding: 40px;
      max-width: 500px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      animation: slideUp 0.3s ease;
      position: relative;
    }

    .digiy-conversion-close {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #f1f5f9;
      border: none;
      cursor: pointer;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      color: #64748b;
    }

    .digiy-conversion-close:hover {
      background: #e2e8f0;
      transform: rotate(90deg);
    }

    .digiy-conversion-icon {
      width: 72px;
      height: 72px;
      margin: 0 auto 20px;
      background: linear-gradient(135deg, #dcfce7, #d1fae5);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 36px;
      box-shadow: 0 8px 20px rgba(34, 197, 94, 0.2);
    }

    .digiy-conversion-title {
      font-size: 28px;
      font-weight: 900;
      text-align: center;
      margin: 0 0 12px;
      background: linear-gradient(135deg, #16a34a, #facc15);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .digiy-conversion-subtitle {
      font-size: 16px;
      color: #64748b;
      text-align: center;
      margin: 0 0 28px;
      font-weight: 600;
      line-height: 1.6;
    }

    .digiy-conversion-benefits {
      list-style: none;
      padding: 0;
      margin: 0 0 28px;
    }

    .digiy-conversion-benefits li {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px;
      background: #f8fafc;
      border-radius: 12px;
      margin-bottom: 12px;
      font-weight: 600;
      color: #334155;
      font-size: 14px;
    }

    .digiy-conversion-benefits li span:first-child {
      font-size: 20px;
      flex-shrink: 0;
    }

    .digiy-conversion-highlight {
      background: linear-gradient(135deg, #fef3c7, #fde68a);
      border: 2px solid #fbbf24;
      padding: 14px;
      border-radius: 12px;
      text-align: center;
      margin-bottom: 28px;
      font-weight: 800;
      color: #78350f;
      font-size: 13px;
    }

    .digiy-conversion-buttons {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .digiy-conversion-btn-primary {
      width: 100%;
      padding: 16px;
      background: linear-gradient(135deg, #16a34a, #22c55e);
      color: #fff;
      border: none;
      border-radius: 12px;
      font-weight: 900;
      font-size: 16px;
      cursor: pointer;
      letter-spacing: 0.05em;
      box-shadow: 0 8px 20px rgba(22, 163, 74, 0.3);
      transition: all 0.2s;
    }

    .digiy-conversion-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(22, 163, 74, 0.4);
    }

    .digiy-conversion-btn-secondary {
      width: 100%;
      padding: 14px;
      background: transparent;
      color: #64748b;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .digiy-conversion-btn-secondary:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 480px) {
      .digiy-conversion-popup {
        padding: 28px 20px;
      }
      .digiy-conversion-title {
        font-size: 24px;
      }
    }
  `;

  /* 📦 CONFIGURATION DES MODULES */
  const MODULE_CONFIG = {
    driver: {
      icon: '🚗',
      successTitle: 'Course confirmée !',
      benefits: [
        { icon: '🚗', text: 'Commander des VTC à la demande' },
        { icon: '🛒', text: 'Acheter sur notre marketplace' },
        { icon: '🍽️', text: 'Réserver dans vos restaurants favoris' },
        { icon: '🏠', text: 'Trouver un logement facilement' }
      ]
    },
    resa: {
      icon: '🍽️',
      successTitle: 'Table réservée !',
      benefits: [
        { icon: '🍽️', text: 'Gérer toutes vos réservations' },
        { icon: '⭐', text: 'Accéder à vos restaurants favoris' },
        { icon: '🚗', text: 'Commander un VTC pour y aller' },
        { icon: '🛒', text: 'Acheter sur notre marketplace' }
      ]
    },
    loc: {
      icon: '🏠',
      successTitle: 'Réservation confirmée !',
      benefits: [
        { icon: '🏠', text: 'Suivre vos réservations de logement' },
        { icon: '🚗', text: 'Réserver un VTC depuis votre logement' },
        { icon: '🍽️', text: 'Découvrir les restaurants à proximité' },
        { icon: '📦', text: 'Commander des livraisons express' }
      ]
    },
    ndimbal: {
      icon: '📦',
      successTitle: 'Livraison en cours !',
      benefits: [
        { icon: '📦', text: 'Suivre toutes vos livraisons' },
        { icon: '🛒', text: 'Acheter sur notre marketplace' },
        { icon: '🚗', text: 'Commander des VTC' },
        { icon: '🏠', text: 'Réserver des logements' }
      ]
    },
    market: {
      icon: '🛒',
      successTitle: 'Commande en cours !',
      benefits: [
        { icon: '🛒', text: 'Accéder à tout le marketplace' },
        { icon: '📦', text: 'Livraison express disponible' },
        { icon: '🚗', text: 'Commander des VTC' },
        { icon: '🏠', text: 'Réserver des logements' }
      ]
    }
  };

  /* 🎨 INJECTER LES STYLES */
  function injectStyles() {
    if (document.getElementById('digiy-conversion-styles')) return;
    const styleTag = document.createElement('style');
    styleTag.id = 'digiy-conversion-styles';
    styleTag.textContent = styles;
    document.head.appendChild(styleTag);
  }

  /* 🏗️ CONSTRUIRE LA POP-UP */
  function buildPopup(config) {
    const moduleConfig = MODULE_CONFIG[config.module] || MODULE_CONFIG.driver;
    
    return `
      <div class="digiy-conversion-overlay" id="digiyConversionOverlay">
        <div class="digiy-conversion-popup">
          <button class="digiy-conversion-close" onclick="closeGuestConversionPopup()">×</button>
          
          <div class="digiy-conversion-icon">${moduleConfig.icon}</div>
          
          <h2 class="digiy-conversion-title">${moduleConfig.successTitle}</h2>
          
          <p class="digiy-conversion-subtitle">
            Créez votre compte DIGIYLYFE pour accéder<br>
            à <strong>tous nos services</strong>
          </p>

          <ul class="digiy-conversion-benefits">
            ${moduleConfig.benefits.map(benefit => `
              <li>
                <span>${benefit.icon}</span>
                <span>${benefit.text}</span>
              </li>
            `).join('')}
          </ul>

          <div class="digiy-conversion-highlight">
            ✨ Vos infos sont déjà là !<br>
            Plus que <strong>3 champs</strong> à remplir
          </div>

          <div class="digiy-conversion-buttons">
            <button 
              class="digiy-conversion-btn-primary"
              onclick="redirectToSignup('${config.bookingId}', '${config.phone}', '${config.name || ''}')"
            >
              🦅 Créer mon compte (30 sec)
            </button>
            
            <button 
              class="digiy-conversion-btn-secondary"
              onclick="closeGuestConversionPopup()"
            >
              Plus tard
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /* 🚀 AFFICHER LA POP-UP */
  window.showGuestConversionPopup = function(config) {
    // Validation
    if (!config || !config.bookingId || !config.phone || !config.module) {
      console.error('❌ Configuration invalide pour la pop-up de conversion');
      return;
    }

    // Injecter styles si pas déjà fait
    injectStyles();

    // Créer et injecter la pop-up
    const popupHTML = buildPopup(config);
    const container = document.createElement('div');
    container.innerHTML = popupHTML;
    document.body.appendChild(container.firstElementChild);

    // Empêcher le scroll du body
    document.body.style.overflow = 'hidden';

    // Analytics (optionnel)
    if (window.gtag) {
      gtag('event', 'conversion_popup_shown', {
        module: config.module,
        booking_id: config.bookingId
      });
    }

    console.log('✅ Pop-up de conversion affichée');
  };

  /* ❌ FERMER LA POP-UP */
  window.closeGuestConversionPopup = function() {
    const overlay = document.getElementById('digiyConversionOverlay');
    if (overlay) {
      overlay.style.animation = 'fadeOut 0.2s ease';
      setTimeout(() => {
        overlay.remove();
        document.body.style.overflow = '';
      }, 200);
    }

    // Analytics
    if (window.gtag) {
      gtag('event', 'conversion_popup_closed', {
        action: 'dismissed'
      });
    }
  };

  /* 🔄 REDIRECTION VERS INSCRIPTION */
  window.redirectToSignup = function(bookingId, phone, name) {
    // Construire l'URL avec pré-remplissage
    const params = new URLSearchParams({
      from: 'guest',
      bookingId: bookingId,
      phone: phone
    });

    if (name) {
      params.append('name', name);
    }

    const signupUrl = `inscription-client.html?${params.toString()}`;

    // Analytics
    if (window.gtag) {
      gtag('event', 'conversion_initiated', {
        booking_id: bookingId,
        source: 'guest_popup'
      });
    }

    console.log('🔄 Redirection vers inscription:', signupUrl);
    window.location.href = signupUrl;
  };

  /* 🎯 AUTO-AFFICHAGE SI PARAMÈTRES PRÉSENTS */
  document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const showPopup = urlParams.get('showConversion');
    
    if (showPopup === 'true') {
      // Récupérer les données de session
      const guestSession = localStorage.getItem('guestSession');
      if (guestSession) {
        try {
          const data = JSON.parse(guestSession);
          
          // Afficher avec délai pour meilleure UX
          setTimeout(() => {
            showGuestConversionPopup({
              bookingId: data.bookingId,
              phone: data.phone,
              name: data.name,
              module: data.module
            });
          }, 1000);
        } catch (err) {
          console.error('❌ Erreur parsing guestSession:', err);
        }
      }
    }
  });

  /* ⌨️ FERMER AVEC ESCAPE */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeGuestConversionPopup();
    }
  });

  console.log('🦅 DIGIYLYFE - Popup de conversion chargée');

})();
