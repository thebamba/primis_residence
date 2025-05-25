import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "data", "reservations.json");

type Reservation = {
    from: string;
    to: string;
};

function isOverlap(startA: string, endA: string, startB: string, endB: string): boolean {
    return new Date(startA) <= new Date(endB) && new Date(endA) >= new Date(startB);
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const unit = url.searchParams.get("unit");

    const raw = await fs.readFile(filePath, "utf-8");
    const data: Record<string, Reservation[]> = JSON.parse(raw);

    return NextResponse.json(unit ? data[unit] || [] : data);
}

export async function POST(req: Request) {
    const { unit_type, from, to }: { unit_type: string; from: string; to: string } = await req.json();

    if (!unit_type || !from || !to) {
        return NextResponse.json({ success: false, message: "Champs manquants." }, { status: 400 });
    }

    const raw = await fs.readFile(filePath, "utf-8");
    const data: Record<string, Reservation[]> = JSON.parse(raw);
    const existing: Reservation[] = data[unit_type] || [];

    if (existing.some(({ from: f, to: t }) => isOverlap(f, t, from, to))) {
        return NextResponse.json({ success: false, message: "Dates déjà réservées." }, { status: 409 });
    }

    const updated = {
        ...data,
        [unit_type]: [...existing, { from, to }]
    };

    await fs.writeFile(filePath, JSON.stringify(updated, null, 2));
    return NextResponse.json({ success: true });
}
