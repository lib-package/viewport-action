# Viewport Observer

A lightweight JavaScript library that utilizes the Intersection Observer API to monitor the visibility of DOM elements within the viewport. It dispatches custom events when elements enter or exit the viewport, making it easy to implement lazy loading, animations, or any action based on visibility.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Use Case Example](#use-case-example)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install the package via NPM:

```bash
npx jsr add @jhenbert/viewport-action
```

## Usage

To use the library, simply import it into your project and call the viewport function, passing in the DOM element you want to observe and the threshold to be triggered.

```javascript
import viewport from "@jhenbert/viewport-action";

// Select the element you want to observe
const element = document.querySelector("#myElement");

// Start observing the element
const observer = viewport(element, 100);

// To stop observing the element later
observer.destroy();
```

If you are using a framework such as Svelte, this will be your LazyComponent. Refer to Svelte documentation for more comprehensive tutorial for lazy loading.

```svelte
<script lang="ts">
  import viewport from "@jhenbert/viewport-action";

  let loadComponent;
  export { loadComponent as this };

  export let threshold: number = 0;

  let isShowingComponent = false;
  let componentPromise: Promise<{
    default: ConstructorOfATypedSvelteComponent;
  }>;

  const handleEnterViewport = () => {
    componentPromise = loadComponent();
    isShowingComponent = true;
  };
</script>

{#if !isShowingComponent}
  <div use:viewport={threshold} on:enterViewport={handleEnterViewport} />
{:else}
  {#await componentPromise}
    <slot name="fallback">Loading...</slot>
  {:then { default: Component }}
    <slot name="component" {Component} />
  {/await}
{/if}
```

## API

```bash
viewport(element: Element, 100)
```

### Parameters

- `element` (Element): The DOM element to observe for visibility changes.
- `threshold`: Number of pixels to be triggered.

### Returns

An object containing a destroy method:

- `destroy()`: Stops observing the specified element.

## Custom Events

The following custom events are dispatched on the observed element:

- `enterViewport`: Triggered when the element enters the viewport.
- `exitViewport`: Triggered when the element exits the viewport

## Use Case Example

Here's a practical example demonstrating how to use the viewport observer to implement lazy loading for images:

### HTML Structure

```html
<div class="image-container">
  <img data-src="path/to/image1.jpg" alt="Image 1" class="lazy-image" />
  <img data-src="path/to/image2.jpg" alt="Image 2" class="lazy-image" />
  <img data-src="path/to/image3.jpg" alt="Image 3" class="lazy-image" />
</div>
```

### JavaScript Code

```javascript
import viewport from "@jhenbert/viewport-action";

// Function to load image
const loadImage = (img) => {
  const src = img.getAttribute("data-src");
  if (src) {
    img.src = src;
    img.removeAttribute("data-src");
  }
};

// Select all lazy images
const lazyImages = document.querySelectorAll(".lazy-image");

// Observe each lazy image
lazyImages.forEach((img) => {
  const observer = viewport(img, 100);

  img.addEventListener("enterViewport", () => {
    loadImage(img);
    observer.destroy(); // Stop observing once the image is loaded
  });
});
```

In this example, images with the class `.lazy-image` will only load when they enter the viewport, improving page load time and performance.

Note:

If you are using JS framework such as Svelte and using TypeScript, put this snippet in `app.d.ts`. It is better to read documentation for respective frameworks for the implementation.

```typescript
declare module "svelte/elements" {
  interface HTMLAttributes<T> {
    "on:enterViewport"?: (event: CustomEvent<void>) => void;
    "on:exitViewport"?: (event: CustomEvent<void>) => void;
  }
}
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

### Explanation of Sections

- **Title**: Clearly states the purpose of the library.
- **Installation**: Provides instructions for installation via NPM and Yarn.
- **Usage**: Basic usage example to quickly get users started.
- **API**: Details the function signature and return values, clarifying how to use the library.
- **Use Case Example**: A practical example that demonstrates a common scenario (lazy loading images), making it easier for users to understand real-world applications of the library.
- **Contributing**: Encourages community involvement.
- **License**: Specifies the licensing, allowing users to understand the terms of use.

Feel free to modify sections to fit your project's specifics or add more details as necessary!
