export let globalCurrentPage : string = "Fallback";

export const START : string = "Overview"

export function setGlobalCurrentPage(pageName : string) {
    globalCurrentPage = pageName;
}

export function getGlobalCurrentPage() : string {
    return globalCurrentPage;
}