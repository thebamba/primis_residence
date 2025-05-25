import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "reservations.json");

type Reservation = { from: string; to: string };
type ReservationsMap = Record<string, Reservation[]>;

function isOverlap(startA: string, endA: string, startB: string, endB: string): boolean {
    return new Date(startA) <= new Date(endB) && new Date(endA) >= new Date(startB);
}

export async function getReservations(unit: string): Promise<Reservation[]> {
    const raw = await fs.readFile(filePath, "utf-8");
    const data: ReservationsMap = JSON.parse(raw);
    return data[unit] || [];
}

export async function addReservation(unit: string, newRes: Reservation): Promise<boolean> {
    const raw = await fs.readFile(filePath, "utf-8");
    const data: ReservationsMap = JSON.parse(raw);
    const existing = data[unit] || [];

    const hasConflict = existing.some(r => isOverlap(r.from, r.to, newRes.from, newRes.to));
    if (hasConflict) return false;

    const updated: ReservationsMap = {
        ...data,
        [unit]: [...existing, newRes],
    };

    await fs.writeFile(filePath, JSON.stringify(updated, null, 2));
    return true;
}
