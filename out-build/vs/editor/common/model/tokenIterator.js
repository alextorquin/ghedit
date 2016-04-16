define(["require", "exports", 'vs/editor/common/model/tokensBinaryEncoding'], function (require, exports, TokensBinaryEncoding) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var getStartIndex = TokensBinaryEncoding.getStartIndex;
    var inflate = TokensBinaryEncoding.inflate;
    var TokenIterator = (function () {
        function TokenIterator(model, position) {
            this._model = model;
            this._currentLineNumber = position.lineNumber;
            this._currentTokenIndex = 0;
            this._readLineTokens(this._currentLineNumber);
            this._next = null;
            this._prev = null;
            // start with a position to next/prev run
            var columnIndex = position.column - 1, tokenEndIndex = Number.MAX_VALUE;
            for (var i = this._currentTokens.length - 1; i >= 0; i--) {
                if (getStartIndex(this._currentTokens[i]) <= columnIndex && columnIndex <= tokenEndIndex) {
                    this._currentTokenIndex = i;
                    this._next = this._current();
                    this._prev = this._current();
                    break;
                }
                tokenEndIndex = getStartIndex(this._currentTokens[i]);
            }
        }
        TokenIterator.prototype._readLineTokens = function (lineNumber) {
            this._currentLineTokens = this._model.getLineTokens(lineNumber, false);
            this._currentTokens = this._currentLineTokens.getBinaryEncodedTokens();
            this._map = this._currentLineTokens.getBinaryEncodedTokensMap();
        };
        TokenIterator.prototype._advanceNext = function () {
            this._prev = this._next;
            this._next = null;
            if (this._currentTokenIndex + 1 < this._currentTokens.length) {
                // There are still tokens on current line
                this._currentTokenIndex++;
                this._next = this._current();
            }
            else {
                // find the next line with tokens
                while (this._currentLineNumber + 1 <= this._model.getLineCount()) {
                    this._currentLineNumber++;
                    this._readLineTokens(this._currentLineNumber);
                    if (this._currentTokens.length > 0) {
                        this._currentTokenIndex = 0;
                        this._next = this._current();
                        break;
                    }
                }
                if (this._next === null) {
                    // prepare of a previous run
                    this._readLineTokens(this._currentLineNumber);
                    this._currentTokenIndex = this._currentTokens.length;
                    this._advancePrev();
                    this._next = null;
                }
            }
        };
        TokenIterator.prototype._advancePrev = function () {
            this._next = this._prev;
            this._prev = null;
            if (this._currentTokenIndex > 0) {
                // There are still tokens on current line
                this._currentTokenIndex--;
                this._prev = this._current();
            }
            else {
                // find previous line with tokens
                while (this._currentLineNumber > 1) {
                    this._currentLineNumber--;
                    this._readLineTokens(this._currentLineNumber);
                    if (this._currentTokens.length > 0) {
                        this._currentTokenIndex = this._currentTokens.length - 1;
                        this._prev = this._current();
                        break;
                    }
                }
            }
        };
        TokenIterator.prototype._current = function () {
            return {
                token: inflate(this._map, this._currentTokens[this._currentTokenIndex]),
                lineNumber: this._currentLineNumber,
                startColumn: getStartIndex(this._currentTokens[this._currentTokenIndex]) + 1,
                endColumn: this._currentTokenIndex + 1 < this._currentTokens.length ? getStartIndex(this._currentTokens[this._currentTokenIndex + 1]) + 1 : this._model.getLineContent(this._currentLineNumber).length + 1
            };
        };
        TokenIterator.prototype.hasNext = function () {
            return this._next !== null;
        };
        TokenIterator.prototype.next = function () {
            var result = this._next;
            this._advanceNext();
            return result;
        };
        TokenIterator.prototype.hasPrev = function () {
            return this._prev !== null;
        };
        TokenIterator.prototype.prev = function () {
            var result = this._prev;
            this._advancePrev();
            return result;
        };
        TokenIterator.prototype._invalidate = function () {
            // replace all public functions with errors
            var errorFn = function () {
                throw new Error('iteration isn\'t valid anymore');
            };
            this.hasNext = errorFn;
            this.next = errorFn;
            this.hasPrev = errorFn;
            this.prev = errorFn;
        };
        return TokenIterator;
    }());
    exports.TokenIterator = TokenIterator;
});