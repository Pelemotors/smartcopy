import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServerClient';

export async function GET() {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json([]);
    }

    const { data, error } = await supabaseServer
      .from('blog_posts')
      .select(`
        id,
        title_he,
        title_ru,
        excerpt_he,
        excerpt_ru,
        slug,
        featured_image_url,
        published_at,
        blog_categories (
          name_he,
          name_ru,
          slug
        )
      `)
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return NextResponse.json([]);
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json([]);
  }
}

