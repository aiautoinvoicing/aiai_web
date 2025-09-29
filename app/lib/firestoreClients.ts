// src/lib/firestoreClients.ts
import { collection, query, where, orderBy, getDocs, } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

export interface ClientDB {
    client_id: string;
    client_name: string;
    email?: string;
    is_deleted: number;
    created_at?: string;
}

// Fetch with filter/search
export async function fetchFilteredClients(uid: string, search: string) {
    const clientsRef = collection(db, `aiai/be_${uid}/clients`);

    let q;
    if (search) {
        q = query(
            clientsRef,
            where("is_deleted", "==", 0),
            orderBy("client_name"),
            where("client_name", ">=", search),
            where("client_name", "<=", search + "\uf8ff")
        );
    } else {
        q = query(clientsRef, where("is_deleted", "==", 0));
    }

    const snap = await getDocs(q);
    return snap.docs.map((d) => d.data() as ClientDB);
}
