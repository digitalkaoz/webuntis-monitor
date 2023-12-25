// Should run on edge runtime
export const edge = true;

// Always add those header to this endpoint

export default async function handler() {
    return new Response('Edge Function: OK', {
        status: 200,
    });
}