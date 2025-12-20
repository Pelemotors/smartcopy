import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServerClient';

// GET - Fetch all blog posts (admin)
export async function GET(request: NextRequest) {
  try {
    // TODO: Check authentication
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const published = searchParams.get('published');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    let query = supabaseServer
      .from('blog_posts')
      .select(`
        *,
        blog_categories (
          name_he,
          slug
        )
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (category) {
      query = query.eq('category_id', category);
    }

    if (published !== null && published !== '') {
      query = query.eq('published', published === 'true');
    }

    if (search) {
      query = query.or(`title_he.ilike.%${search}%,content_he.ilike.%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'שגיאה בטעינת המאמרים' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      posts: data || [],
      total: count || 0,
      page,
      limit,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'שגיאה כללית' },
      { status: 500 }
    );
  }
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  try {
    // TODO: Check authentication
    const body = await request.json();

    // Validation
    if (!body.title_he || !body.content_he) {
      return NextResponse.json(
        { error: 'כותרת ותוכן הם שדות חובה' },
        { status: 400 }
      );
    }

    // Generate slug from title if not provided
    const slug = body.slug || body.title_he
      .toLowerCase()
      .replace(/[^a-z0-9\u0590-\u05FF]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Check if slug already exists
    const { data: existing } = await supabaseServer
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'כתובת URL כבר קיימת. נא לבחור כותרת אחרת.' },
        { status: 400 }
      );
    }

    const postData = {
      title_he: body.title_he,
      title_en: body.title_en || null,
      slug: slug,
      excerpt_he: body.excerpt_he || null,
      excerpt_en: body.excerpt_en || null,
      content_he: body.content_he,
      content_en: body.content_en || null,
      featured_image_url: body.featured_image_url || null,
      category_id: body.category_id || null,
      author_name: body.author_name || 'מעבדת שיניים',
      published: body.published || false,
      published_at: body.published && body.published_at ? body.published_at : null,
      meta_title_he: body.meta_title_he || null,
      meta_title_en: body.meta_title_en || null,
      meta_description_he: body.meta_description_he || null,
      meta_description_en: body.meta_description_en || null,
      meta_keywords_he: body.meta_keywords_he || null,
      meta_keywords_en: body.meta_keywords_en || null,
    };

    const { data, error } = await supabaseServer
      .from('blog_posts')
      .insert([postData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'שגיאה בשמירת המאמר' },
        { status: 500 }
      );
    }

    // Handle tags if provided
    if (body.tags && Array.isArray(body.tags) && body.tags.length > 0) {
      const tagInserts = body.tags.map((tagId: string) => ({
        post_id: data.id,
        tag_id: tagId,
      }));

      await supabaseServer
        .from('blog_post_tags')
        .insert(tagInserts);
    }

    return NextResponse.json({ post: data }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'שגיאה כללית' },
      { status: 500 }
    );
  }
}

