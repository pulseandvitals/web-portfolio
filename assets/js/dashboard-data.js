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

  var coreStack = ['Laravel', 'Vue.js', 'Inertia.js', 'PHP', 'JavaScript', 'Tailwind CSS', 'MySQL'];

  var whatIBuild = [
    { icon: 'fa-window-restore', title: 'Web Applications', desc: 'Scalable applications built around real business requirements.' },
    { icon: 'fa-sitemap', title: 'Business Systems', desc: 'POS, booking, rental, insurance, CRM-style and custom systems.' },
    { icon: 'fa-shopping-cart', title: 'E-commerce', desc: 'Shopify, WordPress and custom e-commerce experiences.' },
    { icon: 'fa-cubes', title: 'SaaS', desc: 'Modern web applications and subscription-based platforms.' },
    { icon: 'fa-paint-brush', title: 'UI/UX Implementation', desc: 'Turning designs into polished, responsive interfaces.' },
    { icon: 'fa-gamepad', title: 'Game Development', desc: 'Experience building game-related personal projects.' }
  ];

  var services = [
    {
      icon: 'fa-cubes',
      title: 'Full Stack Development',
      desc: 'Modern web applications using Laravel and Vue, from database design through to a shipped interface.'
    },
    {
      icon: 'fa-window-restore',
      title: 'Frontend Development',
      desc: 'Responsive, interactive interfaces with Vue, JavaScript, and Tailwind CSS.'
    },
    {
      icon: 'fa-server',
      title: 'Backend Development',
      desc: 'Laravel APIs, database architecture, authentication, integrations, and business logic.'
    },
    {
      icon: 'fa-wordpress',
      title: 'Shopify & WordPress',
      desc: 'Customizations, websites, themes, integrations, and performance optimization.'
    },
    {
      icon: 'fa-paint-brush',
      title: 'UI/UX Implementation',
      desc: 'Turning designs into polished, responsive interfaces that hold up in production.'
    },
    {
      icon: 'fa-sitemap',
      title: 'Custom Business Systems',
      desc: 'Booking systems, POS systems, dashboards, CRM-style tools, and other custom applications.'
    }
  ];

  var projectTypes = ['All', 'Web Apps', 'E-commerce', 'SaaS', 'Games', 'Business Systems'];

  var projects = [
    {
      id: 'wisteria',
      title: 'Wisteria Online',
      type: 'Games',
      tagline: 'Browser-based MMORPG with persistent player progression.',
      tech: ['Laravel', 'Vue 3', 'InertiaJS', 'Tailwind CSS'],
      link: 'https://wisteriaonline.com',
      role: 'Solo Full-Stack Developer',
      problem: 'Browser MMORPGs rarely give solo players a reason to keep coming back.',
      challenge: 'Keeping combat and event systems performant in the browser without heavy client installs.',
      solution: 'Built modular PvP/PvE systems with real-time polling and scalable event triggers, plus forums, guild tools and event calendars to drive retention.',
      features: ['Real-time PvP/PvE systems', 'Guilds, forums & event calendars', 'Zones and quest lines inspired by Filipino culture'],
      gallery: null
    },
    {
      id: 'wasteland',
      title: 'Wasteland MMORPG',
      type: 'Games',
      tagline: 'Post-apocalyptic themed browser MMORPG.',
      tech: ['Laravel', 'Vue 3', 'InertiaJS', 'Tailwind CSS'],
      link: 'https://wastelandmmorpg.com',
      role: 'Solo Full-Stack Developer',
      problem: 'Sister project exploring a different setting on the same live-service game engine.',
      challenge: 'Adapting the same engine to a new setting without duplicating the underlying codebase.',
      solution: 'Reused and extended the Wisteria Online engine with a post-apocalyptic faction and quest system.',
      features: ['Shared modular game engine', 'Pause/resume event controls', 'Faction-based progression'],
      gallery: null
    },
    {
      id: 'aetask',
      title: 'AeTask',
      type: 'SaaS',
      tagline: 'Kanban-style board and workflow management tool for teams.',
      tech: ['Laravel', 'Vue.js', 'InertiaJS', 'Tailwind CSS'],
      link: 'https://aetask.xyz',
      role: 'Solo Full-Stack Developer',
      problem: 'Small teams need a lightweight place to track work without the overhead of enterprise PM tools.',
      challenge: 'Keeping the UI fast and uncluttered while still supporting real team workflows.',
      solution: 'Built a focused Kanban board app covering boards, cards and team workflows end to end.',
      features: ['Drag-and-drop Kanban boards', 'Team workspaces', 'Lightweight, fast UI'],
      gallery: null
    },
    {
      id: 'hjklcore',
      title: 'HJKL Core',
      type: 'Business Systems',
      tagline: 'Multi-tenant POS platform with an owner dashboard and audit logging.',
      tech: ['Laravel', 'Vue.js', 'Multi-tenancy'],
      link: 'https://hjklcore.com',
      role: 'Full-Stack Developer',
      problem: 'Businesses running multiple branches need one POS that keeps each location’s data isolated but reportable to ownership.',
      challenge: 'Isolating tenant data completely while still giving the owner one unified reporting view.',
      solution: 'Built a multi-tenant POS platform with an owner dashboard, audit logs and sales reporting per business.',
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
      problem: 'Insurance producers needed a faster way to assess motor risk and issue CTPL policies without paper workflows.',
      challenge: 'Modeling motor risk assessment rules accurately while keeping the issuance flow fast for producers.',
      solution: 'Built an issuance platform covering motor risk assessment, policy issuance and a producer wallet.',
      features: ['Motor risk assessment', 'Digital policy issuance', 'Producer wallet & payouts'],
      gallery: 'InsurApp'
    },
    {
      id: 'resumatik',
      title: 'Resumatik',
      type: 'SaaS',
      tagline: 'Online CV/resume builder for polished, ready-to-send resumes.',
      tech: ['Laravel', 'Vue.js', 'PDF Generation'],
      link: 'https://resumatik.xyz',
      role: 'Solo Full-Stack Developer',
      problem: 'Job seekers need a fast way to produce a clean, professional resume without wrestling with document formatting.',
      challenge: 'Generating pixel-accurate PDF exports that match the on-screen live preview.',
      solution: 'Built an online builder with live preview and export to a polished, ready-to-send PDF.',
      features: ['Live resume preview', 'PDF export', 'Multiple layout templates'],
      gallery: 'Resumatik'
    },
    {
      id: 'business-page',
      title: 'Business Landing Page',
      type: 'Business Systems',
      tagline: 'Modern landing page built to showcase services and convert visitors into customers.',
      tech: ['Next.js', 'Vercel'],
      link: 'https://business-page-ten-delta.vercel.app',
      role: 'Full-Stack Developer',
      problem: 'A business needed a fast, modern landing page to present its services and drive inquiries.',
      challenge: 'Shipping a fast, conversion-focused page on a tight scope and timeline.',
      solution: 'Designed and shipped a focused landing page optimized for clarity and conversion.',
      features: ['Conversion-focused layout', 'Fast, modern deployment on Vercel'],
      gallery: null
    },
    {
      id: 'client-projects',
      title: 'Client Projects',
      type: 'Web Apps',
      tagline: 'A mix of freelance and agency client builds.',
      tech: ['Laravel', 'Vue.js', 'InertiaJS'],
      link: null,
      role: 'Full-Stack Developer',
      problem: 'Freelance and agency clients each needed custom web applications built to their own spec.',
      challenge: 'Adapting to a different codebase and set of requirements with each client engagement.',
      solution: 'Delivered a range of client builds using Laravel with Vue and InertiaJS.',
      features: ['Custom admin panels', 'Client-specific workflows', 'Laravel + Vue + Inertia stack'],
      gallery: 'Client Projects'
    },
    {
      id: 'mswd',
      title: 'MSWD Makati App',
      type: 'Business Systems',
      tagline: 'Social welfare management system for Makati City Government.',
      tech: ['Laravel', 'Vue 2'],
      link: null,
      role: 'Full-Stack Developer',
      problem: 'Local government needed a secure system to manage social welfare records at scale.',
      challenge: 'Handling large volumes of case records securely under government data-access rules.',
      solution: 'Built the MSWD system with layered security and query optimization for data accuracy and performance.',
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
      problem: 'A rheumatology clinic needed to manage patient records and visits digitally.',
      challenge: 'Mapping an existing paper-based clinic workflow into a usable digital system.',
      solution: 'Built a clinic management app tailored to the practice’s workflow.',
      features: ['Patient record management', 'Visit scheduling', 'Clinic-specific workflow'],
      gallery: 'Rheummate'
    },
    {
      id: 'orient-glass',
      title: 'Orient Glass Quotation App',
      type: 'Business Systems',
      tagline: 'Quotation and estimate management system for a glass supplier.',
      tech: ['Laravel', 'Vue', 'InertiaJS'],
      link: null,
      role: 'Full-Stack Developer',
      problem: 'A glass supplier needed a faster, more accurate way to produce customer quotations and estimates.',
      challenge: 'Modeling supplier-specific pricing rules accurately inside the quotation builder.',
      solution: 'Built a quotation and estimate management system covering the full pricing workflow.',
      features: ['Quotation builder', 'Estimate tracking', 'Supplier-specific pricing rules'],
      gallery: 'Orient Glass Quotation App'
    },
    {
      id: 'vpi-cars',
      title: 'VPI Cars App',
      type: 'Business Systems',
      tagline: 'Nationwide car rental platform for admins, affiliates and bookings.',
      tech: ['Laravel', 'Vue.js SPA', 'Pinia'],
      link: null,
      role: 'Full-Stack Developer',
      problem: 'A car rental business needed to manage nationwide bookings across admins and affiliate partners.',
      challenge: 'Coordinating booking availability across admins and affiliate partners in real time.',
      solution: 'Built a full-featured rental platform with end-to-end admin and affiliate booking workflows.',
      features: ['Admin & affiliate roles', 'Nationwide booking management', 'Vue SPA with Pinia state'],
      gallery: 'VPI Cars App'
    },
    {
      id: 'openai-app',
      title: 'OpenAI App',
      type: 'SaaS',
      tagline: 'Content tool for writers with OpenAI-assisted header generation.',
      tech: ['Laravel', 'Vue.js', 'InertiaJS', 'OpenAI'],
      link: null,
      role: 'Full-Stack Developer',
      problem: 'Writers needed help generating structured, on-brand headers at scale.',
      challenge: 'Structuring OpenAI output into a consistent, reusable header hierarchy.',
      solution: 'Built OpenAI-assisted header generation with a family-tree hierarchy for header labeling and trend tracking.',
      features: ['OpenAI-assisted generation', 'Header hierarchy tooling', 'Trend tracking'],
      gallery: 'OpenAI App'
    },
    {
      id: 'wp-shopify',
      title: 'WordPress & Shopify Client Work',
      type: 'E-commerce',
      tagline: 'Custom WordPress themes/plugins and Shopify store maintenance for clients.',
      tech: ['WordPress', 'Shopify', 'PHP'],
      link: null,
      role: 'Full-Stack Developer',
      problem: 'Clients needed custom storefronts and content sites without being locked to generic themes.',
      challenge: 'Delivering custom builds within WordPress and Shopify\'s theming constraints.',
      solution: 'Built custom WordPress themes and plugins, and maintained a single-vendor Shopify store.',
      features: ['Custom WordPress themes & plugins', 'Shopify store maintenance', 'Content site management'],
      gallery: null
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
      desc: 'Developed a full-featured heavy equipment rental platform enabling efficient booking, real-time inventory management and seamless customer interactions, with a responsive interface optimized across desktop and mobile.',
      tags: ['Laravel', 'Vue 3', 'InertiaJS', 'Tailwind CSS', 'Stripe API', 'CalendarJS', 'ChatGPT']
    },
    {
      role: 'Full Stack Web Developer',
      org: 'GuttVannm Architect — Remote (US)',
      period: 'Solo Development',
      desc: 'Built a scheduling app for architectural laser scan requests — clients see the shortest technician route on booking, plus full visibility into scan requests and scheduled appointments.',
      tags: ['Laravel', 'Vue 3', 'InertiaJS', 'Tailwind CSS', 'Figma', 'ChatGPT', 'GitHub Copilot', 'Stripe API']
    },
    {
      role: 'Full Stack Web Developer',
      org: 'Wisteria Online & Wasteland MMORPG',
      period: 'Personal Project · Solo Development',
      desc: 'Built modular PvP/PvE systems with real-time polling, pause/resume controls and scalable event triggers, plus forums, guild tools and event calendars to drive player retention. Zones, factions and quest lines are inspired by Filipino culture.',
      tags: ['Laravel', 'Vue 3', 'InertiaJS', 'Tailwind CSS', 'Canva', 'ChatGPT', 'GitHub Copilot']
    },
    {
      role: 'Full Stack Web Developer',
      org: 'TITAN Inc.',
      period: 'Full time',
      desc: 'Developed the MSWD system for Makati City Government, with layered security and query optimization for data accuracy and performance at scale.',
      tags: ['Laravel', 'Vue.js', 'Bootstrap CSS', 'RESTful API']
    },
    {
      role: 'Full Stack Web Developer',
      org: 'VPI Cars Manila',
      period: 'Contractual',
      desc: 'Built a nationwide car rental platform with end-to-end admin and affiliate booking workflows.',
      tags: ['Laravel', 'Vue.js', 'Tailwind CSS', 'RESTful API']
    },
    {
      role: 'Full Stack Web Developer',
      org: 'Local Client',
      period: 'Project based',
      desc: 'Built a hair-cut scheduling system with multi-tenancy support for multiple business locations.',
      tags: ['Laravel', 'Blade', 'Bootstrap CSS']
    },
    {
      role: 'Full Stack Web Developer',
      org: 'Nest18',
      period: 'Project based',
      desc: 'Built OpenAI-assisted header generation for writers, including a family-tree hierarchy for header labeling.',
      tags: ['Laravel', 'Vue.js', 'InertiaJS', 'Tailwind CSS', 'OpenAI']
    },
    {
      role: 'Backend Developer',
      org: 'CresCode Inc.',
      period: 'Apr 2023 – Dec 2023',
      desc: 'Developed and refactored REST APIs, migrated legacy Laravel projects to newer versions, and tested endpoints in SwaggerUI.',
      tags: ['Laravel', 'RESTful API', 'SwaggerUI']
    },
    {
      role: 'Full Stack Web Developer',
      org: 'FoxComm Ltd',
      period: 'Apr 2021 – Apr 2023',
      desc: 'Built projects with Laravel, Vue and InertiaJS, managed WordPress blogs, and maintained a single-vendor Shopify store.',
      tags: ['Laravel', 'Vue.js', 'InertiaJS', 'WordPress', 'Shopify']
    },
    {
      role: 'Full Stack Web Developer',
      org: 'Artisans Developer',
      period: 'May 2020 – Apr 2021',
      desc: 'Built sites on Laravel, WordPress and Shopify, with UI and graphic design work in Canva.',
      tags: ['Laravel', 'WordPress', 'Shopify', 'Canva']
    },
    {
      role: 'Full Stack Web Developer',
      org: 'Segworks',
      period: 'Mar 2019 – Apr 2020',
      desc: 'Maintained databases, refactored queries, and developed new features and fixes.',
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
    experience: experience
  };
})();
