import { NextResponse } from "next/server";
import supabaseAdmin from "@/lib/supabase-admin";

export async function POST(req: Request) {
    const { id } = await req.json();

    if (!id || typeof id !== "string") {
        return NextResponse.json({ error: "ID invalide"}, { status: 400 });
    }

    const { data: complement, error: complementError } = await supabaseAdmin
        .from("userComplement")
        .select("*")
        .eq("id", id)
        .single();
    
    if (complementError || !complement) {
        return NextResponse.json({ error: "Utilisateur non trouvé dans userComplement."}, {status: 400});
    }

    const { data: userAuth, error: authError } = await supabaseAdmin.auth.admin.getUserById(id);

    if (authError || !userAuth?.user) {
        return NextResponse.json({ error: "Utilisateur non trouvé dans la base de données"}, { status: 400});
    }

    return NextResponse.json({
        id,
        nom: complement.nom,
        prenom: complement.prenom,
        email: userAuth.user.email,
        role: complement.role
    });
}