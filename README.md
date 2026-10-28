# e-plantShopping — Paradise Nursery

React and Redux Toolkit shopping application for the IBM Developing Front-End
Apps with React final project. Implementation prepared with AI assistance.
Review and understand the source and follow the course's AI-use rules.

## Run

Node.js 22 or newer is recommended.

```sh
npm ci
npm run dev
```

## Verify

```sh
npm test
npm run build
```

## Features

- Landing page with a background photograph, company information, exact
  “Welcome to Paradise Nursery” heading and Get Started navigation.
- Three plant categories with six unique plant names each (18 products).
- Product images, names, descriptions, numeric costs and Add to Cart controls.
- Shared navbar in ProductList with Home, Plants and Cart links and a dynamic
  quantity badge. The navbar stays visible on both catalog and cart views.
- Redux addItem, removeItem and updateQuantity reducers.
- Item images, unit prices, quantities, line totals and cart grand total.
- Increment, decrement, Delete, Continue Shopping and Coming Soon checkout.
- Cart contents remain while navigating within the app and reset on refresh.

## Source files for review

- [AboutUs.jsx](src/AboutUs.jsx)
- [App.css](src/App.css)
- [App.jsx](src/App.jsx)
- [CartSlice.jsx](src/CartSlice.jsx)
- [ProductList.jsx](src/ProductList.jsx)
- [CartItem.jsx](src/CartItem.jsx)

Tests exercise actual React interactions and Redux state transitions. Photos are
representative Unsplash images and some are reused across products. Google Fonts
has local typeface fallbacks. Images and remote fonts require internet access.

Vite is configured with base `/e-plantShopping/` for hosting under that path.
No published deployment or course grade is claimed by this repository.
