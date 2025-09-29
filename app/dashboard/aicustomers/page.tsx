'use client';

import { useEffect, useState } from "react";
import { db, auth } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function FirestoreTest() {
    const [docsCount, setDocsCount] = useState<number | null>(null);
    const [uid, setUid] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            // 🔑 get logged-in user UID
            const userUid = auth.currentUser?.uid || null;
            setUid(userUid);
            console.log("🔥 Current UID:", userUid);

            console.log("🔥 Firestore fetch starting...");
            try {
                // keep existing logic
                const snapshot = await getDocs(collection(db, "aiai")); // <-- test root collection
                console.log("📊 Snapshot size:", snapshot.size);
                snapshot.forEach((doc) => console.log("Doc:", doc.id, doc.data()));
                setDocsCount(snapshot.size);
            } catch (err) {
                console.error("❌ Firestore fetch error:", err);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <p>Current UID: {uid ?? "Not logged in"}</p>
            <p>Docs fetched: {docsCount ?? "Loading..."}</p>
        </div>
    );
}
