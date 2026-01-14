export function createPageUrl(pageName) {
    // Handle pages with query parameters
    if (pageName.includes('?')) {
        const [page, query] = pageName.split('?');
        return `/${page}?${query}`;
    }
    
    // Regular page navigation
    return `/${pageName}`;
}