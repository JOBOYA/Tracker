import { createApp } from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import './assets/style.css';
import router from './route/index.js'; // Make sure this path is correct
import App from './App.vue'; // Make sure this path is correct

const app = createApp(App); // Create Vue app with App.vue
app.use(Toast);
app.use(router); // Use vue-router
app.mount('#app');
