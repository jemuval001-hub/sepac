/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AlumniProfile, CommunityPost, SupportProject, ScriptureVerse } from './types';

export const INITIAL_ALUMNI: AlumniProfile[] = [
  {
    id: 'alumni-1',
    name: 'Jean de Dieu Mugisha',
    graduationYear: 2012,
    profession: 'Senior Software Engineer & Tech Mentor',
    location: 'Kigali, Rwanda',
    testimony: 'My years at ES Saint Esprit Nyanza were foundational. The regular evening devotions and student choir taught me that technical excellence is nothing without the character of Christ. Today, I lead engineering teams with integrity.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    email: 'jd.mugisha@example.com',
    linkedin: 'linkedin.com/in/jdmugisha',
    createdAt: '2026-01-15T08:00:00Z',
    password: 'nyanza123'
  },
  {
    id: 'alumni-2',
    name: 'Divine Mutoni',
    graduationYear: 2016,
    profession: 'Clinical Research Coordinator',
    location: 'Huye, Rwanda',
    testimony: 'During my time at Nyanza, Scripture Union was my second home. Learning how to pray and seek God under the chapel trees shaped my desire to go into healthcare with a compassionate heart. I am forever grateful.',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
    email: 'd.mutoni@example.com',
    linkedin: 'linkedin.com/in/dmutoni',
    createdAt: '2026-02-10T11:30:00Z',
    password: 'nyanza123'
  },
  {
    id: 'alumni-3',
    name: 'Emmanuel Nshimyumuremyi',
    graduationYear: 2008,
    profession: 'Educational Consultant & Protestant Lay Leader',
    location: 'Nyanza, Rwanda',
    testimony: 'Looking back at Ecole Secondaire Saint Esprit, I remember teachers who did not just teach mathematics but prayed before class. My mission now is to build active Christian education networks across the Southern Province.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    email: 'emmanuel.n@example.com',
    createdAt: '2026-03-01T09:15:00Z',
    password: 'nyanza123'
  },
  {
    id: 'alumni-4',
    name: 'Grace Umutoniwase',
    graduationYear: 2019,
    profession: 'Agricultural Business Founder',
    location: 'Rwamagana, Rwanda',
    testimony: 'The scholarship support I received code-named "Holy Spirit Love" at the school changed my life. Now, as an alumna, I run a farm that feeds families and teaches sustainable agriculture. I want to give back to the current students!',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    email: 'grace.umu@example.com',
    linkedin: 'linkedin.com/in/graceutoni',
    createdAt: '2026-03-20T14:45:00Z',
    password: 'nyanza123'
  },
  {
    id: 'alumni-5',
    name: 'Patrick Gasana',
    graduationYear: 2015,
    profession: 'Human Resource Director',
    location: 'Nairobi, Kenya',
    testimony: 'I was the school captain (préfet) in 2014-2015. Managing the student body helped me realize my call to leadership. SEPAC keeps me connected to my roots and reminds me of the high standards of faith we held.',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80',
    email: 'p.gasana@example.com',
    linkedin: 'linkedin.com/in/pgasana',
    createdAt: '2026-04-05T10:00:00Z',
    password: 'nyanza123'
  }
];

export const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    type: 'testimony',
    authorName: 'Ephrem Kayitare',
    authorYear: 2011,
    title: 'A Story of God’s Provision',
    content: 'When I was studying at Saint Esprit in 2010, my family suffered a severe financial blow. The alumni mobilization of that era quietly cleared my fees. Last week, I joined as a donor for the new school library. God is truly a father to the fatherless!',
    prayersCount: 18,
    category: 'Thanksgiving',
    createdAt: '2026-05-12T16:20:00Z'
  },
  {
    id: 'post-2',
    type: 'prayer',
    authorName: 'Sister Marie-Claire Uwera',
    authorYear: 2017,
    title: 'Prayer for Current Candidates sitting for National Exams',
    content: 'Brothers and sisters, let us lift up the senior students at Ecole Secondaire Saint Esprit Nyanza who are preparing for national exams. Pray for clarity of mind, peace that passes all understanding, and that they will represent Christ during this testing season.',
    prayersCount: 42,
    category: 'School Revitalization',
    createdAt: '2026-05-28T07:45:00Z'
  },
  {
    id: 'post-3',
    type: 'testimony',
    authorName: 'David Nshimyumuremyi',
    authorYear: 2014,
    title: 'Faith in the Workplace',
    content: 'I recently got promoted to a senior role in finance. My direct manager noted my high honesty and standard in handling audits. I told her I learned this at the altar of the Nyanza chapel when we studied Nehemiah’s integrity. Pray that I never compromise!',
    prayersCount: 24,
    category: 'Career Guide',
    createdAt: '2026-06-01T12:00:00Z'
  },
  {
    id: 'post-4',
    type: 'prayer',
    authorName: 'Chantal Mukamanzi',
    authorYear: 2020,
    title: 'Seeking Wisdom for University Specialization',
    content: 'Please pray with me as I make decisions on my graduate research path. I want my research to serve the developing communities of Rwanda, especially in public health, honoring the Protestant calling to do good in society.',
    prayersCount: 15,
    category: 'Spiritual Growth',
    createdAt: '2026-06-03T10:30:00Z'
  }
];

export const SUPPORT_PROJECTS: SupportProject[] = [
  {
    id: 'proj-1',
    title: 'Chapel Sanctuary Sound System & Renovation',
    description: 'Upgrading the old audio equipment and repainting the main school chapel hall where spiritual gatherings hold. This chapel has nurtured thousands of souls over 30 years.',
    goalAmount: 4500,
    currentAmount: 3120,
    category: 'Chapel Renovation'
  },
  {
    id: 'proj-2',
    title: 'SEPAC Faith Student Welfare Fund',
    description: 'Providing school uniforms, basic medical insurance (Mutuelle de Santé), and scholastic materials for 25 orphaned or low-income students currently studying at ES Saint Esprit Nyanza.',
    goalAmount: 6000,
    currentAmount: 4850,
    category: 'Student Scholarship'
  },
  {
    id: 'proj-3',
    title: 'Modern Christian Literature Library Corner',
    description: 'Curating a special space in the school library containing devotionals, inspiring leadership biographies, theological study guides, and digital reading tablets.',
    goalAmount: 2500,
    currentAmount: 950,
    category: 'Library & Lab'
  }
];

export const BIBLE_VERSES: ScriptureVerse[] = [
  {
    reference: 'Hebrews 10:24-25',
    text: 'And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another—and all the more as you see the Day approaching.',
    context: 'The official SEPAC foundational scripture. Encouraging persistent fellowship and proactive brotherly love.'
  },
  {
    reference: 'Galatians 6:2',
    text: 'Carry each other’s burdens, and in this way you will fulfill the law of Christ.',
    context: 'Inspiring our supportive prayer wall and benevolence fund representing the active hands of Jesus.'
  },
  {
    reference: 'Matthew 5:16',
    text: 'In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.',
    context: 'Molding exemplary leaders who serve in communities with integrity.'
  },
  {
    reference: 'Colossians 3:23',
    text: 'Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.',
    context: 'Our commitment to professional and educational excellence.'
  }
];
