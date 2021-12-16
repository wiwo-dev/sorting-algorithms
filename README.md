## TAILWIND + JIT + CHAKRA + CRA

### Tailwind

```
npm i -D tailwindcss@npm:@tailwindcss/postcss7-compat@^2.2.7 postcss@^7.0.36 autoprefixer@^9.8.6
npm i -D @craco/craco@^6.0.0"
```

package.json

```
  "scripts": {
    "start": "TAILWIND_MODE=watch craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject",
    "servebuild": "node server.js"
  },
```

## Tailwind JIT

tailwind.config.js

```
mode: "jit",
purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html", "./src/components/*.{js,jsx}"],
```

...and a few other things described in Tailwind doc

## Chakra

don't work:

```
npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4
```

works!

```
npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4
```
