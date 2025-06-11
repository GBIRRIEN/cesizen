import { Suspense } from "react";
import CustomRespirationPage from "./CustomRespirationPage";

export default function Page() {
    return (
        <Suspense fallback={<div className="text-center mt-20">Chargement...</div>}>
            <CustomRespirationPage />
        </Suspense>
    )
}