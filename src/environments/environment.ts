// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  client: {
      protocol: 'http',
      host: '10.0.2.2',
      port: '4200'
  },
  server: {
      protocol: 'https',
      host: 'www.flightclub.io',
      port: '8443'
  },
  baseUrl: '/',
  enableDebug: true,
  cesium: {
    bingMapsApiDefaultKey: 'Atr1lJvbFdMUnJ6fw4qGKDcZuEjzVRh-6WLmrRZDcCggpZIPH9sdEyUWGWXO1kPc',
    ionAccessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MTA1NjVmNy0zZWFkLTQ5NWItOWFiYy1hYjY2MDMwZmEzNDEiLCJpZCI6MjkwMywiaWF0IjoxNTM1MTA2MzQwfQ.Q5ET4GSG3SS3uNyzpwQWGGa1EParGZudTY0JSlpMZ8M'
  },
  patreon: {
    client_id: 'Y6971JRoufFRjLqGzzNZuQFdgXtbJgzb4MHX2nzU32gzqckRsaO4uL9i9fUcoP8k',
    redirect_uri: '/patreon/auth/callback'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
