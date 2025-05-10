import { Suspense } from "react";
import ReserverContent from "./ReserverContent";

export default function ReserverPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <ReserverContent />
        </Suspense>
    );
}
