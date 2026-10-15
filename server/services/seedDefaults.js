const StudioSettings = require('../models/StudioSettings');
const DanceStyle = require('../models/DanceStyle');
const FAQ = require('../models/FAQ');

async function seedDefaults() {
  const settings = await StudioSettings.findOne({});
  if (!settings) {
    await StudioSettings.create({
      studioName: 'Nritya Nova',
      managerName: 'Jalpa Mam',
      role: 'Manager and Lead Choreographer',
      phone: '',
      email: '',
      whatsapp: '',
      instagram: '',
      address: '',
      childrenFee: 1200,
      adultFee: 1500,
      childAgeRange: 'Ages 4-17',
      classTimes: 'Flexible timings; confirmed by the studio.',
      availabilityNote: 'Contact us anytime; class timings are confirmed by the studio.'
    });
  }

  const stylesCount = await DanceStyle.countDocuments();
  if (stylesCount === 0) {
    await DanceStyle.insertMany([
      {
        name: 'Belly Dance',
        slug: 'belly-dance',
        shortDescription: 'Elegant movement, breathing control, and rhythmic confidence for expressive dancers.',
        description: 'Belly Dance blends expressive posture, controlled movement, and musicality to create a graceful and empowering dance experience. It helps students improve coordination, body awareness, and stage presence while celebrating rhythm and confidence.',
        skillLevel: 'Beginner Friendly',
        ageGroup: 'Teens & Adults',
        image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1400&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1508700115892-45ecd05f9a7d?auto=format&fit=crop&w=900&q=80'
        ],
        benefits: ['Improves posture and core strength', 'Builds confidence and expressive movement', 'Enhances rhythm, control, and flexibility'],
        schedule: 'Saturday & Sunday · 5:00 PM–6:00 PM and weekend workshop sessions',
        active: true,
        featured: true
      },
      {
        name: 'Western Dance',
        slug: 'western',
        shortDescription: 'High-energy routines with attitude, modern choreography, and performance flair.',
        description: 'Western Dance brings together rhythmic footwork, dynamic choreography, and expressive performance elements. Students learn musicality, movement quality, and confidence through lively routines that feel energizing and modern.',
        skillLevel: 'All Levels',
        ageGroup: 'Kids & Adults',
        image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1400&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1518834107812-67afed3b74fe?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80'
        ],
        benefits: ['Builds stamina and stage confidence', 'Improves timing and coordination', 'Encourages personal style and freestyle expression'],
        schedule: 'Regular adult sessions · 8:00 PM–9:00 PM',
        active: true,
        featured: true
      },
      {
        name: 'Semi-Classical Dance',
        slug: 'semi-classical',
        shortDescription: 'A graceful blend of traditional technique and polished stage expression.',
        description: 'Semi-Classical Dance bridges tradition and performance, combining classical posture with fluid storytelling. It helps students enjoy expressive movement, refine technique, and celebrate cultural artistry with contemporary flair.',
        skillLevel: 'Beginner to Intermediate',
        ageGroup: 'All ages',
        image: 'https://images.unsplash.com/photo-1518834107812-67afed3b74fe?auto=format&fit=crop&w=1200&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1518834107812-67afed3b74fe?auto=format&fit=crop&w=1400&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1518834107812-67afed3b74fe?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80'
        ],
        benefits: ['Improves balance, posture, and graceful control', 'Connects students to cultural movement vocabulary', 'Strengthens expressive storytelling'],
        schedule: 'Contact us for batch availability · regular and workshop options',
        active: true,
        featured: true
      },
      {
        name: 'Bollyhop',
        slug: 'bollyhop',
        shortDescription: 'Fun and fast-paced dance inspired by Bollywood with energetic choreography.',
        description: 'Bollyhop blends Bollywood-inspired movement with fun, high-energy choreography that feels upbeat and joyful. Students learn expressive gestures, dynamic transitions, and stage-ready confidence in a vibrant setting.',
        skillLevel: 'All Levels',
        ageGroup: 'Kids & Adults',
        image: 'https://images.unsplash.com/photo-1508700115892-45ecd05f9a7d?auto=format&fit=crop&w=1200&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05f9a7d?auto=format&fit=crop&w=1400&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1508700115892-45ecd05f9a7d?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80'
        ],
        benefits: ['Improves rhythm and performance energy', 'Makes choreography fun and expressive', 'Encourages confidence and group performance'],
        schedule: 'Regular batches available by request · contact the studio for updates',
        active: true,
        featured: true
      },
      {
        name: 'Kids Dance',
        slug: 'kids-dance',
        shortDescription: 'Playful movement classes for children to learn rhythm, coordination, and self-expression.',
        description: 'Kids Dance sessions are designed to help young learners build confidence, creativity, and joy through movement. With age-appropriate choreography and a supportive environment, students grow in expression, coordination, and discipline.',
        skillLevel: 'Beginner Friendly',
        ageGroup: 'Ages 4–17',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1518834107812-67afed3b74fe?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80'
        ],
        benefits: ['Encourages social confidence and self-expression', 'Builds coordination, stamina, and rhythm', 'Creates a joyful and positive learning environment'],
        schedule: 'Kids batch · 5:00 PM–6:00 PM',
        active: true,
        featured: true
      }
    ]);
  }

  const faqCount = await FAQ.countDocuments();
  if (faqCount === 0) {
    await FAQ.insertMany([
      { question: 'How do I apply for admission?', answer: 'Fill out the admission form on the website and our team will contact you for confirmation.' },
      { question: 'What are the children fees?', answer: 'Children classes are ₹1,200 per person, subject to confirmation by the studio.' },
      { question: 'What are the adult fees?', answer: 'Adults start from ₹1,500 per person and final fees may vary by style or package.' },
      { question: 'Which dance styles are available?', answer: 'We offer classical, Bollywood, hip-hop, contemporary, folk, jazz and more.' },
      { question: 'Are beginner-friendly classes available?', answer: 'Yes. Beginner classes are available and can be tailored to the learner’s level.' },
      { question: 'What are the class timings?', answer: 'Timings are flexible and confirmed by the studio after enquiry.' },
      { question: 'Do you offer trial classes?', answer: 'Trial or introductory sessions may be arranged depending on availability and studio schedule.' },
      { question: 'What should students wear?', answer: 'Comfortable dancewear and shoes are recommended; specific requirements may be shared by the studio.' },
      { question: 'How can I contact the studio?', answer: 'Use the contact form or the configured WhatsApp and phone number on the website.' }
    ]);
  }
}

module.exports = seedDefaults;
