// Front-end demo persistence for saved cars, reservations, and session.
const SAVED = "kara_saved";
const RES = "kara_reservations";
const SERVICES = "kara_services";
const SESSION = "kara_session";

const read = <T,>(key: string, fallback: T): T => {
    if (typeof window === "undefined") return fallback;
    try {
        return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
    } catch {
        return fallback;
    }
};

export type Reservation = { slug: string; at: number };

export const getSession = (): { email: string } | null => read(SESSION, null);

export const getSaved = (): string[] => read<string[]>(SAVED, []);
export const isSaved = (slug: string) => getSaved().includes(slug);
export const toggleSaved = (slug: string): string[] => {
    const cur = getSaved();
    const next = cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug];
    localStorage.setItem(SAVED, JSON.stringify(next));
    return next;
};

export const getReservations = (): Reservation[] => read<Reservation[]>(RES, []);
export const addReservation = (slug: string): Reservation[] => {
    const cur = getReservations().filter((r) => r.slug !== slug);
    const next = [...cur, { slug, at: Date.now() }];
    localStorage.setItem(RES, JSON.stringify(next));
    return next;
};
export const removeReservation = (slug: string): Reservation[] => {
    const next = getReservations().filter((r) => r.slug !== slug);
    localStorage.setItem(RES, JSON.stringify(next));
    return next;
};

export type ServiceRecord = { type: string; car: string; date: string; at: number };

export const getServices = (): ServiceRecord[] => read<ServiceRecord[]>(SERVICES, []);
export const addService = (rec: Omit<ServiceRecord, "at">): ServiceRecord[] => {
    const next = [{ ...rec, at: Date.now() }, ...getServices()];
    localStorage.setItem(SERVICES, JSON.stringify(next));
    return next;
};
