import type { Core } from '@strapi/strapi';
import middlewares from './middlewares';

const bootstrap = ({ strapi }: { strapi: Core.Strapi }) => {
  const config = strapi.plugin('avif-converter');
  strapi.server.use(middlewares.convertToAvif(config, { strapi }));
};

export default bootstrap;
