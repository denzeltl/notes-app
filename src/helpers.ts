export default function debounce(a: any, b: any, c: any) {
    var d: any, e: any;
    return function (this: any) {
        function h() {
            d = null;
            c || (e = a.apply(f, g));
        }
        var f = this,
            g: any = arguments;
        return clearTimeout(d), (d = setTimeout(h, b)), c && !d && (e = a.apply(f, g)), e;
    };
}

export function removeHTMLTags(str: string) {
    return str.replace(/<[^>]*>?/gm, "");
}
