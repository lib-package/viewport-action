/**
 * Creates an Intersection Observer for monitoring element visibility within the viewport.
 *
 * When the element enters or exits the viewport, a corresponding custom event
 * (`enterViewport` or `exitViewport`) is dispatched on the element.
 *
 * @param {Element} element - The DOM element to observe for visibility changes.
 * @param {number} threshold - Optional threshold in pixels for when to trigger visibility changes.
 * @returns {Object} An object containing a `destroy` method to stop observing the element.
 *
 * @example
 * const observer = viewport(document.querySelector('#myElement'), 100);
 * // To stop observing later:
 * observer.destroy();
 */

const viewport = (element: Element, threshold: number = 0): object => {
  const observer: IntersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const eventName = entry.isIntersecting
          ? "enterViewport"
          : "exitViewport";
        entry.target.dispatchEvent(new CustomEvent(eventName));
      });
    },
    {
      root: null, // Use the viewport as the root
      rootMargin: `${threshold}px`, // Set root margin based on the threshold
      threshold: 0, // Trigger when any part of the target is visible
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
