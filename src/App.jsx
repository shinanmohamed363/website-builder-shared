import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DynamicWebsite from './pages/DynamicWebsite'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dynamic website route - catches /:websiteSlug */}
        <Route path="/:websiteSlug" element={<DynamicWebsite />} />

        {/* Home route - redirect to a landing page or show info */}
        <Route path="/" element={<HomePage />} />

        {/* 404 - catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

// Home page component
function HomePage() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Website Builder</h1>
        <p style={styles.subtitle}>Free Website Hosting Platform</p>
        <p style={styles.description}>
          This is a shared hosting platform for free websites created with our Website Builder app.
        </p>
        <p style={styles.description}>
          To create your own free website, download the Website Builder mobile app.
        </p>
      </div>
    </div>
  )
}

// 404 page component
function NotFound() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.errorTitle}>404</h1>
        <h2 style={styles.title}>Page Not Found</h2>
        <p style={styles.description}>
          The page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    textAlign: 'center',
    padding: '2rem',
  },
  content: {
    maxWidth: '600px',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    opacity: 0.9,
  },
  description: {
    fontSize: '1.1rem',
    marginBottom: '1rem',
    opacity: 0.9,
  },
  errorTitle: {
    fontSize: '6rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
}

export default App
