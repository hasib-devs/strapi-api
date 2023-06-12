export default ({ env }) => {
  const configuration = {
    menus: {
      config: {
        maxDepth: 3,
      },
    },
    documentation: {
      enabled: true,
      config: {
        openapi: '3.0.0',
        info: {
          version: '1.0.0',
          title: 'DOCUMENTATION',
          description: '',
          termsOfService: 'YOUR_TERMS_OF_SERVICE_URL',
          contact: {
            name: 'TEAM',
            email: 'contact-email@something.io',
            url: 'mywebsite.io'
          },
          license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
          },
        },
        'x-strapi-config': {
          // Leave empty to ignore plugins during generation
          plugins: ['upload', 'users-permissions'],
          path: '/documentation',
        },
        servers: [
          { url: `${env('APP_BASE_URL')}/api`, description: 'Current server' },
          { url: 'http://localhost:1337/api', description: 'Development server' },
          { url: 'https://strapi.hasib.dev/api', description: 'Production server' },
        ],
        externalDocs: {
          description: 'Find out more',
          url: 'https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html'
        },
        security: [{ bearerAuth: [] }]
      }
    },
    upload: {},
  };

  if (env('DISK_DRIVER') === 'r2') {
    configuration.upload = {
      config: {
        provider: 'strapi-provider-upload-cloudflare-r2',
        providerOptions: {
          accessKeyId: env('R2_ACCESS_KEY_ID'),
          secretAccessKey: env('R2_ACCESS_SECRET'),
          region: env('R2_REGION'),
          params: {
            Bucket: env('R2_BUCKET'),
            accountId: env('R2_ACCOUNT_ID'),
            publicUrl: env('R2_PUBLIC_URL'),
          },
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    };
  }

  return configuration;
};