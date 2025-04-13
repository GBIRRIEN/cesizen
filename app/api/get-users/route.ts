import { NextResponse } from "next/server";
import supabaseAdmin from "@/lib/supabase-admin";

export async function GET() {
    const { data: userComplements, error } = await supabaseAdmin
        .from("userComplement")
        .select("*")
        .eq("role", "User");

    if (error || !userComplements) {
        return NextResponse.json({ error : "Erreur de récupération" }, { status: 500 });
    }

    const users: any[] = [];

    for (const complement of userComplements) {
        const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(complement.id);

        if (authUser?.user) {
            users.push({
                id: complement.id,
                nom: complement.nom,
                prenom: complement.prenom,
                email: authUser.user.email ?? "Email introuvable"
            });
        }
    }

    return NextResponse.json({ users });
}