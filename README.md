# Retry Farm ERP

A Progressive Web App (PWA) built with Next.js and Supabase for farm management and enterprise resource planning.

## Features

- **Animals Module**: Manage livestock and animal records
- **Crops Module**: Track crop cultivation and harvesting
- **Inventory Module**: Manage farm equipment and supplies
- **Sales & Invoicing Module**: Handle sales transactions and invoicing
- **Knowledge Base**: Store and access farming knowledge and resources

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Database**: Supabase
- **Language**: TypeScript
- **PWA**: Progressive Web App with offline capabilities
- **Styling**: Tailwind CSS (ready for implementation)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd retry-farm-erp
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
Retry/
├── public/
│   ├── manifest.json   # PWA manifest
│   ├── sw.js          # Service worker
│   └── icons/         # PWA icons (192x192, 512x512)
├── src/
│   ├── app/           # Next.js app directory
│   │   ├── layout.tsx     # Root layout with PWA meta tags
│   │   ├── page.tsx       # Home page
│   │   ├── animals/page.tsx   # Animals module
│   │   ├── crops/page.tsx     # Crops module
│   │   ├── inventory/page.tsx # Inventory module
│   │   ├── sales/page.tsx     # Sales & invoicing module
│   │   └── kb/page.tsx        # Knowledge base
│   └── lib/
│       └── supabaseClient.ts  # Supabase client setup
├── package.json
└── README.md
```

## PWA Features

- Installable on mobile and desktop
- Offline functionality with service worker
- Responsive design for all devices
- Fast loading and caching strategies

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Modules

1. Create a new directory under `src/app/`
2. Add a `page.tsx` file with your module component
3. Update the navigation in relevant components

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.