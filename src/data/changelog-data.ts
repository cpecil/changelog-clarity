// src/data/changelog-data.ts
import { ChangelogEntry } from "@/types/changelog";

export const changelogEntries: ChangelogEntry[] = [
  {
    id: "1",
    version: "2.5.0",
    release_date: "2024-01-20",
    summary: "Dark Mode Support & Enhanced UI",
    status: "Complete",
    category: "feature",
    header_image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    changes: [
      { type: "Added", text: "Complete dark mode support with smooth transitions" },
      { type: "Added", text: "Automatic theme detection based on system preferences" },
      { type: "Improved", text: "Enhanced accessibility with better contrast ratios" },
      { type: "Fixed", text: "Theme toggle animation glitch on Safari" },
    ],
    detailed_info: `# Dark Mode Implementation

We're excited to announce **complete dark mode support** for Changelog Clarity!

## What's New

- Automatic theme detection based on system preferences
- Manual theme toggle in settings
- Smooth transitions between themes
- All components optimized for dark mode

## Technical Details

\`\`\`typescript
// Theme can be toggled programmatically
const { theme, setTheme } = useTheme();
setTheme('dark');
\`\`\`

## Benefits

- **Reduced eye strain** in low-light environments
- **Better battery life** on OLED displays
- **Modern, sleek appearance** that users love`,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
        alt: "Dark mode interface preview"
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
        alt: "Theme comparison"
      }
    ],
    actions: [
      {
        label: "Try Dark Mode",
        variant: "filled",
        onClick: () => console.log("Toggle dark mode")
      },
      {
        label: "Learn More",
        variant: "outlined",
        onClick: () => console.log("Open documentation")
      }
    ],
    links: [
      { label: "Documentation", url: "#" },
      { label: "Release Notes", url: "#" }
    ]
  },
  {
    id: "2",
    version: "2.4.3",
    release_date: "2024-01-15",
    summary: "Critical Security Update",
    status: "Complete",
    category: "security",
    header_image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80",
    changes: [
      { type: "Fixed", text: "Patched XSS vulnerability in user input fields" },
      { type: "Fixed", text: "Enhanced CSRF token validation" },
      { type: "Improved", text: "Strengthened session management" },
      { type: "Improved", text: "Updated security headers" },
    ],
    detailed_info: `# Security Update v2.4.3

This release addresses critical security vulnerabilities discovered during our routine security audit.

## Fixed Vulnerabilities

- **CVE-2024-0001**: Cross-site scripting (XSS) protection
- **CVE-2024-0002**: CSRF token validation improvement
- **CVE-2024-0003**: Session fixation vulnerability

## Action Required

⚠️ **Please update immediately and clear your browser cache.**

## Security Improvements

1. Enhanced input sanitization
2. Stricter Content Security Policy
3. Improved rate limiting
4. Updated authentication flow`,
    actions: [
      {
        label: "Update Now",
        variant: "filled",
        onClick: () => console.log("Update application")
      }
    ],
    links: [
      { label: "Security Advisory", url: "#" }
    ]
  },
  {
    id: "3",
    version: "2.4.0",
    release_date: "2024-01-10",
    summary: "Performance Improvements & New Features",
    status: "Complete",
    category: "improvement",
    header_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    changes: [
      { type: "Improved", text: "40% faster page load times through code splitting" },
      { type: "Improved", text: "Reduced bundle size from 2.1MB to 1.3MB" },
      { type: "Added", text: "Lazy loading for images and components" },
      { type: "Fixed", text: "Memory leak in changelog pagination" },
      { type: "Improved", text: "Database query optimization" },
    ],
    detailed_info: `# Performance Enhancements

We've made significant improvements to application performance!

## Key Improvements

- **40% faster page loads** through intelligent code splitting
- **Reduced bundle size** by 38% (2.1MB → 1.3MB)
- **Optimized images** with automatic lazy loading
- **Database optimization** reducing API response time by 60%

## Performance Metrics

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Initial Load | 3.2s | 1.9s | 40% faster |
| Time to Interactive | 4.5s | 2.7s | 40% faster |
| Bundle Size | 2.1MB | 1.3MB | 38% smaller |
| API Response | 850ms | 340ms | 60% faster |

## What This Means for You

✨ Faster navigation between pages
✨ Smoother scrolling and interactions
✨ Better mobile experience
✨ Reduced data usage`,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
        alt: "Performance metrics dashboard"
      }
    ],
    links: [
      { label: "View Metrics", url: "#" },
      { label: "Technical Details", url: "#" }
    ]
  },
  {
    id: "4",
    version: "2.3.0",
    release_date: "2024-01-05",
    summary: "Media Support & Rich Content",
    status: "Complete",
    category: "feature",
    changes: [
      { type: "Added", text: "Support for images in changelog entries" },
      { type: "Added", text: "Video embed support for demos" },
      { type: "Added", text: "Audio playback for announcements" },
      { type: "Improved", text: "Markdown rendering with syntax highlighting" },
    ],
    detailed_info: `# Rich Media Support

Changelog entries now support images, videos, and audio!

## New Media Types

### Images
Perfect for screenshots, diagrams, and visual demonstrations.

### Videos
Embed product demos and tutorials directly in updates.

### Audio
Include audio announcements or podcast episodes.

## Example Usage

\`\`\`typescript
media: [
  { type: 'image', url: '...', alt: 'Screenshot' },
  { type: 'video', url: '...' },
  { type: 'audio', url: '...' }
]
\`\`\``,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80",
        alt: "Media support example"
      }
    ],
    links: [
      { label: "Media Guide", url: "#" }
    ]
  },
  {
    id: "5",
    version: "2.2.0",
    release_date: "2024-01-01",
    summary: "API Rate Limiting & Developer Tools",
    status: "Rolling out",
    category: "improvement",
    changes: [
      { type: "Added", text: "API rate limiting to prevent abuse" },
      { type: "Added", text: "Developer console for API testing" },
      { type: "Improved", text: "API documentation with interactive examples" },
      { type: "Fixed", text: "Webhook delivery reliability issues" },
    ],
    detailed_info: `# Developer Experience Improvements

We're rolling out new tools for developers!

## New Features

- **Rate Limiting**: Protect against API abuse
- **Developer Console**: Test API calls in real-time
- **Enhanced Docs**: Interactive API documentation
- **Webhook Monitoring**: Track delivery success rates

## Rate Limits

- **Free tier**: 100 requests/hour
- **Pro tier**: 1,000 requests/hour
- **Enterprise**: Custom limits

Currently rolling out to 50% of users.`,
    links: [
      { label: "API Docs", url: "#" },
      { label: "Developer Console", url: "#" }
    ]
  },
  {
    id: "6",
    version: "2.1.0",
    release_date: "2023-12-28",
    summary: "Breaking Changes: New Authentication System",
    status: "Planned",
    category: "breaking",
    changes: [
      { type: "Added", text: "OAuth 2.0 authentication support" },
      { type: "Added", text: "Multi-factor authentication (MFA)" },
      { type: "Fixed", text: "Legacy session handling deprecated" },
      { type: "Improved", text: "Enhanced password requirements" },
    ],
    detailed_info: `# Authentication System Overhaul

⚠️ **Breaking Changes Ahead**

We're upgrading to a more secure authentication system.

## What's Changing

- Old API keys will be deprecated
- New OAuth 2.0 flow required
- MFA becomes optional (recommended)

## Migration Guide

1. Generate new OAuth credentials
2. Update your integration
3. Test in staging environment
4. Deploy to production

## Timeline

- **Jan 15**: New system available
- **Feb 1**: Migration deadline
- **Feb 15**: Old system disabled

## Action Required

All users must migrate by February 1st, 2024.`,
    actions: [
      {
        label: "Migration Guide",
        variant: "filled",
        onClick: () => console.log("Open migration guide")
      },
      {
        label: "Generate OAuth Keys",
        variant: "outlined",
        onClick: () => console.log("Generate keys")
      }
    ],
    links: [
      { label: "Migration Guide", url: "#" },
      { label: "FAQ", url: "#" }
    ]
  },
  {
    id: "7",
    version: "2.0.0",
    release_date: "2023-12-20",
    summary: "Complete UI Redesign with Material Design 3",
    status: "Complete",
    category: "feature",
    header_image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    changes: [
      { type: "Added", text: "Material Design 3 components" },
      { type: "Added", text: "Responsive navigation rail" },
      { type: "Improved", text: "Mobile-first responsive design" },
      { type: "Improved", text: "Accessibility improvements (WCAG 2.1 AA)" },
      { type: "Fixed", text: "Various UI inconsistencies" },
    ],
    detailed_info: `# Major Version 2.0 Release

Welcome to Changelog Clarity 2.0! 🎉

## Complete Redesign

We've rebuilt the entire UI from the ground up using Material Design 3.

## Highlights

- **Modern Design**: Clean, contemporary interface
- **Better Accessibility**: WCAG 2.1 AA compliant
- **Responsive**: Perfect on all screen sizes
- **Faster**: Improved performance across the board

## What's New

- Navigation rail for desktop
- Bottom navigation for mobile
- Adaptive color system
- Dynamic theming support

Thank you for using Changelog Clarity!`,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
        alt: "New UI design"
      }
    ],
    links: [
      { label: "What's New", url: "#" },
      { label: "Design System", url: "#" }
    ]
  }
];