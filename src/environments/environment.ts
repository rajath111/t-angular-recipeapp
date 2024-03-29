// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://recipe-ng-project-c3f1e-default-rtdb.firebaseio.com/',
  authSignUpUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAVKJEW4CE2smHfNrz4Oe99qXGrWJOAwEI',
  authSignInUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAVKJEW4CE2smHfNrz4Oe99qXGrWJOAwEI'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
