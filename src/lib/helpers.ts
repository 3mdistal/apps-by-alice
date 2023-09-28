export function replaceSpaces(str: string, imageKit: boolean = true) {
    if (imageKit)
    {
        return str.replace(/\s/g, '%20');
    }
    return str.replace(/\s/g, '_');
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