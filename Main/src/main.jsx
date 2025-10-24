import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// FontAwesome Configuration
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faTimes,
  faUser,
  faIdCard,
  faEnvelope,
  faPhone,
  faCheckCircle,
  faClock,
  faTriangleExclamation,
  faClockRotateLeft,
  faUpload,
  faFile,
  faDownload,
  faTrash,
  faChartLine,
  faFileInvoiceDollar,
  faCalendarAlt,
  faFilter,
  faArrowUp,
  faArrowDown,
  faCircleCheck,
  faSpinner,
  faPlus,
  faPencil,
  faUserCheck,
  faUserPlus,
  faShield,
  faBell,
  faLanguage,
  faKey,
  faEye,
  faEyeSlash,
  faSave,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faBars,
  faTimes,
  faUser,
  faIdCard,
  faEnvelope,
  faPhone,
  faCheckCircle,
  faClock,
  faTriangleExclamation,
  faClockRotateLeft,
  faUpload,
  faFile,
  faDownload,
  faTrash,
  faChartLine,
  faFileInvoiceDollar,
  faCalendarAlt,
  faFilter,
  faArrowUp,
  faArrowDown,
  faCircleCheck,
  faSpinner,
  faPlus,
  faPencil,
  faUserCheck,
  faUserPlus,
  faShield,
  faBell,
  faLanguage,
  faKey,
  faEye,
  faEyeSlash,
  faSave,
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
