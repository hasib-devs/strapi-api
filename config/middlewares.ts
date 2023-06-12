export default ({env}) => (
  [
    'strapi::errors',
    'strapi::cors',
    'strapi::poweredBy',
    'strapi::logger',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
    env('DISK_DRIVER') !== 'h2' ? 'strapi::security' :
    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'connect-src': ["'self'", 'https:'],
            'img-src': [
              "'self'",
              'data:',
              'blob:',
              'dl.airtable.com',
              env('R2_PUBLIC_URL').replace(/^https?:\/\//, ''), // removes http or https from url
            ],
            'media-src': [
              "'self'",
              'data:',
              'blob:',
              'dl.airtable.com',
              env('R2_PUBLIC_URL').replace(/^https?:\/\//, ''),
            ],
            upgradeInsecureRequests: null,
          },
        },
      },
    },
  ]
);
