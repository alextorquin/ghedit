import { IStream } from 'vs/editor/common/modes';
export declare class LineStream implements IStream {
    static STRING_TO_ARRAY_CACHE: {
        [key: string]: boolean[];
    };
    _source: string;
    private sourceLength;
    _pos: number;
    private whitespace;
    private whitespaceArr;
    private separators;
    private separatorsArr;
    private tokenStart;
    private tokenEnd;
    constructor(source: string);
    private stringToArray(str);
    private actualStringToArray(str);
    pos(): number;
    eos(): boolean;
    peek(): string;
    next(): string;
    next2(): void;
    advance(n: number): string;
    private _advance2(n);
    advanceToEOS(): string;
    goBack(n: number): void;
    private createPeeker(condition);
    private _advanceIfStringCaseInsensitive(condition);
    advanceIfStringCaseInsensitive(condition: string): string;
    advanceIfStringCaseInsensitive2(condition: string): number;
    private _advanceIfString(condition);
    advanceIfString(condition: string): string;
    advanceIfString2(condition: string): number;
    private _advanceIfCharCode(charCode);
    advanceIfCharCode(charCode: number): string;
    advanceIfCharCode2(charCode: number): number;
    private _advanceIfRegExp(condition);
    advanceIfRegExp(condition: RegExp): string;
    advanceIfRegExp2(condition: RegExp): number;
    private advanceLoop(condition, isWhile, including);
    advanceWhile(condition: any): string;
    advanceUntil(condition: any, including: boolean): string;
    private _advanceUntilString(condition, including);
    advanceUntilString(condition: string, including: boolean): string;
    advanceUntilString2(condition: string, including: boolean): number;
    private resetPeekedToken();
    setTokenRules(separators: string, whitespace: string): void;
    peekToken(): string;
    nextToken(): string;
    peekWhitespace(): string;
    private _skipWhitespace();
    skipWhitespace(): string;
    skipWhitespace2(): number;
}