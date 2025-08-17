# strapi-plugin-avif-converter

A plugin for [Strapi](https://github.com/strapi/strapi) that automatically converts uploaded images to the AVIF format using the [sharp](https://sharp.pixelplumbing.com/api-output#avif) library. It ensures that your images are optimized for web performance by leveraging the benefits of the AVIF format.

Based on the original [strapi-plugin-webp-converter](https://github.com/alexisbouchez/strapi-plugin-webp-converter) by Alexis Bouchez.

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
If installing directly from GitHub, the plugin will automatically build after installing dependencies:

```sh
# Clone the repository
git clone https://github.com/edmogeor/strapi-plugin-avif-converter.git
cd strapi-plugin-avif-converter

# Install dependencies (automatically builds)
npm install
```

**Note**: The `dist` folder is not included in the GitHub repository and is automatically built during `npm install` via the `prepare` script.

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
      // Array of filename patterns to ignore during conversion
      ignoreFilenames: [],
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
      // Array of filename patterns to ignore during conversion
      ignoreFilenames: [],
      options: {
        // AVIF options: https://sharp.pixelplumbing.com/api-output#avif
      },
    },
  },
});
```

### Ignore Filename Patterns

You can configure the plugin to ignore specific files during conversion by using the `ignoreFilenames` option. This accepts an array of filename patterns that support glob syntax:

```javascript
module.exports = ({ env }) => ({
  'avif-converter': {
    enabled: true,
    config: {
      ignoreFilenames: [
        'logo.png',           // Exact filename match
        '*.thumbnail.*',      // Any file with "thumbnail" in the name
        'temp-*',            // Files starting with "temp-"
        '**/*-original.*',   // Any file with "-original" in the name
        '*.svg',             // All SVG files (though they wouldn't convert anyway)
      ],
    },
  },
});
```

**Pattern Examples:**
- `'logo.png'` - Ignores exactly "logo.png"
- `'*.thumbnail.*'` - Ignores "image.thumbnail.jpg", "photo.thumbnail.png", etc.
- `'temp-*'` - Ignores "temp-image.jpg", "temp-photo.png", etc.
- `'**/*-backup.*'` - Ignores any file with "-backup" in any subdirectory

The plugin uses [minimatch](https://github.com/isaacs/minimatch) for pattern matching, supporting standard glob patterns.
