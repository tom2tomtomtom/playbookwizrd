import { NextResponse } from 'next/server';
import supabase from '../../../lib/supabaseClient';

interface Project {
  id: string;
  name: string;
  thumbnail: string | null;
  lastEdited: string | null;
}

export async function GET() {
  // Bypass mode returns static sample project
  if (process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true') {
    const mock: Project[] = [
      {
        id: 'demo-project',
        name: 'Demo Playbook',
        thumbnail: null,
        lastEdited: new Date().toISOString().split('T')[0],
      },
    ];
    return NextResponse.json(mock);
  }

  // Validate user session
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr || !user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('projects')
    .select('id, name, thumbnail, updated_at')
    .eq('user_id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const projects: Project[] = (data ?? []).map((p: any) => ({
    id: p.id,
    name: p.name,
    thumbnail: p.thumbnail,
    lastEdited: p.updated_at
      ? new Date(p.updated_at).toISOString().split('T')[0]
      : null,
  }));

  return NextResponse.json(projects);
}
