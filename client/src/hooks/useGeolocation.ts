import { useState, useEffect } from 'react'

interface GeolocationState {
  city: string
  state: string
  country: string
  loading: boolean
  error: string | null
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<GeolocationState>({
    city: 'Minneapolis', // Default to Minneapolis as primary market
    state: 'Minnesota',
    country: 'United States',
    loading: true,
    error: null
  })

  useEffect(() => {
    const detectLocation = async () => {
      console.log('useGeolocation: Starting professional location detection')
      
      try {
        let locationData = null

        // Try primary IP service with CSP-safe error handling
        try {
          console.log('useGeolocation: Trying primary IP service')
          const response = await fetch('https://ipapi.co/json/', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            }
          })

          if (response.ok) {
            const data = await response.json()
            console.log('useGeolocation: Primary IP service response:', data)
            
            if (data.city && data.region) {
              locationData = {
                city: data.city,
                state: data.region,
                country: data.country_name || 'United States'
              }
            }
          }
        } catch (error) {
          console.log('useGeolocation: Primary IP service failed (likely CSP-blocked):', error instanceof Error ? error.message : String(error))
          // CSP blocking is expected, continue to fallback
        }

        // If primary failed, use intelligent defaults based on common patterns
        if (!locationData) {
          console.log('useGeolocation: Using intelligent defaults')
          
          // Use timezone to make educated guess
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
          console.log('useGeolocation: Detected timezone:', timezone)
          
          if (timezone.includes('Chicago')) {
            locationData = { city: 'Chicago', state: 'Illinois', country: 'United States' }
          } else if (timezone.includes('New_York')) {
            locationData = { city: 'New York', state: 'New York', country: 'United States' }
          } else if (timezone.includes('Los_Angeles')) {
            locationData = { city: 'Los Angeles', state: 'California', country: 'United States' }
          } else if (timezone.includes('Denver')) {
            locationData = { city: 'Denver', state: 'Colorado', country: 'United States' }
          } else {
            // Default to Minneapolis (our primary market)
            locationData = { city: 'Minneapolis', state: 'Minnesota', country: 'United States' }
          }
        }

        console.log('useGeolocation: Final location data:', locationData)
        
        setLocation({
          ...locationData,
          loading: false,
          error: null
        })

      } catch (error) {
        console.error('useGeolocation: All location detection failed:', error instanceof Error ? error.message : String(error))
        
        // Ultimate fallback - use Minneapolis as default
        setLocation({
          city: 'Minneapolis',
          state: 'Minnesota', 
          country: 'United States',
          loading: false,
          error: null
        })
      }
    }

    // Add a small delay to prevent blocking the UI
    const timer = setTimeout(detectLocation, 100)
    
    return () => clearTimeout(timer)
  }, [])

  return location
}