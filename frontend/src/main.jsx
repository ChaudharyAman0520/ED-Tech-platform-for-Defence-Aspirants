import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'


import './style/base/variables.css'
import './style/base/reset.css'
import './style/base/typography.css'
import './style/components/buttons.css'
import './style/components/cards.css'
import './style/components/navbar.css'
import './style/components/tables.css'
import './style/components/modal.css'
import './style/layouts/admin-layout.css'
import './style/layouts/aspirant-layout.css'
import './style/utils/animations.css'
import './style/utils/responsive.css'

import './style/pages/home.css'
import './style/pages/login.css'
import './style/pages/register.css'
import './style/pages/admin.css'
import './style/pages/aspirant.css'
import './style/pages/public-pages.css'
import './style/components/grid.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)