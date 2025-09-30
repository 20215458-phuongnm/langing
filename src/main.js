// main.js
import { createApp } from 'vue'
import App from './App.vue'

// import Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'tailwindcss/tailwind.css'
import Countdown from 'vue3-flip-countdown'

// Tạo instance Vuetify
const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(vuetify).mount('#app')
