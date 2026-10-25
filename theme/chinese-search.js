/* Chinese phrase support for the mdBook local search index. */
(function () {
    if (typeof elasticlunr === 'undefined') return;
    const originalSearch = elasticlunr.Index.prototype.search;
    function searchChinese(query) {
        const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
        const matches = [];
        const docs = this.documentStore.docs;
        for (const [ref, doc] of Object.entries(docs)) {
            const title = (doc.title || '').toLocaleLowerCase();
            const trail = (doc.breadcrumbs || '').toLocaleLowerCase();
            const body = (doc.body || '').toLocaleLowerCase();
            const all = title + ' ' + trail + ' ' + body;
            if (terms.every(term => all.includes(term))) {
                const score = terms.reduce((n, term) => n
                    + (title.includes(term) ? 10 : 0)
                    + (trail.includes(term) ? 3 : 0)
                    + (body.includes(term) ? 1 : 0), 0);
                matches.push({ref, doc, score});
            }
        }
        return matches.sort((a, b) => b.score - a.score || Number(a.ref) - Number(b.ref));
    }


    elasticlunr.Index.prototype.search = function (query, options) {
        if (/[\u3400-\u9fff]/.test(query)) return searchChinese.call(this, query);
        return originalSearch.call(this, query, options);
    };
    // Native mdBook listens for keyup. Also cover IME commits and pasted text.
    const field = document.getElementById('mdbook-searchbar');
    if (field) {
        let pending;
        const refresh = () => {
            clearTimeout(pending);
            pending = setTimeout(() => field.dispatchEvent(new KeyboardEvent('keyup', {bubbles: true})), 100);
        };
        field.addEventListener('input', event => { if (!event.isComposing) refresh(); });
        field.addEventListener('compositionend', refresh);
    }
})();
