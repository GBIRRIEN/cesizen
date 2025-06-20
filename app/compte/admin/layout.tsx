// app/compte/admin/layout.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from '@/lib/supabase';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  // useEffect pour vérifier l'authentification et le rôle de l'utilisateur
  useEffect(() => {
    const checkRole = async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) {
        router.push("/");
        return;
      }

      const { data: complement, error } = await supabase
        .from("userComplement")
        .select("role")
        .eq("id", auth.user.id)
        .single();

      if (error || complement?.role !== "Admin") {
        router.push("/");
        return;
      }

      setAuthorized(true);
    };

    checkRole();
  }, [router]);

  if (authorized === null) {
    return <div className="p-6 text-center">Vérification des autorisations...</div>;
  }

  // Si l'utilisateur est autorisé, affichage du contenu de la page enfant
  return <div>{children}</div>;
}