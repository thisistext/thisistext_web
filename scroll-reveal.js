/*
 * scroll-reveal.js
 * 스크롤하면 요소들이 부드럽게 나타나는 효과를 자동으로 적용합니다.
 */

document.addEventListener("DOMContentLoaded", function () {
    // 1. 애니메이션 설정
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // 요소가 10% 정도 보이면 애니메이션 시작
    };

    // 2. 관찰자(Observer) 생성
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 화면에 들어오면 .revealed 클래스 추가 -> CSS에서 opacity 1로 변함
                // (기존 .active는 메뉴/FAQ 로직과 충돌하여 변경함)
                entry.target.classList.add('revealed');

                // 한 번 나타난 후에는 관찰 중단 (계속 깜빡거리지 않게)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 3. 애니메이션을 적용할 요소들 선택
    // 여기에 포함된 태그들은 자동으로 효과가 적용됩니다.
    const targets = document.querySelectorAll(`
        h1, h2, h3, 
        p, 
        .intro-lead,
        .poster-frame, 
        .sponsor-list, 
        .sponsor-card,
        .sponsor-contact,
        .program-item, 
        .program-desc,
        .timeline-item,
        .timeline-day,
        .pub-list,
        .faq-item,
        .info-section,
        nav li
    `);

    // 4. 각 요소에 클래스 추가 및 관찰 시작
    targets.forEach(el => {
        // ★ 중요: 사이드바(.sidebar) 내부에 있는 요소는 애니메이션 제외 ★
        if (el.closest('.sidebar')) return;

        el.classList.add('reveal'); // 투명하게 숨김
        observer.observe(el);       // 관찰 시작
    });
});
