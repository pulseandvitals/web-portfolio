window.DASHBOARD_DATA = (function () {
  'use strict';

  var skills = [
    {
      category: 'Frontend',
      icon: 'fa-window-restore',
      items: ['Vue 2 / 3', 'Pinia', 'Inertia.js', 'React', 'JavaScript', 'jQuery', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap CSS', 'Next.js', 'Nuxt.js']
    },
    {
      category: 'Backend',
      icon: 'fa-server',
      items: ['Laravel', 'PHP', 'Blade', 'Livewire', 'Laravel Broadcast', 'Node.js', 'REST APIs', 'SwaggerUI', 'Postman', 'Webhooks', 'Multi-tenancy Architecture', 'RBAC & Audit Logging', 'PDF Generation', 'Yii2', 'C#']
    },
    {
      category: 'Database',
      icon: 'fa-database',
      items: ['MySQL', 'PostgreSQL']
    },
    {
      category: 'Payments & Integrations',
      icon: 'fa-credit-card',
      items: ['PayMongo', 'Laravel Cashier', 'Payment Gateway Integration']
    },
    {
      category: 'CMS & E-commerce',
      icon: 'fa-wordpress',
      items: ['WordPress', 'WordPress Plugins', 'Custom Themes', 'WooCommerce', 'Shopify', 'Wix']
    },
    {
      category: 'Tools & DevOps',
      icon: 'fa-terminal',
      items: ['Git', 'GitHub', 'GitLab', 'BitBucket', 'Vite', 'Pusher', 'Laravel Echo', 'Laravel Reverb', 'Docker', 'FTP', 'SSH', 'CLI', 'Hostinger', 'cPanel', 'Domain / DNS Config', 'Cron', 'Supervisor', 'WAMP']
    },
    {
      category: 'AI Tooling',
      icon: 'fa-magic',
      items: ['Claude AI', 'Claude MCP', 'ChatGPT', 'OpenAI', 'Gemini', 'Gamma AI', 'GitHub Copilot', 'Perplexity', 'Sage Pilot', 'DeepSeek']
    },
    {
      category: 'Design & Collaboration',
      icon: 'fa-paint-brush',
      items: ['Canva', 'Figma', 'Illustrator', 'Jira', 'Trello', 'Slack', 'Teams']
    },
    {
      category: 'Working Style',
      icon: 'fa-handshake-o',
      items: ['Communication', 'Problem Solving', 'Project Management', 'Collaboration', 'Adaptability']
    }
  ];

  var coreStack = [
    { name: 'Laravel', role: 'Backend framework', icon: 'fa-server', primary: true },
    { name: 'Vue.js', role: 'Frontend framework', icon: 'fa-window-restore', primary: true },
    { name: 'Inertia.js', role: 'Laravel + Vue bridge', icon: 'fa-plug' },
    { name: 'PHP', role: 'Language', icon: 'fa-code' },
    { name: 'JavaScript', role: 'Language', icon: 'fa-terminal' },
    { name: 'Tailwind CSS', role: 'Styling', icon: 'fa-paint-brush' },
    { name: 'MySQL', role: 'Database', icon: 'fa-database' }
  ];

  var whatIBuild = [
    { icon: 'fa-window-restore', title: 'Web Applications', desc: 'Scalable apps built around real business needs.' },
    { icon: 'fa-sitemap', title: 'Business Systems', desc: 'POS, booking, rental, insurance and custom systems.' },
    { icon: 'fa-shopping-cart', title: 'E-commerce', desc: 'Shopify, WordPress and custom storefronts.' },
    { icon: 'fa-cubes', title: 'SaaS', desc: 'Subscription-based web platforms.' },
    { icon: 'fa-paint-brush', title: 'UI/UX Implementation', desc: 'Designs turned into polished, responsive interfaces.' },
    { icon: 'fa-gamepad', title: 'Game Development', desc: 'Browser games built as personal projects.' }
  ];

  var services = [
    { icon: 'fa-cubes', title: 'Full Stack Development', desc: 'Complete web apps, frontend to backend.' },
    { icon: 'fa-server', title: 'Laravel Development', desc: 'APIs, authentication, database design and integrations.' },
    { icon: 'fa-window-restore', title: 'Vue Development', desc: 'Interactive interfaces with Vue, Inertia and Tailwind.' },
    { icon: 'fa-sitemap', title: 'Business Systems', desc: 'POS, booking, rental, insurance and CRM-style systems.' },
    { icon: 'fa-wordpress', title: 'Shopify & WordPress', desc: 'Custom sites, themes, integrations and optimization.' },
    { icon: 'fa-paint-brush', title: 'UI/UX Implementation', desc: 'Designs turned into responsive, production-ready interfaces.' }
  ];

  var projectTypes = ['All', 'Web Apps', 'E-commerce', 'SaaS', 'Games', 'Business Systems'];

  var projects = [
    {
      id: 'wisteria',
      title: 'Wisteria Online',
      type: 'Games',
      tagline: 'Browser MMORPG with persistent progression.',
      tech: ['Laravel', 'Vue 3', 'InertiaJS', 'Tailwind CSS'],
      link: 'https://wisteriaonline.com',
      role: 'Solo Full-Stack Developer',
      problem: 'Browser MMORPGs struggle to keep players returning.',
      challenge: 'Keeping real-time combat and events fast in the browser.',
      solution: 'Modular PvP/PvE systems with real-time polling, plus guilds, forums and event calendars for retention.',
      features: ['Real-time PvP/PvE systems', 'Guilds, forums & event calendars', 'Zones and quest lines inspired by Filipino culture'],
      gallery: null
    },
    {
      id: 'wasteland',
      title: 'Wasteland MMORPG',
      type: 'Games',
      tagline: 'Post-apocalyptic browser MMORPG.',
      tech: ['Laravel', 'Vue 3', 'InertiaJS', 'Tailwind CSS'],
      link: 'https://wastelandmmorpg.com',
      role: 'Solo Full-Stack Developer',
      problem: 'A second setting on the same live-service engine.',
      challenge: 'Reusing the engine without duplicating the codebase.',
      solution: 'Extended the Wisteria engine with new factions and quest lines.',
      features: ['Shared modular game engine', 'Pause/resume event controls', 'Faction-based progression'],
      gallery: null
    },
    {
      id: 'aetask',
      title: 'AeTask',
      type: 'SaaS',
      tagline: 'Kanban board for team workflows.',
      tech: ['Laravel', 'Vue.js', 'InertiaJS', 'Tailwind CSS'],
      link: 'https://aetask.xyz',
      role: 'Solo Full-Stack Developer',
      problem: 'Small teams need task tracking without enterprise overhead.',
      challenge: 'Staying fast and uncluttered while supporting real workflows.',
      solution: 'A focused Kanban app with boards, cards and team workspaces.',
      features: ['Boards with custom columns and labels', 'Cards with attachments, assignees and due dates', 'Collaborators per board'],
      gallery: 'AeTask'
    },
    {
      id: 'scheduling',
      title: 'Laser Scan Scheduling App',
      type: 'Business Systems',
      tagline: 'Scheduling and pricing platform for laser-scan requests.',
      tech: ['Laravel', 'Vue 3', 'InertiaJS', 'Stripe'],
      link: null,
      role: 'Solo Full-Stack Developer',
      problem: 'Clients had to go back and forth to price and book architectural laser scans.',
      challenge: 'Offering realistic time slots based on scan duration and technician location.',
      solution: 'Scan requests with instant pricing and a deposit, booking with recommended slots, and an admin panel for technicians, schedules and pricing.',
      features: ['Instant pricing with a 20% deposit', 'Recommended time slots with estimated duration', 'Admin tools for technicians, schedules and pricing'],
      gallery: 'Scheduling App'
    },
    {
      id: 'hjklcore',
      title: 'HJKL Core',
      type: 'Business Systems',
      tagline: 'Multi-tenant POS with owner dashboard and audit logs.',
      tech: ['Laravel', 'Vue.js', 'Multi-tenancy'],
      link: 'https://hjklcore.com',
      role: 'Full-Stack Developer',
      problem: 'Multi-branch businesses need one POS with isolated, reportable data.',
      challenge: 'Full tenant isolation with a unified owner view.',
      solution: 'Multi-tenant POS with owner dashboard, audit logs and per-business sales reports.',
      features: ['Multi-tenant data isolation', 'Owner dashboard & audit logs', 'Per-business sales reporting'],
      gallery: 'AE POS App'
    },
    {
      id: 'sici',
      title: 'SICI Producers CTPL',
      type: 'Business Systems',
      tagline: 'Online CTPL insurance issuance platform.',
      tech: ['Laravel', 'Vue.js', 'InertiaJS'],
      link: 'https://siciproducersctpl.com',
      role: 'Full-Stack Developer',
      problem: 'Producers needed to assess risk and issue policies without paper workflows.',
      challenge: 'Modeling risk rules accurately while keeping issuance fast.',
      solution: 'Issuance platform with motor risk assessment, digital policies and a producer wallet.',
      features: ['Motor risk assessment', 'Digital policy issuance', 'Producer wallet & payouts'],
      gallery: 'InsurApp'
    },
    {
      id: 'resumatik',
      title: 'Resumatik',
      type: 'SaaS',
      tagline: 'Online resume builder with PDF export.',
      tech: ['Laravel', 'Vue.js', 'PDF Generation'],
      link: 'https://resumatik.xyz',
      role: 'Solo Full-Stack Developer',
      problem: 'Job seekers need clean resumes without fighting document formatting.',
      challenge: 'PDF exports that match the live preview exactly.',
      solution: 'A builder with live preview and one-click PDF export.',
      features: ['Live resume preview', 'PDF export', 'Multiple layout templates'],
      gallery: 'Resumatik'
    },
    {
      id: 'business-page',
      title: 'Business Landing Page',
      type: 'Business Systems',
      tagline: 'Landing page built to convert visitors into customers.',
      tech: ['Next.js', 'Vercel'],
      link: 'https://business-page-ten-delta.vercel.app',
      role: 'Full-Stack Developer',
      problem: 'A business needed a fast landing page to present its services.',
      challenge: 'Shipping a conversion-focused page on a tight scope.',
      solution: 'A focused, fast landing page deployed on Vercel.',
      features: ['Conversion-focused layout', 'Fast, modern deployment on Vercel'],
      gallery: null
    },
    {
      id: 'client-projects',
      title: 'Client Projects',
      type: 'Web Apps',
      tagline: 'Freelance and agency client builds.',
      tech: ['Laravel', 'Vue.js', 'InertiaJS'],
      link: null,
      role: 'Full-Stack Developer',
      problem: 'Each client needed a custom web app built to spec.',
      challenge: 'Adapting to a new codebase and requirements each time.',
      solution: 'Custom apps delivered with Laravel, Vue and Inertia.',
      features: ['Custom admin panels', 'Client-specific workflows', 'Laravel + Vue + Inertia stack'],
      gallery: 'Client Projects'
    },
    {
      id: 'mswd',
      title: 'MSWD Makati App',
      type: 'Business Systems',
      tagline: 'Social welfare system for Makati City Government.',
      tech: ['Laravel', 'Vue 2'],
      link: null,
      role: 'Full-Stack Developer',
      problem: 'Local government needed secure, large-scale case-record management.',
      challenge: 'Securing large record volumes under government access rules.',
      solution: 'Layered security and query optimization for accuracy and speed at scale.',
      features: ['Layered access security', 'Optimized queries at scale', 'Government case-record management'],
      gallery: 'MSWD Makati App'
    },
    {
      id: 'rheummate',
      title: 'Rheummate',
      type: 'Web Apps',
      tagline: 'Clinic management app for a rheumatology practice.',
      tech: ['Laravel', 'Vue', 'InertiaJS'],
      link: null,
      role: 'Full-Stack Developer',
      problem: 'A clinic needed digital patient records and visit tracking.',
      challenge: 'Mapping a paper-based workflow into a usable system.',
      solution: 'A clinic app tailored to the practice’s workflow.',
      features: ['Patient record management', 'Visit scheduling', 'Clinic-specific workflow'],
      gallery: 'Rheummate'
    },
    {
      id: 'orient-glass',
      title: 'Orient Glass Quotation App',
      type: 'Business Systems',
      tagline: 'Quotation and estimate system for a glass supplier.',
      tech: ['Laravel', 'Vue', 'InertiaJS'],
      link: null,
      role: 'Full-Stack Developer',
      problem: 'Quotations were slow and error-prone.',
      challenge: 'Encoding supplier-specific pricing rules accurately.',
      solution: 'A quotation builder covering the full pricing workflow.',
      features: ['Quotation builder', 'Estimate tracking', 'Supplier-specific pricing rules'],
      gallery: 'Orient Glass Quotation App'
    },
    {
      id: 'vpi-cars',
      title: 'VPI Cars App',
      type: 'Business Systems',
      tagline: 'Nationwide car rental platform.',
      tech: ['Laravel', 'Vue.js SPA', 'Pinia'],
      link: null,
      role: 'Full-Stack Developer',
      problem: 'Bookings spanned admins and affiliate partners nationwide.',
      challenge: 'Keeping availability in sync across admins and affiliates.',
      solution: 'End-to-end admin and affiliate booking workflows.',
      features: ['Admin & affiliate roles', 'Nationwide booking management', 'Vue SPA with Pinia state'],
      gallery: 'VPI Cars App'
    },
    {
      id: 'openai-app',
      title: 'OpenAI App',
      type: 'SaaS',
      tagline: 'Writing tool with OpenAI-assisted headers.',
      tech: ['Laravel', 'Vue.js', 'InertiaJS', 'OpenAI'],
      link: null,
      role: 'Full-Stack Developer',
      problem: 'Writers needed structured, on-brand headers at scale.',
      challenge: 'Turning AI output into a consistent header hierarchy.',
      solution: 'OpenAI-assisted header generation with hierarchy labeling and trend tracking.',
      features: ['OpenAI-assisted generation', 'Header hierarchy tooling', 'Trend tracking'],
      gallery: 'OpenAI App'
    },
    {
      id: 'wp-shopify',
      title: 'WordPress & Shopify Client Work',
      type: 'E-commerce',
      tagline: 'Custom WordPress and Shopify client sites.',
      tech: ['WordPress', 'Shopify', 'PHP'],
      link: null,
      role: 'Full-Stack Developer',
      problem: 'Clients wanted storefronts beyond generic themes.',
      challenge: 'Custom builds within platform theming limits.',
      solution: 'Custom themes and plugins, plus Shopify store maintenance.',
      features: ['Custom WordPress themes & plugins', 'Shopify store maintenance', 'Content site management'],
      gallery: null
    }
  ];

  // Company and period are intentionally omitted: add `period` (and change `org`
  // to the company name) per entry once the details are known.
  var support = [
    {
      org: 'Executive Assistant',
      role: 'Administrative support',
      period: '',
      desc: 'Supported executives with calendar, inbox and travel coordination, meeting preparation and reporting.',
      tags: ['Calendar management', 'Travel coordination', 'Reporting']
    },
    {
      org: 'Virtual Assistant',
      role: 'Remote support',
      period: '',
      desc: 'Remote support for clients: email and schedule management, data entry, research and communication.',
      tags: ['Email management', 'Data entry', 'Research']
    },
    {
      org: 'Administrative Assistant',
      role: 'Office support',
      period: '',
      desc: 'Handled documentation, records, scheduling and day-to-day office coordination.',
      tags: ['Documentation', 'Scheduling', 'Records']
    }
  ];

  var education = [
    { school: 'University of Mindanao College', org: 'Davao City', period: '2013 – 2019', detail: 'Bachelor of Science in Information Technology' },
    { school: 'Cabantian National High School', org: 'Davao City', period: '2009 – 2013', detail: '' }
  ];

  var experience = [
    {
      role: 'Full Stack Web Developer',
      org: 'RCSC Ltd — Remote (US)',
      period: 'Heavy Equipment Rental · Solo Development',
      desc: 'Solo-built a heavy equipment rental platform with booking, real-time inventory and a responsive UI.',
      tags: ['Laravel', 'Vue 3', 'InertiaJS', 'Tailwind CSS', 'Stripe API', 'CalendarJS', 'ChatGPT']
    },
    {
      role: 'Full Stack Web Developer',
      org: 'GuttVannm Architect — Remote (US)',
      period: 'Solo Development',
      desc: 'Solo-built a scheduling app for laser-scan requests that shows clients the shortest technician route.',
      tags: ['Laravel', 'Vue 3', 'InertiaJS', 'Tailwind CSS', 'Figma', 'ChatGPT', 'GitHub Copilot', 'Stripe API']
    },
    {
      role: 'Full Stack Web Developer',
      org: 'Wisteria Online & Wasteland MMORPG',
      period: 'Personal Project · Solo Development',
      desc: 'Modular PvP/PvE systems with real-time polling, plus guild tools, forums and event calendars.',
      tags: ['Laravel', 'Vue 3', 'InertiaJS', 'Tailwind CSS', 'Canva', 'ChatGPT', 'GitHub Copilot']
    },
    {
      role: 'Full Stack Web Developer',
      org: 'TITAN Inc.',
      period: 'Full time',
      desc: 'Built the MSWD system for Makati City Government, with layered security and query optimization.',
      tags: ['Laravel', 'Vue.js', 'Bootstrap CSS', 'RESTful API']
    },
    {
      role: 'Full Stack Web Developer',
      org: 'VPI Cars Manila',
      period: 'Contractual',
      desc: 'Built a nationwide car rental platform with admin and affiliate booking workflows.',
      tags: ['Laravel', 'Vue.js', 'Tailwind CSS', 'RESTful API']
    },
    {
      role: 'Full Stack Web Developer',
      org: 'Local Client',
      period: 'Project based',
      desc: 'Built a multi-tenant hair-cut scheduling system for multiple business locations.',
      tags: ['Laravel', 'Blade', 'Bootstrap CSS']
    },
    {
      role: 'Full Stack Web Developer',
      org: 'Nest18',
      period: 'Project based',
      desc: 'Built OpenAI-assisted header generation with a family-tree hierarchy for labeling.',
      tags: ['Laravel', 'Vue.js', 'InertiaJS', 'Tailwind CSS', 'OpenAI']
    },
    {
      role: 'Backend Developer',
      org: 'CresCode Inc.',
      period: 'Apr 2023 – Dec 2023',
      desc: 'Built and refactored REST APIs, migrated legacy Laravel projects and tested endpoints in SwaggerUI.',
      tags: ['Laravel', 'RESTful API', 'SwaggerUI']
    },
    {
      role: 'Full Stack Web Developer',
      org: 'FoxComm Ltd',
      period: 'Apr 2021 – Apr 2023',
      desc: 'Built Laravel and Vue projects, managed WordPress blogs and maintained a Shopify store.',
      tags: ['Laravel', 'Vue.js', 'InertiaJS', 'WordPress', 'Shopify']
    },
    {
      role: 'Full Stack Web Developer',
      org: 'Artisans Developer',
      period: 'May 2020 – Apr 2021',
      desc: 'Built Laravel, WordPress and Shopify sites, plus UI and graphics in Canva.',
      tags: ['Laravel', 'WordPress', 'Shopify', 'Canva']
    },
    {
      role: 'Full Stack Web Developer',
      org: 'Segworks',
      period: 'Mar 2019 – Apr 2020',
      desc: 'Maintained databases, refactored queries and shipped features and fixes.',
      tags: ['PHP', 'MySQL']
    }
  ];

  return {
    coreStack: coreStack,
    whatIBuild: whatIBuild,
    skills: skills,
    services: services,
    projectTypes: projectTypes,
    projects: projects,
    education: education,
    experience: experience,
    support: support
  };
})();
