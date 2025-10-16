import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import PortfolioSimple from '../templates/PortfolioSimple'
import BusinessLanding from '../templates/BusinessLanding'
import PersonalBlog from '../templates/PersonalBlog'
import CreativeAgency from '../templates/CreativeAgency'

// Map template IDs to components
const TEMPLATES = {
  1: PortfolioSimple,
  2: BusinessLanding,
  3: PersonalBlog,
  4: CreativeAgency,
}

export default function DynamicWebsite() {
  const { websiteSlug } = useParams()
  const [website, setWebsite] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchWebsite()
  }, [websiteSlug])

  async function fetchWebsite() {
    try {
      setLoading(true)
      setError(null)

      // Fetch website data from Supabase
      const { data, error: fetchError } = await supabase
        .from('websites')
        .select('*')
        .eq('website_slug', websiteSlug)
        .eq('is_published', true)
        .single()

      if (fetchError) {
        throw new Error('Website not found')
      }

      if (!data) {
        throw new Error('Website not found')
      }

      setWebsite(data)

      // Update view count
      await supabase
        .from('websites')
        .update({ view_count: (data.view_count || 0) + 1 })
        .eq('id', data.id)

    } catch (err) {
      console.error('Error fetching website:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loader}></div>
        <p style={styles.loadingText}>Loading website...</p>
      </div>
    )
  }

  // Error state
  if (error || !website) {
    return (
      <div style={styles.errorContainer}>
        <h1 style={styles.errorTitle}>404</h1>
        <h2 style={styles.errorHeading}>Website Not Found</h2>
        <p style={styles.errorText}>
          The website you're looking for doesn't exist or hasn't been published yet.
        </p>
      </div>
    )
  }

  // Get the appropriate template component
  const TemplateComponent = TEMPLATES[website.template_id] || PortfolioSimple

  // Render the template with website data
  return <TemplateComponent data={website} />
}

// Inline styles for loading and error states
const styles = {
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
  },
  loader: {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #667eea',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '1rem',
    fontSize: '1.1rem',
    color: '#666',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
    padding: '2rem',
  },
  errorTitle: {
    fontSize: '6rem',
    fontWeight: 'bold',
    color: '#667eea',
    margin: 0,
  },
  errorHeading: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#333',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  errorText: {
    fontSize: '1.1rem',
    color: '#666',
    maxWidth: '500px',
  },
}
