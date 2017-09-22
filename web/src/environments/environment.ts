// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDwZpOMUQyWBHJhw4bu8wMZKXHoKI_7_ZU',
    authDomain: 'sjsu-cs-160.firebaseapp.com',
    databaseURL: 'https://sjsu-cs-160.firebaseio.com',
    projectId: 'sjsu-cs-160',
    storageBucket: 'sjsu-cs-160.appspot.com',
    messagingSenderId: '126660119383'
  }
};
