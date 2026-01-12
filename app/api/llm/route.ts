import { NextResponse } from "next/server";
import { BASE_URL } from "@/app/config/backend";

/**
 * Common proxy function
 */
async function forwardRequest(req: Request, method: string) {
    let url: string;
    let options: RequestInit = { method, headers: { "Content-Type": "application/json" } };

    if (method === "GET") {
        // For GET, extract 'path' and 'params' from URL query
        const reqUrl = new URL(req.url);
        const path = reqUrl.searchParams.get("path") ?? "";
        reqUrl.searchParams.delete("path"); // remaining params are query for backend

        const queryString = reqUrl.searchParams.toString();
        url = `${BASE_URL}${path}${queryString ? "?" + queryString : ""}`;
    } else {
        // POST / PATCH
        const body = await req.json();
        const { path, ...payload } = body;
        url = `${BASE_URL}${path}`;
        options.body = JSON.stringify(payload);
    }

    const res = await fetch(url, options);

    if (!res.ok) {
        return NextResponse.json({ error: "Backend error" }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    return forwardRequest(req, "POST");
}

export async function PATCH(req: Request) {
    return forwardRequest(req, "PATCH");
}

export async function GET(req: Request) {
    return forwardRequest(req, "GET");
}



// import { NextResponse } from "next/server";
// import { BASE_URL } from "@/app/config/backend";


// export async function POST(req: Request) {
//     const body = await req.json();
//     const { path, ...payload } = body;

//     const res = await fetch(`${BASE_URL}${path}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//         return NextResponse.json(
//             { error: "LLM backend error" },
//             { status: 500 }
//         );
//     }

//     const data = await res.json();
//     return NextResponse.json(data);
// }
