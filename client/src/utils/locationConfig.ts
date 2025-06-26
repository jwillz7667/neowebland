interface LocationConfig {
  city: string
  state: string
  areas: string[]
  services: {
    title: string
    description: string
    localFocus: string
  }[]
  seoKeywords: string[]
  businessHours: string
  phoneNumber: string
  marketingMessage: string
}

export const locationConfigs: { [key: string]: LocationConfig } = {
  // Twin Cities Metro (Minnesota) - Primary Market
  'Minneapolis': {
    city: 'Minneapolis',
    state: 'Minnesota',
    areas: [
      'Minneapolis', 'St. Paul', 'Bloomington', 'Plymouth', 'Minnetonka',
      'Edina', 'Brooklyn Park', 'Maple Grove', 'Woodbury', 'Burnsville'
    ],
    services: [
      {
        title: 'Website Modernization',
        description: 'Transform your outdated website into a modern, mobile-friendly powerhouse that converts Twin Cities visitors into customers.',
        localFocus: 'Optimized for Minneapolis-St. Paul search results'
      },
      {
        title: 'Local SEO Optimization', 
        description: 'Get found by Twin Cities customers searching for your services. Dominate Minneapolis and St. Paul search results.',
        localFocus: 'Google My Business optimization for Minnesota businesses'
      },
      {
        title: 'Mobile-First Redesign',
        description: 'Ensure your website works perfectly for Minnesota customers browsing on mobile devices.',
        localFocus: 'Tested across Twin Cities mobile networks'
      }
    ],
    seoKeywords: ['web design Minneapolis', 'Minnesota web development', 'Twin Cities SEO'],
    businessHours: 'Mon-Fri: 8am-6pm CST',
    phoneNumber: '612-930-1390',
    marketingMessage: 'Join 200+ Twin Cities businesses that upgraded their websites and saw 300% more customers within 90 days.'
  },
  
  // Chicago Metro (Illinois)
  'Chicago': {
    city: 'Chicago',
    state: 'Illinois', 
    areas: [
      'Chicago', 'Aurora', 'Naperville', 'Joliet', 'Rockford',
      'Elgin', 'Peoria', 'Champaign', 'Waukegan', 'Cicero'
    ],
    services: [
      {
        title: 'Website Modernization',
        description: 'Transform your outdated website into a modern, mobile-friendly powerhouse that converts Chicago area visitors into customers.',
        localFocus: 'Optimized for Chicago metropolitan search results'
      },
      {
        title: 'Local SEO Optimization',
        description: 'Get found by Chicago customers searching for your services. Dominate Chicagoland search results.',
        localFocus: 'Google My Business optimization for Illinois businesses'
      },
      {
        title: 'Mobile-First Redesign',
        description: 'Ensure your website works perfectly for Illinois customers browsing on mobile devices.',
        localFocus: 'Tested across Chicago area mobile networks'
      }
    ],
    seoKeywords: ['web design Chicago', 'Illinois web development', 'Chicago SEO'],
    businessHours: 'Mon-Fri: 8am-6pm CST',
    phoneNumber: '312-555-0199',
    marketingMessage: 'Join 300+ Chicago businesses that upgraded their websites and saw 250% more customers within 90 days.'
  },

  // New York Metro
  'New York': {
    city: 'New York',
    state: 'New York',
    areas: [
      'Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island',
      'Long Island', 'Westchester', 'Nassau', 'Suffolk', 'Yonkers'
    ],
    services: [
      {
        title: 'Website Modernization',
        description: 'Transform your outdated website into a modern, mobile-friendly powerhouse that converts NYC visitors into customers.',
        localFocus: 'Optimized for New York metropolitan search results'
      },
      {
        title: 'Local SEO Optimization',
        description: 'Get found by New York customers searching for your services. Dominate NYC search results.',
        localFocus: 'Google My Business optimization for New York businesses'
      },
      {
        title: 'Mobile-First Redesign',
        description: 'Ensure your website works perfectly for New York customers browsing on mobile devices.',
        localFocus: 'Tested across NYC mobile networks'
      }
    ],
    seoKeywords: ['web design NYC', 'New York web development', 'Manhattan SEO'],
    businessHours: 'Mon-Fri: 9am-7pm EST',
    phoneNumber: '212-555-0199',
    marketingMessage: 'Join 500+ NYC businesses that upgraded their websites and saw 400% more customers within 60 days.'
  },

  // Los Angeles Metro
  'Los Angeles': {
    city: 'Los Angeles',
    state: 'California',
    areas: [
      'Los Angeles', 'Long Beach', 'Anaheim', 'Santa Ana', 'Riverside',
      'San Bernardino', 'Glendale', 'Huntington Beach', 'Santa Clarita', 'Garden Grove'
    ],
    services: [
      {
        title: 'Website Modernization',
        description: 'Transform your outdated website into a modern, mobile-friendly powerhouse that converts LA area visitors into customers.',
        localFocus: 'Optimized for Los Angeles metropolitan search results'
      },
      {
        title: 'Local SEO Optimization',
        description: 'Get found by LA customers searching for your services. Dominate Los Angeles search results.',
        localFocus: 'Google My Business optimization for California businesses'
      },
      {
        title: 'Mobile-First Redesign',
        description: 'Ensure your website works perfectly for California customers browsing on mobile devices.',
        localFocus: 'Tested across LA area mobile networks'
      }
    ],
    seoKeywords: ['web design Los Angeles', 'California web development', 'LA SEO'],
    businessHours: 'Mon-Fri: 8am-6pm PST',
    phoneNumber: '213-555-0199',
    marketingMessage: 'Join 400+ LA businesses that upgraded their websites and saw 350% more customers within 90 days.'
  }
}

export const getLocationConfig = (city: string, state: string): LocationConfig => {
  console.log('getLocationConfig: Looking up config for:', { city, state })

  // Direct city match
  if (locationConfigs[city]) {
    console.log('getLocationConfig: Found direct match for city:', city)
    return locationConfigs[city]
  }

  // State-based matching for major metros
  const stateMatches: { [key: string]: string } = {
    'Minnesota': 'Minneapolis',
    'Illinois': 'Chicago', 
    'New York': 'New York',
    'California': 'Los Angeles',
    'MN': 'Minneapolis',
    'IL': 'Chicago',
    'NY': 'New York', 
    'CA': 'Los Angeles'
  }

  if (stateMatches[state] && locationConfigs[stateMatches[state]]) {
    console.log('getLocationConfig: Found state match, using:', stateMatches[state])
    return locationConfigs[stateMatches[state]]
  }

  // Default to Minneapolis (our primary market)
  console.log('getLocationConfig: Using default Minneapolis config')
  return locationConfigs.Minneapolis
}