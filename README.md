# ClearCut Law - UK Legal Commentary & Guidance Platform

A production-ready Next.js 14 application for a UK law graduate's portfolio and public education site, built with modern web technologies and best practices.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, React Server Components
- **Database & Auth**: Supabase (PostgreSQL, Auth, Storage, RLS)
- **UI/UX**: Tailwind CSS + shadcn/ui components + Lucide React icons
- **Forms & Validation**: Zod + React Hook Form
- **Content Management**: MDX/Markdown rendering for blog posts and Q&A
- **SEO Optimized**: Sitemap, RSS feed, dynamic OG images
- **Admin Dashboard**: Protected CRUD operations for content management
- **Responsive Design**: Mobile-first, accessible, WCAG AA compliant
- **Rate Limiting**: API protection with Upstash Redis
- **Production Ready**: Vercel deployment optimized

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Magic Link)
- **Forms**: React Hook Form + Zod
- **Markdown**: react-markdown + rehype plugins
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- (Optional) Upstash Redis account for rate limiting

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ClearCut Law
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=ClearCut Law

# Optional: Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

### 4. Set Up Supabase Database

1. **Create a new Supabase project**
2. **Run the database schema** (located in `supabase/schema.sql`)
3. **Enable Row Level Security (RLS)** on all tables
4. **Set up authentication** with email magic links

### 5. Seed the Database

```bash
npm run seed
```

This will create:
- Initial categories and tags
- Sample blog posts
- Example guidance Q&A
- Site settings

### 6. Start the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 📁 Project Structure

```
ClearCut Law/
├── app/                          # Next.js App Router pages
│   ├── (auth)/                   # Authentication routes
│   ├── admin/                    # Admin dashboard (protected)
│   ├── api/                      # API routes
│   ├── blog/                     # Blog pages
│   ├── guidance/                 # Legal guidance pages
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   ├── layout/                  # Layout components
│   ├── home/                    # Homepage components
│   ├── blog/                    # Blog components
│   ├── guidance/                # Guidance components
│   └── admin/                   # Admin components
├── lib/                         # Utility libraries
│   ├── supabase/               # Supabase client configuration
│   ├── auth-server.ts          # Server-side auth helpers
│   ├── auth-client.ts          # Client-side auth helpers
│   ├── validations.ts          # Zod schemas
│   └── utils.ts                # Utility functions
├── hooks/                       # Custom React hooks
├── scripts/                     # Database seeding scripts
├── supabase/                    # Database schema and migrations
└── public/                      # Static assets
```

## 🔐 Authentication & Authorization

### User Roles

- **User**: Default role for authenticated users
- **Editor**: Can create and edit content
- **Admin**: Full access to all features

### Protected Routes

- `/admin/*` - Requires admin or editor role
- API routes under `/api/admin/*` - Requires staff authentication

### Authentication Flow

1. User enters email on login page
2. Magic link sent to email
3. User clicks link and is authenticated
4. Profile created automatically (if first time)
5. Redirected to intended page

## 📝 Content Management

### Blog Posts

- Create, edit, and publish blog posts
- Markdown support with syntax highlighting
- Categories and tags
- Draft/Published status
- SEO metadata

### Legal Guidance

- Public Q&A submission form
- Admin moderation workflow
- Approved answers published publicly
- Area-based categorization

### Admin Dashboard

- **Posts**: CRUD operations for blog posts
- **Guidance**: Moderate and answer questions
- **Contact**: View contact form submissions
- **Settings**: Site configuration

## 🎨 Design System

### Color Palette

- **Primary**: Navy (#0b1f3b) - `brand`
- **Background**: White (#ffffff)
- **Text**: Slate-700 for body, brand for headings
- **Accents**: Gray scale for UI elements

### Typography

- **Font**: Inter (system-ui fallback)
- **Weights**: Variable font weights
- **Prose**: Tailwind Typography for content

### Components

- **Cards**: Rounded-2xl with soft shadows
- **Buttons**: Primary (brand), Secondary (outline), Ghost
- **Forms**: Consistent validation and error states
- **Navigation**: Responsive with mobile drawer

## 🔧 API Routes

### Public APIs

- `POST /api/contact` - Contact form submission
- `POST /api/guidance/submit` - Legal question submission
- `POST /api/newsletter` - Newsletter subscription

### Admin APIs

- `POST /api/admin/posts` - Create blog posts
- `GET /api/admin/posts` - List posts
- `PUT /api/admin/posts/[id]` - Update posts
- `DELETE /api/admin/posts/[id]` - Delete posts

### Authentication

- `GET /api/auth/callback` - Auth callback handler
- `POST /api/auth/logout` - Logout handler

## 🚀 Deployment

### Vercel Deployment

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Database Migration

For production database setup:

1. Run the schema in your production Supabase project
2. Update RLS policies as needed
3. Seed initial data using the seed script

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
npm run seed         # Seed database with sample data
```

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with Next.js rules
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks

## 🔒 Security

### Row Level Security (RLS)

All database tables have RLS policies:
- Users can only access their own data
- Public read access for published content
- Admin/editor access for content management

### API Security

- Rate limiting on public endpoints
- Authentication required for admin routes
- Input validation with Zod schemas
- CORS configuration for production

## 📊 SEO & Performance

### SEO Features

- Dynamic metadata for all pages
- OpenGraph and Twitter card support
- Sitemap generation
- RSS feed for blog posts
- Structured data markup

### Performance Optimizations

- React Server Components
- Image optimization with Next.js
- Code splitting and lazy loading
- Edge runtime for API routes
- CDN-ready static assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- **Email**: contact@ClearCut Law.com
- **Documentation**: Check the inline code comments
- **Issues**: Create an issue in the repository

## 🎯 Roadmap

- [ ] Advanced search functionality
- [ ] User profiles and preferences
- [ ] Email notifications
- [ ] Analytics integration
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Advanced content scheduling
- [ ] Integration with legal databases

---

Built with ❤️ for the legal community