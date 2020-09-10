📢 Use this project, [contribute](https://github.com/vtex-apps/auth-challenge) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Auth Challenge

<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

The Auth Challenge app is an essential B2B feature responsible for checking if a user is allowed to access the store's content. It helps define which components should be displayed for users that are allowed and users that are not.

## Example Use Case

Add a condition to a TP that applies to your user. As an anonymous user, you should not see the real content. When you log in, and if and only if the condition you added above matches your profile, you should see the real content.

Now remove the condition from the TP that applies to your user. Now as an anonymous user, you should not see the real content. When you login, you should see the real content.

:information_source: This check is made according to the Condition Rule specified in the Trade Policy configuration, one of the steps needed to [**configure a B2B environment in VTEX IO**](https://vtex.io/docs/recipes/store/configuring-a-b2b-environment).

![aut-challenge](https://user-images.githubusercontent.com/52087100/85445025-50cc9600-b569-11ea-9db9-1a25f93b8109.png)
*In the example above, the `Become a parter` link in the Header is only displayed for anonymous users. Once the user is authenticated (second image), he become able to see the `Quick Order` and the `Order quote` links.*

## Configuration

1. Add `auth-challenge` app to your theme's dependencies in the `manifest.json`, for example:

```diff
  "dependencies": {
+   "vtex.auth-challenge": "1.x"
  }
```

Now, you are able to use all blocks exported by the `auth-challenge` app. Check out the full list below:

| Block name     | Description                                  |
| -------------- | ----------------------------------------------- |
| `challenge-block` |  Logical block responsible for checking whether an user is authenticated or not. It does not render any component, but mandatorily defines as children the `challenge-content` and the `challenge-fallback` blocks. |
| `challenge-content` | Defines (via its children blocks) which components will be displayed in the UI for authenticated users. | 
| `challenge-fallback` | Defines (via its children blocks) which components will be displayed for anonymous users. |

2. In the desired store template, such as `store.product`, declare the `challenge-block`, listing the `challenge-content` and the `challenge-fallback` as its children. For example:

```diff
 "store.product": {
   "blocks": [
     "flex-layout.row#product-main",
+    "challenge-block#description",
     "shelf.relatedProducts#accessories"
   ],
 },
+"challenge-block#description": {
+  "blocks": [
+    "challenge-content#description",
+    "challenge-fallback#description"
+  ]
+},
```

3. Now, declare the children blocks `challenge-content` and `challenge-fallback`. Remember that they define, respectively, which components will be displayed for authenticated and anonymous users;

```diff
 "store.product": {
   "blocks": [
     "flex-layout.row#product-main",
     "challenge-block#description",
     "shelf.relatedProducts#accessories"
   ],
 },
 "challenge-block#description": {
   "blocks": [
     "challenge-content#description",
     "challenge-fallback#description"
   ]
 },
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

According to the example above, users that have the attached trade policy will see the component rendered by the `product-description` block. Others, in turn, will see a Rich Text component  (`challenge-fallback`'s child block).

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).


| CSS Handles        |    
| ------------------------ | 
| `challengeContentWrapper`    | 


<!-- DOCS-IGNORE:start -->

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->

