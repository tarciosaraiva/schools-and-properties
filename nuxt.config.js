export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  dev: process.env.NODE_ENV !== 'production',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Schools and properties',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Schools and properties is a website to assist parents, parents to be or people uncertain where to live on making this decision based on school information and properties matching their needs.' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16' },
      { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: '32x32' },
      { rel: 'apple-touch-icon', type: 'image/png', href: '/apple-touch-icon.png', sizes: '180x180' },
      { rel: 'stylesheet', type: 'text/css', href: '//cdn.maptiler.com/maplibre-gl-js/v1.14.0/maplibre-gl.css' }
    ]
  },

  env: {
    mapTilerSecret: process.env.MAP_TILER_SECRET,
    domainApiKey: process.env.DOMAIN_API_KEY,
    schoolLocations: '06ea284f-1eec-43ec-92f6-9026d826371e',
    primaryZones: '33dea49b-84a9-43ab-af10-a2455acfa88b',
    p7Zones: 'b07924ec-b6e7-4753-a5ad-d9265f6ca53e',
    p8Zones: 'd56a57af-f555-4e3b-a5f0-6ea6b7ef4848',
    p9Zones: '52617416-64a9-4fa3-8e28-ba129d50478d',
    p10Zones: 'f2434a55-5a6b-4568-a27e-36681391d821',
    p11Zones: 'b37e727a-e712-4291-81dd-15d552559208',
    p12Zones: '6bbd7b86-379e-4e58-9e72-e50a5dc1269f',
    domain: process.env.DOMAIN
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'normalize.css',
    'plain-css',
    'vue-slider-component/theme/default.css',
    '@/assets/css/main.css',
    '@/assets/css/sidebar.css',
    '@/assets/css/popup.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/fontawesome'
  ],

  fontawesome: {
    icons: {
      solid: [
        'faBed',
        'faBath',
        'faCar',
        'faDollarSign',
        'faCaretSquareDown',
        'faCaretSquareUp',
        'faSchool',
        'faSearchLocation',
        'faMapMarkedAlt',
        'faLayerGroup',
        'faCheck',
        'faHome'
      ],
      regular: ['faSquare']
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
