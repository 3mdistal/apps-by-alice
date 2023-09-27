export function replaceSpaces(str: string) {
    return str.replace(/\s/g, '%20');
}

export function createIntersectionObserver(element: HTMLVideoElement) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                element.play();
            } else {
                element.pause();
            }
        });
    });

    observer.observe(element);
}