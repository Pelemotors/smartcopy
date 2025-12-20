import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServerClient';

// GET - Fetch single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Check authentication
    const { data, error } = await supabaseServer
      .from('blog_posts')
      .select(`
        *,
        blog_categories (
          id,
          name_he,
          slug
        ),
        blog_post_tags (
          tag_id,
          blog_tags (
            id,
            name_he,
            slug
          )
        )
      `)
      .eq('id', params.id)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'שגיאה בטעינת המאמר' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: 'מאמר לא נמצא' },
        { status: 404 }
      );
    }

    return NextResponse.json({ post: data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'שגיאה כללית' },
      { status: 500 }
    );
  }
}

// PUT - Update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if slug already exists (excluding current post)
    const { data: existing } = await supabaseServer
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .neq('id', params.id)
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
      .update(postData)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'שגיאה בעדכון המאמר' },
        { status: 500 }
      );
    }

    // Update tags
    if (body.tags !== undefined) {
      // Delete existing tags
      await supabaseServer
        .from('blog_post_tags')
        .delete()
        .eq('post_id', params.id);

      // Insert new tags
      if (Array.isArray(body.tags) && body.tags.length > 0) {
        const tagInserts = body.tags.map((tagId: string) => ({
          post_id: params.id,
          tag_id: tagId,
        }));

        await supabaseServer
          .from('blog_post_tags')
          .insert(tagInserts);
      }
    }

    return NextResponse.json({ post: data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'שגיאה כללית' },
      { status: 500 }
    );
  }
}

// DELETE - Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Check authentication
    const { error } = await supabaseServer
      .from('blog_posts')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'שגיאה במחיקת המאמר' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'שגיאה כללית' },
      { status: 500 }
    );
  }
}

