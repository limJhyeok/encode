export function generateReferralLink(token: string, sender: string): string {
    const baseUrl = window.location.origin;
    const encoded = btoa(JSON.stringify({ token, sender }));
    return `${baseUrl}/?ref=${encoded}`;
}

export function parseReferralLink(refParam: string): { token: string; sender: string } | null {
    try {
        const decoded = atob(refParam);
        return JSON.parse(decoded);
    } catch (err) {
        console.error("Invalid referral link:", err);
        return null;
    }
}
