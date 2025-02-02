export default {
  debug: false,
  demo: false,
  company: 'Company Name',
  items: {
    nameIsPartnumber: true,
    displayPartnumberAsName: false,
  },
  build: {
    base: '/',
  },
  url: {
    backend: 'http://localhost:5000',
    domain: 'http://localhost:4000',
    rfidAuth: 'ws://localhost:5500',
  },
  patExpireMinutes: 43200,
  allowUnsupportedBrowsers: false,
}
