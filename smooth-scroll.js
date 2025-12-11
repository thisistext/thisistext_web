// Smooth mouse wheel scrolling
(function () {
    let scrolling = false;
    let targetScroll = 0;
    let currentScroll = 0;
    const ease = 0.94; // 부드러움 정도 (낮을수록 더 부드러움) - 0.08에서 0.04로 변경

    function smoothScroll() {
        if (!scrolling) return;

        currentScroll += (targetScroll - currentScroll) * ease;

        if (Math.abs(targetScroll - currentScroll) < 0.5) {
            currentScroll = targetScroll;
            scrolling = false;
        }

        window.scrollTo(0, currentScroll);

        if (scrolling) {
            requestAnimationFrame(smoothScroll);
        }
    }

    window.addEventListener('wheel', function (e) {
        e.preventDefault();

        if (!scrolling) {
            currentScroll = window.scrollY;
        }

        targetScroll = Math.max(0, Math.min(
            document.body.scrollHeight - window.innerHeight,
            (scrolling ? targetScroll : window.scrollY) + e.deltaY * 1.0  // 1.5에서 0.8로 변경 - 한 번에 덜 스크롤
        ));

        if (!scrolling) {
            scrolling = true;
            requestAnimationFrame(smoothScroll);
        }
    }, { passive: false });
})();
