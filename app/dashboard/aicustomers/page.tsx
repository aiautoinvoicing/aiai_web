'use client';

import { useEffect, useState } from "react";
import { db, auth } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function FirestoreTest() {
    const [clients, setClients] = useState<any[]>([]);
    const [uid, setUid] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchClients() {
            const userUid = auth.currentUser?.uid || null;
            setUid(userUid);
            console.log("🔥 Current UID:", userUid);

            if (!userUid) {
                setLoading(false);
                return;
            }

            console.log("🔥 Firestore fetch starting...");
            try {
                const clientsRef = collection(db, `aiai/be_${userUid}/clients`);
                const snapshot = await getDocs(clientsRef);

                const data = snapshot.docs.map((doc) => ({
                    client_id: doc.id,
                    client_company_name: (doc.data() as any).client_company_name,
                }));

                console.log("📊 Clients fetched:", data);
                setClients(data);
            } catch (err) {
                console.error("❌ Firestore fetch error:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchClients();
    }, []);

    if (loading) return <p>Loading clients...</p>;

    return (
        <div>
            <p>Current UID: {uid ?? "Not logged in"}</p>
            <p>Number of clients: {clients.length}</p>

            <ul>
                {clients.map((c) => (
                    <li key={c.client_id}>{c.client_company_name}</li>
                ))}
            </ul>
        </div>
    );
}
