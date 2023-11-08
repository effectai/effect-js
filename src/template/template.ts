import templateScript from './templateScript';

export class Template {
    public html: string;
    public placeholders: object;
    public options: object;
    public info: object;
    private rendered!: string;

    constructor (html: string, placeholders = {}, options = {}, info = {}) {
        this.html = html;
        this.placeholders = placeholders;
        this.options = options;
        this.info = info;
    }

    public render (): string {
        this.replacePlaceholders()
        this.injectJSVar('FORCE_OPTIONS',this.options);
        this.injectJSVar('FORCE_INFO',this.info);
        this.injectJSVar('FORCE_PLACEHOLDERS',this.placeholders);
        this.injectHTML(templateScript)
        this.wrapForm()
        return this.rendered;
    }

    static htmlEntities (str): string {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/`/g, '&#96;');
    }

    private replacePlaceholders () {
        this.rendered = this.html.replace(/\$\{\s?(\w+)\s?\|?\s?(\w*)\s?\}/g, (all, name, option) => {
            if (name in this.placeholders) {
                let value = this.placeholders[name];
                if (Array.isArray(value) || value === Object(value)) {
                    value = JSON.stringify(value);
                }
                switch (option) {
                    case 'raw':
                    case 'html':
                        return value;
                    default:
                        return Template.htmlEntities(value);
                }
            }
            return '';
        });
    }

    private injectHTML (html: string, prepend: boolean = false) {
        if (prepend) {
            this.rendered = html + this.rendered;
        } else {
            this.rendered += html;
        }
    }

    private injectJSVar (name: string, value: any) {
        const html = `<script>window.${name} = ${JSON.stringify(value)};</script>`;
        this.injectHTML(html, true)
    }

    private injectJSFile (url: string, prepend: boolean = false) {
        const html = `<script src="${url}"></script>`;
        this.injectHTML(html, prepend)
    }

    private injectCSSFile (url:string, prepend:boolean = false) {
        const html = `<link rel="stylesheet" type="text/css" href="${url}">`;
        this.injectHTML(html, prepend)
    }

    private wrapForm () {
        this.rendered = `<meta charset="UTF-8" /><style>html {overflow-y: auto !important;}</style><form id="FORCE_FORM">${this.rendered}</form>`;
    }
}
