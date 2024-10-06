/**
 * Creates an Intersection Observer for monitoring element visibility within the viewport.
 *
 * When the element enters or exits the viewport, a corresponding custom event
 * (`enterViewport` or `exitViewport`) is dispatched on the element.
 *
 * @param {Element} element - The DOM element to observe for visibility changes.
 * @returns {Object} An object containing a `destroy` method to stop observing the element.
 *
 * @example
 * const observer = viewport(document.querySelector('#myElement'));
 * // To stop observing later:
 * observer.destroy();
 */
const viewport = (element: Element): object => {
  const observer: IntersectionObserver = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        const eventName = entry.isIntersecting
          ? "enterViewport"
          : "exitViewport";
        entry.target.dispatchEvent(new CustomEvent(eventName));
      });
    }
  );

  observer.observe(element);

  return {
    destroy() {
      observer.unobserve(element);
      // Optionally disconnect the observer if no longer needed.
      if (observer.takeRecords().length === 0) {
        observer.disconnect();
      }
    },
  };
};

export default viewport;
