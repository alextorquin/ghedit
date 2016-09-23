/**
 * Uniform Resource Identifier (URI) http://tools.ietf.org/html/rfc3986.
 * This class is a simple parser which creates the basic component paths
 * (http://tools.ietf.org/html/rfc3986#section-3) with minimal validation
 * and encoding.
 *
 *       foo://example.com:8042/over/there?name=ferret#nose
 *       \_/   \______________/\_________/ \_________/ \__/
 *        |           |            |            |        |
 *     scheme     authority       path        query   fragment
 *        |   _____________________|__
 *       / \ /                        \
 *       urn:example:animal:ferret:nose
 *
 *
 */
export default class URI {
    private static _empty;
    private static _slash;
    private static _regexp;
    private static _driveLetterPath;
    private static _upperCaseDrive;
    private _scheme;
    private _authority;
    private _path;
    private _query;
    private _fragment;
    private _formatted;
    private _fsPath;
    constructor();
    /**
     * scheme is the 'http' part of 'http://www.msft.com/some/path?query#fragment'.
     * The part before the first colon.
     */
    scheme: string;
    /**
     * authority is the 'www.msft.com' part of 'http://www.msft.com/some/path?query#fragment'.
     * The part between the first double slashes and the next slash.
     */
    authority: string;
    /**
     * path is the '/some/path' part of 'http://www.msft.com/some/path?query#fragment'.
     */
    path: string;
    /**
     * query is the 'query' part of 'http://www.msft.com/some/path?query#fragment'.
     */
    query: string;
    /**
     * fragment is the 'fragment' part of 'http://www.msft.com/some/path?query#fragment'.
     */
    fragment: string;
    /**
     * Returns a string representing the corresponding file system path of this URI.
     * Will handle UNC paths and normalize windows drive letters to lower-case. Also
     * uses the platform specific path separator. Will *not* validate the path for
     * invalid characters and semantics. Will *not* look at the scheme of this URI.
     */
    fsPath: string;
    with(change: {
        scheme?: string;
        authority?: string;
        path?: string;
        query?: string;
        fragment?: string;
    }): URI;
    static parse(value: string): URI;
    static file(path: string): URI;
    private static _parseComponents(value);
    static from(components: {
        scheme?: string;
        authority?: string;
        path?: string;
        query?: string;
        fragment?: string;
    }): URI;
    private static _schemePattern;
    private static _singleSlashStart;
    private static _doubleSlashStart;
    private static _validate(ret);
    /**
     *
     * @param skipEncoding Do not encode the result, default is `false`
     */
    toString(skipEncoding?: boolean): string;
    private static _asFormatted(uri, skipEncoding);
    toJSON(): any;
    static revive(data: any): URI;
}