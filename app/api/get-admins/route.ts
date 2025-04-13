import { NextResponse } from "next/server";
import supabaseAdmin from "@/lib/supabase-admin";

export async function POST(req: Request) {
    const { ids } = await req.json();

    if (!ids || !Array.isArray(ids)) {
        return NextResponse.json({ error: "Liste d'IDS invalide" }, { status: 400 });
    }

    const users: any[] = [];

    for (const id of ids) {
        const { data, error } = await supabaseAdmin.auth.admin.getUserById(id);
        if (!error && data?.user) {
            users.push({ id: data.user.id, email: data.user.email });
        }
    }

    return NextResponse.json({ users });
}