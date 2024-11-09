import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueDatePicker from '@vuepic/vue-datepicker';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App)
app.use(router)
app.use(PrimeVue);
app.use(ToastService);
app.component('VueDatePicker', VueDatePicker);
app.mount('#app')
