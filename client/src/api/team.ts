import api from './api';

// Description: Get a list of team members
// Endpoint: GET /api/team
// Request: {}
// Response: { members: Array<{ id: string, name: string, role: string, image: string, bio: string, skills: string[], social: { linkedin: string, twitter: string, github: string } }> }
export const getTeamMembers = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        members: [
          {
            id: '1',
            name: 'Sarah Johnson',
            role: 'Creative Director',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
            bio: '10+ years of experience in digital design and brand strategy',
            skills: ['UI/UX Design', 'Brand Strategy', 'Creative Direction'],
            social: {
              linkedin: '#',
              twitter: '#',
              github: '#'
            }
          },
          {
            id: '2',
            name: 'Michael Chen',
            role: 'Lead Developer',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
            bio: 'Full-stack developer passionate about creating scalable solutions',
            skills: ['React', 'Node.js', 'Cloud Architecture'],
            social: {
              linkedin: '#',
              twitter: '#',
              github: '#'
            }
          },
          {
            id: '3',
            name: 'Emily Rodriguez',
            role: 'UX Researcher',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
            bio: 'Data-driven designer focused on user-centered design principles',
            skills: ['User Research', 'Prototyping', 'Data Analysis'],
            social: {
              linkedin: '#',
              twitter: '#',
              github: '#'
            }
          },
          {
            id: '4',
            name: 'David Kim',
            role: 'Mobile Developer',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
            bio: 'Specialist in cross-platform mobile development and native apps',
            skills: ['React Native', 'Flutter', 'iOS/Android'],
            social: {
              linkedin: '#',
              twitter: '#',
              github: '#'
            }
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/team');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
}