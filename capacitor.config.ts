import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'app-autobuses',
  webDir: 'dist'
};

export default {
  appId: 'com.example.app',
  appName: 'TuApp',
  webDir: 'build', // Esta debe ser la carpeta donde se generan tus activos de producción
  bundledWebRuntime: false
};
