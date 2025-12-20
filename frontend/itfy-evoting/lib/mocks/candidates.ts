
import { Candidate } from '@/types/index';    

export const mockCandidates: Candidate[] = [
    {
        _id: 'cand1',
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane.doe@example.com',
        candidate_code: 'JD001',
        phone_number: '+1234567890',
        slug: 'jane-doe',
        bio: 'Experienced leader with a focus on education reform. With over 15 years in educational policy development and implementation, I have dedicated my career to ensuring equal access to quality education for all students regardless of their background or circumstances.',
        profile_image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&w=400&h=400&facepad=2',
        cover_image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80'
        ],
        video_url: 'https://youtu.be/jane-intro',
        projects: [
            { title: 'Education Reform Initiative', description: 'Led a major education reform project that increased graduation rates by 25% in underserved communities.', url: 'https://project.edu', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80', date: '2023-01-01' },
            { title: 'Digital Learning Platform', description: 'Developed an accessible digital learning platform serving over 50,000 students.', url: 'https://learning.edu', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80', date: '2022-06-15' }
        ],
        skills: ['Leadership', 'Education Policy', 'Public Speaking', 'Strategic Planning', 'Team Building'],
        education: [
            { institution: 'Harvard University', qualification: 'Ed.D', field: 'Educational Leadership', start_date: '2012-09-01', end_date: '2015-06-30' },
            { institution: 'State University', qualification: 'M.Ed', field: 'Education', start_date: '2010-09-01', end_date: '2012-06-30' }
        ],
        experience: [
            { company: 'Department of Education', position: 'Director of Policy', start_date: '2018-01-01', current: true, description: 'Leading educational policy initiatives across the state.' },
            { company: 'City Schools District', position: 'Principal', start_date: '2015-08-01', end_date: '2017-12-31', current: false, description: 'Managed a school of 1,500 students, improving test scores by 30%.' }
        ],
        achievements: [
            { title: 'Education Innovator of the Year', description: 'Recognized for innovative approaches to education reform.', date: '2023-05-15', organization: 'National Education Association' },
            { title: 'Community Leadership Award', description: 'Awarded for outstanding community service.', date: '2022-11-20', organization: 'City Council' }
        ],
        social_links: {
            facebook: 'https://facebook.com/jane.doe',
            twitter: 'https://twitter.com/janedoe',
            linkedin: 'https://linkedin.com/in/janedoe',
            instagram: 'https://instagram.com/janedoe',
            website: 'https://janedoe.com'
        },
        status: 'approved',
        event: 'event1',
        categories: ['cat1', 'cat2'],
        admin_verified_categories: ['cat1'],
        vote_count: 1200,
        view_count: 5420,
        is_featured: true,
        is_published: true,
        display_order: 1,
        why_nominate_me: 'I bring a unique combination of academic expertise and practical experience in education reform. My track record of successful initiatives speaks to my ability to create meaningful change.',
        impact_statement: 'Together, we can transform education to be more inclusive, accessible, and effective for every student in our community.',
        endorsements: [
            { name: 'Dr. Michael Chen', position: 'Former Education Minister', message: 'Jane\'s dedication to education reform is unparalleled. She has my full support.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=100&h=100&facepad=2' },
            { name: 'Sarah Williams', position: 'School Board President', message: 'A visionary leader who truly understands the needs of our students.' }
        ],
        tags: ['education', 'reform', 'leadership', 'innovation'],
        nomination_date: '2025-01-01T10:00:00Z',
        approval_date: '2025-01-05T14:30:00Z',
        created_at: '2025-01-01T10:00:00Z',
        updated_at: '2025-12-01T10:00:00Z',
    },
    {
        _id: 'cand2',
        first_name: 'John',
        last_name: 'Smith',
        email: 'john.smith@example.com',
        candidate_code: 'JS002',
        phone_number: '+1234567891',
        slug: 'john-smith',
        bio: 'Advocate for environmental sustainability and renewable energy. I have spent the last decade working on climate solutions and believe that our region can lead the way in sustainable development.',
        profile_image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&w=400&h=400&facepad=2',
        cover_image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80'
        ],
        video_url: '',
        projects: [
            { title: 'Solar Initiative', description: 'Implemented solar energy programs in 15 rural communities.', url: 'https://solar.org', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80', date: '2024-03-01' }
        ],
        skills: ['Sustainability', 'Renewable Energy', 'Environmental Science', 'Project Management'],
        education: [
            { institution: 'MIT', qualification: 'MS', field: 'Environmental Engineering', start_date: '2014-09-01', end_date: '2016-06-30' }
        ],
        experience: [
            { company: 'Green Energy Corp', position: 'Sustainability Director', start_date: '2019-03-01', current: true, description: 'Leading corporate sustainability initiatives.' }
        ],
        achievements: [
            { title: 'Green Leader Award', description: 'Recognized for environmental leadership.', date: '2024-01-10', organization: 'Environmental Council' }
        ],
        social_links: {
            twitter: 'https://twitter.com/johnsmith',
            linkedin: 'https://linkedin.com/in/johnsmith',
            github: 'https://github.com/johnsmith'
        },
        status: 'pending',
        event: 'event1',
        categories: ['cat1'],
        vote_count: 950,
        view_count: 3200,
        is_featured: false,
        is_published: false,
        display_order: 2,
        why_nominate_me: 'My expertise in environmental policy and renewable energy can help our community transition to a sustainable future.',
        tags: ['environment', 'sustainability', 'renewable'],
        nomination_date: '2025-02-01T10:00:00Z',
        created_at: '2025-02-01T10:00:00Z',
        updated_at: '2025-12-01T10:00:00Z',
    },
    {
        _id: 'cand3',
        first_name: 'Alice',
        last_name: 'Johnson',
        email: 'alice.johnson@example.com',
        candidate_code: 'AJ003',
        phone_number: '+1234567892',
        slug: 'alice-johnson',
        bio: 'Community organizer and entrepreneur focused on small business growth. I have helped launch over 100 small businesses in our community and believe in the power of local enterprise.',
        profile_image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&w=400&h=400&facepad=2',
        cover_image: null,
        gallery: [],
        video_url: '',
        projects: [
            { title: 'Small Business Accelerator', description: 'A program that has helped launch 100+ local businesses.', url: 'https://smallbiz.local', date: '2023-08-01' }
        ],
        skills: ['Entrepreneurship', 'Community Organizing', 'Business Development', 'Mentorship'],
        education: [
            { institution: 'Business School', qualification: 'MBA', field: 'Entrepreneurship', start_date: '2016-09-01', end_date: '2018-06-30' }
        ],
        experience: [
            { company: 'Community Business Center', position: 'Executive Director', start_date: '2020-01-01', current: true, description: 'Supporting local entrepreneurs and small businesses.' }
        ],
        achievements: [],
        social_links: {
            linkedin: 'https://linkedin.com/in/alicejohnson'
        },
        status: 'rejected',
        event: 'event2',
        categories: ['cat3'],
        vote_count: 100,
        view_count: 890,
        is_featured: false,
        is_published: false,
        display_order: 3,
        rejection_reason: 'Incomplete documentation',
        nomination_date: '2025-03-01T10:00:00Z',
        tags: ['business', 'entrepreneur'],
        created_at: '2025-03-01T10:00:00Z',
        updated_at: '2025-12-01T10:00:00Z',
    },
    {
        _id: 'cand4',
        first_name: 'Bob',
        last_name: 'Lee',
        email: 'bob.lee@example.com',
        candidate_code: 'BL004',
        phone_number: '+1234567893',
        slug: 'bob-lee',
        bio: 'Veteran and public servant with a record of local government leadership. After serving 20 years in the military, I have dedicated myself to serving our community through local government initiatives.',
        profile_image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&w=400&h=400&facepad=2',
        cover_image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80'
        ],
        video_url: 'https://youtu.be/bob-intro',
        projects: [
            { title: 'Veterans Support Program', description: 'Established a comprehensive support system for returning veterans.', url: 'https://vets.org', date: '2022-01-01' },
            { title: 'Community Safety Initiative', description: 'Reduced local crime rates by 15% through community engagement.', date: '2023-06-01' }
        ],
        skills: ['Public Service', 'Leadership', 'Veterans Affairs', 'Community Safety', 'Crisis Management'],
        education: [
            { institution: 'Military Academy', qualification: 'BS', field: 'Leadership', start_date: '1995-09-01', end_date: '1999-06-30' },
            { institution: 'State University', qualification: 'MPA', field: 'Public Administration', start_date: '2016-09-01', end_date: '2018-06-30' }
        ],
        experience: [
            { company: 'City Council', position: 'Council Member', start_date: '2020-01-01', current: true, description: 'Representing District 5 on city council.' },
            { company: 'US Army', position: 'Colonel', start_date: '1999-07-01', end_date: '2019-06-30', current: false, description: 'Led various units throughout 20-year career.' }
        ],
        achievements: [
            { title: 'Distinguished Service Medal', description: 'Awarded for exceptional military service.', date: '2018-06-01', organization: 'US Army' },
            { title: 'Public Servant of the Year', description: 'Recognized for outstanding community service.', date: '2023-12-15', organization: 'City Chamber of Commerce' }
        ],
        social_links: {
            facebook: 'https://facebook.com/boblee',
            twitter: 'https://twitter.com/boblee'
        },
        status: 'approved',
        event: 'event2',
        categories: ['cat2'],
        admin_verified_categories: ['cat2'],
        vote_count: 800,
        view_count: 4100,
        is_featured: true,
        is_published: true,
        display_order: 4,
        why_nominate_me: 'My experience in leadership, both military and civilian, has prepared me to serve our community effectively.',
        impact_statement: 'I will bring the same dedication I showed in serving our country to serving our community.',
        endorsements: [
            { name: 'General Mark Thompson', position: 'Retired General', message: 'Bob is one of the finest leaders I have ever worked with.' }
        ],
        tags: ['veteran', 'public-service', 'leadership'],
        nomination_date: '2025-04-01T10:00:00Z',
        approval_date: '2025-04-10T09:00:00Z',
        created_at: '2025-04-01T10:00:00Z',
        updated_at: '2025-12-01T10:00:00Z',
    },
    {
        _id: 'cand5',
        first_name: 'Maria',
        last_name: 'Garcia',
        email: 'maria.garcia@example.com',
        candidate_code: 'MG005',
        phone_number: '+1234567894',
        slug: 'maria-garcia',
        bio: 'Grassroots activist and advocate for social justice. I have spent the last 8 years fighting for equality and justice in our community, organizing rallies, and building coalitions.',
        profile_image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&w=400&h=400&facepad=2',
        cover_image: null,
        gallery: [],
        video_url: '',
        projects: [
            { title: 'Justice for All Campaign', description: 'A grassroots campaign that successfully advocated for police reform.', date: '2024-01-01' }
        ],
        skills: ['Activism', 'Community Organizing', 'Public Speaking', 'Coalition Building'],
        education: [
            { institution: 'Community College', qualification: 'AA', field: 'Social Work', start_date: '2012-09-01', end_date: '2014-06-30' }
        ],
        experience: [
            { company: 'Justice Alliance', position: 'Lead Organizer', start_date: '2018-01-01', current: true, description: 'Organizing grassroots campaigns for social justice.' }
        ],
        achievements: [],
        social_links: {
            instagram: 'https://instagram.com/mariagarcia',
            twitter: 'https://twitter.com/mariagarcia'
        },
        status: 'pending',
        event: 'event3',
        categories: ['cat4'],
        vote_count: 50,
        view_count: 560,
        is_featured: false,
        is_published: false,
        display_order: 5,
        why_nominate_me: 'I am the voice of the people who have been overlooked for too long.',
        tags: ['activism', 'social-justice'],
        nomination_date: '2025-05-01T10:00:00Z',
        created_at: '2025-05-01T10:00:00Z',
        updated_at: '2025-12-01T10:00:00Z',
    },
    {
        _id: 'cand6',
        first_name: 'Samuel',
        last_name: 'Kim',
        email: 'samuel.kim@example.com',
        candidate_code: 'SK006',
        phone_number: '+1234567895',
        slug: 'samuel-kim',
        bio: 'Tech entrepreneur and education advocate. I founded a successful ed-tech startup and believe technology can revolutionize how we learn and grow as a community.',
        profile_image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&w=400&h=400&facepad=2',
        cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80'
        ],
        video_url: 'https://youtu.be/samuel-intro',
        projects: [
            { title: 'EduTech Platform', description: 'An AI-powered learning platform serving 100,000+ students.', url: 'https://edutech.io', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80', date: '2021-03-01' },
            { title: 'Code for Kids', description: 'Free coding classes for underprivileged children.', url: 'https://codeforkids.org', date: '2023-01-01' }
        ],
        skills: ['Technology', 'Education', 'Entrepreneurship', 'Software Development', 'AI/ML'],
        education: [
            { institution: 'Stanford University', qualification: 'MS', field: 'Computer Science', start_date: '2013-09-01', end_date: '2015-06-30' },
            { institution: 'UCLA', qualification: 'BS', field: 'Computer Science', start_date: '2009-09-01', end_date: '2013-06-30' }
        ],
        experience: [
            { company: 'EduTech Inc.', position: 'CEO & Founder', start_date: '2018-01-01', current: true, description: 'Leading an ed-tech startup with 50+ employees.' },
            { company: 'Google', position: 'Software Engineer', start_date: '2015-07-01', end_date: '2017-12-31', current: false, description: 'Worked on Google Education products.' }
        ],
        achievements: [
            { title: 'Forbes 30 Under 30', description: 'Recognized as a top young entrepreneur.', date: '2022-01-15', organization: 'Forbes' },
            { title: 'Tech Innovator Award', description: 'For contributions to educational technology.', date: '2023-09-01', organization: 'TechCrunch' }
        ],
        social_links: {
            twitter: 'https://twitter.com/samuelkim',
            linkedin: 'https://linkedin.com/in/samuelkim',
            github: 'https://github.com/samuelkim',
            website: 'https://samuelkim.dev'
        },
        status: 'approved',
        event: 'event3',
        categories: ['cat1', 'cat4'],
        admin_verified_categories: ['cat1', 'cat4'],
        vote_count: 670,
        view_count: 3800,
        is_featured: false,
        is_published: true,
        display_order: 6,
        why_nominate_me: 'I bring technical expertise combined with a passion for education that can help modernize our community.',
        impact_statement: 'Technology, when used correctly, can level the playing field for everyone.',
        endorsements: [
            { name: 'Dr. Lisa Wong', position: 'Dean of Engineering', message: 'Samuel\'s innovative approach to education is exactly what we need.' }
        ],
        tags: ['technology', 'education', 'innovation', 'startup'],
        nomination_date: '2025-06-01T10:00:00Z',
        approval_date: '2025-06-08T11:00:00Z',
        created_at: '2025-06-01T10:00:00Z',
        updated_at: '2025-12-01T10:00:00Z',
    },
    {
        _id: 'cand7',
        first_name: 'Linda',
        last_name: 'Park',
        email: 'linda.park@example.com',
        candidate_code: 'LP007',
        phone_number: '+1234567896',
        slug: 'linda-park',
        bio: 'Healthcare professional and community volunteer. As a nurse practitioner with 12 years of experience, I understand the healthcare challenges our community faces and am committed to improving access to quality care.',
        profile_image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&w=400&h=400&facepad=2',
        cover_image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80'
        ],
        video_url: '',
        projects: [
            { title: 'Community Health Fair', description: 'Annual health fair providing free screenings to 2,000+ residents.', date: '2024-04-01' },
            { title: 'Mobile Health Clinic', description: 'Launched a mobile clinic serving rural communities.', url: 'https://mobilehealth.org', date: '2023-02-01' }
        ],
        skills: ['Healthcare', 'Volunteering', 'Community Outreach', 'Patient Care', 'Health Education'],
        education: [
            { institution: 'Johns Hopkins University', qualification: 'DNP', field: 'Nursing Practice', start_date: '2015-09-01', end_date: '2018-06-30' },
            { institution: 'State Nursing School', qualification: 'BSN', field: 'Nursing', start_date: '2008-09-01', end_date: '2012-06-30' }
        ],
        experience: [
            { company: 'Community Health Center', position: 'Lead Nurse Practitioner', start_date: '2019-01-01', current: true, description: 'Providing primary care to underserved populations.' },
            { company: 'City Hospital', position: 'Registered Nurse', start_date: '2012-07-01', end_date: '2018-12-31', current: false, description: 'Worked in emergency and intensive care units.' }
        ],
        achievements: [
            { title: 'Nurse of the Year', description: 'Recognized for exceptional patient care.', date: '2022-05-12', organization: 'State Nursing Association' },
            { title: 'Community Hero Award', description: 'For volunteer health services.', date: '2024-02-20', organization: 'Local Community Foundation' }
        ],
        social_links: {
            facebook: 'https://facebook.com/lindapark',
            linkedin: 'https://linkedin.com/in/lindapark',
            instagram: 'https://instagram.com/lindapark'
        },
        status: 'approved',
        event: 'event1',
        categories: ['cat2'],
        admin_verified_categories: ['cat2'],
        vote_count: 540,
        view_count: 2950,
        is_featured: true,
        is_published: true,
        display_order: 7,
        why_nominate_me: 'Healthcare should be accessible to everyone. I have the experience and dedication to make this a reality.',
        impact_statement: 'Healthy communities are thriving communities. Let\'s work together for better healthcare access.',
        endorsements: [
            { name: 'Dr. Robert Chen', position: 'Chief Medical Officer', message: 'Linda\'s commitment to community health is inspiring.', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=facearea&w=100&h=100&facepad=2' }
        ],
        tags: ['healthcare', 'community', 'nursing', 'volunteer'],
        nomination_date: '2025-07-01T10:00:00Z',
        approval_date: '2025-07-05T10:30:00Z',
        created_at: '2025-07-01T10:00:00Z',
        updated_at: '2025-12-01T10:00:00Z',
    },
];