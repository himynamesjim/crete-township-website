import { initBotId } from 'botid/client/core'

// Vercel BotID — invisible bot protection for public form endpoints.
// Each path listed here gets classification headers attached client-side;
// the matching API route enforces the verdict via checkBotId().
initBotId({
  protect: [
    { path: '/api/contact-submit', method: 'POST' },
    { path: '/api/foia-submit', method: 'POST' },
    { path: '/api/newsletter-subscribe', method: 'POST' },
    { path: '/api/ga-inquiry-submit', method: 'POST' },
    { path: '/api/community-center-survey', method: 'POST' },
  ],
})
