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

            if (!userUid) return;

            console.log("🔥 Firestore fetch starting...");
            try {
                // 🔑 access clients subcollection under tenant document
                const clientsRef = collection(db, `aiai/be_${userUid}/clients`);
                const snapshot = await getDocs(clientsRef);

                console.log("📊 Clients snapshot size:", snapshot.size);
                snapshot.forEach((doc) => console.log("Client Doc:", doc.id, doc.data()));

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
            <p>Number of client documents: {docsCount ?? "Loading..."}</p>
        </div>
    );
}
