document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. WEB AUDIO API - SOUND UI (SINTETIZADOR)
       ========================================= */
    // Essa técnica avançada cria som matemático via JavaScript
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    function playUiSound(type) {
        // Como navegadores bloqueiam som até o usuário interagir, resumimos o contexto
        if (audioCtx.state === 'suspended') audioCtx.resume();
        
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        if (type === 'hover') {
            // Um bip rápido e agudo (como passar por cima de um menu num jogo)
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
            gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime); // Volume bem baixo
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.05);
        } else if (type === 'click') {
            // Um bip mais grave para confirmar a seleção
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.1);
        }
    }

    // Adicionando os sons aos elementos que tem a classe 'sound-click'
    const soundElements = document.querySelectorAll('.sound-click');
    soundElements.forEach(el => {
        el.addEventListener('mouseenter', () => playUiSound('hover'));
        el.addEventListener('mousedown', () => playUiSound('click'));
    });

    /* =========================================
       2. BOTÃO "VOLTAR AO TOPO"
       ========================================= */
    const backToTopBtn = document.getElementById('back-to-top');
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        // Lógica da Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Lógica do botão Voltar ao Topo
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    /* =========================================
       3. TELA DE CARREGAMENTO (PRELOADER)
       ========================================= */
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => { preloader.classList.add('hidden'); }, 800);
    });

    /* =========================================
       4. CURSOR CUSTOMIZADO GAMER (MIRA)
       ========================================= */
    const cursor = document.getElementById('custom-cursor');
    if (window.innerWidth >= 1024) {
        cursor.style.display = 'block';
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        const clickables = document.querySelectorAll('a, button, input, select');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
    }

    /* =========================================
       5. SISTEMA DE TOAST E MODO CLARO/ESCURO
       ========================================= */
    function showToast(message, isError = false) {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.classList.add('toast');
        if (isError) toast.classList.add('error-toast');
        const icon = isError ? '<i class="fa-solid fa-circle-xmark text-red"></i>' : '<i class="fa-solid fa-circle-check" style="color: #22c55e;"></i>';
        toast.innerHTML = `${icon} ${message}`;
        toastContainer.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    /* =========================================
       6. ANIMAÇÕES DE SCROLL E ESTATÍSTICAS
       ========================================= */
    const scrollElements = document.querySelectorAll('.hidden-scroll');
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;

    function animateCounters() {
        statNumbers.forEach(number => {
            const target = +number.getAttribute('data-target');
            const increment = target / (2000 / 16); 
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    number.innerText = target > 1000 ? `+${Math.ceil(current)}` : Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    number.innerText = target > 1000 ? `+${target}` : `${target}%`;
                }
            };
            updateCounter();
        });
    }

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-scroll');
                if (entry.target.id === 'stats' && !counted) {
                    animateCounters();
                    counted = true;
                }
            }
        });
    }, { threshold: 0.1 });

    scrollElements.forEach(el => scrollObserver.observe(el));

    /* =========================================
       7. LÓGICA DO FAQ (SANFONA)
       ========================================= */
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const content = header.nextElementSibling;
            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== currentItem) item.querySelector('.accordion-content').style.maxHeight = null;
            });
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    /* =========================================
       8. VALIDAÇÕES DE FORMULÁRIO E MODAL
       ========================================= */
    const applyForm = document.getElementById('valorant-form');
    const btnSubmit = document.getElementById('btn-submit');
    if (applyForm) {
        applyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            const nameInput = document.getElementById('name');
            const riotIdInput = document.getElementById('riotid');
            const eloSelect = document.getElementById('elo');
            document.querySelectorAll('.input-group').forEach(group => group.classList.remove('error'));

            if (nameInput.value.trim().length < 3) { showError(nameInput); isValid = false; }
            const riotRegex = /^.{2,16}#[a-zA-Z0-9]{3,5}$/;
            if (!riotRegex.test(riotIdInput.value.trim())) { showError(riotIdInput); isValid = false; }
            if (eloSelect.value === "") { showError(eloSelect); isValid = false; }

            if (isValid) {
                simulateProcessing(btnSubmit, applyForm, 'Aplicação enviada com sucesso!');
            } else {
                showToast('Por favor, corrija os erros no formulário.', true);
            }
        });
    }

    function showError(element) { element.parentElement.classList.add('error'); }

    const modal = document.getElementById('payment-modal');
    const closeBtn = document.querySelector('.close-modal');
    const buyButtons = document.querySelectorAll('.btn-buy');
    const selectedPlanText = document.getElementById('selected-plan-text');
    const paymentForm = document.getElementById('payment-form');
    const btnPay = document.getElementById('btn-pay');

    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const planName = button.getAttribute('data-plan');
            selectedPlanText.textContent = `Plano Selecionado: ${planName}`;
            modal.classList.add('active');
        });
    });

    closeBtn.addEventListener('click', () => { modal.classList.remove('active'); paymentForm.reset(); });
    modal.addEventListener('click', (e) => { if (e.target === modal) { modal.classList.remove('active'); paymentForm.reset(); } });

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const cardNumber = document.getElementById('card-number').value;
        if(cardNumber.length > 5) {
            simulateProcessing(btnPay, paymentForm, 'Pagamento aprovado! Bem-vindo ao Bootcamp.');
            setTimeout(() => { modal.classList.remove('active'); }, 2000);
        } else {
            showToast('Preencha os dados do cartão corretamente.', true);
        }
    });

    function simulateProcessing(buttonElement, formElement, successMessage) {
        buttonElement.classList.add('loading');
        buttonElement.disabled = true;
        setTimeout(() => {
            showToast(successMessage); 
            buttonElement.classList.remove('loading');
            buttonElement.disabled = false;
            formElement.reset();
        }, 2000); 
    }
});