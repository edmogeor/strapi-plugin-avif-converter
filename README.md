# strapi-plugin-avif-converter

A plugin for [Strapi](https://github.com/strapi/strapi) that automatically converts uploaded images to the AVIF format using the [sharp](https://sharp.pixelplumbing.com/api-output#avif) library. It ensures that your images are optimized for web performance by leveraging the benefits of the AVIF format.

### Supported Strapi versions

- v5.x.x

**NOTE**: Strapi 4.x.x is not supported!

## Installation

### Option 1: From npm (recommended)
```sh
npm install strapi-plugin-avif-converter
```

**or**

```sh
yarn add strapi-plugin-avif-converter
```

### Option 2: From GitHub source
If installing directly from GitHub, you need to build the plugin after installation:

```sh
# Clone the repository
git clone https://github.com/your-username/strapi-plugin-avif-converter.git
cd strapi-plugin-avif-converter

# Install dependencies and build
npm install
npm run build
```

**Note**: The `dist` folder is not included in the GitHub repository and must be built locally.

## Configuration

### Enable the plugin

The plugin configuration is stored in a config file located at `./config/plugins.js|ts`.

Javascript configuration

```javascript
module.exports = ({ env }) => ({
  // ...
  'avif-converter': {
    enabled: true,
    config: {
      // mimeTypes that converts to AVIF. Default is ['image/png', 'image/jpeg', 'image/jpg']
      mimeTypes: undefined,
      options: {
        // AVIF options: https://sharp.pixelplumbing.com/api-output#avif
      },
    },
  },
});
```

**or**

Typescript configuration
```typescript
export default () => ({
  // ...
  'avif-converter': {
    enabled: true,
    config: {
      // mimeTypes that converts to AVIF. Default is ['image/png', 'image/jpeg', 'image/jpg']
      mimeTypes: undefined,
      options: {
        // AVIF options: https://sharp.pixelplumbing.com/api-output#avif
      },
    },
  },
});
```
