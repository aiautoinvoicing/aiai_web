'use client';

import { useEffect, useState } from "react";
import { db, auth } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import CustomersTable from "@/app/ui/customers/aitable";

export type FormattedAICustomersTable = {
    id: string;
    client_company_name: string;
    client_contact_name: string;
    client_email: string;
    client_mainphone: string;
    client_payment_term: string;
};

export default function CustomersPage() {
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchClients() {
            const userUid = auth.currentUser?.uid;
            if (!userUid) {
                setLoading(false);
                return;
            }

            try {
                const clientsRef = collection(db, `aiai/be_${userUid}/clients`);
                const snapshot = await getDocs(clientsRef);

                const data = snapshot.docs.map((doc) => {
                    const d = doc.data() as any;
                    return {
                        id: doc.id,
                        client_company_name: d.client_company_name || d.be_company_name || "",
                        client_contact_name: d.client_contact_name || d.be_contact || "",
                        client_email: d.client_email || d.be_email || "",
                        client_mainphone: d.client_mainphone || d.be_phone || "",
                        client_payment_term: String(d.client_payment_term || ""),
                    };
                });

                setClients(data);
            } catch (err) {
                console.error("Firestore fetch error:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchClients();
    }, []);

    if (loading) return <p>Loading clients...</p>;

    return (
        <div>
            {/* <p>Current UID: {auth.currentUser?.uid ?? "Not logged in"}</p> */}
            <CustomersTable customers={clients} />
        </div>
    );
}
