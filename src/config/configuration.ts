export const { PORT, APP_NAME, APP_VERSION, APP_DESCRIPTION } = process.env;

export const environments = {
  port: PORT || 3000,
  swagger: {
    title: APP_NAME || 'Iot Water 2',
    description: APP_DESCRIPTION || 'My application',
    version: APP_VERSION || '1.0.0',
  },
};
