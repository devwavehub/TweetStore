# Supabase Setup Guide

This document provides instructions for setting up Supabase for the Dammy Tweak & Store application.

## Initial Setup

1. Create a Supabase project at [https://app.supabase.io](https://app.supabase.io)
2. Name your project (e.g., "dammy-tweak-store")
3. Choose a secure password
4. Select a region closest to your users (e.g., West Africa)

## Database Setup

1. Go to the SQL Editor in your Supabase dashboard
2. Run the migration scripts in the following order:

   - `src/supabase/migrations/tables.sql` - Creates all required tables
   - `src/supabase/migrations/rls.sql` - Sets up Row Level Security policies
   - `src/supabase/migrations/seed-products.sql` - Seeds product data
   - `src/supabase/migrations/payment_details.sql` - Seeds payment details

## Authentication Setup

1. Go to Authentication > Settings
2. Under Email Auth, make sure "Enable Email Signup" is turned on
3. Under Email Templates, customize the templates as needed
4. Set the Site URL to your production URL (when deploying)

## API Keys and Environment Variables

1. Go to Settings > API
2. Copy the URL and anon key
3. Create a `.env` file in the project root with:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Storage Setup (Optional)

If you plan to upload images later:

1. Go to Storage and create a new bucket called "products"
2. Set the bucket to public
3. Create a policy to allow authenticated users to upload files

## Monitoring

1. Go to Database > Replication > Tables to verify all tables are created
2. Go to Authentication > Users to monitor user signups
3. Go to Database > API to get auto-generated API documentation

## Local Development with Supabase

For local development, you can use the Supabase CLI:

1. Install Supabase CLI: `npm install -g supabase`
2. Initialize: `supabase init`
3. Start local development: `supabase start`
4. Stop local development: `supabase stop`

## Important Notes

- The application uses the `supabase-js` client library
- Authentication is handled through Supabase Auth
- Row Level Security (RLS) is used to secure data
- Initial product data is seeded but can be modified through the admin interface