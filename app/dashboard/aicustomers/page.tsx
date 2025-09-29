'use client';

import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function FirestoreTest() {
    const [docsCount, setDocsCount] = useState<number | null>(null);

    useEffect(() => {
        async function fetchData() {
            console.log("🔥 Firestore fetch starting...");
            try {
                // 🔑 adjust collection path to match your Firestore
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
            <p>Docs fetched: {docsCount ?? "Loading..."}</p>
        </div>
    );
}
