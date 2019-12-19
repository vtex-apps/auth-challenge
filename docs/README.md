# Challenge Block

> Challenge that checks if a user is logged in to view the content

## Usage

Add this app to your theme dependencies:

```js
// manifest.json
// ...
  "dependencies": {
    // ...
    "vtex.challenge-block": "0.x"
  }
```

Wrap the blocks you want to be visible only to logged in users with `challenge-block`.

Example:

```diff
 "store.product": {
   "blocks": [
     "flex-layout.row#product-main",
+     "challenge-block#description",
     "shelf.relatedProducts#accessories"
   ],
 },
+ "challenge-block#description": {
+   "blocks": [
+     "challenge-content#description",
+     "challenge-fallback#description"
+   ]
+ },
+ "challenge-content#description": {
+   "children": [
+     "product-description"
+   ]
+ },
+ "challenge-fallback#description": {
+   "children": [
+     "rich-text#challenge-description"
+   ]
+ },
+ "rich-text#challenge-description": {
+   "props": {
+     "text": "Please login to see the description",
+     "blockClass": "challengeDescription"
+   }
+ }
```

This component will check if the user is logged. If the user is logged in, he will see the `Content`, otherwise he will see the `Fallback`.

### Styles API

This app provides some CSS classes as an API for style customization.

To use this CSS API, you must add the `styles` builder and create an app styling CSS file.

1. Add the `styles` builder to your `manifest.json`:

```json
  "builders": {
    "styles": "1.x"
  }
```

2. Create a file called `vtex.challenge-block.css` inside the `styles/css` folder. Add your custom styles:

```css
.challengeContentWrapper {
  margin-top: 10px;
}
```

#### CSS namespaces

Below, we describe the namespaces that are defined in the `Carousel`.

| Class name               | Description                                                                    | Component Source                                                                             |
| ------------------------ | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `challengeContentWrapper`              | The main container of the `Content`                              |  |
