/*!
 * jQuery JavaScript Library v3.1.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2016-09-22T22:30Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.1.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			resolve.call( undefined, value );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.call( undefined, value );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && jQuery.nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

function manipulationTarget( elem, content ) {
	if ( jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE <=9 only
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var val,
		valueIsBorderBox = true,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE <=11 only
	// Running getBoundingClientRect on a disconnected node
	// in IE throws an error.
	if ( elem.getClientRects().length ) {
		val = elem.getBoundingClientRect()[ name ];
	}

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function raf() {
	if ( timerId ) {
		window.requestAnimationFrame( raf );
		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off or if document is hidden
	if ( jQuery.fx.off || document.hidden ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.requestAnimationFrame ?
			window.requestAnimationFrame( raf ) :
			window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	if ( window.cancelAnimationFrame ) {
		window.cancelAnimationFrame( timerId );
	} else {
		window.clearInterval( timerId );
	}

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( jQuery.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win, rect, doc,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		// Make sure element is not hidden (display: none)
		if ( rect.width || rect.height ) {
			doc = elem.ownerDocument;
			win = getWindow( doc );
			docElem = doc.documentElement;

			return {
				top: rect.top + win.pageYOffset - docElem.clientTop,
				left: rect.left + win.pageXOffset - docElem.clientLeft
			};
		}

		// Return zeros for disconnected and hidden elements (gh-2310)
		return rect;
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.parseJSON = JSON.parse;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}





return jQuery;
} );

define('text!aurelia-materialize-bridge/click-counter.html', ['module'], function(module) { module.exports = "<template>\n  <h2>Click counter</h2>\n\n  <button md-waves class=\"btn\" click.delegate=\"increment()\">Button</button>\n\n  <h2>Button was clicked ${count} times</h2>\n</template>\n"; });
define('text!aurelia-materialize-bridge/breadcrumbs/breadcrumbs.css', ['module'], function(module) { module.exports = "md-breadcrumbs a {\n  cursor: pointer;\n}\n"; });
define('text!aurelia-materialize-bridge/breadcrumbs/breadcrumbs.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./breadcrumbs.css\"></require>\n  <require from=\"./instructionFilter\"></require>\n  <nav class=\"primary\">\n    <div class=\"nav-wrapper\">\n      <div class=\"col s12\">\n        <template repeat.for=\"instruction of router.currentInstruction.getAllInstructions() | instructionFilter\">\n          <a click.delegate=\"navigate(instruction)\" class=\"breadcrumb\">\n            ${instruction.config.title}\n          </a>\n        </template>\n      </div>\n    </div>\n  </nav>\n</template>\n"; });
define('text!aurelia-materialize-bridge/card/card.css', ['module'], function(module) { module.exports = "md-card {\n  display: block;\n}\n"; });
define('text!aurelia-materialize-bridge/card/card.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./card.css\"></require>\n  <div class=\"card ${ mdHorizontal ? 'horizontal' : '' } ${ mdSize || '' }\">\n    <div if.bind=\"mdImage !== null\" md-waves=\"color: light; block: true;\" class=\"card-image\">\n      <img class=\"${ mdReveal === true ? 'activator' : '' }\" src.bind=\"mdImage\" />\n      <span if.bind=\"mdReveal === false\" class=\"card-title\">${mdTitle}</span>\n    </div>\n\n    <!-- <div class=\"${ mdHorizontal ? 'card-stacked' : ''}\">\n\n    </div> -->\n    <div class=\"card-content\">\n      <span if.bind=\"mdReveal === true\" class=\"card-title activator\">\n        ${mdTitle}\n        <i class=\"material-icons right\">more_vert</i>\n      </span>\n      <span if.bind=\"mdImage === null\" class=\"card-title\">${mdTitle}</span>\n      <slot></slot>\n    </div>\n\n    <div show.bind=\"mdReveal\" class=\"${ mdReveal ? 'card-reveal' : '' }\">\n      <span class=\"card-title ${ mdReveal ? 'activator' : '' }\">\n        ${mdTitle}\n        <i class=\"material-icons right\">close</i>\n      </span>\n      <slot name=\"reveal-text\"></slot>\n    </div>\n  </div>\n</template>\n"; });
define('text!aurelia-materialize-bridge/carousel/carousel.css', ['module'], function(module) { module.exports = "md-carousel {\r\n  display: block;\r\n}\r\n"; });
define('text!aurelia-materialize-bridge/carousel/carousel-item.html', ['module'], function(module) { module.exports = "<template class=\"carousel-item\">\n  <a if.bind=\"mdHref\" href.bind=\"mdHref\">\n    <img if.bind=\"mdImage\" src.bind=\"mdImage\" />\n  </a>\n  <img if.bind=\"!mdHref\" src.bind=\"mdImage\" />\n  <slot></slot>\n</template>\n"; });
define('text!aurelia-materialize-bridge/carousel/carousel.html', ['module'], function(module) { module.exports = "<template class=\"carousel\">\n  <require from=\"./carousel.css\"></require>\n  <slot></slot>\n</template>\n"; });
define('text!aurelia-materialize-bridge/checkbox/checkbox.html', ['module'], function(module) { module.exports = "<template>\n  <input type=\"checkbox\" id=\"${controlId}\" ref=\"checkbox\" blur.trigger=\"blur()\" />\n  <label for=\"${controlId}\">\n    <slot></slot>\n  </label>\n</template>\n"; });
define('text!aurelia-materialize-bridge/chip/chip.html', ['module'], function(module) { module.exports = "<template class=\"chip\">\n  <slot></slot>\n  <i show.bind=\"mdClose\" class=\"material-icons\">close</i>\n</template>\n"; });
define('text!aurelia-materialize-bridge/collection/collection-header.css', ['module'], function(module) { module.exports = "md-collection-header {\n  display: block;\n}\n"; });
define('text!aurelia-materialize-bridge/collection/collection-item.css', ['module'], function(module) { module.exports = "md-collection-item {\n  display: block;\n}\n\nmd-collection-item.collection-item:not(.active):hover {\n  background-color: #ddd;\n}\n"; });
define('text!aurelia-materialize-bridge/collection/md-collection-selector.css', ['module'], function(module) { module.exports = "md-collection-selector .md-collection-selector__hover {\n  display: inline-block;\n}\nmd-collection-selector:hover .md-collection-selector__hover, md-collection-item.selected md-collection-selector .md-collection-selector__hover {\n  display: none !important;\n}\nmd-collection-selector .md-collection-selector__checkbox div {\n  margin-left: 5px;\n  display: inline-block;\n  position: absolute;\n  left: 20px;\n  top: 20px;\n  margin-right: 11px;\n  height: 42px;\n  width: 42px;\n  line-height: 42px;\n  text-align: center;\n}\nmd-collection-selector .md-collection-selector__checkbox .md-collection-selector__hover ~ div {\n  display: none;\n}\n\nmd-collection-selector:hover .md-collection-selector__checkbox .md-collection-selector__hover ~ div, md-collection-item.selected md-collection-selector .md-collection-selector__checkbox .md-collection-selector__hover ~ div {\n  display: inline-block;\n}\n\nmd-collection-item.selected {\n  background-color: #eee;\n}\n\nmd-collection-selector md-checkbox {\n  display: inline-block;\n}\nmd-collection-selector md-collection md-checkbox .md-checkbox.is-upgraded {\n  padding-left: 16px;\n}\n"; });
define('text!aurelia-materialize-bridge/collection/collection-header.html', ['module'], function(module) { module.exports = "<template class=\"collection-header\">\n  <require from=\"./collection-header.css\"></require>\n  <slot></slot>\n</template>\n"; });
define('text!aurelia-materialize-bridge/collection/collection-item.html', ['module'], function(module) { module.exports = "<template class=\"collection-item\">\n  <require from=\"./collection-item.css\"></require>\n  <slot></slot>\n  <!-- <content select=\".secondary-content\"></content> -->\n</template>\n"; });
define('text!aurelia-materialize-bridge/collection/collection.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"collection\" ref=\"anchor\">\n    <!-- <content select=\"md-collection-header\"></content>\n    <content select=\"md-collection-item\"></content> -->\n    <slot></slot>\n  </div>\n</template>\n"; });
define('text!aurelia-materialize-bridge/collection/md-collection-selector.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./md-collection-selector.css\"></require>\n  <div class=\"md-collection-selector__checkbox\">\n    <!-- <content select=\".md-collection-selector__hover\"></content> -->\n    <slot></slot>\n    <div>\n      <md-checkbox md-checked.two-way=\"isSelected\" md-disabled.bind=\"mdDisabled\"></mdl-checkbox>\n    </div>\n</template>\n"; });
define('text!aurelia-materialize-bridge/colors/md-colors.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./colorValueConverters\"></require>\n\n  <!--\n    According to Material color spec (https://www.google.com/design/spec/style/color.html#color-ui-color-application)\n    and using Materialize terminology (darken/lighten instead of hue numbers)\n    the used palettes here consist of:\n    Primary - lighten-1 (400), lighten-2 (300), lighten-3 (200)\n    Accent  - lighten-1 (400), lighten-3 (200)\n\n    These should optionally be defined by the user. At the moment, they are\n    calculated and even not exact (but close).\n\n    Focused elements are an exception, these use \"lighten-0.5\" which is\n    not specified anywhere.\n  -->\n\n  <style>\n  .primary {\n    background-color: ${mdPrimaryColor};\n    color: white;\n  }\n\n  .primary-text {\n    /*background-color: white;*/\n    color: ${mdPrimaryColor};\n  }\n\n  .waves-effect.waves-primary .waves-ripple {\n    background-color: ${mdPrimaryColor};\n  }\n\n  .waves-effect.waves-accent .waves-ripple {\n    background-color: ${mdAccentColor};\n  }\n\n  .accent {\n    background-color: ${mdAccentColor};\n    color: white;\n  }\n\n  .accent-text {\n    /*background-color: white;*/\n    color: ${mdAccentColor};\n  }\n\n  .error {\n    background-color: ${mdErrorColor};\n  }\n\n  .error-text {\n    color: ${mdErrorColor}\n  }\n\n  .success {\n    background-color: ${mdAccentColor};\n    color: white;\n  }\n\n  .success-text {\n    color: ${mdAccentColor};\n  }\n\n  /* buttons */\n  .btn.primary, .btn-flat.primary, .btn-large.primary {\n    transition: .2s ease-out;\n  }\n  .btn.primary:hover, .btn-flat.primary:hover, .btn-large.primary:hover {\n    background-color: ${mdPrimaryColor | lighten:1};\n    transition: .2s ease-out;\n  }\n  .btn.primary:focus, .btn-flat.primary:focus, .btn-large.primary:focus {\n    background-color: ${mdPrimaryColor | lighten:0.5};\n    transition: .2s ease-out;\n  }\n  .btn-flat:not(.disabled):hover {\n    /*background-color: ${mdAccentColor | lighten:3};*/\n    background-color: rgba(50, 50, 50, .15);\n    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);\n    border: none;\n    box-shadow: none;\n    transition: .2s ease-out;\n  }\n  .btn-flat:focus {\n    /*background-color: ${mdAccentColor | lighten:2};*/\n    background-color: transparent;\n    border: none;\n    box-shadow: none;\n    transition: .2s ease-out;\n  }\n\n  .btn.accent, .btn-flat.accent, .btn-large.accent {\n    transition: .2s ease-out;\n  }\n  .btn.accent:hover, .btn-flat.accent:hover, .btn-large.accent:hover, .btn-floating:hover {\n    background-color: ${mdAccentColor | lighten:1};\n    transition: .2s ease-out;\n  }\n  .btn.accent:focus, .btn-flat.accent:focus, .btn-large.accent:focus, .btn-floating:focus {\n    background-color: ${mdAccentColor | lighten:0.5};\n    transition: .2s ease-out;\n  }\n\n  /* checkbox */\n  [type=\"checkbox\"]:checked + label:before {\n    border-right-color: ${mdAccentColor};\n    border-bottom-color: ${mdAccentColor};\n  }\n\n  [type=\"checkbox\"].filled-in:checked + label:after {\n    border-color: ${mdAccentColor};\n    background-color: ${mdAccentColor};\n  }\n\n  [type=\"checkbox\"]:indeterminate + label:before {\n    border-right-color: ${mdAccentColor};\n  }\n\n  /* collection */\n  md-collection .collection md-collection-item.collection-item.active {\n    background-color: ${mdAccentColor};\n    color: white;\n  }\n\n  md-collection .collection md-collection-item.collection-item .secondary-content {\n    color: ${mdAccentColor};\n  }\n\n  md-collection .collection md-collection-item.collection-item.avatar i.circle.primary {\n    background-color: ${mdPrimaryColor};\n  }\n  md-collection .collection md-collection-item.collection-item.avatar i.circle.accent {\n    background-color: ${mdAccentColor};\n  }\n  md-collection .collection md-collection-item.collection-item.avatar i.circle.error {\n    background-color: ${mdErrorColor};\n  }\n  md-collection .collection md-collection-item.collection-item.avatar i.circle.success {\n    background-color: ${mdAccentColor};\n  }\n  md-collection .collection md-collection-item.collection-item.avatar i.circle.primary-text {\n    color: ${mdPrimaryColor};\n    background-color: transparent;\n  }\n  md-collection .collection md-collection-item.collection-item.avatar i.circle.accent-text {\n    color: ${mdAccentColor};\n    background-color: transparent;\n  }\n  md-collection .collection md-collection-item.collection-item.avatar i.circle.error-text {\n    color: ${mdErrorColor};\n    background-color: transparent;\n  }\n  md-collection .collection md-collection-item.collection-item.avatar i.circle.success-text {\n    color: ${mdAccentColor};\n    background-color: transparent;\n  }   \n\n\n  /* datepicker */\n  .picker__date-display {\n    background-color: ${mdAccentColor};\n  }\n  .picker__weekday-display {\n    background-color: ${mdAccentColor | darken:1};\n  }\n  .picker__day--selected, .picker__day--selected:hover, .picker--focused .picker__day--selected {\n    background-color: ${mdAccentColor};\n  }\n  .picker__day.picker__day--today {\n    color: ${mdAccentColor}\n  }\n  .picker__footer button:not(.picker__clear) {\n    color: ${mdAccentColor}\n  }\n  .picker__footer button:focus {\n    background-color: ${mdAccentColor | lighten:2};\n  }\n\n  /* text input */\n  md-input .input-field label {\n    left: 0;\n  }\n  md-input .input-field input[type=text]:focus {\n    border-bottom: 1px solid ${mdAccentColor};\n    box-shadow: 0 1px 0 0 ${mdAccentColor};\n  }\n  md-input .input-field input[type=text]:focus + label {\n    color: ${mdAccentColor};\n  }\n  md-input .input-field input[type=email]:focus {\n    border-bottom: 1px solid ${mdAccentColor};\n    box-shadow: 0 1px 0 0 ${mdAccentColor};\n  }\n  md-input .input-field input[type=email]:focus + label {\n    color: ${mdAccentColor};\n  }\n  md-input .input-field input[type=password]:focus {\n    border-bottom: 1px solid ${mdAccentColor};\n    box-shadow: 0 1px 0 0 ${mdAccentColor};\n  }\n  md-input .input-field input[type=password]:focus + label {\n    color: ${mdAccentColor};\n  }\n  md-input .input-field .prefix.active {\n    color: ${mdAccentColor};\n  }\n  md-input textarea.materialize-textarea:focus:not([readonly]) {\n    border-bottom: 1px solid ${mdAccentColor};\n    box-shadow: 0 1px 0 0 ${mdAccentColor};\n  }\n  md-input textarea.materialize-textarea:focus:not([readonly]) + label {\n    color: ${mdAccentColor}\n  }\n\n  md-input input:not([type]).invalid + label:after,\n  md-input input:not([type]):focus.invalid + label:after,\n  md-input input[type=text].invalid + label:after,\n  md-input input[type=text]:focus.invalid + label:after,\n  md-input input[type=password].invalid + label:after,\n  md-input input[type=password]:focus.invalid + label:after,\n  md-input input[type=email].invalid + label:after,\n  md-input input[type=email]:focus.invalid + label:after,\n  md-input input[type=url].invalid + label:after,\n  md-input input[type=url]:focus.invalid + label:after,\n  md-input input[type=time].invalid + label:after,\n  md-input input[type=time]:focus.invalid + label:after,\n  md-input input[type=date].invalid + label:after,\n  md-input input[type=date]:focus.invalid + label:after,\n  md-input input[type=datetime].invalid + label:after,\n  md-input input[type=datetime]:focus.invalid + label:after,\n  md-input input[type=datetime-local].invalid + label:after,\n  md-input input[type=datetime-local]:focus.invalid + label:after,\n  md-input input[type=tel].invalid + label:after,\n  md-input input[type=tel]:focus.invalid + label:after,\n  md-input input[type=number].invalid + label:after,\n  md-input input[type=number]:focus.invalid + label:after,\n  md-input input[type=search].invalid + label:after,\n  md-input input[type=search]:focus.invalid + label:after,\n  md-input textarea.materialize-textarea.invalid + label:after,\n  md-input textarea.materialize-textarea:focus.invalid + label:after\n  {\n    color: ${mdErrorColor}\n  }\n\n  /* text input aurelia-validation messages */\n  .md-input-validation {\n    left: 0;\n    /*color: #f44336;*/\n    color: ${mdErrorColor};\n    font-size: 0.8rem;\n    transition: opacity .2s ease-out;\n    margin-top: -4px;\n    margin-bottom: 0;\n  }\n  @media only screen and (min-width: 0) {\n    .md-input-validation-first {\n      margin-top: -14px;\n      margin-bottom: -2px;\n    }\n  }\n  @media only screen and (min-width: 992px) {\n    .md-input-validation-first {\n      margin-top: -18px;\n      padding-bottom: 3px;\n    }\n  }\n  @media only screen and (min-width: 1200px) {\n    .md-input-validation-first {\n      margin-top: -19px;\n    }\n  }\n\n  /* pagination */\n  md-pagination .pagination li.active {\n    background-color: ${mdPrimaryColor}\n  }\n\n  /* progress */\n  md-progress .progress {\n    background-color: ${mdAccentColor | lighten:2};\n  }\n\n  md-progress .progress .determinate, md-progress .progress .indeterminate {\n    background-color: ${mdAccentColor};\n  }\n\n  /* radio input */\n  md-radio input[type=\"radio\"]:checked + label:after {\n    border: 2px solid ${mdAccentColor};\n    background-color: ${mdAccentColor};\n  }\n  md-radio [type=\"radio\"].with-gap:checked + label:before {\n    border: 2px solid ${mdAccentColor};\n  }\n  md-radio [type=\"radio\"].with-gap:checked + label:after {\n    border: 2px solid ${mdAccentColor};\n    background-color: ${mdAccentColor};\n  }\n\n  /* range */\n  md-range .range-field input[type=\"range\"]::-webkit-slider-thumb {\n    background: ${mdAccentColor};\n  }\n  md-range .range-field input[type=\"range\"]::-moz-range-thumb {\n    background: ${mdAccentColor};\n  }\n  md-range .range-field input[type=\"range\"]::-ms-thumb {\n    background: ${mdAccentColor};\n  }\n  md-range input[type=\"range\"] + .thumb {\n    background-color: ${mdAccentColor} !important;\n  }\n\n  /* select */\n  .dropdown-content li > a, .dropdown-content li > span {\n    color: ${mdAccentColor};\n  }\n\n  /* side-nav */\n  .side-nav .collapsible-body li.active, .side-nav.fixed .collapsible-body li.active {\n    background-color: ${mdPrimaryColor};\n  }\n\n  /* slider */\n  .slider .indicators .indicator-item.active {\n    background-color: ${mdAccentColor};\n  }\n\n  /* switch */\n  md-switch.switch label input[type=checkbox]:checked + .lever {\n    background-color: ${mdAccentColor | lighten:1};\n  }\n  md-switch.switch label input[type=checkbox]:checked + .lever:after {\n    background-color: ${mdAccentColor};\n  }\n\n  /* tabs */\n\n  .tab.primary-text a {\n    color: ${mdPrimaryColor};\n  }\n  .tab.primary-text a:hover {\n    color: ${mdPrimaryColor | lighten:2};\n  }\n  .tabs .indicator {\n    background-color: ${mdPrimaryColor | lighten:2};\n  }\n\n  /* well */\n  md-well li.active {\n    border-right: 2px solid ${mdPrimaryColor};\n    background-color: ${mdPrimaryColor | lighten:3};\n  }\n\n  /* footer */\n  footer.page-footer {\n    background-color: ${mdPrimaryColor};\n  }\n\n  /* md-select label */\n  .select-wrapper input {\n    // make input fit in div\n    display: inline-block !important;\n    // fix validation border thickness\n    border-bottom: 1px solid #4CAF50;\n  }\n\n  .select-wrapper input.invalid {\n    border-bottom: 1px solid ${mdErrorColor};\n  }\n\n  .select-wrapper + label {\n    color: ${mdAccentColor};\n    width: 100%;\n  }\n  /* position validation label */\n  .select-wrapper + label:after {\n    display: block;\n    content: \"\";\n    position: absolute;\n    top: 60px;\n    opacity: 0;\n    transition: .2s opacity ease-out, .2s color ease-out;\n    transform: translateY(0) !important;\n  }\n  /* set validation text */\n  .select-wrapper.invalid + label:after {\n    content: attr(data-error);\n    color: ${mdErrorColor};\n    opacity: 1;\n  }\n\n  </style>\n</template>\n"; });
define('text!aurelia-materialize-bridge/dropdown/dropdown-element.html', ['module'], function(module) { module.exports = "<template md-button class=\"dropdown-button\" data-activates=\"${ controlId }\">\n  ${mdTitle}\n  <div id=\"${ controlId }\" class='dropdown-content'>\n    <slot></slot>\n  </div>\n</template>\n"; });
define('text!aurelia-materialize-bridge/fab/fab.html', ['module'], function(module) { module.exports = "<template>\n  <a if.bind=\"mdFixed === false\" md-button=\"large.bind: mdLarge;\" md-waves=\"color: light;\" class=\"btn-floating\">\n    <slot></slot>\n  </a>\n\n  <div if.bind=\"mdFixed === true\" class=\"fixed-action-btn\" style=\"bottom: 45px; right: 24px;\">\n    <a md-button=\"large: true;\" md-waves=\"color: light;\" class=\"btn-floating\">\n      <slot></slot>\n    </a>\n  </div>\n</template>\n"; });
define('text!aurelia-materialize-bridge/file/file.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"file-field input-field\">\n        <div class=\"btn accent\">\n            <span>${mdCaption}</span>\n            <input type=\"file\" multiple.bind=\"mdMultiple\" files.bind=\"files\" />\n        </div>\n        <div class=\"file-path-wrapper\">\n            <input class=\"file-path validate\" type=\"text\" value.bind=\"mdLabelValue\" ref=\"filePath\" />\n        </div>\n    </div>\n</template>\n"; });
define('text!aurelia-materialize-bridge/input/input.css', ['module'], function(module) { module.exports = "/*md-input .input-field label {\n  transform: translateX(-11px);\n}\nmd-input .input-field label.active {\n  transform: translateX(-11px) translateY(-140%);\n}*/\n\nmd-input .input-field label.active {\n  width: 100%;\n}\n"; });
define('text!aurelia-materialize-bridge/input/input.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./input.css\"></require>\n  <div class=\"input-field\">\n    <!-- <content select=\"[md-prefix]\"></content> -->\n    <slot></slot>\n    <input if.bind=\"mdTextArea === false\" id=\"${controlId}\" type.bind=\"mdType\" step.bind=\"mdStep\" ref=\"input\" value.bind=\"mdValue\" disabled.bind=\"mdDisabled\" blur.trigger=\"blur()\" />\n    <textarea if.bind=\"mdTextArea === true\" id=\"${controlId}\" ref=\"input\" value.bind=\"mdValue\" class=\"materialize-textarea\" disabled.bind=\"mdDisabled\" blur.trigger=\"blur()\"></textarea>\n    <label for=\"${controlId}\" ref=\"label\">${mdLabel}</label>\n  </div>\n</template>\n"; });
define('text!aurelia-materialize-bridge/navbar/navbar.css', ['module'], function(module) { module.exports = "md-navbar .primary {\n  transition: all .3s ease-out;\n}\n"; });
define('text!aurelia-materialize-bridge/navbar/navbar.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./navbar.css\"></require>\n  <div ref=\"fixedAnchor\">\n    <nav class=\"primary\">\n      <div class=\"nav-wrapper\">\n        <slot></slot>\n      </div>\n    </nav>\n  </div>\n</template>\n"; });
define('text!aurelia-materialize-bridge/pagination/pagination.html', ['module'], function(module) { module.exports = "<template>\n  <ul class=\"pagination\">\n    <template if.bind=\"mdShowFirstLast\">\n      <li md-waves click.delegate=\"setFirstPage()\" class=\"${ mdActivePage === 1 ? 'disabled' : '' }\"><a><i class=\"material-icons\">first_page</i></a></li>\n    </template>\n    <template if.bind=\"mdShowPrevNext\">\n      <li md-waves click.delegate=\"setPreviousPage()\" class=\"${ mdActivePage === 1 ? 'disabled' : '' }\"><a><i class=\"material-icons\">chevron_left</i></a></li>\n    </template>\n    <template if.bind=\"mdShowPageLinks\">\n      <li md-waves click.delegate=\"setActivePage(p+1)\" repeat.for=\"p of mdPageLinks\" class=\"${ p+1 === mdActivePage ? 'active' : ''}\">\n        <span if.bind=\"$first && p > 0\">...</span>\n        <a>${p+1}</a>\n        <span if.bind=\"$last && p < pages - 1\">...</span>\n      </li>\n    </template>\n    <template if.bind=\"mdShowPrevNext\">\n      <li md-waves click.delegate=\"setNextPage()\" class=\"${ mdActivePage == pages ? 'disabled' : '' }\"><a><i class=\"material-icons\">chevron_right</i></a></li>\n    </template>\n    <template if.bind=\"mdShowFirstLast\">\n      <li md-waves click.delegate=\"setLastPage()\" class=\"${ mdActivePage == pages ? 'disabled' : '' }\"><a><i class=\"material-icons\">last_page</i></a></li>\n    </template>\n  </ul>\n</template>\n"; });
define('text!aurelia-materialize-bridge/progress/progress.html', ['module'], function(module) { module.exports = "<template>\n  <template if.bind=\"mdType === 'linear'\">\n    <div class=\"progress\">\n      <div class=\"${ mdValue === null ? 'indeterminate' : 'determinate' }\" css=\"width: ${ mdValue ? mdValue : 0 }%\"></div>\n  </div>\n  </template>\n  <template if.bind=\"mdType === 'circular' && mdColor !== 'flashing'\">\n    <div class=\"preloader-wrapper ${mdSize} active\" ref=\"wrapper\">\n      <div class=\"spinner-layer spinner-${mdColor}-only\">\n        <div class=\"circle-clipper left\">\n          <div class=\"circle\"></div>\n        </div><div class=\"gap-patch\">\n          <div class=\"circle\"></div>\n        </div><div class=\"circle-clipper right\">\n          <div class=\"circle\"></div>\n        </div>\n      </div>\n    </div>\n  </template>\n  <template if.bind=\"mdType === 'circular' && mdColor === 'flashing'\">\n    <div class=\"preloader-wrapper ${mdSize} active\" ref=\"wrapper\">\n      <div class=\"spinner-layer spinner-blue\">\n        <div class=\"circle-clipper left\">\n          <div class=\"circle\"></div>\n        </div><div class=\"gap-patch\">\n          <div class=\"circle\"></div>\n        </div><div class=\"circle-clipper right\">\n          <div class=\"circle\"></div>\n        </div>\n      </div>\n\n      <div class=\"spinner-layer spinner-red\">\n        <div class=\"circle-clipper left\">\n          <div class=\"circle\"></div>\n        </div><div class=\"gap-patch\">\n          <div class=\"circle\"></div>\n        </div><div class=\"circle-clipper right\">\n          <div class=\"circle\"></div>\n        </div>\n      </div>\n\n      <div class=\"spinner-layer spinner-yellow\">\n        <div class=\"circle-clipper left\">\n          <div class=\"circle\"></div>\n        </div><div class=\"gap-patch\">\n          <div class=\"circle\"></div>\n        </div><div class=\"circle-clipper right\">\n          <div class=\"circle\"></div>\n        </div>\n      </div>\n\n      <div class=\"spinner-layer spinner-green\">\n        <div class=\"circle-clipper left\">\n          <div class=\"circle\"></div>\n        </div><div class=\"gap-patch\">\n          <div class=\"circle\"></div>\n        </div><div class=\"circle-clipper right\">\n          <div class=\"circle\"></div>\n        </div>\n      </div>\n    </div>\n  </template>\n</template>\n"; });
define('text!aurelia-materialize-bridge/radio/radio.html', ['module'], function(module) { module.exports = "<template>\n  <input if.bind=\"!mdModel\" type=\"radio\" name=\"${mdName}\" value.bind=\"mdValue\" id=\"${controlId}\" checked.bind=\"mdChecked\" ref=\"radio\" />\n  <input if.bind=\"!!mdModel\" type=\"radio\" name=\"${mdName}\" model.bind=\"mdModel\" id=\"${controlId}\" checked.bind=\"mdChecked\" ref=\"radio\" />\n  <label for=\"${controlId}\">\n    <slot></slot>\n  </label>\n</template>\n"; });
define('text!aurelia-materialize-bridge/range/range.html', ['module'], function(module) { module.exports = "<template>\n  <p class=\"range-field\">\n    <input type=\"range\" min.one-time=\"mdMin\" max.one-time=\"mdMax\" step.one-time=\"mdStep\" value.bind=\"mdValue\" ref=\"input\" />\n  </p>\n</template>\n"; });
define('text!aurelia-materialize-bridge/sidenav/sidenav.css', ['module'], function(module) { module.exports = "md-sidenav li[md-waves] {\n  display: block;\n}\nmd-sidenav li a:hover {\n  background-color: transparent;\n  display: inline-block;\n  width: 100%;\n}\n"; });
define('text!aurelia-materialize-bridge/sidenav/sidenav.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./sidenav.css\"></require>\n  <div id=\"${ controlId }\" class=\"side-nav\" ref=\"sidenav\">\n    <slot></slot>\n  </div>\n</template>\n"; });
define('text!aurelia-materialize-bridge/slider/slider.css', ['module'], function(module) { module.exports = "md-slider {\n  display: block;\n}\n\nmd-slide {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: inherit;\n    overflow: hidden;\n}\n"; });
define('aurelia-materialize-bridge/index',['exports', './autocomplete/autocomplete', './badge/badge', './box/box', './breadcrumbs/breadcrumbs', './breadcrumbs/instructionFilter', './button/button', './card/card', './carousel/carousel-item', './carousel/carousel', './char-counter/char-counter', './checkbox/checkbox', './chip/chip', './chip/chips', './collapsible/collapsible', './collection/collection-header', './collection/collection-item', './collection/collection', './collection/md-collection-selector', './colors/colorValueConverters', './colors/md-colors', './common/attributeManager', './common/attributes', './common/constants', './common/events', './datepicker/datepicker.default-parser', './datepicker/datepicker', './dropdown/dropdown-element', './dropdown/dropdown', './dropdown/dropdown-fix', './fab/fab', './file/file', './footer/footer', './input/input-prefix', './input/input-update-service', './input/input', './modal/modal-trigger', './navbar/navbar', './pagination/pagination', './parallax/parallax', './progress/progress', './pushpin/pushpin', './radio/radio', './range/range', './scrollfire/scrollfire-patch', './scrollfire/scrollfire-target', './scrollfire/scrollfire', './scrollspy/scrollspy', './select/select', './sidenav/sidenav-collapse', './sidenav/sidenav', './slider/slider', './switch/switch', './tabs/tabs', './toast/toastService', './tooltip/tooltip', './transitions/fadein-image', './transitions/staggered-list', './validation/validationRenderer', './waves/waves', './config-builder', './common/polyfills'], function (exports, _autocomplete, _badge, _box, _breadcrumbs, _instructionFilter, _button, _card, _carouselItem, _carousel, _charCounter, _checkbox, _chip, _chips, _collapsible, _collectionHeader, _collectionItem, _collection, _mdCollectionSelector, _colorValueConverters, _mdColors, _attributeManager, _attributes, _constants, _events, _datepicker, _datepicker2, _dropdownElement, _dropdown, _dropdownFix, _fab, _file, _footer, _inputPrefix, _inputUpdateService, _input, _modalTrigger, _navbar, _pagination, _parallax, _progress, _pushpin, _radio, _range, _scrollfirePatch, _scrollfireTarget, _scrollfire, _scrollspy, _select, _sidenavCollapse, _sidenav, _slider, _switch, _tabs, _toastService, _tooltip, _fadeinImage, _staggeredList, _validationRenderer, _waves, _configBuilder, _polyfills) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  Object.keys(_autocomplete).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _autocomplete[key];
      }
    });
  });
  Object.keys(_badge).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _badge[key];
      }
    });
  });
  Object.keys(_box).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _box[key];
      }
    });
  });
  Object.keys(_breadcrumbs).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _breadcrumbs[key];
      }
    });
  });
  Object.keys(_instructionFilter).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _instructionFilter[key];
      }
    });
  });
  Object.keys(_button).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _button[key];
      }
    });
  });
  Object.keys(_card).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _card[key];
      }
    });
  });
  Object.keys(_carouselItem).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _carouselItem[key];
      }
    });
  });
  Object.keys(_carousel).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _carousel[key];
      }
    });
  });
  Object.keys(_charCounter).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _charCounter[key];
      }
    });
  });
  Object.keys(_checkbox).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _checkbox[key];
      }
    });
  });
  Object.keys(_chip).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _chip[key];
      }
    });
  });
  Object.keys(_chips).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _chips[key];
      }
    });
  });
  Object.keys(_collapsible).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _collapsible[key];
      }
    });
  });
  Object.keys(_collectionHeader).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _collectionHeader[key];
      }
    });
  });
  Object.keys(_collectionItem).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _collectionItem[key];
      }
    });
  });
  Object.keys(_collection).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _collection[key];
      }
    });
  });
  Object.keys(_mdCollectionSelector).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _mdCollectionSelector[key];
      }
    });
  });
  Object.keys(_colorValueConverters).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _colorValueConverters[key];
      }
    });
  });
  Object.keys(_mdColors).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _mdColors[key];
      }
    });
  });
  Object.keys(_attributeManager).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _attributeManager[key];
      }
    });
  });
  Object.keys(_attributes).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _attributes[key];
      }
    });
  });
  Object.keys(_constants).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _constants[key];
      }
    });
  });
  Object.keys(_events).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _events[key];
      }
    });
  });
  Object.keys(_datepicker).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _datepicker[key];
      }
    });
  });
  Object.keys(_datepicker2).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _datepicker2[key];
      }
    });
  });
  Object.keys(_dropdownElement).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _dropdownElement[key];
      }
    });
  });
  Object.keys(_dropdown).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _dropdown[key];
      }
    });
  });
  Object.keys(_dropdownFix).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _dropdownFix[key];
      }
    });
  });
  Object.keys(_fab).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _fab[key];
      }
    });
  });
  Object.keys(_file).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _file[key];
      }
    });
  });
  Object.keys(_footer).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _footer[key];
      }
    });
  });
  Object.keys(_inputPrefix).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _inputPrefix[key];
      }
    });
  });
  Object.keys(_inputUpdateService).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _inputUpdateService[key];
      }
    });
  });
  Object.keys(_input).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _input[key];
      }
    });
  });
  Object.keys(_modalTrigger).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _modalTrigger[key];
      }
    });
  });
  Object.keys(_navbar).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _navbar[key];
      }
    });
  });
  Object.keys(_pagination).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _pagination[key];
      }
    });
  });
  Object.keys(_parallax).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _parallax[key];
      }
    });
  });
  Object.keys(_progress).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _progress[key];
      }
    });
  });
  Object.keys(_pushpin).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _pushpin[key];
      }
    });
  });
  Object.keys(_radio).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _radio[key];
      }
    });
  });
  Object.keys(_range).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _range[key];
      }
    });
  });
  Object.keys(_scrollfirePatch).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _scrollfirePatch[key];
      }
    });
  });
  Object.keys(_scrollfireTarget).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _scrollfireTarget[key];
      }
    });
  });
  Object.keys(_scrollfire).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _scrollfire[key];
      }
    });
  });
  Object.keys(_scrollspy).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _scrollspy[key];
      }
    });
  });
  Object.keys(_select).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _select[key];
      }
    });
  });
  Object.keys(_sidenavCollapse).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _sidenavCollapse[key];
      }
    });
  });
  Object.keys(_sidenav).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _sidenav[key];
      }
    });
  });
  Object.keys(_slider).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _slider[key];
      }
    });
  });
  Object.keys(_switch).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _switch[key];
      }
    });
  });
  Object.keys(_tabs).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _tabs[key];
      }
    });
  });
  Object.keys(_toastService).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _toastService[key];
      }
    });
  });
  Object.keys(_tooltip).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _tooltip[key];
      }
    });
  });
  Object.keys(_fadeinImage).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _fadeinImage[key];
      }
    });
  });
  Object.keys(_staggeredList).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _staggeredList[key];
      }
    });
  });
  Object.keys(_validationRenderer).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _validationRenderer[key];
      }
    });
  });
  Object.keys(_waves).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _waves[key];
      }
    });
  });


  function applyPolyfills() {
    (0, _polyfills.polyfillElementClosest)();
  }

  function configure(aurelia, configCallback) {
    applyPolyfills();
    var builder = new _configBuilder.ConfigBuilder();

    if (configCallback !== undefined && typeof configCallback === 'function') {
      configCallback(builder);
    }

    if (builder.useGlobalResources) {
      aurelia.globalResources(builder.globalResources);
    }
    if (builder.useScrollfirePatch) {
      new _scrollfirePatch.ScrollfirePatch().patch();
    }
  }
});;define('aurelia-materialize-bridge', ['aurelia-materialize-bridge/index'], function (main) { return main; });

define('text!materialize-css/css/materialize.css', ['module'], function(module) { module.exports = "/*!\n * Materialize v0.97.7 (http://materializecss.com)\n * Copyright 2014-2015 Materialize\n * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)\n */\n.materialize-red {\n  background-color: #e51c23 !important;\n}\n\n.materialize-red-text {\n  color: #e51c23 !important;\n}\n\n.materialize-red.lighten-5 {\n  background-color: #fdeaeb !important;\n}\n\n.materialize-red-text.text-lighten-5 {\n  color: #fdeaeb !important;\n}\n\n.materialize-red.lighten-4 {\n  background-color: #f8c1c3 !important;\n}\n\n.materialize-red-text.text-lighten-4 {\n  color: #f8c1c3 !important;\n}\n\n.materialize-red.lighten-3 {\n  background-color: #f3989b !important;\n}\n\n.materialize-red-text.text-lighten-3 {\n  color: #f3989b !important;\n}\n\n.materialize-red.lighten-2 {\n  background-color: #ee6e73 !important;\n}\n\n.materialize-red-text.text-lighten-2 {\n  color: #ee6e73 !important;\n}\n\n.materialize-red.lighten-1 {\n  background-color: #ea454b !important;\n}\n\n.materialize-red-text.text-lighten-1 {\n  color: #ea454b !important;\n}\n\n.materialize-red.darken-1 {\n  background-color: #d0181e !important;\n}\n\n.materialize-red-text.text-darken-1 {\n  color: #d0181e !important;\n}\n\n.materialize-red.darken-2 {\n  background-color: #b9151b !important;\n}\n\n.materialize-red-text.text-darken-2 {\n  color: #b9151b !important;\n}\n\n.materialize-red.darken-3 {\n  background-color: #a21318 !important;\n}\n\n.materialize-red-text.text-darken-3 {\n  color: #a21318 !important;\n}\n\n.materialize-red.darken-4 {\n  background-color: #8b1014 !important;\n}\n\n.materialize-red-text.text-darken-4 {\n  color: #8b1014 !important;\n}\n\n.red {\n  background-color: #F44336 !important;\n}\n\n.red-text {\n  color: #F44336 !important;\n}\n\n.red.lighten-5 {\n  background-color: #FFEBEE !important;\n}\n\n.red-text.text-lighten-5 {\n  color: #FFEBEE !important;\n}\n\n.red.lighten-4 {\n  background-color: #FFCDD2 !important;\n}\n\n.red-text.text-lighten-4 {\n  color: #FFCDD2 !important;\n}\n\n.red.lighten-3 {\n  background-color: #EF9A9A !important;\n}\n\n.red-text.text-lighten-3 {\n  color: #EF9A9A !important;\n}\n\n.red.lighten-2 {\n  background-color: #E57373 !important;\n}\n\n.red-text.text-lighten-2 {\n  color: #E57373 !important;\n}\n\n.red.lighten-1 {\n  background-color: #EF5350 !important;\n}\n\n.red-text.text-lighten-1 {\n  color: #EF5350 !important;\n}\n\n.red.darken-1 {\n  background-color: #E53935 !important;\n}\n\n.red-text.text-darken-1 {\n  color: #E53935 !important;\n}\n\n.red.darken-2 {\n  background-color: #D32F2F !important;\n}\n\n.red-text.text-darken-2 {\n  color: #D32F2F !important;\n}\n\n.red.darken-3 {\n  background-color: #C62828 !important;\n}\n\n.red-text.text-darken-3 {\n  color: #C62828 !important;\n}\n\n.red.darken-4 {\n  background-color: #B71C1C !important;\n}\n\n.red-text.text-darken-4 {\n  color: #B71C1C !important;\n}\n\n.red.accent-1 {\n  background-color: #FF8A80 !important;\n}\n\n.red-text.text-accent-1 {\n  color: #FF8A80 !important;\n}\n\n.red.accent-2 {\n  background-color: #FF5252 !important;\n}\n\n.red-text.text-accent-2 {\n  color: #FF5252 !important;\n}\n\n.red.accent-3 {\n  background-color: #FF1744 !important;\n}\n\n.red-text.text-accent-3 {\n  color: #FF1744 !important;\n}\n\n.red.accent-4 {\n  background-color: #D50000 !important;\n}\n\n.red-text.text-accent-4 {\n  color: #D50000 !important;\n}\n\n.pink {\n  background-color: #e91e63 !important;\n}\n\n.pink-text {\n  color: #e91e63 !important;\n}\n\n.pink.lighten-5 {\n  background-color: #fce4ec !important;\n}\n\n.pink-text.text-lighten-5 {\n  color: #fce4ec !important;\n}\n\n.pink.lighten-4 {\n  background-color: #f8bbd0 !important;\n}\n\n.pink-text.text-lighten-4 {\n  color: #f8bbd0 !important;\n}\n\n.pink.lighten-3 {\n  background-color: #f48fb1 !important;\n}\n\n.pink-text.text-lighten-3 {\n  color: #f48fb1 !important;\n}\n\n.pink.lighten-2 {\n  background-color: #f06292 !important;\n}\n\n.pink-text.text-lighten-2 {\n  color: #f06292 !important;\n}\n\n.pink.lighten-1 {\n  background-color: #ec407a !important;\n}\n\n.pink-text.text-lighten-1 {\n  color: #ec407a !important;\n}\n\n.pink.darken-1 {\n  background-color: #d81b60 !important;\n}\n\n.pink-text.text-darken-1 {\n  color: #d81b60 !important;\n}\n\n.pink.darken-2 {\n  background-color: #c2185b !important;\n}\n\n.pink-text.text-darken-2 {\n  color: #c2185b !important;\n}\n\n.pink.darken-3 {\n  background-color: #ad1457 !important;\n}\n\n.pink-text.text-darken-3 {\n  color: #ad1457 !important;\n}\n\n.pink.darken-4 {\n  background-color: #880e4f !important;\n}\n\n.pink-text.text-darken-4 {\n  color: #880e4f !important;\n}\n\n.pink.accent-1 {\n  background-color: #ff80ab !important;\n}\n\n.pink-text.text-accent-1 {\n  color: #ff80ab !important;\n}\n\n.pink.accent-2 {\n  background-color: #ff4081 !important;\n}\n\n.pink-text.text-accent-2 {\n  color: #ff4081 !important;\n}\n\n.pink.accent-3 {\n  background-color: #f50057 !important;\n}\n\n.pink-text.text-accent-3 {\n  color: #f50057 !important;\n}\n\n.pink.accent-4 {\n  background-color: #c51162 !important;\n}\n\n.pink-text.text-accent-4 {\n  color: #c51162 !important;\n}\n\n.purple {\n  background-color: #9c27b0 !important;\n}\n\n.purple-text {\n  color: #9c27b0 !important;\n}\n\n.purple.lighten-5 {\n  background-color: #f3e5f5 !important;\n}\n\n.purple-text.text-lighten-5 {\n  color: #f3e5f5 !important;\n}\n\n.purple.lighten-4 {\n  background-color: #e1bee7 !important;\n}\n\n.purple-text.text-lighten-4 {\n  color: #e1bee7 !important;\n}\n\n.purple.lighten-3 {\n  background-color: #ce93d8 !important;\n}\n\n.purple-text.text-lighten-3 {\n  color: #ce93d8 !important;\n}\n\n.purple.lighten-2 {\n  background-color: #ba68c8 !important;\n}\n\n.purple-text.text-lighten-2 {\n  color: #ba68c8 !important;\n}\n\n.purple.lighten-1 {\n  background-color: #ab47bc !important;\n}\n\n.purple-text.text-lighten-1 {\n  color: #ab47bc !important;\n}\n\n.purple.darken-1 {\n  background-color: #8e24aa !important;\n}\n\n.purple-text.text-darken-1 {\n  color: #8e24aa !important;\n}\n\n.purple.darken-2 {\n  background-color: #7b1fa2 !important;\n}\n\n.purple-text.text-darken-2 {\n  color: #7b1fa2 !important;\n}\n\n.purple.darken-3 {\n  background-color: #6a1b9a !important;\n}\n\n.purple-text.text-darken-3 {\n  color: #6a1b9a !important;\n}\n\n.purple.darken-4 {\n  background-color: #4a148c !important;\n}\n\n.purple-text.text-darken-4 {\n  color: #4a148c !important;\n}\n\n.purple.accent-1 {\n  background-color: #ea80fc !important;\n}\n\n.purple-text.text-accent-1 {\n  color: #ea80fc !important;\n}\n\n.purple.accent-2 {\n  background-color: #e040fb !important;\n}\n\n.purple-text.text-accent-2 {\n  color: #e040fb !important;\n}\n\n.purple.accent-3 {\n  background-color: #d500f9 !important;\n}\n\n.purple-text.text-accent-3 {\n  color: #d500f9 !important;\n}\n\n.purple.accent-4 {\n  background-color: #aa00ff !important;\n}\n\n.purple-text.text-accent-4 {\n  color: #aa00ff !important;\n}\n\n.deep-purple {\n  background-color: #673ab7 !important;\n}\n\n.deep-purple-text {\n  color: #673ab7 !important;\n}\n\n.deep-purple.lighten-5 {\n  background-color: #ede7f6 !important;\n}\n\n.deep-purple-text.text-lighten-5 {\n  color: #ede7f6 !important;\n}\n\n.deep-purple.lighten-4 {\n  background-color: #d1c4e9 !important;\n}\n\n.deep-purple-text.text-lighten-4 {\n  color: #d1c4e9 !important;\n}\n\n.deep-purple.lighten-3 {\n  background-color: #b39ddb !important;\n}\n\n.deep-purple-text.text-lighten-3 {\n  color: #b39ddb !important;\n}\n\n.deep-purple.lighten-2 {\n  background-color: #9575cd !important;\n}\n\n.deep-purple-text.text-lighten-2 {\n  color: #9575cd !important;\n}\n\n.deep-purple.lighten-1 {\n  background-color: #7e57c2 !important;\n}\n\n.deep-purple-text.text-lighten-1 {\n  color: #7e57c2 !important;\n}\n\n.deep-purple.darken-1 {\n  background-color: #5e35b1 !important;\n}\n\n.deep-purple-text.text-darken-1 {\n  color: #5e35b1 !important;\n}\n\n.deep-purple.darken-2 {\n  background-color: #512da8 !important;\n}\n\n.deep-purple-text.text-darken-2 {\n  color: #512da8 !important;\n}\n\n.deep-purple.darken-3 {\n  background-color: #4527a0 !important;\n}\n\n.deep-purple-text.text-darken-3 {\n  color: #4527a0 !important;\n}\n\n.deep-purple.darken-4 {\n  background-color: #311b92 !important;\n}\n\n.deep-purple-text.text-darken-4 {\n  color: #311b92 !important;\n}\n\n.deep-purple.accent-1 {\n  background-color: #b388ff !important;\n}\n\n.deep-purple-text.text-accent-1 {\n  color: #b388ff !important;\n}\n\n.deep-purple.accent-2 {\n  background-color: #7c4dff !important;\n}\n\n.deep-purple-text.text-accent-2 {\n  color: #7c4dff !important;\n}\n\n.deep-purple.accent-3 {\n  background-color: #651fff !important;\n}\n\n.deep-purple-text.text-accent-3 {\n  color: #651fff !important;\n}\n\n.deep-purple.accent-4 {\n  background-color: #6200ea !important;\n}\n\n.deep-purple-text.text-accent-4 {\n  color: #6200ea !important;\n}\n\n.indigo {\n  background-color: #3f51b5 !important;\n}\n\n.indigo-text {\n  color: #3f51b5 !important;\n}\n\n.indigo.lighten-5 {\n  background-color: #e8eaf6 !important;\n}\n\n.indigo-text.text-lighten-5 {\n  color: #e8eaf6 !important;\n}\n\n.indigo.lighten-4 {\n  background-color: #c5cae9 !important;\n}\n\n.indigo-text.text-lighten-4 {\n  color: #c5cae9 !important;\n}\n\n.indigo.lighten-3 {\n  background-color: #9fa8da !important;\n}\n\n.indigo-text.text-lighten-3 {\n  color: #9fa8da !important;\n}\n\n.indigo.lighten-2 {\n  background-color: #7986cb !important;\n}\n\n.indigo-text.text-lighten-2 {\n  color: #7986cb !important;\n}\n\n.indigo.lighten-1 {\n  background-color: #5c6bc0 !important;\n}\n\n.indigo-text.text-lighten-1 {\n  color: #5c6bc0 !important;\n}\n\n.indigo.darken-1 {\n  background-color: #3949ab !important;\n}\n\n.indigo-text.text-darken-1 {\n  color: #3949ab !important;\n}\n\n.indigo.darken-2 {\n  background-color: #303f9f !important;\n}\n\n.indigo-text.text-darken-2 {\n  color: #303f9f !important;\n}\n\n.indigo.darken-3 {\n  background-color: #283593 !important;\n}\n\n.indigo-text.text-darken-3 {\n  color: #283593 !important;\n}\n\n.indigo.darken-4 {\n  background-color: #1a237e !important;\n}\n\n.indigo-text.text-darken-4 {\n  color: #1a237e !important;\n}\n\n.indigo.accent-1 {\n  background-color: #8c9eff !important;\n}\n\n.indigo-text.text-accent-1 {\n  color: #8c9eff !important;\n}\n\n.indigo.accent-2 {\n  background-color: #536dfe !important;\n}\n\n.indigo-text.text-accent-2 {\n  color: #536dfe !important;\n}\n\n.indigo.accent-3 {\n  background-color: #3d5afe !important;\n}\n\n.indigo-text.text-accent-3 {\n  color: #3d5afe !important;\n}\n\n.indigo.accent-4 {\n  background-color: #304ffe !important;\n}\n\n.indigo-text.text-accent-4 {\n  color: #304ffe !important;\n}\n\n.blue {\n  background-color: #2196F3 !important;\n}\n\n.blue-text {\n  color: #2196F3 !important;\n}\n\n.blue.lighten-5 {\n  background-color: #E3F2FD !important;\n}\n\n.blue-text.text-lighten-5 {\n  color: #E3F2FD !important;\n}\n\n.blue.lighten-4 {\n  background-color: #BBDEFB !important;\n}\n\n.blue-text.text-lighten-4 {\n  color: #BBDEFB !important;\n}\n\n.blue.lighten-3 {\n  background-color: #90CAF9 !important;\n}\n\n.blue-text.text-lighten-3 {\n  color: #90CAF9 !important;\n}\n\n.blue.lighten-2 {\n  background-color: #64B5F6 !important;\n}\n\n.blue-text.text-lighten-2 {\n  color: #64B5F6 !important;\n}\n\n.blue.lighten-1 {\n  background-color: #42A5F5 !important;\n}\n\n.blue-text.text-lighten-1 {\n  color: #42A5F5 !important;\n}\n\n.blue.darken-1 {\n  background-color: #1E88E5 !important;\n}\n\n.blue-text.text-darken-1 {\n  color: #1E88E5 !important;\n}\n\n.blue.darken-2 {\n  background-color: #1976D2 !important;\n}\n\n.blue-text.text-darken-2 {\n  color: #1976D2 !important;\n}\n\n.blue.darken-3 {\n  background-color: #1565C0 !important;\n}\n\n.blue-text.text-darken-3 {\n  color: #1565C0 !important;\n}\n\n.blue.darken-4 {\n  background-color: #0D47A1 !important;\n}\n\n.blue-text.text-darken-4 {\n  color: #0D47A1 !important;\n}\n\n.blue.accent-1 {\n  background-color: #82B1FF !important;\n}\n\n.blue-text.text-accent-1 {\n  color: #82B1FF !important;\n}\n\n.blue.accent-2 {\n  background-color: #448AFF !important;\n}\n\n.blue-text.text-accent-2 {\n  color: #448AFF !important;\n}\n\n.blue.accent-3 {\n  background-color: #2979FF !important;\n}\n\n.blue-text.text-accent-3 {\n  color: #2979FF !important;\n}\n\n.blue.accent-4 {\n  background-color: #2962FF !important;\n}\n\n.blue-text.text-accent-4 {\n  color: #2962FF !important;\n}\n\n.light-blue {\n  background-color: #03a9f4 !important;\n}\n\n.light-blue-text {\n  color: #03a9f4 !important;\n}\n\n.light-blue.lighten-5 {\n  background-color: #e1f5fe !important;\n}\n\n.light-blue-text.text-lighten-5 {\n  color: #e1f5fe !important;\n}\n\n.light-blue.lighten-4 {\n  background-color: #b3e5fc !important;\n}\n\n.light-blue-text.text-lighten-4 {\n  color: #b3e5fc !important;\n}\n\n.light-blue.lighten-3 {\n  background-color: #81d4fa !important;\n}\n\n.light-blue-text.text-lighten-3 {\n  color: #81d4fa !important;\n}\n\n.light-blue.lighten-2 {\n  background-color: #4fc3f7 !important;\n}\n\n.light-blue-text.text-lighten-2 {\n  color: #4fc3f7 !important;\n}\n\n.light-blue.lighten-1 {\n  background-color: #29b6f6 !important;\n}\n\n.light-blue-text.text-lighten-1 {\n  color: #29b6f6 !important;\n}\n\n.light-blue.darken-1 {\n  background-color: #039be5 !important;\n}\n\n.light-blue-text.text-darken-1 {\n  color: #039be5 !important;\n}\n\n.light-blue.darken-2 {\n  background-color: #0288d1 !important;\n}\n\n.light-blue-text.text-darken-2 {\n  color: #0288d1 !important;\n}\n\n.light-blue.darken-3 {\n  background-color: #0277bd !important;\n}\n\n.light-blue-text.text-darken-3 {\n  color: #0277bd !important;\n}\n\n.light-blue.darken-4 {\n  background-color: #01579b !important;\n}\n\n.light-blue-text.text-darken-4 {\n  color: #01579b !important;\n}\n\n.light-blue.accent-1 {\n  background-color: #80d8ff !important;\n}\n\n.light-blue-text.text-accent-1 {\n  color: #80d8ff !important;\n}\n\n.light-blue.accent-2 {\n  background-color: #40c4ff !important;\n}\n\n.light-blue-text.text-accent-2 {\n  color: #40c4ff !important;\n}\n\n.light-blue.accent-3 {\n  background-color: #00b0ff !important;\n}\n\n.light-blue-text.text-accent-3 {\n  color: #00b0ff !important;\n}\n\n.light-blue.accent-4 {\n  background-color: #0091ea !important;\n}\n\n.light-blue-text.text-accent-4 {\n  color: #0091ea !important;\n}\n\n.cyan {\n  background-color: #00bcd4 !important;\n}\n\n.cyan-text {\n  color: #00bcd4 !important;\n}\n\n.cyan.lighten-5 {\n  background-color: #e0f7fa !important;\n}\n\n.cyan-text.text-lighten-5 {\n  color: #e0f7fa !important;\n}\n\n.cyan.lighten-4 {\n  background-color: #b2ebf2 !important;\n}\n\n.cyan-text.text-lighten-4 {\n  color: #b2ebf2 !important;\n}\n\n.cyan.lighten-3 {\n  background-color: #80deea !important;\n}\n\n.cyan-text.text-lighten-3 {\n  color: #80deea !important;\n}\n\n.cyan.lighten-2 {\n  background-color: #4dd0e1 !important;\n}\n\n.cyan-text.text-lighten-2 {\n  color: #4dd0e1 !important;\n}\n\n.cyan.lighten-1 {\n  background-color: #26c6da !important;\n}\n\n.cyan-text.text-lighten-1 {\n  color: #26c6da !important;\n}\n\n.cyan.darken-1 {\n  background-color: #00acc1 !important;\n}\n\n.cyan-text.text-darken-1 {\n  color: #00acc1 !important;\n}\n\n.cyan.darken-2 {\n  background-color: #0097a7 !important;\n}\n\n.cyan-text.text-darken-2 {\n  color: #0097a7 !important;\n}\n\n.cyan.darken-3 {\n  background-color: #00838f !important;\n}\n\n.cyan-text.text-darken-3 {\n  color: #00838f !important;\n}\n\n.cyan.darken-4 {\n  background-color: #006064 !important;\n}\n\n.cyan-text.text-darken-4 {\n  color: #006064 !important;\n}\n\n.cyan.accent-1 {\n  background-color: #84ffff !important;\n}\n\n.cyan-text.text-accent-1 {\n  color: #84ffff !important;\n}\n\n.cyan.accent-2 {\n  background-color: #18ffff !important;\n}\n\n.cyan-text.text-accent-2 {\n  color: #18ffff !important;\n}\n\n.cyan.accent-3 {\n  background-color: #00e5ff !important;\n}\n\n.cyan-text.text-accent-3 {\n  color: #00e5ff !important;\n}\n\n.cyan.accent-4 {\n  background-color: #00b8d4 !important;\n}\n\n.cyan-text.text-accent-4 {\n  color: #00b8d4 !important;\n}\n\n.teal {\n  background-color: #009688 !important;\n}\n\n.teal-text {\n  color: #009688 !important;\n}\n\n.teal.lighten-5 {\n  background-color: #e0f2f1 !important;\n}\n\n.teal-text.text-lighten-5 {\n  color: #e0f2f1 !important;\n}\n\n.teal.lighten-4 {\n  background-color: #b2dfdb !important;\n}\n\n.teal-text.text-lighten-4 {\n  color: #b2dfdb !important;\n}\n\n.teal.lighten-3 {\n  background-color: #80cbc4 !important;\n}\n\n.teal-text.text-lighten-3 {\n  color: #80cbc4 !important;\n}\n\n.teal.lighten-2 {\n  background-color: #4db6ac !important;\n}\n\n.teal-text.text-lighten-2 {\n  color: #4db6ac !important;\n}\n\n.teal.lighten-1 {\n  background-color: #26a69a !important;\n}\n\n.teal-text.text-lighten-1 {\n  color: #26a69a !important;\n}\n\n.teal.darken-1 {\n  background-color: #00897b !important;\n}\n\n.teal-text.text-darken-1 {\n  color: #00897b !important;\n}\n\n.teal.darken-2 {\n  background-color: #00796b !important;\n}\n\n.teal-text.text-darken-2 {\n  color: #00796b !important;\n}\n\n.teal.darken-3 {\n  background-color: #00695c !important;\n}\n\n.teal-text.text-darken-3 {\n  color: #00695c !important;\n}\n\n.teal.darken-4 {\n  background-color: #004d40 !important;\n}\n\n.teal-text.text-darken-4 {\n  color: #004d40 !important;\n}\n\n.teal.accent-1 {\n  background-color: #a7ffeb !important;\n}\n\n.teal-text.text-accent-1 {\n  color: #a7ffeb !important;\n}\n\n.teal.accent-2 {\n  background-color: #64ffda !important;\n}\n\n.teal-text.text-accent-2 {\n  color: #64ffda !important;\n}\n\n.teal.accent-3 {\n  background-color: #1de9b6 !important;\n}\n\n.teal-text.text-accent-3 {\n  color: #1de9b6 !important;\n}\n\n.teal.accent-4 {\n  background-color: #00bfa5 !important;\n}\n\n.teal-text.text-accent-4 {\n  color: #00bfa5 !important;\n}\n\n.green {\n  background-color: #4CAF50 !important;\n}\n\n.green-text {\n  color: #4CAF50 !important;\n}\n\n.green.lighten-5 {\n  background-color: #E8F5E9 !important;\n}\n\n.green-text.text-lighten-5 {\n  color: #E8F5E9 !important;\n}\n\n.green.lighten-4 {\n  background-color: #C8E6C9 !important;\n}\n\n.green-text.text-lighten-4 {\n  color: #C8E6C9 !important;\n}\n\n.green.lighten-3 {\n  background-color: #A5D6A7 !important;\n}\n\n.green-text.text-lighten-3 {\n  color: #A5D6A7 !important;\n}\n\n.green.lighten-2 {\n  background-color: #81C784 !important;\n}\n\n.green-text.text-lighten-2 {\n  color: #81C784 !important;\n}\n\n.green.lighten-1 {\n  background-color: #66BB6A !important;\n}\n\n.green-text.text-lighten-1 {\n  color: #66BB6A !important;\n}\n\n.green.darken-1 {\n  background-color: #43A047 !important;\n}\n\n.green-text.text-darken-1 {\n  color: #43A047 !important;\n}\n\n.green.darken-2 {\n  background-color: #388E3C !important;\n}\n\n.green-text.text-darken-2 {\n  color: #388E3C !important;\n}\n\n.green.darken-3 {\n  background-color: #2E7D32 !important;\n}\n\n.green-text.text-darken-3 {\n  color: #2E7D32 !important;\n}\n\n.green.darken-4 {\n  background-color: #1B5E20 !important;\n}\n\n.green-text.text-darken-4 {\n  color: #1B5E20 !important;\n}\n\n.green.accent-1 {\n  background-color: #B9F6CA !important;\n}\n\n.green-text.text-accent-1 {\n  color: #B9F6CA !important;\n}\n\n.green.accent-2 {\n  background-color: #69F0AE !important;\n}\n\n.green-text.text-accent-2 {\n  color: #69F0AE !important;\n}\n\n.green.accent-3 {\n  background-color: #00E676 !important;\n}\n\n.green-text.text-accent-3 {\n  color: #00E676 !important;\n}\n\n.green.accent-4 {\n  background-color: #00C853 !important;\n}\n\n.green-text.text-accent-4 {\n  color: #00C853 !important;\n}\n\n.light-green {\n  background-color: #8bc34a !important;\n}\n\n.light-green-text {\n  color: #8bc34a !important;\n}\n\n.light-green.lighten-5 {\n  background-color: #f1f8e9 !important;\n}\n\n.light-green-text.text-lighten-5 {\n  color: #f1f8e9 !important;\n}\n\n.light-green.lighten-4 {\n  background-color: #dcedc8 !important;\n}\n\n.light-green-text.text-lighten-4 {\n  color: #dcedc8 !important;\n}\n\n.light-green.lighten-3 {\n  background-color: #c5e1a5 !important;\n}\n\n.light-green-text.text-lighten-3 {\n  color: #c5e1a5 !important;\n}\n\n.light-green.lighten-2 {\n  background-color: #aed581 !important;\n}\n\n.light-green-text.text-lighten-2 {\n  color: #aed581 !important;\n}\n\n.light-green.lighten-1 {\n  background-color: #9ccc65 !important;\n}\n\n.light-green-text.text-lighten-1 {\n  color: #9ccc65 !important;\n}\n\n.light-green.darken-1 {\n  background-color: #7cb342 !important;\n}\n\n.light-green-text.text-darken-1 {\n  color: #7cb342 !important;\n}\n\n.light-green.darken-2 {\n  background-color: #689f38 !important;\n}\n\n.light-green-text.text-darken-2 {\n  color: #689f38 !important;\n}\n\n.light-green.darken-3 {\n  background-color: #558b2f !important;\n}\n\n.light-green-text.text-darken-3 {\n  color: #558b2f !important;\n}\n\n.light-green.darken-4 {\n  background-color: #33691e !important;\n}\n\n.light-green-text.text-darken-4 {\n  color: #33691e !important;\n}\n\n.light-green.accent-1 {\n  background-color: #ccff90 !important;\n}\n\n.light-green-text.text-accent-1 {\n  color: #ccff90 !important;\n}\n\n.light-green.accent-2 {\n  background-color: #b2ff59 !important;\n}\n\n.light-green-text.text-accent-2 {\n  color: #b2ff59 !important;\n}\n\n.light-green.accent-3 {\n  background-color: #76ff03 !important;\n}\n\n.light-green-text.text-accent-3 {\n  color: #76ff03 !important;\n}\n\n.light-green.accent-4 {\n  background-color: #64dd17 !important;\n}\n\n.light-green-text.text-accent-4 {\n  color: #64dd17 !important;\n}\n\n.lime {\n  background-color: #cddc39 !important;\n}\n\n.lime-text {\n  color: #cddc39 !important;\n}\n\n.lime.lighten-5 {\n  background-color: #f9fbe7 !important;\n}\n\n.lime-text.text-lighten-5 {\n  color: #f9fbe7 !important;\n}\n\n.lime.lighten-4 {\n  background-color: #f0f4c3 !important;\n}\n\n.lime-text.text-lighten-4 {\n  color: #f0f4c3 !important;\n}\n\n.lime.lighten-3 {\n  background-color: #e6ee9c !important;\n}\n\n.lime-text.text-lighten-3 {\n  color: #e6ee9c !important;\n}\n\n.lime.lighten-2 {\n  background-color: #dce775 !important;\n}\n\n.lime-text.text-lighten-2 {\n  color: #dce775 !important;\n}\n\n.lime.lighten-1 {\n  background-color: #d4e157 !important;\n}\n\n.lime-text.text-lighten-1 {\n  color: #d4e157 !important;\n}\n\n.lime.darken-1 {\n  background-color: #c0ca33 !important;\n}\n\n.lime-text.text-darken-1 {\n  color: #c0ca33 !important;\n}\n\n.lime.darken-2 {\n  background-color: #afb42b !important;\n}\n\n.lime-text.text-darken-2 {\n  color: #afb42b !important;\n}\n\n.lime.darken-3 {\n  background-color: #9e9d24 !important;\n}\n\n.lime-text.text-darken-3 {\n  color: #9e9d24 !important;\n}\n\n.lime.darken-4 {\n  background-color: #827717 !important;\n}\n\n.lime-text.text-darken-4 {\n  color: #827717 !important;\n}\n\n.lime.accent-1 {\n  background-color: #f4ff81 !important;\n}\n\n.lime-text.text-accent-1 {\n  color: #f4ff81 !important;\n}\n\n.lime.accent-2 {\n  background-color: #eeff41 !important;\n}\n\n.lime-text.text-accent-2 {\n  color: #eeff41 !important;\n}\n\n.lime.accent-3 {\n  background-color: #c6ff00 !important;\n}\n\n.lime-text.text-accent-3 {\n  color: #c6ff00 !important;\n}\n\n.lime.accent-4 {\n  background-color: #aeea00 !important;\n}\n\n.lime-text.text-accent-4 {\n  color: #aeea00 !important;\n}\n\n.yellow {\n  background-color: #ffeb3b !important;\n}\n\n.yellow-text {\n  color: #ffeb3b !important;\n}\n\n.yellow.lighten-5 {\n  background-color: #fffde7 !important;\n}\n\n.yellow-text.text-lighten-5 {\n  color: #fffde7 !important;\n}\n\n.yellow.lighten-4 {\n  background-color: #fff9c4 !important;\n}\n\n.yellow-text.text-lighten-4 {\n  color: #fff9c4 !important;\n}\n\n.yellow.lighten-3 {\n  background-color: #fff59d !important;\n}\n\n.yellow-text.text-lighten-3 {\n  color: #fff59d !important;\n}\n\n.yellow.lighten-2 {\n  background-color: #fff176 !important;\n}\n\n.yellow-text.text-lighten-2 {\n  color: #fff176 !important;\n}\n\n.yellow.lighten-1 {\n  background-color: #ffee58 !important;\n}\n\n.yellow-text.text-lighten-1 {\n  color: #ffee58 !important;\n}\n\n.yellow.darken-1 {\n  background-color: #fdd835 !important;\n}\n\n.yellow-text.text-darken-1 {\n  color: #fdd835 !important;\n}\n\n.yellow.darken-2 {\n  background-color: #fbc02d !important;\n}\n\n.yellow-text.text-darken-2 {\n  color: #fbc02d !important;\n}\n\n.yellow.darken-3 {\n  background-color: #f9a825 !important;\n}\n\n.yellow-text.text-darken-3 {\n  color: #f9a825 !important;\n}\n\n.yellow.darken-4 {\n  background-color: #f57f17 !important;\n}\n\n.yellow-text.text-darken-4 {\n  color: #f57f17 !important;\n}\n\n.yellow.accent-1 {\n  background-color: #ffff8d !important;\n}\n\n.yellow-text.text-accent-1 {\n  color: #ffff8d !important;\n}\n\n.yellow.accent-2 {\n  background-color: #ffff00 !important;\n}\n\n.yellow-text.text-accent-2 {\n  color: #ffff00 !important;\n}\n\n.yellow.accent-3 {\n  background-color: #ffea00 !important;\n}\n\n.yellow-text.text-accent-3 {\n  color: #ffea00 !important;\n}\n\n.yellow.accent-4 {\n  background-color: #ffd600 !important;\n}\n\n.yellow-text.text-accent-4 {\n  color: #ffd600 !important;\n}\n\n.amber {\n  background-color: #ffc107 !important;\n}\n\n.amber-text {\n  color: #ffc107 !important;\n}\n\n.amber.lighten-5 {\n  background-color: #fff8e1 !important;\n}\n\n.amber-text.text-lighten-5 {\n  color: #fff8e1 !important;\n}\n\n.amber.lighten-4 {\n  background-color: #ffecb3 !important;\n}\n\n.amber-text.text-lighten-4 {\n  color: #ffecb3 !important;\n}\n\n.amber.lighten-3 {\n  background-color: #ffe082 !important;\n}\n\n.amber-text.text-lighten-3 {\n  color: #ffe082 !important;\n}\n\n.amber.lighten-2 {\n  background-color: #ffd54f !important;\n}\n\n.amber-text.text-lighten-2 {\n  color: #ffd54f !important;\n}\n\n.amber.lighten-1 {\n  background-color: #ffca28 !important;\n}\n\n.amber-text.text-lighten-1 {\n  color: #ffca28 !important;\n}\n\n.amber.darken-1 {\n  background-color: #ffb300 !important;\n}\n\n.amber-text.text-darken-1 {\n  color: #ffb300 !important;\n}\n\n.amber.darken-2 {\n  background-color: #ffa000 !important;\n}\n\n.amber-text.text-darken-2 {\n  color: #ffa000 !important;\n}\n\n.amber.darken-3 {\n  background-color: #ff8f00 !important;\n}\n\n.amber-text.text-darken-3 {\n  color: #ff8f00 !important;\n}\n\n.amber.darken-4 {\n  background-color: #ff6f00 !important;\n}\n\n.amber-text.text-darken-4 {\n  color: #ff6f00 !important;\n}\n\n.amber.accent-1 {\n  background-color: #ffe57f !important;\n}\n\n.amber-text.text-accent-1 {\n  color: #ffe57f !important;\n}\n\n.amber.accent-2 {\n  background-color: #ffd740 !important;\n}\n\n.amber-text.text-accent-2 {\n  color: #ffd740 !important;\n}\n\n.amber.accent-3 {\n  background-color: #ffc400 !important;\n}\n\n.amber-text.text-accent-3 {\n  color: #ffc400 !important;\n}\n\n.amber.accent-4 {\n  background-color: #ffab00 !important;\n}\n\n.amber-text.text-accent-4 {\n  color: #ffab00 !important;\n}\n\n.orange {\n  background-color: #ff9800 !important;\n}\n\n.orange-text {\n  color: #ff9800 !important;\n}\n\n.orange.lighten-5 {\n  background-color: #fff3e0 !important;\n}\n\n.orange-text.text-lighten-5 {\n  color: #fff3e0 !important;\n}\n\n.orange.lighten-4 {\n  background-color: #ffe0b2 !important;\n}\n\n.orange-text.text-lighten-4 {\n  color: #ffe0b2 !important;\n}\n\n.orange.lighten-3 {\n  background-color: #ffcc80 !important;\n}\n\n.orange-text.text-lighten-3 {\n  color: #ffcc80 !important;\n}\n\n.orange.lighten-2 {\n  background-color: #ffb74d !important;\n}\n\n.orange-text.text-lighten-2 {\n  color: #ffb74d !important;\n}\n\n.orange.lighten-1 {\n  background-color: #ffa726 !important;\n}\n\n.orange-text.text-lighten-1 {\n  color: #ffa726 !important;\n}\n\n.orange.darken-1 {\n  background-color: #fb8c00 !important;\n}\n\n.orange-text.text-darken-1 {\n  color: #fb8c00 !important;\n}\n\n.orange.darken-2 {\n  background-color: #f57c00 !important;\n}\n\n.orange-text.text-darken-2 {\n  color: #f57c00 !important;\n}\n\n.orange.darken-3 {\n  background-color: #ef6c00 !important;\n}\n\n.orange-text.text-darken-3 {\n  color: #ef6c00 !important;\n}\n\n.orange.darken-4 {\n  background-color: #e65100 !important;\n}\n\n.orange-text.text-darken-4 {\n  color: #e65100 !important;\n}\n\n.orange.accent-1 {\n  background-color: #ffd180 !important;\n}\n\n.orange-text.text-accent-1 {\n  color: #ffd180 !important;\n}\n\n.orange.accent-2 {\n  background-color: #ffab40 !important;\n}\n\n.orange-text.text-accent-2 {\n  color: #ffab40 !important;\n}\n\n.orange.accent-3 {\n  background-color: #ff9100 !important;\n}\n\n.orange-text.text-accent-3 {\n  color: #ff9100 !important;\n}\n\n.orange.accent-4 {\n  background-color: #ff6d00 !important;\n}\n\n.orange-text.text-accent-4 {\n  color: #ff6d00 !important;\n}\n\n.deep-orange {\n  background-color: #ff5722 !important;\n}\n\n.deep-orange-text {\n  color: #ff5722 !important;\n}\n\n.deep-orange.lighten-5 {\n  background-color: #fbe9e7 !important;\n}\n\n.deep-orange-text.text-lighten-5 {\n  color: #fbe9e7 !important;\n}\n\n.deep-orange.lighten-4 {\n  background-color: #ffccbc !important;\n}\n\n.deep-orange-text.text-lighten-4 {\n  color: #ffccbc !important;\n}\n\n.deep-orange.lighten-3 {\n  background-color: #ffab91 !important;\n}\n\n.deep-orange-text.text-lighten-3 {\n  color: #ffab91 !important;\n}\n\n.deep-orange.lighten-2 {\n  background-color: #ff8a65 !important;\n}\n\n.deep-orange-text.text-lighten-2 {\n  color: #ff8a65 !important;\n}\n\n.deep-orange.lighten-1 {\n  background-color: #ff7043 !important;\n}\n\n.deep-orange-text.text-lighten-1 {\n  color: #ff7043 !important;\n}\n\n.deep-orange.darken-1 {\n  background-color: #f4511e !important;\n}\n\n.deep-orange-text.text-darken-1 {\n  color: #f4511e !important;\n}\n\n.deep-orange.darken-2 {\n  background-color: #e64a19 !important;\n}\n\n.deep-orange-text.text-darken-2 {\n  color: #e64a19 !important;\n}\n\n.deep-orange.darken-3 {\n  background-color: #d84315 !important;\n}\n\n.deep-orange-text.text-darken-3 {\n  color: #d84315 !important;\n}\n\n.deep-orange.darken-4 {\n  background-color: #bf360c !important;\n}\n\n.deep-orange-text.text-darken-4 {\n  color: #bf360c !important;\n}\n\n.deep-orange.accent-1 {\n  background-color: #ff9e80 !important;\n}\n\n.deep-orange-text.text-accent-1 {\n  color: #ff9e80 !important;\n}\n\n.deep-orange.accent-2 {\n  background-color: #ff6e40 !important;\n}\n\n.deep-orange-text.text-accent-2 {\n  color: #ff6e40 !important;\n}\n\n.deep-orange.accent-3 {\n  background-color: #ff3d00 !important;\n}\n\n.deep-orange-text.text-accent-3 {\n  color: #ff3d00 !important;\n}\n\n.deep-orange.accent-4 {\n  background-color: #dd2c00 !important;\n}\n\n.deep-orange-text.text-accent-4 {\n  color: #dd2c00 !important;\n}\n\n.brown {\n  background-color: #795548 !important;\n}\n\n.brown-text {\n  color: #795548 !important;\n}\n\n.brown.lighten-5 {\n  background-color: #efebe9 !important;\n}\n\n.brown-text.text-lighten-5 {\n  color: #efebe9 !important;\n}\n\n.brown.lighten-4 {\n  background-color: #d7ccc8 !important;\n}\n\n.brown-text.text-lighten-4 {\n  color: #d7ccc8 !important;\n}\n\n.brown.lighten-3 {\n  background-color: #bcaaa4 !important;\n}\n\n.brown-text.text-lighten-3 {\n  color: #bcaaa4 !important;\n}\n\n.brown.lighten-2 {\n  background-color: #a1887f !important;\n}\n\n.brown-text.text-lighten-2 {\n  color: #a1887f !important;\n}\n\n.brown.lighten-1 {\n  background-color: #8d6e63 !important;\n}\n\n.brown-text.text-lighten-1 {\n  color: #8d6e63 !important;\n}\n\n.brown.darken-1 {\n  background-color: #6d4c41 !important;\n}\n\n.brown-text.text-darken-1 {\n  color: #6d4c41 !important;\n}\n\n.brown.darken-2 {\n  background-color: #5d4037 !important;\n}\n\n.brown-text.text-darken-2 {\n  color: #5d4037 !important;\n}\n\n.brown.darken-3 {\n  background-color: #4e342e !important;\n}\n\n.brown-text.text-darken-3 {\n  color: #4e342e !important;\n}\n\n.brown.darken-4 {\n  background-color: #3e2723 !important;\n}\n\n.brown-text.text-darken-4 {\n  color: #3e2723 !important;\n}\n\n.blue-grey {\n  background-color: #607d8b !important;\n}\n\n.blue-grey-text {\n  color: #607d8b !important;\n}\n\n.blue-grey.lighten-5 {\n  background-color: #eceff1 !important;\n}\n\n.blue-grey-text.text-lighten-5 {\n  color: #eceff1 !important;\n}\n\n.blue-grey.lighten-4 {\n  background-color: #cfd8dc !important;\n}\n\n.blue-grey-text.text-lighten-4 {\n  color: #cfd8dc !important;\n}\n\n.blue-grey.lighten-3 {\n  background-color: #b0bec5 !important;\n}\n\n.blue-grey-text.text-lighten-3 {\n  color: #b0bec5 !important;\n}\n\n.blue-grey.lighten-2 {\n  background-color: #90a4ae !important;\n}\n\n.blue-grey-text.text-lighten-2 {\n  color: #90a4ae !important;\n}\n\n.blue-grey.lighten-1 {\n  background-color: #78909c !important;\n}\n\n.blue-grey-text.text-lighten-1 {\n  color: #78909c !important;\n}\n\n.blue-grey.darken-1 {\n  background-color: #546e7a !important;\n}\n\n.blue-grey-text.text-darken-1 {\n  color: #546e7a !important;\n}\n\n.blue-grey.darken-2 {\n  background-color: #455a64 !important;\n}\n\n.blue-grey-text.text-darken-2 {\n  color: #455a64 !important;\n}\n\n.blue-grey.darken-3 {\n  background-color: #37474f !important;\n}\n\n.blue-grey-text.text-darken-3 {\n  color: #37474f !important;\n}\n\n.blue-grey.darken-4 {\n  background-color: #263238 !important;\n}\n\n.blue-grey-text.text-darken-4 {\n  color: #263238 !important;\n}\n\n.grey {\n  background-color: #9e9e9e !important;\n}\n\n.grey-text {\n  color: #9e9e9e !important;\n}\n\n.grey.lighten-5 {\n  background-color: #fafafa !important;\n}\n\n.grey-text.text-lighten-5 {\n  color: #fafafa !important;\n}\n\n.grey.lighten-4 {\n  background-color: #f5f5f5 !important;\n}\n\n.grey-text.text-lighten-4 {\n  color: #f5f5f5 !important;\n}\n\n.grey.lighten-3 {\n  background-color: #eeeeee !important;\n}\n\n.grey-text.text-lighten-3 {\n  color: #eeeeee !important;\n}\n\n.grey.lighten-2 {\n  background-color: #e0e0e0 !important;\n}\n\n.grey-text.text-lighten-2 {\n  color: #e0e0e0 !important;\n}\n\n.grey.lighten-1 {\n  background-color: #bdbdbd !important;\n}\n\n.grey-text.text-lighten-1 {\n  color: #bdbdbd !important;\n}\n\n.grey.darken-1 {\n  background-color: #757575 !important;\n}\n\n.grey-text.text-darken-1 {\n  color: #757575 !important;\n}\n\n.grey.darken-2 {\n  background-color: #616161 !important;\n}\n\n.grey-text.text-darken-2 {\n  color: #616161 !important;\n}\n\n.grey.darken-3 {\n  background-color: #424242 !important;\n}\n\n.grey-text.text-darken-3 {\n  color: #424242 !important;\n}\n\n.grey.darken-4 {\n  background-color: #212121 !important;\n}\n\n.grey-text.text-darken-4 {\n  color: #212121 !important;\n}\n\n.black {\n  background-color: #000000 !important;\n}\n\n.black-text {\n  color: #000000 !important;\n}\n\n.white {\n  background-color: #FFFFFF !important;\n}\n\n.white-text {\n  color: #FFFFFF !important;\n}\n\n.transparent {\n  background-color: transparent !important;\n}\n\n.transparent-text {\n  color: transparent !important;\n}\n\n/* ==========================================================================\n   Materialize variables\n   ========================================================================== */\n/**\n * Table of Contents:\n *\n *  1. Colors\n *  2. Badges\n *  3. Buttons\n *  4. Cards\n *  5. Collapsible\n *  6. Chips\n *  7. Date Picker\n *  8. Dropdown\n *  10. Forms\n *  11. Global\n *  12. Grid\n *  13. Navigation Bar\n *  14. Side Navigation\n *  15. Photo Slider\n *  16. Spinners | Loaders\n *  17. Tabs\n *  18. Tables\n *  19. Toasts\n *  20. Typography\n *  21. Footer\n *  22. Flow Text\n *  23. Collections\n *  24. Progress Bar\n */\n/* 1. Colors\n   ========================================================================== */\n/* 2. Badges\n   ========================================================================== */\n/* 3. Buttons\n   ========================================================================== */\n/* 4. Cards\n   ========================================================================== */\n/* 5. Collapsible\n   ========================================================================== */\n/* 6. Chips\n   ========================================================================== */\n/* 7. Date Picker\n   ========================================================================== */\n/* 8. Dropdown\n   ========================================================================== */\n/* 9. Fonts\n   ========================================================================== */\n/* 10. Forms\n   ========================================================================== */\n/* 11. Global\n   ========================================================================== */\n/* 12. Grid\n   ========================================================================== */\n/* 13. Navigation Bar\n   ========================================================================== */\n/* 14. Side Navigation\n   ========================================================================== */\n/* 15. Photo Slider\n   ========================================================================== */\n/* 16. Spinners | Loaders\n   ========================================================================== */\n/* 17. Tabs\n   ========================================================================== */\n/* 18. Tables\n   ========================================================================== */\n/* 19. Toasts\n   ========================================================================== */\n/* 20. Typography\n   ========================================================================== */\n/* 21. Footer\n   ========================================================================== */\n/* 22. Flow Text\n   ========================================================================== */\n/* 23. Collections\n   ========================================================================== */\n/* 24. Progress Bar\n   ========================================================================== */\n/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS and IE text size adjust after device orientation change,\n *    without disabling user zoom.\n */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n}\n\n/**\n * Remove default margin.\n */\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n/**\n * Correct `block` display not defined for any HTML5 element in IE 8/9.\n * Correct `block` display not defined for `details` or `summary` in IE 10/11\n * and Firefox.\n * Correct `block` display not defined for `main` in IE 11.\n */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block;\n}\n\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Address `[hidden]` styling not present in IE 8/9/10.\n * Hide the `template` element in IE 8/9/10/11, Safari, and Firefox < 22.\n */\n[hidden],\ntemplate {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n/**\n * Remove the gray background color from active links in IE 10.\n */\na {\n  background-color: transparent;\n}\n\n/**\n * Improve readability of focused elements when they are also in an\n * active/hover state.\n */\na:active,\na:hover {\n  outline: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * Address styling not present in IE 8/9/10/11, Safari, and Chrome.\n */\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.\n */\nb,\nstrong {\n  font-weight: bold;\n}\n\n/**\n * Address styling not present in Safari and Chrome.\n */\ndfn {\n  font-style: italic;\n}\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari, and Chrome.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Address styling not present in IE 8/9.\n */\nmark {\n  background: #ff0;\n  color: #000;\n}\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsup {\n  top: -0.5em;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove border when inside `a` element in IE 8/9/10.\n */\nimg {\n  border: 0;\n}\n\n/**\n * Correct overflow not hidden in IE 9/10/11.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n/**\n * Address margin not present in IE 8/9 and Safari.\n */\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * Address differences between Firefox and other browsers.\n */\nhr {\n  box-sizing: content-box;\n  height: 0;\n}\n\n/**\n * Contain overflow in all browsers.\n */\npre {\n  overflow: auto;\n}\n\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\n/* Forms\n   ========================================================================== */\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n  margin: 0;\n  /* 3 */\n}\n\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10/11.\n */\nbutton {\n  overflow: visible;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.\n * Correct `select` style inheritance in Firefox.\n */\nbutton,\nselect {\n  text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n  cursor: pointer;\n  /* 3 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\ninput {\n  line-height: normal;\n}\n\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari and Chrome.\n */\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  box-sizing: content-box;\n  /* 2 */\n}\n\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Define consistent border, margin, and padding.\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9/10/11.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\nlegend {\n  border: 0;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n\n/**\n * Remove default vertical scrollbar in IE 8/9/10/11.\n */\ntextarea {\n  overflow: auto;\n}\n\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\noptgroup {\n  font-weight: bold;\n}\n\n/* Tables\n   ========================================================================== */\n/**\n * Remove most spacing between table cells.\n */\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd,\nth {\n  padding: 0;\n}\n\nhtml {\n  box-sizing: border-box;\n}\n\n*, *:before, *:after {\n  box-sizing: inherit;\n}\n\nul {\n  padding: 0;\n  list-style-type: none;\n}\n\nul.browser-default,\nul.browser-default li {\n  list-style-type: initial;\n}\n\nul li {\n  list-style-type: none;\n}\n\na {\n  color: #039be5;\n  text-decoration: none;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.valign-wrapper {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n.valign-wrapper .valign {\n  display: block;\n}\n\n.clearfix {\n  clear: both;\n}\n\n.z-depth-0 {\n  box-shadow: none !important;\n}\n\n.z-depth-1, nav, .card-panel, .card, .toast, .btn, .btn-large, .btn-floating, .dropdown-content, .collapsible, .side-nav {\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);\n}\n\n.z-depth-1-half, .btn:hover, .btn-large:hover, .btn-floating:hover {\n  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);\n}\n\n.z-depth-2 {\n  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n}\n\n.z-depth-3 {\n  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);\n}\n\n.z-depth-4, .modal {\n  box-shadow: 0 16px 28px 0 rgba(0, 0, 0, 0.22), 0 25px 55px 0 rgba(0, 0, 0, 0.21);\n}\n\n.z-depth-5 {\n  box-shadow: 0 27px 24px 0 rgba(0, 0, 0, 0.2), 0 40px 77px 0 rgba(0, 0, 0, 0.22);\n}\n\n.hoverable {\n  transition: box-shadow .25s;\n  box-shadow: 0;\n}\n\n.hoverable:hover {\n  transition: box-shadow .25s;\n  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n}\n\n.divider {\n  height: 1px;\n  overflow: hidden;\n  background-color: #e0e0e0;\n}\n\nblockquote {\n  margin: 20px 0;\n  padding-left: 1.5rem;\n  border-left: 5px solid #ee6e73;\n}\n\ni {\n  line-height: inherit;\n}\n\ni.left {\n  float: left;\n  margin-right: 15px;\n}\n\ni.right {\n  float: right;\n  margin-left: 15px;\n}\n\ni.tiny {\n  font-size: 1rem;\n}\n\ni.small {\n  font-size: 2rem;\n}\n\ni.medium {\n  font-size: 4rem;\n}\n\ni.large {\n  font-size: 6rem;\n}\n\nimg.responsive-img,\nvideo.responsive-video {\n  max-width: 100%;\n  height: auto;\n}\n\n.pagination li {\n  display: inline-block;\n  border-radius: 2px;\n  text-align: center;\n  vertical-align: top;\n  height: 30px;\n}\n\n.pagination li a {\n  color: #444;\n  display: inline-block;\n  font-size: 1.2rem;\n  padding: 0 10px;\n  line-height: 30px;\n}\n\n.pagination li.active a {\n  color: #fff;\n}\n\n.pagination li.active {\n  background-color: #ee6e73;\n}\n\n.pagination li.disabled a {\n  cursor: default;\n  color: #999;\n}\n\n.pagination li i {\n  font-size: 2rem;\n}\n\n.pagination li.pages ul li {\n  display: inline-block;\n  float: none;\n}\n\n@media only screen and (max-width: 992px) {\n  .pagination {\n    width: 100%;\n  }\n  .pagination li.prev,\n  .pagination li.next {\n    width: 10%;\n  }\n  .pagination li.pages {\n    width: 80%;\n    overflow: hidden;\n    white-space: nowrap;\n  }\n}\n\n.breadcrumb {\n  font-size: 18px;\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.breadcrumb i,\n.breadcrumb [class^=\"mdi-\"], .breadcrumb [class*=\"mdi-\"],\n.breadcrumb i.material-icons {\n  display: inline-block;\n  float: left;\n  font-size: 24px;\n}\n\n.breadcrumb:before {\n  content: '\\E5CC';\n  color: rgba(255, 255, 255, 0.7);\n  vertical-align: top;\n  display: inline-block;\n  font-family: 'Material Icons';\n  font-weight: normal;\n  font-style: normal;\n  font-size: 25px;\n  margin: 0 10px 0 8px;\n  -webkit-font-smoothing: antialiased;\n}\n\n.breadcrumb:first-child:before {\n  display: none;\n}\n\n.breadcrumb:last-child {\n  color: #fff;\n}\n\n.parallax-container {\n  position: relative;\n  overflow: hidden;\n  height: 500px;\n}\n\n.parallax {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: -1;\n}\n\n.parallax img {\n  display: none;\n  position: absolute;\n  left: 50%;\n  bottom: 0;\n  min-width: 100%;\n  min-height: 100%;\n  -webkit-transform: translate3d(0, 0, 0);\n  transform: translate3d(0, 0, 0);\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n}\n\n.pin-top, .pin-bottom {\n  position: relative;\n}\n\n.pinned {\n  position: fixed !important;\n}\n\n/*********************\n  Transition Classes\n**********************/\nul.staggered-list li {\n  opacity: 0;\n}\n\n.fade-in {\n  opacity: 0;\n  -webkit-transform-origin: 0 50%;\n          transform-origin: 0 50%;\n}\n\n/*********************\n  Media Query Classes\n**********************/\n@media only screen and (max-width: 600px) {\n  .hide-on-small-only, .hide-on-small-and-down {\n    display: none !important;\n  }\n}\n\n@media only screen and (max-width: 992px) {\n  .hide-on-med-and-down {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 601px) {\n  .hide-on-med-and-up {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 600px) and (max-width: 992px) {\n  .hide-on-med-only {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 993px) {\n  .hide-on-large-only {\n    display: none !important;\n  }\n}\n\n@media only screen and (min-width: 993px) {\n  .show-on-large {\n    display: block !important;\n  }\n}\n\n@media only screen and (min-width: 600px) and (max-width: 992px) {\n  .show-on-medium {\n    display: block !important;\n  }\n}\n\n@media only screen and (max-width: 600px) {\n  .show-on-small {\n    display: block !important;\n  }\n}\n\n@media only screen and (min-width: 601px) {\n  .show-on-medium-and-up {\n    display: block !important;\n  }\n}\n\n@media only screen and (max-width: 992px) {\n  .show-on-medium-and-down {\n    display: block !important;\n  }\n}\n\n@media only screen and (max-width: 600px) {\n  .center-on-small-only {\n    text-align: center;\n  }\n}\n\nfooter.page-footer {\n  margin-top: 20px;\n  padding-top: 20px;\n  background-color: #ee6e73;\n}\n\nfooter.page-footer .footer-copyright {\n  overflow: hidden;\n  height: 50px;\n  line-height: 50px;\n  color: rgba(255, 255, 255, 0.8);\n  background-color: rgba(51, 51, 51, 0.08);\n}\n\ntable, th, td {\n  border: none;\n}\n\ntable {\n  width: 100%;\n  display: table;\n}\n\ntable.bordered > thead > tr,\ntable.bordered > tbody > tr {\n  border-bottom: 1px solid #d0d0d0;\n}\n\ntable.striped > tbody > tr:nth-child(odd) {\n  background-color: #f2f2f2;\n}\n\ntable.striped > tbody > tr > td {\n  border-radius: 0;\n}\n\ntable.highlight > tbody > tr {\n  transition: background-color .25s ease;\n}\n\ntable.highlight > tbody > tr:hover {\n  background-color: #f2f2f2;\n}\n\ntable.centered thead tr th, table.centered tbody tr td {\n  text-align: center;\n}\n\nthead {\n  border-bottom: 1px solid #d0d0d0;\n}\n\ntd, th {\n  padding: 15px 5px;\n  display: table-cell;\n  text-align: left;\n  vertical-align: middle;\n  border-radius: 2px;\n}\n\n@media only screen and (max-width: 992px) {\n  table.responsive-table {\n    width: 100%;\n    border-collapse: collapse;\n    border-spacing: 0;\n    display: block;\n    position: relative;\n    /* sort out borders */\n  }\n  table.responsive-table td:empty:before {\n    content: '\\00a0';\n  }\n  table.responsive-table th,\n  table.responsive-table td {\n    margin: 0;\n    vertical-align: top;\n  }\n  table.responsive-table th {\n    text-align: left;\n  }\n  table.responsive-table thead {\n    display: block;\n    float: left;\n  }\n  table.responsive-table thead tr {\n    display: block;\n    padding: 0 10px 0 0;\n  }\n  table.responsive-table thead tr th::before {\n    content: \"\\00a0\";\n  }\n  table.responsive-table tbody {\n    display: block;\n    width: auto;\n    position: relative;\n    overflow-x: auto;\n    white-space: nowrap;\n  }\n  table.responsive-table tbody tr {\n    display: inline-block;\n    vertical-align: top;\n  }\n  table.responsive-table th {\n    display: block;\n    text-align: right;\n  }\n  table.responsive-table td {\n    display: block;\n    min-height: 1.25em;\n    text-align: left;\n  }\n  table.responsive-table tr {\n    padding: 0 10px;\n  }\n  table.responsive-table thead {\n    border: 0;\n    border-right: 1px solid #d0d0d0;\n  }\n  table.responsive-table.bordered th {\n    border-bottom: 0;\n    border-left: 0;\n  }\n  table.responsive-table.bordered td {\n    border-left: 0;\n    border-right: 0;\n    border-bottom: 0;\n  }\n  table.responsive-table.bordered tr {\n    border: 0;\n  }\n  table.responsive-table.bordered tbody tr {\n    border-right: 1px solid #d0d0d0;\n  }\n}\n\n.collection {\n  margin: 0.5rem 0 1rem 0;\n  border: 1px solid #e0e0e0;\n  border-radius: 2px;\n  overflow: hidden;\n  position: relative;\n}\n\n.collection .collection-item {\n  background-color: #fff;\n  line-height: 1.5rem;\n  padding: 10px 20px;\n  margin: 0;\n  border-bottom: 1px solid #e0e0e0;\n}\n\n.collection .collection-item.avatar {\n  min-height: 84px;\n  padding-left: 72px;\n  position: relative;\n}\n\n.collection .collection-item.avatar .circle {\n  position: absolute;\n  width: 42px;\n  height: 42px;\n  overflow: hidden;\n  left: 15px;\n  display: inline-block;\n  vertical-align: middle;\n}\n\n.collection .collection-item.avatar i.circle {\n  font-size: 18px;\n  line-height: 42px;\n  color: #fff;\n  background-color: #999;\n  text-align: center;\n}\n\n.collection .collection-item.avatar .title {\n  font-size: 16px;\n}\n\n.collection .collection-item.avatar p {\n  margin: 0;\n}\n\n.collection .collection-item.avatar .secondary-content {\n  position: absolute;\n  top: 16px;\n  right: 16px;\n}\n\n.collection .collection-item:last-child {\n  border-bottom: none;\n}\n\n.collection .collection-item.active {\n  background-color: #26a69a;\n  color: #eafaf9;\n}\n\n.collection .collection-item.active .secondary-content {\n  color: #fff;\n}\n\n.collection a.collection-item {\n  display: block;\n  transition: .25s;\n  color: #26a69a;\n}\n\n.collection a.collection-item:not(.active):hover {\n  background-color: #ddd;\n}\n\n.collection.with-header .collection-header {\n  background-color: #fff;\n  border-bottom: 1px solid #e0e0e0;\n  padding: 10px 20px;\n}\n\n.collection.with-header .collection-item {\n  padding-left: 30px;\n}\n\n.collection.with-header .collection-item.avatar {\n  padding-left: 72px;\n}\n\n.secondary-content {\n  float: right;\n  color: #26a69a;\n}\n\n.collapsible .collection {\n  margin: 0;\n  border: none;\n}\n\nspan.badge {\n  min-width: 3rem;\n  padding: 0 6px;\n  text-align: center;\n  font-size: 1rem;\n  line-height: inherit;\n  color: #757575;\n  position: absolute;\n  right: 15px;\n  box-sizing: border-box;\n}\n\nspan.badge.new {\n  font-weight: 300;\n  font-size: 0.8rem;\n  color: #fff;\n  background-color: #26a69a;\n  border-radius: 2px;\n}\n\nspan.badge.new:after {\n  content: \" new\";\n}\n\nspan.badge[data-badge-caption]::after {\n  content: \" \" attr(data-badge-caption);\n}\n\nnav ul a span.badge {\n  position: static;\n  margin-left: 4px;\n  line-height: 0;\n}\n\n.video-container {\n  position: relative;\n  padding-bottom: 56.25%;\n  height: 0;\n  overflow: hidden;\n}\n\n.video-container iframe, .video-container object, .video-container embed {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n\n.progress {\n  position: relative;\n  height: 4px;\n  display: block;\n  width: 100%;\n  background-color: #acece6;\n  border-radius: 2px;\n  margin: 0.5rem 0 1rem 0;\n  overflow: hidden;\n}\n\n.progress .determinate {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  background-color: #26a69a;\n  transition: width .3s linear;\n}\n\n.progress .indeterminate {\n  background-color: #26a69a;\n}\n\n.progress .indeterminate:before {\n  content: '';\n  position: absolute;\n  background-color: inherit;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  will-change: left, right;\n  -webkit-animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;\n          animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;\n}\n\n.progress .indeterminate:after {\n  content: '';\n  position: absolute;\n  background-color: inherit;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  will-change: left, right;\n  -webkit-animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;\n          animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;\n  -webkit-animation-delay: 1.15s;\n          animation-delay: 1.15s;\n}\n\n@-webkit-keyframes indeterminate {\n  0% {\n    left: -35%;\n    right: 100%;\n  }\n  60% {\n    left: 100%;\n    right: -90%;\n  }\n  100% {\n    left: 100%;\n    right: -90%;\n  }\n}\n\n@keyframes indeterminate {\n  0% {\n    left: -35%;\n    right: 100%;\n  }\n  60% {\n    left: 100%;\n    right: -90%;\n  }\n  100% {\n    left: 100%;\n    right: -90%;\n  }\n}\n\n@-webkit-keyframes indeterminate-short {\n  0% {\n    left: -200%;\n    right: 100%;\n  }\n  60% {\n    left: 107%;\n    right: -8%;\n  }\n  100% {\n    left: 107%;\n    right: -8%;\n  }\n}\n\n@keyframes indeterminate-short {\n  0% {\n    left: -200%;\n    right: 100%;\n  }\n  60% {\n    left: 107%;\n    right: -8%;\n  }\n  100% {\n    left: 107%;\n    right: -8%;\n  }\n}\n\n/*******************\n  Utility Classes\n*******************/\n.hide {\n  display: none !important;\n}\n\n.left-align {\n  text-align: left;\n}\n\n.right-align {\n  text-align: right;\n}\n\n.center, .center-align {\n  text-align: center;\n}\n\n.left {\n  float: left !important;\n}\n\n.right {\n  float: right !important;\n}\n\n.no-select, input[type=range],\ninput[type=range] + .thumb {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.circle {\n  border-radius: 50%;\n}\n\n.center-block {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.truncate {\n  display: block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.no-padding {\n  padding: 0 !important;\n}\n\n/* This is needed for some mobile phones to display the Google Icon font properly */\n.material-icons {\n  text-rendering: optimizeLegibility;\n  -webkit-font-feature-settings: 'liga';\n     -moz-font-feature-settings: 'liga';\n          font-feature-settings: 'liga';\n}\n\n.container {\n  margin: 0 auto;\n  max-width: 1280px;\n  width: 90%;\n}\n\n@media only screen and (min-width: 601px) {\n  .container {\n    width: 85%;\n  }\n}\n\n@media only screen and (min-width: 993px) {\n  .container {\n    width: 70%;\n  }\n}\n\n.container .row {\n  margin-left: -0.75rem;\n  margin-right: -0.75rem;\n}\n\n.section {\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n}\n\n.section.no-pad {\n  padding: 0;\n}\n\n.section.no-pad-bot {\n  padding-bottom: 0;\n}\n\n.section.no-pad-top {\n  padding-top: 0;\n}\n\n.row {\n  margin-left: auto;\n  margin-right: auto;\n  margin-bottom: 20px;\n}\n\n.row:after {\n  content: \"\";\n  display: table;\n  clear: both;\n}\n\n.row .col {\n  float: left;\n  box-sizing: border-box;\n  padding: 0 0.75rem;\n  min-height: 1px;\n}\n\n.row .col[class*=\"push-\"], .row .col[class*=\"pull-\"] {\n  position: relative;\n}\n\n.row .col.s1 {\n  width: 8.3333333333%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n\n.row .col.s2 {\n  width: 16.6666666667%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n\n.row .col.s3 {\n  width: 25%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n\n.row .col.s4 {\n  width: 33.3333333333%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n\n.row .col.s5 {\n  width: 41.6666666667%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n\n.row .col.s6 {\n  width: 50%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n\n.row .col.s7 {\n  width: 58.3333333333%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n\n.row .col.s8 {\n  width: 66.6666666667%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n\n.row .col.s9 {\n  width: 75%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n\n.row .col.s10 {\n  width: 83.3333333333%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n\n.row .col.s11 {\n  width: 91.6666666667%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n\n.row .col.s12 {\n  width: 100%;\n  margin-left: auto;\n  left: auto;\n  right: auto;\n}\n\n.row .col.offset-s1 {\n  margin-left: 8.3333333333%;\n}\n\n.row .col.pull-s1 {\n  right: 8.3333333333%;\n}\n\n.row .col.push-s1 {\n  left: 8.3333333333%;\n}\n\n.row .col.offset-s2 {\n  margin-left: 16.6666666667%;\n}\n\n.row .col.pull-s2 {\n  right: 16.6666666667%;\n}\n\n.row .col.push-s2 {\n  left: 16.6666666667%;\n}\n\n.row .col.offset-s3 {\n  margin-left: 25%;\n}\n\n.row .col.pull-s3 {\n  right: 25%;\n}\n\n.row .col.push-s3 {\n  left: 25%;\n}\n\n.row .col.offset-s4 {\n  margin-left: 33.3333333333%;\n}\n\n.row .col.pull-s4 {\n  right: 33.3333333333%;\n}\n\n.row .col.push-s4 {\n  left: 33.3333333333%;\n}\n\n.row .col.offset-s5 {\n  margin-left: 41.6666666667%;\n}\n\n.row .col.pull-s5 {\n  right: 41.6666666667%;\n}\n\n.row .col.push-s5 {\n  left: 41.6666666667%;\n}\n\n.row .col.offset-s6 {\n  margin-left: 50%;\n}\n\n.row .col.pull-s6 {\n  right: 50%;\n}\n\n.row .col.push-s6 {\n  left: 50%;\n}\n\n.row .col.offset-s7 {\n  margin-left: 58.3333333333%;\n}\n\n.row .col.pull-s7 {\n  right: 58.3333333333%;\n}\n\n.row .col.push-s7 {\n  left: 58.3333333333%;\n}\n\n.row .col.offset-s8 {\n  margin-left: 66.6666666667%;\n}\n\n.row .col.pull-s8 {\n  right: 66.6666666667%;\n}\n\n.row .col.push-s8 {\n  left: 66.6666666667%;\n}\n\n.row .col.offset-s9 {\n  margin-left: 75%;\n}\n\n.row .col.pull-s9 {\n  right: 75%;\n}\n\n.row .col.push-s9 {\n  left: 75%;\n}\n\n.row .col.offset-s10 {\n  margin-left: 83.3333333333%;\n}\n\n.row .col.pull-s10 {\n  right: 83.3333333333%;\n}\n\n.row .col.push-s10 {\n  left: 83.3333333333%;\n}\n\n.row .col.offset-s11 {\n  margin-left: 91.6666666667%;\n}\n\n.row .col.pull-s11 {\n  right: 91.6666666667%;\n}\n\n.row .col.push-s11 {\n  left: 91.6666666667%;\n}\n\n.row .col.offset-s12 {\n  margin-left: 100%;\n}\n\n.row .col.pull-s12 {\n  right: 100%;\n}\n\n.row .col.push-s12 {\n  left: 100%;\n}\n\n@media only screen and (min-width: 601px) {\n  .row .col.m1 {\n    width: 8.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m2 {\n    width: 16.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m3 {\n    width: 25%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m4 {\n    width: 33.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m5 {\n    width: 41.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m6 {\n    width: 50%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m7 {\n    width: 58.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m8 {\n    width: 66.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m9 {\n    width: 75%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m10 {\n    width: 83.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m11 {\n    width: 91.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.m12 {\n    width: 100%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.offset-m1 {\n    margin-left: 8.3333333333%;\n  }\n  .row .col.pull-m1 {\n    right: 8.3333333333%;\n  }\n  .row .col.push-m1 {\n    left: 8.3333333333%;\n  }\n  .row .col.offset-m2 {\n    margin-left: 16.6666666667%;\n  }\n  .row .col.pull-m2 {\n    right: 16.6666666667%;\n  }\n  .row .col.push-m2 {\n    left: 16.6666666667%;\n  }\n  .row .col.offset-m3 {\n    margin-left: 25%;\n  }\n  .row .col.pull-m3 {\n    right: 25%;\n  }\n  .row .col.push-m3 {\n    left: 25%;\n  }\n  .row .col.offset-m4 {\n    margin-left: 33.3333333333%;\n  }\n  .row .col.pull-m4 {\n    right: 33.3333333333%;\n  }\n  .row .col.push-m4 {\n    left: 33.3333333333%;\n  }\n  .row .col.offset-m5 {\n    margin-left: 41.6666666667%;\n  }\n  .row .col.pull-m5 {\n    right: 41.6666666667%;\n  }\n  .row .col.push-m5 {\n    left: 41.6666666667%;\n  }\n  .row .col.offset-m6 {\n    margin-left: 50%;\n  }\n  .row .col.pull-m6 {\n    right: 50%;\n  }\n  .row .col.push-m6 {\n    left: 50%;\n  }\n  .row .col.offset-m7 {\n    margin-left: 58.3333333333%;\n  }\n  .row .col.pull-m7 {\n    right: 58.3333333333%;\n  }\n  .row .col.push-m7 {\n    left: 58.3333333333%;\n  }\n  .row .col.offset-m8 {\n    margin-left: 66.6666666667%;\n  }\n  .row .col.pull-m8 {\n    right: 66.6666666667%;\n  }\n  .row .col.push-m8 {\n    left: 66.6666666667%;\n  }\n  .row .col.offset-m9 {\n    margin-left: 75%;\n  }\n  .row .col.pull-m9 {\n    right: 75%;\n  }\n  .row .col.push-m9 {\n    left: 75%;\n  }\n  .row .col.offset-m10 {\n    margin-left: 83.3333333333%;\n  }\n  .row .col.pull-m10 {\n    right: 83.3333333333%;\n  }\n  .row .col.push-m10 {\n    left: 83.3333333333%;\n  }\n  .row .col.offset-m11 {\n    margin-left: 91.6666666667%;\n  }\n  .row .col.pull-m11 {\n    right: 91.6666666667%;\n  }\n  .row .col.push-m11 {\n    left: 91.6666666667%;\n  }\n  .row .col.offset-m12 {\n    margin-left: 100%;\n  }\n  .row .col.pull-m12 {\n    right: 100%;\n  }\n  .row .col.push-m12 {\n    left: 100%;\n  }\n}\n\n@media only screen and (min-width: 993px) {\n  .row .col.l1 {\n    width: 8.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l2 {\n    width: 16.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l3 {\n    width: 25%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l4 {\n    width: 33.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l5 {\n    width: 41.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l6 {\n    width: 50%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l7 {\n    width: 58.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l8 {\n    width: 66.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l9 {\n    width: 75%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l10 {\n    width: 83.3333333333%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l11 {\n    width: 91.6666666667%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.l12 {\n    width: 100%;\n    margin-left: auto;\n    left: auto;\n    right: auto;\n  }\n  .row .col.offset-l1 {\n    margin-left: 8.3333333333%;\n  }\n  .row .col.pull-l1 {\n    right: 8.3333333333%;\n  }\n  .row .col.push-l1 {\n    left: 8.3333333333%;\n  }\n  .row .col.offset-l2 {\n    margin-left: 16.6666666667%;\n  }\n  .row .col.pull-l2 {\n    right: 16.6666666667%;\n  }\n  .row .col.push-l2 {\n    left: 16.6666666667%;\n  }\n  .row .col.offset-l3 {\n    margin-left: 25%;\n  }\n  .row .col.pull-l3 {\n    right: 25%;\n  }\n  .row .col.push-l3 {\n    left: 25%;\n  }\n  .row .col.offset-l4 {\n    margin-left: 33.3333333333%;\n  }\n  .row .col.pull-l4 {\n    right: 33.3333333333%;\n  }\n  .row .col.push-l4 {\n    left: 33.3333333333%;\n  }\n  .row .col.offset-l5 {\n    margin-left: 41.6666666667%;\n  }\n  .row .col.pull-l5 {\n    right: 41.6666666667%;\n  }\n  .row .col.push-l5 {\n    left: 41.6666666667%;\n  }\n  .row .col.offset-l6 {\n    margin-left: 50%;\n  }\n  .row .col.pull-l6 {\n    right: 50%;\n  }\n  .row .col.push-l6 {\n    left: 50%;\n  }\n  .row .col.offset-l7 {\n    margin-left: 58.3333333333%;\n  }\n  .row .col.pull-l7 {\n    right: 58.3333333333%;\n  }\n  .row .col.push-l7 {\n    left: 58.3333333333%;\n  }\n  .row .col.offset-l8 {\n    margin-left: 66.6666666667%;\n  }\n  .row .col.pull-l8 {\n    right: 66.6666666667%;\n  }\n  .row .col.push-l8 {\n    left: 66.6666666667%;\n  }\n  .row .col.offset-l9 {\n    margin-left: 75%;\n  }\n  .row .col.pull-l9 {\n    right: 75%;\n  }\n  .row .col.push-l9 {\n    left: 75%;\n  }\n  .row .col.offset-l10 {\n    margin-left: 83.3333333333%;\n  }\n  .row .col.pull-l10 {\n    right: 83.3333333333%;\n  }\n  .row .col.push-l10 {\n    left: 83.3333333333%;\n  }\n  .row .col.offset-l11 {\n    margin-left: 91.6666666667%;\n  }\n  .row .col.pull-l11 {\n    right: 91.6666666667%;\n  }\n  .row .col.push-l11 {\n    left: 91.6666666667%;\n  }\n  .row .col.offset-l12 {\n    margin-left: 100%;\n  }\n  .row .col.pull-l12 {\n    right: 100%;\n  }\n  .row .col.push-l12 {\n    left: 100%;\n  }\n}\n\nnav {\n  color: #fff;\n  background-color: #ee6e73;\n  width: 100%;\n  height: 56px;\n  line-height: 56px;\n}\n\nnav a {\n  color: #fff;\n}\n\nnav i,\nnav [class^=\"mdi-\"], nav [class*=\"mdi-\"],\nnav i.material-icons {\n  display: block;\n  font-size: 2rem;\n  height: 56px;\n  line-height: 56px;\n}\n\nnav .nav-wrapper {\n  position: relative;\n  height: 100%;\n}\n\n@media only screen and (min-width: 993px) {\n  nav a.button-collapse {\n    display: none;\n  }\n}\n\nnav .button-collapse {\n  float: left;\n  position: relative;\n  z-index: 1;\n  height: 56px;\n}\n\nnav .button-collapse i {\n  font-size: 2.7rem;\n  height: 56px;\n  line-height: 56px;\n}\n\nnav .brand-logo {\n  position: absolute;\n  color: #fff;\n  display: inline-block;\n  font-size: 2.1rem;\n  padding: 0;\n  white-space: nowrap;\n}\n\nnav .brand-logo.center {\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n}\n\n@media only screen and (max-width: 992px) {\n  nav .brand-logo {\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%);\n  }\n  nav .brand-logo.left, nav .brand-logo.right {\n    padding: 0;\n    -webkit-transform: none;\n            transform: none;\n  }\n  nav .brand-logo.left {\n    left: 0.5rem;\n  }\n  nav .brand-logo.right {\n    right: 0.5rem;\n    left: auto;\n  }\n}\n\nnav .brand-logo.right {\n  right: 0.5rem;\n  padding: 0;\n}\n\nnav .brand-logo i,\nnav .brand-logo [class^=\"mdi-\"], nav .brand-logo [class*=\"mdi-\"],\nnav .brand-logo i.material-icons {\n  float: left;\n  margin-right: 15px;\n}\n\nnav ul {\n  margin: 0;\n}\n\nnav ul li {\n  transition: background-color .3s;\n  float: left;\n  padding: 0;\n}\n\nnav ul li.active {\n  background-color: rgba(0, 0, 0, 0.1);\n}\n\nnav ul a {\n  transition: background-color .3s;\n  font-size: 1rem;\n  color: #fff;\n  display: block;\n  padding: 0 15px;\n  cursor: pointer;\n}\n\nnav ul a.btn, nav ul a.btn-large, nav ul a.btn-large, nav ul a.btn-flat, nav ul a.btn-floating {\n  margin-top: -2px;\n  margin-left: 15px;\n  margin-right: 15px;\n}\n\nnav ul a:hover {\n  background-color: rgba(0, 0, 0, 0.1);\n}\n\nnav ul.left {\n  float: left;\n}\n\nnav form {\n  height: 100%;\n}\n\nnav .input-field {\n  margin: 0;\n  height: 100%;\n}\n\nnav .input-field input {\n  height: 100%;\n  font-size: 1.2rem;\n  border: none;\n  padding-left: 2rem;\n}\n\nnav .input-field input:focus, nav .input-field input[type=text]:valid, nav .input-field input[type=password]:valid, nav .input-field input[type=email]:valid, nav .input-field input[type=url]:valid, nav .input-field input[type=date]:valid {\n  border: none;\n  box-shadow: none;\n}\n\nnav .input-field label {\n  top: 0;\n  left: 0;\n}\n\nnav .input-field label i {\n  color: rgba(255, 255, 255, 0.7);\n  transition: color .3s;\n}\n\nnav .input-field label.active i {\n  color: #fff;\n}\n\nnav .input-field label.active {\n  -webkit-transform: translateY(0);\n          transform: translateY(0);\n}\n\n.navbar-fixed {\n  position: relative;\n  height: 56px;\n  z-index: 998;\n}\n\n.navbar-fixed nav {\n  position: fixed;\n}\n\n@media only screen and (min-width: 601px) {\n  nav, nav .nav-wrapper i, nav a.button-collapse, nav a.button-collapse i {\n    height: 64px;\n    line-height: 64px;\n  }\n  .navbar-fixed {\n    height: 64px;\n  }\n}\n\n@font-face {\n  font-family: \"Roboto\";\n  src: local(Roboto Thin), url(\"../fonts/roboto/Roboto-Thin.eot\");\n  src: url(\"../fonts/roboto/Roboto-Thin.eot?#iefix\") format(\"embedded-opentype\"), url(\"../fonts/roboto/Roboto-Thin.woff2\") format(\"woff2\"), url(\"../fonts/roboto/Roboto-Thin.woff\") format(\"woff\"), url(\"../fonts/roboto/Roboto-Thin.ttf\") format(\"truetype\");\n  font-weight: 200;\n}\n\n@font-face {\n  font-family: \"Roboto\";\n  src: local(Roboto Light), url(\"../fonts/roboto/Roboto-Light.eot\");\n  src: url(\"../fonts/roboto/Roboto-Light.eot?#iefix\") format(\"embedded-opentype\"), url(\"../fonts/roboto/Roboto-Light.woff2\") format(\"woff2\"), url(\"../fonts/roboto/Roboto-Light.woff\") format(\"woff\"), url(\"../fonts/roboto/Roboto-Light.ttf\") format(\"truetype\");\n  font-weight: 300;\n}\n\n@font-face {\n  font-family: \"Roboto\";\n  src: local(Roboto Regular), url(\"../fonts/roboto/Roboto-Regular.eot\");\n  src: url(\"../fonts/roboto/Roboto-Regular.eot?#iefix\") format(\"embedded-opentype\"), url(\"../fonts/roboto/Roboto-Regular.woff2\") format(\"woff2\"), url(\"../fonts/roboto/Roboto-Regular.woff\") format(\"woff\"), url(\"../fonts/roboto/Roboto-Regular.ttf\") format(\"truetype\");\n  font-weight: 400;\n}\n\n@font-face {\n  font-family: \"Roboto\";\n  src: url(\"../fonts/roboto/Roboto-Medium.eot\");\n  src: url(\"../fonts/roboto/Roboto-Medium.eot?#iefix\") format(\"embedded-opentype\"), url(\"../fonts/roboto/Roboto-Medium.woff2\") format(\"woff2\"), url(\"../fonts/roboto/Roboto-Medium.woff\") format(\"woff\"), url(\"../fonts/roboto/Roboto-Medium.ttf\") format(\"truetype\");\n  font-weight: 500;\n}\n\n@font-face {\n  font-family: \"Roboto\";\n  src: url(\"../fonts/roboto/Roboto-Bold.eot\");\n  src: url(\"../fonts/roboto/Roboto-Bold.eot?#iefix\") format(\"embedded-opentype\"), url(\"../fonts/roboto/Roboto-Bold.woff2\") format(\"woff2\"), url(\"../fonts/roboto/Roboto-Bold.woff\") format(\"woff\"), url(\"../fonts/roboto/Roboto-Bold.ttf\") format(\"truetype\");\n  font-weight: 700;\n}\n\na {\n  text-decoration: none;\n}\n\nhtml {\n  line-height: 1.5;\n  font-family: \"Roboto\", sans-serif;\n  font-weight: normal;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n@media only screen and (min-width: 0) {\n  html {\n    font-size: 14px;\n  }\n}\n\n@media only screen and (min-width: 992px) {\n  html {\n    font-size: 14.5px;\n  }\n}\n\n@media only screen and (min-width: 1200px) {\n  html {\n    font-size: 15px;\n  }\n}\n\nh1, h2, h3, h4, h5, h6 {\n  font-weight: 400;\n  line-height: 1.1;\n}\n\nh1 a, h2 a, h3 a, h4 a, h5 a, h6 a {\n  font-weight: inherit;\n}\n\nh1 {\n  font-size: 4.2rem;\n  line-height: 110%;\n  margin: 2.1rem 0 1.68rem 0;\n}\n\nh2 {\n  font-size: 3.56rem;\n  line-height: 110%;\n  margin: 1.78rem 0 1.424rem 0;\n}\n\nh3 {\n  font-size: 2.92rem;\n  line-height: 110%;\n  margin: 1.46rem 0 1.168rem 0;\n}\n\nh4 {\n  font-size: 2.28rem;\n  line-height: 110%;\n  margin: 1.14rem 0 0.912rem 0;\n}\n\nh5 {\n  font-size: 1.64rem;\n  line-height: 110%;\n  margin: 0.82rem 0 0.656rem 0;\n}\n\nh6 {\n  font-size: 1rem;\n  line-height: 110%;\n  margin: 0.5rem 0 0.4rem 0;\n}\n\nem {\n  font-style: italic;\n}\n\nstrong {\n  font-weight: 500;\n}\n\nsmall {\n  font-size: 75%;\n}\n\n.light, footer.page-footer .footer-copyright {\n  font-weight: 300;\n}\n\n.thin {\n  font-weight: 200;\n}\n\n.flow-text {\n  font-weight: 300;\n}\n\n@media only screen and (min-width: 360px) {\n  .flow-text {\n    font-size: 1.2rem;\n  }\n}\n\n@media only screen and (min-width: 390px) {\n  .flow-text {\n    font-size: 1.224rem;\n  }\n}\n\n@media only screen and (min-width: 420px) {\n  .flow-text {\n    font-size: 1.248rem;\n  }\n}\n\n@media only screen and (min-width: 450px) {\n  .flow-text {\n    font-size: 1.272rem;\n  }\n}\n\n@media only screen and (min-width: 480px) {\n  .flow-text {\n    font-size: 1.296rem;\n  }\n}\n\n@media only screen and (min-width: 510px) {\n  .flow-text {\n    font-size: 1.32rem;\n  }\n}\n\n@media only screen and (min-width: 540px) {\n  .flow-text {\n    font-size: 1.344rem;\n  }\n}\n\n@media only screen and (min-width: 570px) {\n  .flow-text {\n    font-size: 1.368rem;\n  }\n}\n\n@media only screen and (min-width: 600px) {\n  .flow-text {\n    font-size: 1.392rem;\n  }\n}\n\n@media only screen and (min-width: 630px) {\n  .flow-text {\n    font-size: 1.416rem;\n  }\n}\n\n@media only screen and (min-width: 660px) {\n  .flow-text {\n    font-size: 1.44rem;\n  }\n}\n\n@media only screen and (min-width: 690px) {\n  .flow-text {\n    font-size: 1.464rem;\n  }\n}\n\n@media only screen and (min-width: 720px) {\n  .flow-text {\n    font-size: 1.488rem;\n  }\n}\n\n@media only screen and (min-width: 750px) {\n  .flow-text {\n    font-size: 1.512rem;\n  }\n}\n\n@media only screen and (min-width: 780px) {\n  .flow-text {\n    font-size: 1.536rem;\n  }\n}\n\n@media only screen and (min-width: 810px) {\n  .flow-text {\n    font-size: 1.56rem;\n  }\n}\n\n@media only screen and (min-width: 840px) {\n  .flow-text {\n    font-size: 1.584rem;\n  }\n}\n\n@media only screen and (min-width: 870px) {\n  .flow-text {\n    font-size: 1.608rem;\n  }\n}\n\n@media only screen and (min-width: 900px) {\n  .flow-text {\n    font-size: 1.632rem;\n  }\n}\n\n@media only screen and (min-width: 930px) {\n  .flow-text {\n    font-size: 1.656rem;\n  }\n}\n\n@media only screen and (min-width: 960px) {\n  .flow-text {\n    font-size: 1.68rem;\n  }\n}\n\n@media only screen and (max-width: 360px) {\n  .flow-text {\n    font-size: 1.2rem;\n  }\n}\n\n.card-panel {\n  transition: box-shadow .25s;\n  padding: 20px;\n  margin: 0.5rem 0 1rem 0;\n  border-radius: 2px;\n  background-color: #fff;\n}\n\n.card {\n  position: relative;\n  margin: 0.5rem 0 1rem 0;\n  background-color: #fff;\n  transition: box-shadow .25s;\n  border-radius: 2px;\n}\n\n.card .card-title {\n  font-size: 24px;\n  font-weight: 300;\n}\n\n.card .card-title.activator {\n  cursor: pointer;\n}\n\n.card.small, .card.medium, .card.large {\n  position: relative;\n}\n\n.card.small .card-image, .card.medium .card-image, .card.large .card-image {\n  max-height: 60%;\n  overflow: hidden;\n}\n\n.card.small .card-image + .card-content, .card.medium .card-image + .card-content, .card.large .card-image + .card-content {\n  max-height: 40%;\n}\n\n.card.small .card-content, .card.medium .card-content, .card.large .card-content {\n  max-height: 100%;\n  overflow: hidden;\n}\n\n.card.small .card-action, .card.medium .card-action, .card.large .card-action {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n\n.card.small {\n  height: 300px;\n}\n\n.card.medium {\n  height: 400px;\n}\n\n.card.large {\n  height: 500px;\n}\n\n.card.horizontal {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.card.horizontal.small .card-image, .card.horizontal.medium .card-image, .card.horizontal.large .card-image {\n  height: 100%;\n  max-height: none;\n  overflow: visible;\n}\n\n.card.horizontal.small .card-image img, .card.horizontal.medium .card-image img, .card.horizontal.large .card-image img {\n  height: 100%;\n}\n\n.card.horizontal .card-image {\n  max-width: 50%;\n}\n\n.card.horizontal .card-image img {\n  max-width: 100%;\n  width: auto;\n}\n\n.card.horizontal .card-stacked {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  position: relative;\n}\n\n.card.horizontal .card-stacked .card-content {\n  -webkit-flex-grow: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n}\n\n.card.sticky-action .card-action {\n  z-index: 2;\n}\n\n.card.sticky-action .card-reveal {\n  z-index: 1;\n  padding-bottom: 64px;\n}\n\n.card .card-image {\n  position: relative;\n}\n\n.card .card-image img {\n  display: block;\n  border-radius: 2px 2px 0 0;\n  position: relative;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  width: 100%;\n}\n\n.card .card-image .card-title {\n  color: #fff;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  padding: 20px;\n}\n\n.card .card-content {\n  padding: 20px;\n  border-radius: 0 0 2px 2px;\n}\n\n.card .card-content p {\n  margin: 0;\n  color: inherit;\n}\n\n.card .card-content .card-title {\n  line-height: 48px;\n}\n\n.card .card-action {\n  position: relative;\n  background-color: inherit;\n  border-top: 1px solid rgba(160, 160, 160, 0.2);\n  padding: 20px;\n}\n\n.card .card-action a:not(.btn):not(.btn-large):not(.btn-floating) {\n  color: #ffab40;\n  margin-right: 20px;\n  transition: color .3s ease;\n  text-transform: uppercase;\n}\n\n.card .card-action a:not(.btn):not(.btn-large):not(.btn-floating):hover {\n  color: #ffd8a6;\n}\n\n.card .card-reveal {\n  padding: 20px;\n  position: absolute;\n  background-color: #fff;\n  width: 100%;\n  overflow-y: auto;\n  top: 100%;\n  height: 100%;\n  z-index: 3;\n  display: none;\n}\n\n.card .card-reveal .card-title {\n  cursor: pointer;\n  display: block;\n}\n\n#toast-container {\n  display: block;\n  position: fixed;\n  z-index: 10000;\n}\n\n@media only screen and (max-width: 600px) {\n  #toast-container {\n    min-width: 100%;\n    bottom: 0%;\n  }\n}\n\n@media only screen and (min-width: 601px) and (max-width: 992px) {\n  #toast-container {\n    left: 5%;\n    bottom: 7%;\n    max-width: 90%;\n  }\n}\n\n@media only screen and (min-width: 993px) {\n  #toast-container {\n    top: 10%;\n    right: 7%;\n    max-width: 86%;\n  }\n}\n\n.toast {\n  border-radius: 2px;\n  top: 0;\n  width: auto;\n  clear: both;\n  margin-top: 10px;\n  position: relative;\n  max-width: 100%;\n  height: auto;\n  min-height: 48px;\n  line-height: 1.5em;\n  word-break: break-all;\n  background-color: #323232;\n  padding: 10px 25px;\n  font-size: 1.1rem;\n  font-weight: 300;\n  color: #fff;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n\n.toast .btn, .toast .btn-large, .toast .btn-flat {\n  margin: 0;\n  margin-left: 3rem;\n}\n\n.toast.rounded {\n  border-radius: 24px;\n}\n\n@media only screen and (max-width: 600px) {\n  .toast {\n    width: 100%;\n    border-radius: 0;\n  }\n}\n\n@media only screen and (min-width: 601px) and (max-width: 992px) {\n  .toast {\n    float: left;\n  }\n}\n\n@media only screen and (min-width: 993px) {\n  .toast {\n    float: right;\n  }\n}\n\n.tabs {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  overflow-x: auto;\n  overflow-y: hidden;\n  height: 48px;\n  background-color: #fff;\n  margin: 0 auto;\n  width: 100%;\n  white-space: nowrap;\n}\n\n.tabs .tab {\n  -webkit-box-flex: 1;\n  -webkit-flex-grow: 1;\n  -ms-flex-positive: 1;\n  flex-grow: 1;\n  display: block;\n  float: left;\n  text-align: center;\n  line-height: 48px;\n  height: 48px;\n  padding: 0;\n  margin: 0;\n  text-transform: uppercase;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  letter-spacing: .8px;\n  width: 15%;\n  min-width: 80px;\n}\n\n.tabs .tab a {\n  color: #ee6e73;\n  display: block;\n  width: 100%;\n  height: 100%;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  transition: color .28s ease;\n}\n\n.tabs .tab a:hover {\n  color: #f9c9cb;\n}\n\n.tabs .tab.disabled a {\n  color: #f9c9cb;\n  cursor: default;\n}\n\n.tabs .indicator {\n  position: absolute;\n  bottom: 0;\n  height: 2px;\n  background-color: #f6b2b5;\n  will-change: left, right;\n}\n\n.material-tooltip {\n  padding: 10px 8px;\n  font-size: 1rem;\n  z-index: 2000;\n  background-color: transparent;\n  border-radius: 2px;\n  color: #fff;\n  min-height: 36px;\n  line-height: 120%;\n  opacity: 0;\n  display: none;\n  position: absolute;\n  text-align: center;\n  max-width: calc(100% - 4px);\n  overflow: hidden;\n  left: 0;\n  top: 0;\n  pointer-events: none;\n}\n\n.backdrop {\n  position: absolute;\n  opacity: 0;\n  display: none;\n  height: 7px;\n  width: 14px;\n  border-radius: 0 0 50% 50%;\n  background-color: #323232;\n  z-index: -1;\n  -webkit-transform-origin: 50% 0%;\n          transform-origin: 50% 0%;\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n}\n\n.btn, .btn-large,\n.btn-flat {\n  border: none;\n  border-radius: 2px;\n  display: inline-block;\n  height: 36px;\n  line-height: 36px;\n  outline: 0;\n  padding: 0 2rem;\n  text-transform: uppercase;\n  vertical-align: middle;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.btn.disabled, .disabled.btn-large,\n.btn-floating.disabled,\n.btn-large.disabled,\n.btn:disabled,\n.btn-large:disabled,\n.btn-large:disabled,\n.btn-floating:disabled,\n.btn[disabled],\n[disabled].btn-large,\n.btn-large[disabled],\n.btn-floating[disabled] {\n  background-color: #DFDFDF !important;\n  box-shadow: none;\n  color: #9F9F9F !important;\n  cursor: default;\n}\n\n.btn.disabled *, .disabled.btn-large *,\n.btn-floating.disabled *,\n.btn-large.disabled *,\n.btn:disabled *, .btn-large:disabled *,\n.btn-large:disabled *,\n.btn-floating:disabled *,\n.btn[disabled] *, [disabled].btn-large *,\n.btn-large[disabled] *,\n.btn-floating[disabled] * {\n  pointer-events: none;\n}\n\n.btn.disabled:hover, .disabled.btn-large:hover,\n.btn-floating.disabled:hover,\n.btn-large.disabled:hover,\n.btn:disabled:hover,\n.btn-large:disabled:hover,\n.btn-large:disabled:hover,\n.btn-floating:disabled:hover,\n.btn[disabled]:hover,\n[disabled].btn-large:hover,\n.btn-large[disabled]:hover,\n.btn-floating[disabled]:hover {\n  background-color: #DFDFDF !important;\n  color: #9F9F9F !important;\n}\n\n.btn i, .btn-large i,\n.btn-floating i,\n.btn-large i,\n.btn-flat i {\n  font-size: 1.3rem;\n  line-height: inherit;\n}\n\n.btn, .btn-large {\n  text-decoration: none;\n  color: #fff;\n  background-color: #26a69a;\n  text-align: center;\n  letter-spacing: .5px;\n  transition: .2s ease-out;\n  cursor: pointer;\n}\n\n.btn:hover, .btn-large:hover {\n  background-color: #2bbbad;\n}\n\n.btn-floating {\n  display: inline-block;\n  color: #fff;\n  position: relative;\n  overflow: hidden;\n  z-index: 1;\n  width: 37px;\n  height: 37px;\n  line-height: 37px;\n  padding: 0;\n  background-color: #26a69a;\n  border-radius: 50%;\n  transition: .3s;\n  cursor: pointer;\n  vertical-align: middle;\n}\n\n.btn-floating i {\n  width: inherit;\n  display: inline-block;\n  text-align: center;\n  color: #fff;\n  font-size: 1.6rem;\n  line-height: 37px;\n}\n\n.btn-floating:hover {\n  background-color: #26a69a;\n}\n\n.btn-floating:before {\n  border-radius: 0;\n}\n\n.btn-floating.btn-large {\n  width: 55.5px;\n  height: 55.5px;\n}\n\n.btn-floating.btn-large i {\n  line-height: 55.5px;\n}\n\nbutton.btn-floating {\n  border: none;\n}\n\n.fixed-action-btn {\n  position: fixed;\n  right: 23px;\n  bottom: 23px;\n  padding-top: 15px;\n  margin-bottom: 0;\n  z-index: 998;\n}\n\n.fixed-action-btn.active ul {\n  visibility: visible;\n}\n\n.fixed-action-btn.horizontal {\n  padding: 0 0 0 15px;\n}\n\n.fixed-action-btn.horizontal ul {\n  text-align: right;\n  right: 64px;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  height: 100%;\n  left: auto;\n  width: 500px;\n  /*width 100% only goes to width of button container */\n}\n\n.fixed-action-btn.horizontal ul li {\n  display: inline-block;\n  margin: 15px 15px 0 0;\n}\n\n.fixed-action-btn ul {\n  left: 0;\n  right: 0;\n  text-align: center;\n  position: absolute;\n  bottom: 64px;\n  margin: 0;\n  visibility: hidden;\n}\n\n.fixed-action-btn ul li {\n  margin-bottom: 15px;\n}\n\n.fixed-action-btn ul a.btn-floating {\n  opacity: 0;\n}\n\n.btn-flat {\n  box-shadow: none;\n  background-color: transparent;\n  color: #343434;\n  cursor: pointer;\n  transition: background-color .2s;\n}\n\n.btn-flat:focus, .btn-flat:active {\n  background-color: transparent;\n}\n\n.btn-flat:hover {\n  background-color: rgba(0, 0, 0, 0.1);\n  box-shadow: none;\n}\n\n.btn-flat.disabled {\n  color: #b3b3b3;\n  cursor: default;\n}\n\n.btn-large {\n  height: 54px;\n  line-height: 54px;\n}\n\n.btn-large i {\n  font-size: 1.6rem;\n}\n\n.btn-block {\n  display: block;\n}\n\n.dropdown-content {\n  background-color: #fff;\n  margin: 0;\n  display: none;\n  min-width: 100px;\n  max-height: 650px;\n  overflow-y: auto;\n  opacity: 0;\n  position: absolute;\n  z-index: 999;\n  will-change: width, height;\n}\n\n.dropdown-content li {\n  clear: both;\n  color: rgba(0, 0, 0, 0.87);\n  cursor: pointer;\n  min-height: 50px;\n  line-height: 1.5rem;\n  width: 100%;\n  text-align: left;\n  text-transform: none;\n}\n\n.dropdown-content li:hover, .dropdown-content li.active, .dropdown-content li.selected {\n  background-color: #eee;\n}\n\n.dropdown-content li.active.selected {\n  background-color: #e1e1e1;\n}\n\n.dropdown-content li.divider {\n  min-height: 0;\n  height: 1px;\n}\n\n.dropdown-content li > a, .dropdown-content li > span {\n  font-size: 16px;\n  color: #26a69a;\n  display: block;\n  line-height: 22px;\n  padding: 14px 16px;\n}\n\n.dropdown-content li > span > label {\n  top: 1px;\n  left: 3px;\n  height: 18px;\n}\n\n.dropdown-content li > a > i {\n  height: inherit;\n  line-height: inherit;\n}\n\n/*!\n * Waves v0.6.0\n * http://fian.my.id/Waves\n *\n * Copyright 2014 Alfiana E. Sibuea and other contributors\n * Released under the MIT license\n * https://github.com/fians/Waves/blob/master/LICENSE\n */\n.waves-effect {\n  position: relative;\n  cursor: pointer;\n  display: inline-block;\n  overflow: hidden;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n  vertical-align: middle;\n  z-index: 1;\n  will-change: opacity, transform;\n  transition: all .3s ease-out;\n}\n\n.waves-effect .waves-ripple {\n  position: absolute;\n  border-radius: 50%;\n  width: 20px;\n  height: 20px;\n  margin-top: -10px;\n  margin-left: -10px;\n  opacity: 0;\n  background: rgba(0, 0, 0, 0.2);\n  transition: all 0.7s ease-out;\n  transition-property: opacity, -webkit-transform;\n  transition-property: transform, opacity;\n  transition-property: transform, opacity, -webkit-transform;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n  pointer-events: none;\n}\n\n.waves-effect.waves-light .waves-ripple {\n  background-color: rgba(255, 255, 255, 0.45);\n}\n\n.waves-effect.waves-red .waves-ripple {\n  background-color: rgba(244, 67, 54, 0.7);\n}\n\n.waves-effect.waves-yellow .waves-ripple {\n  background-color: rgba(255, 235, 59, 0.7);\n}\n\n.waves-effect.waves-orange .waves-ripple {\n  background-color: rgba(255, 152, 0, 0.7);\n}\n\n.waves-effect.waves-purple .waves-ripple {\n  background-color: rgba(156, 39, 176, 0.7);\n}\n\n.waves-effect.waves-green .waves-ripple {\n  background-color: rgba(76, 175, 80, 0.7);\n}\n\n.waves-effect.waves-teal .waves-ripple {\n  background-color: rgba(0, 150, 136, 0.7);\n}\n\n.waves-effect input[type=\"button\"], .waves-effect input[type=\"reset\"], .waves-effect input[type=\"submit\"] {\n  border: 0;\n  font-style: normal;\n  font-size: inherit;\n  text-transform: inherit;\n  background: none;\n}\n\n.waves-effect img {\n  position: relative;\n  z-index: -1;\n}\n\n.waves-notransition {\n  transition: none !important;\n}\n\n.waves-circle {\n  -webkit-transform: translateZ(0);\n          transform: translateZ(0);\n  -webkit-mask-image: -webkit-radial-gradient(circle, white 100%, black 100%);\n}\n\n.waves-input-wrapper {\n  border-radius: 0.2em;\n  vertical-align: bottom;\n}\n\n.waves-input-wrapper .waves-button-input {\n  position: relative;\n  top: 0;\n  left: 0;\n  z-index: 1;\n}\n\n.waves-circle {\n  text-align: center;\n  width: 2.5em;\n  height: 2.5em;\n  line-height: 2.5em;\n  border-radius: 50%;\n  -webkit-mask-image: none;\n}\n\n.waves-block {\n  display: block;\n}\n\n/* Firefox Bug: link not triggered */\n.waves-effect .waves-ripple {\n  z-index: -1;\n}\n\n.modal {\n  display: none;\n  position: fixed;\n  left: 0;\n  right: 0;\n  background-color: #fafafa;\n  padding: 0;\n  max-height: 70%;\n  width: 55%;\n  margin: auto;\n  overflow-y: auto;\n  border-radius: 2px;\n  will-change: top, opacity;\n}\n\n@media only screen and (max-width: 992px) {\n  .modal {\n    width: 80%;\n  }\n}\n\n.modal h1, .modal h2, .modal h3, .modal h4 {\n  margin-top: 0;\n}\n\n.modal .modal-content {\n  padding: 24px;\n}\n\n.modal .modal-close {\n  cursor: pointer;\n}\n\n.modal .modal-footer {\n  border-radius: 0 0 2px 2px;\n  background-color: #fafafa;\n  padding: 4px 6px;\n  height: 56px;\n  width: 100%;\n}\n\n.modal .modal-footer .btn, .modal .modal-footer .btn-large, .modal .modal-footer .btn-flat {\n  float: right;\n  margin: 6px 0;\n}\n\n.lean-overlay {\n  position: fixed;\n  z-index: 999;\n  top: -100px;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 125%;\n  width: 100%;\n  background: #000;\n  display: none;\n  will-change: opacity;\n}\n\n.modal.modal-fixed-footer {\n  padding: 0;\n  height: 70%;\n}\n\n.modal.modal-fixed-footer .modal-content {\n  position: absolute;\n  height: calc(100% - 56px);\n  max-height: 100%;\n  width: 100%;\n  overflow-y: auto;\n}\n\n.modal.modal-fixed-footer .modal-footer {\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  position: absolute;\n  bottom: 0;\n}\n\n.modal.bottom-sheet {\n  top: auto;\n  bottom: -100%;\n  margin: 0;\n  width: 100%;\n  max-height: 45%;\n  border-radius: 0;\n  will-change: bottom, opacity;\n}\n\n.collapsible {\n  border-top: 1px solid #ddd;\n  border-right: 1px solid #ddd;\n  border-left: 1px solid #ddd;\n  margin: 0.5rem 0 1rem 0;\n}\n\n.collapsible-header {\n  display: block;\n  cursor: pointer;\n  min-height: 3rem;\n  line-height: 3rem;\n  padding: 0 1rem;\n  background-color: #fff;\n  border-bottom: 1px solid #ddd;\n}\n\n.collapsible-header i {\n  width: 2rem;\n  font-size: 1.6rem;\n  line-height: 3rem;\n  display: block;\n  float: left;\n  text-align: center;\n  margin-right: 1rem;\n}\n\n.collapsible-body {\n  display: none;\n  border-bottom: 1px solid #ddd;\n  box-sizing: border-box;\n}\n\n.collapsible-body p {\n  margin: 0;\n  padding: 2rem;\n}\n\n.side-nav .collapsible,\n.side-nav.fixed .collapsible {\n  border: none;\n  box-shadow: none;\n}\n\n.side-nav .collapsible li,\n.side-nav.fixed .collapsible li {\n  padding: 0;\n}\n\n.side-nav .collapsible-header,\n.side-nav.fixed .collapsible-header {\n  background-color: transparent;\n  border: none;\n  line-height: inherit;\n  height: inherit;\n  padding: 0 16px;\n}\n\n.side-nav .collapsible-header:hover,\n.side-nav.fixed .collapsible-header:hover {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n\n.side-nav .collapsible-header i,\n.side-nav.fixed .collapsible-header i {\n  line-height: inherit;\n}\n\n.side-nav .collapsible-body,\n.side-nav.fixed .collapsible-body {\n  border: 0;\n  background-color: #fff;\n}\n\n.side-nav .collapsible-body li a,\n.side-nav.fixed .collapsible-body li a {\n  padding: 0 23.5px 0 31px;\n}\n\n.collapsible.popout {\n  border: none;\n  box-shadow: none;\n}\n\n.collapsible.popout > li {\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);\n  margin: 0 24px;\n  transition: margin 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n\n.collapsible.popout > li.active {\n  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);\n  margin: 16px 0;\n}\n\n.chip {\n  display: inline-block;\n  height: 32px;\n  font-size: 13px;\n  font-weight: 500;\n  color: rgba(0, 0, 0, 0.6);\n  line-height: 32px;\n  padding: 0 12px;\n  border-radius: 16px;\n  background-color: #e4e4e4;\n  margin-bottom: 5px;\n  margin-right: 5px;\n}\n\n.chip img {\n  float: left;\n  margin: 0 8px 0 -12px;\n  height: 32px;\n  width: 32px;\n  border-radius: 50%;\n}\n\n.chip .close {\n  cursor: pointer;\n  float: right;\n  font-size: 16px;\n  line-height: 32px;\n  padding-left: 8px;\n}\n\n.chips {\n  border: none;\n  border-bottom: 1px solid #9e9e9e;\n  box-shadow: none;\n  margin-bottom: 30px;\n  min-height: 45px;\n  outline: none;\n  padding-bottom: 5px;\n  transition: all .3s;\n}\n\n.chips.focus {\n  border-bottom: 1px solid #26a69a;\n  box-shadow: 0 1px 0 0 #26a69a;\n}\n\n.chips:hover {\n  cursor: text;\n}\n\n.chips .chip.selected {\n  background-color: #26a69a;\n  color: #fff;\n}\n\n.chips .input {\n  background: none;\n  border: 0;\n  color: rgba(0, 0, 0, 0.6);\n  display: inline-block;\n  font-size: 13px;\n  font-weight: 500;\n  height: 32px;\n  margin-right: 20px;\n  line-height: 32px;\n  outline: 0;\n  padding: 0 !important;\n  width: 120px !important;\n}\n\n.chips .input:focus {\n  border: 0 !important;\n  box-shadow: none !important;\n}\n\n.materialboxed {\n  display: block;\n  cursor: -webkit-zoom-in;\n  cursor: zoom-in;\n  position: relative;\n  transition: opacity .4s;\n}\n\n.materialboxed:hover {\n  will-change: left, top, width, height;\n}\n\n.materialboxed:hover:not(.active) {\n  opacity: .8;\n}\n\n.materialboxed.active {\n  cursor: -webkit-zoom-out;\n  cursor: zoom-out;\n}\n\n#materialbox-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #292929;\n  z-index: 1000;\n  will-change: opacity;\n}\n\n.materialbox-caption {\n  position: fixed;\n  display: none;\n  color: #fff;\n  line-height: 50px;\n  bottom: 0;\n  width: 100%;\n  text-align: center;\n  padding: 0% 15%;\n  height: 50px;\n  z-index: 1000;\n  -webkit-font-smoothing: antialiased;\n}\n\nselect:focus {\n  outline: 1px solid #c9f3ef;\n}\n\nbutton:focus {\n  outline: none;\n  background-color: #2ab7a9;\n}\n\nlabel {\n  font-size: 0.8rem;\n  color: #9e9e9e;\n}\n\n/* Text Inputs + Textarea\n   ========================================================================== */\n/* Style Placeholders */\n::-webkit-input-placeholder {\n  color: #d1d1d1;\n}\n\n:-moz-placeholder {\n  /* Firefox 18- */\n  color: #d1d1d1;\n}\n\n::-moz-placeholder {\n  /* Firefox 19+ */\n  color: #d1d1d1;\n}\n\n:-ms-input-placeholder {\n  color: #d1d1d1;\n}\n\n/* Text inputs */\ninput:not([type]),\ninput[type=text],\ninput[type=password],\ninput[type=email],\ninput[type=url],\ninput[type=time],\ninput[type=date],\ninput[type=datetime],\ninput[type=datetime-local],\ninput[type=tel],\ninput[type=number],\ninput[type=search],\ntextarea.materialize-textarea {\n  background-color: transparent;\n  border: none;\n  border-bottom: 1px solid #9e9e9e;\n  border-radius: 0;\n  outline: none;\n  height: 3rem;\n  width: 100%;\n  font-size: 1rem;\n  margin: 0 0 20px 0;\n  padding: 0;\n  box-shadow: none;\n  box-sizing: content-box;\n  transition: all 0.3s;\n}\n\ninput:not([type]):disabled, input:not([type])[readonly=\"readonly\"],\ninput[type=text]:disabled,\ninput[type=text][readonly=\"readonly\"],\ninput[type=password]:disabled,\ninput[type=password][readonly=\"readonly\"],\ninput[type=email]:disabled,\ninput[type=email][readonly=\"readonly\"],\ninput[type=url]:disabled,\ninput[type=url][readonly=\"readonly\"],\ninput[type=time]:disabled,\ninput[type=time][readonly=\"readonly\"],\ninput[type=date]:disabled,\ninput[type=date][readonly=\"readonly\"],\ninput[type=datetime]:disabled,\ninput[type=datetime][readonly=\"readonly\"],\ninput[type=datetime-local]:disabled,\ninput[type=datetime-local][readonly=\"readonly\"],\ninput[type=tel]:disabled,\ninput[type=tel][readonly=\"readonly\"],\ninput[type=number]:disabled,\ninput[type=number][readonly=\"readonly\"],\ninput[type=search]:disabled,\ninput[type=search][readonly=\"readonly\"],\ntextarea.materialize-textarea:disabled,\ntextarea.materialize-textarea[readonly=\"readonly\"] {\n  color: rgba(0, 0, 0, 0.26);\n  border-bottom: 1px dotted rgba(0, 0, 0, 0.26);\n}\n\ninput:not([type]):disabled + label,\ninput:not([type])[readonly=\"readonly\"] + label,\ninput[type=text]:disabled + label,\ninput[type=text][readonly=\"readonly\"] + label,\ninput[type=password]:disabled + label,\ninput[type=password][readonly=\"readonly\"] + label,\ninput[type=email]:disabled + label,\ninput[type=email][readonly=\"readonly\"] + label,\ninput[type=url]:disabled + label,\ninput[type=url][readonly=\"readonly\"] + label,\ninput[type=time]:disabled + label,\ninput[type=time][readonly=\"readonly\"] + label,\ninput[type=date]:disabled + label,\ninput[type=date][readonly=\"readonly\"] + label,\ninput[type=datetime]:disabled + label,\ninput[type=datetime][readonly=\"readonly\"] + label,\ninput[type=datetime-local]:disabled + label,\ninput[type=datetime-local][readonly=\"readonly\"] + label,\ninput[type=tel]:disabled + label,\ninput[type=tel][readonly=\"readonly\"] + label,\ninput[type=number]:disabled + label,\ninput[type=number][readonly=\"readonly\"] + label,\ninput[type=search]:disabled + label,\ninput[type=search][readonly=\"readonly\"] + label,\ntextarea.materialize-textarea:disabled + label,\ntextarea.materialize-textarea[readonly=\"readonly\"] + label {\n  color: rgba(0, 0, 0, 0.26);\n}\n\ninput:not([type]):focus:not([readonly]),\ninput[type=text]:focus:not([readonly]),\ninput[type=password]:focus:not([readonly]),\ninput[type=email]:focus:not([readonly]),\ninput[type=url]:focus:not([readonly]),\ninput[type=time]:focus:not([readonly]),\ninput[type=date]:focus:not([readonly]),\ninput[type=datetime]:focus:not([readonly]),\ninput[type=datetime-local]:focus:not([readonly]),\ninput[type=tel]:focus:not([readonly]),\ninput[type=number]:focus:not([readonly]),\ninput[type=search]:focus:not([readonly]),\ntextarea.materialize-textarea:focus:not([readonly]) {\n  border-bottom: 1px solid #26a69a;\n  box-shadow: 0 1px 0 0 #26a69a;\n}\n\ninput:not([type]):focus:not([readonly]) + label,\ninput[type=text]:focus:not([readonly]) + label,\ninput[type=password]:focus:not([readonly]) + label,\ninput[type=email]:focus:not([readonly]) + label,\ninput[type=url]:focus:not([readonly]) + label,\ninput[type=time]:focus:not([readonly]) + label,\ninput[type=date]:focus:not([readonly]) + label,\ninput[type=datetime]:focus:not([readonly]) + label,\ninput[type=datetime-local]:focus:not([readonly]) + label,\ninput[type=tel]:focus:not([readonly]) + label,\ninput[type=number]:focus:not([readonly]) + label,\ninput[type=search]:focus:not([readonly]) + label,\ntextarea.materialize-textarea:focus:not([readonly]) + label {\n  color: #26a69a;\n}\n\ninput:not([type]).valid, input:not([type]):focus.valid,\ninput[type=text].valid,\ninput[type=text]:focus.valid,\ninput[type=password].valid,\ninput[type=password]:focus.valid,\ninput[type=email].valid,\ninput[type=email]:focus.valid,\ninput[type=url].valid,\ninput[type=url]:focus.valid,\ninput[type=time].valid,\ninput[type=time]:focus.valid,\ninput[type=date].valid,\ninput[type=date]:focus.valid,\ninput[type=datetime].valid,\ninput[type=datetime]:focus.valid,\ninput[type=datetime-local].valid,\ninput[type=datetime-local]:focus.valid,\ninput[type=tel].valid,\ninput[type=tel]:focus.valid,\ninput[type=number].valid,\ninput[type=number]:focus.valid,\ninput[type=search].valid,\ninput[type=search]:focus.valid,\ntextarea.materialize-textarea.valid,\ntextarea.materialize-textarea:focus.valid {\n  border-bottom: 1px solid #4CAF50;\n  box-shadow: 0 1px 0 0 #4CAF50;\n}\n\ninput:not([type]).valid + label:after,\ninput:not([type]):focus.valid + label:after,\ninput[type=text].valid + label:after,\ninput[type=text]:focus.valid + label:after,\ninput[type=password].valid + label:after,\ninput[type=password]:focus.valid + label:after,\ninput[type=email].valid + label:after,\ninput[type=email]:focus.valid + label:after,\ninput[type=url].valid + label:after,\ninput[type=url]:focus.valid + label:after,\ninput[type=time].valid + label:after,\ninput[type=time]:focus.valid + label:after,\ninput[type=date].valid + label:after,\ninput[type=date]:focus.valid + label:after,\ninput[type=datetime].valid + label:after,\ninput[type=datetime]:focus.valid + label:after,\ninput[type=datetime-local].valid + label:after,\ninput[type=datetime-local]:focus.valid + label:after,\ninput[type=tel].valid + label:after,\ninput[type=tel]:focus.valid + label:after,\ninput[type=number].valid + label:after,\ninput[type=number]:focus.valid + label:after,\ninput[type=search].valid + label:after,\ninput[type=search]:focus.valid + label:after,\ntextarea.materialize-textarea.valid + label:after,\ntextarea.materialize-textarea:focus.valid + label:after {\n  content: attr(data-success);\n  color: #4CAF50;\n  opacity: 1;\n}\n\ninput:not([type]).invalid, input:not([type]):focus.invalid,\ninput[type=text].invalid,\ninput[type=text]:focus.invalid,\ninput[type=password].invalid,\ninput[type=password]:focus.invalid,\ninput[type=email].invalid,\ninput[type=email]:focus.invalid,\ninput[type=url].invalid,\ninput[type=url]:focus.invalid,\ninput[type=time].invalid,\ninput[type=time]:focus.invalid,\ninput[type=date].invalid,\ninput[type=date]:focus.invalid,\ninput[type=datetime].invalid,\ninput[type=datetime]:focus.invalid,\ninput[type=datetime-local].invalid,\ninput[type=datetime-local]:focus.invalid,\ninput[type=tel].invalid,\ninput[type=tel]:focus.invalid,\ninput[type=number].invalid,\ninput[type=number]:focus.invalid,\ninput[type=search].invalid,\ninput[type=search]:focus.invalid,\ntextarea.materialize-textarea.invalid,\ntextarea.materialize-textarea:focus.invalid {\n  border-bottom: 1px solid #F44336;\n  box-shadow: 0 1px 0 0 #F44336;\n}\n\ninput:not([type]).invalid + label:after,\ninput:not([type]):focus.invalid + label:after,\ninput[type=text].invalid + label:after,\ninput[type=text]:focus.invalid + label:after,\ninput[type=password].invalid + label:after,\ninput[type=password]:focus.invalid + label:after,\ninput[type=email].invalid + label:after,\ninput[type=email]:focus.invalid + label:after,\ninput[type=url].invalid + label:after,\ninput[type=url]:focus.invalid + label:after,\ninput[type=time].invalid + label:after,\ninput[type=time]:focus.invalid + label:after,\ninput[type=date].invalid + label:after,\ninput[type=date]:focus.invalid + label:after,\ninput[type=datetime].invalid + label:after,\ninput[type=datetime]:focus.invalid + label:after,\ninput[type=datetime-local].invalid + label:after,\ninput[type=datetime-local]:focus.invalid + label:after,\ninput[type=tel].invalid + label:after,\ninput[type=tel]:focus.invalid + label:after,\ninput[type=number].invalid + label:after,\ninput[type=number]:focus.invalid + label:after,\ninput[type=search].invalid + label:after,\ninput[type=search]:focus.invalid + label:after,\ntextarea.materialize-textarea.invalid + label:after,\ntextarea.materialize-textarea:focus.invalid + label:after {\n  content: attr(data-error);\n  color: #F44336;\n  opacity: 1;\n}\n\ninput:not([type]).validate + label,\ninput[type=text].validate + label,\ninput[type=password].validate + label,\ninput[type=email].validate + label,\ninput[type=url].validate + label,\ninput[type=time].validate + label,\ninput[type=date].validate + label,\ninput[type=datetime].validate + label,\ninput[type=datetime-local].validate + label,\ninput[type=tel].validate + label,\ninput[type=number].validate + label,\ninput[type=search].validate + label,\ntextarea.materialize-textarea.validate + label {\n  width: 100%;\n  pointer-events: none;\n}\n\ninput:not([type]) + label:after,\ninput[type=text] + label:after,\ninput[type=password] + label:after,\ninput[type=email] + label:after,\ninput[type=url] + label:after,\ninput[type=time] + label:after,\ninput[type=date] + label:after,\ninput[type=datetime] + label:after,\ninput[type=datetime-local] + label:after,\ninput[type=tel] + label:after,\ninput[type=number] + label:after,\ninput[type=search] + label:after,\ntextarea.materialize-textarea + label:after {\n  display: block;\n  content: \"\";\n  position: absolute;\n  top: 60px;\n  opacity: 0;\n  transition: .2s opacity ease-out, .2s color ease-out;\n}\n\n.input-field {\n  position: relative;\n  margin-top: 1rem;\n}\n\n.input-field.col label {\n  left: 0.75rem;\n}\n\n.input-field.col .prefix ~ label,\n.input-field.col .prefix ~ .validate ~ label {\n  width: calc(100% - 3rem - 1.5rem);\n}\n\n.input-field label {\n  color: #9e9e9e;\n  position: absolute;\n  top: 0.8rem;\n  font-size: 1rem;\n  cursor: text;\n  transition: .2s ease-out;\n}\n\n.input-field label.active {\n  font-size: 0.8rem;\n  -webkit-transform: translateY(-140%);\n          transform: translateY(-140%);\n}\n\n.input-field .prefix {\n  position: absolute;\n  width: 3rem;\n  font-size: 2rem;\n  transition: color .2s;\n}\n\n.input-field .prefix.active {\n  color: #26a69a;\n}\n\n.input-field .prefix ~ input,\n.input-field .prefix ~ textarea,\n.input-field .prefix ~ label,\n.input-field .prefix ~ .validate ~ label,\n.input-field .prefix ~ .autocomplete-content {\n  margin-left: 3rem;\n  width: 92%;\n  width: calc(100% - 3rem);\n}\n\n.input-field .prefix ~ label {\n  margin-left: 3rem;\n}\n\n@media only screen and (max-width: 992px) {\n  .input-field .prefix ~ input {\n    width: 86%;\n    width: calc(100% - 3rem);\n  }\n}\n\n@media only screen and (max-width: 600px) {\n  .input-field .prefix ~ input {\n    width: 80%;\n    width: calc(100% - 3rem);\n  }\n}\n\n/* Search Field */\n.input-field input[type=search] {\n  display: block;\n  line-height: inherit;\n  padding-left: 4rem;\n  width: calc(100% - 4rem);\n}\n\n.input-field input[type=search]:focus {\n  background-color: #fff;\n  border: 0;\n  box-shadow: none;\n  color: #444;\n}\n\n.input-field input[type=search]:focus + label i,\n.input-field input[type=search]:focus ~ .mdi-navigation-close,\n.input-field input[type=search]:focus ~ .material-icons {\n  color: #444;\n}\n\n.input-field input[type=search] + label {\n  left: 1rem;\n}\n\n.input-field input[type=search] ~ .mdi-navigation-close,\n.input-field input[type=search] ~ .material-icons {\n  position: absolute;\n  top: 0;\n  right: 1rem;\n  color: transparent;\n  cursor: pointer;\n  font-size: 2rem;\n  transition: .3s color;\n}\n\n/* Textarea */\ntextarea {\n  width: 100%;\n  height: 3rem;\n  background-color: transparent;\n}\n\ntextarea.materialize-textarea {\n  overflow-y: hidden;\n  /* prevents scroll bar flash */\n  padding: .8rem 0 1.6rem 0;\n  /* prevents text jump on Enter keypress */\n  resize: none;\n  min-height: 3rem;\n}\n\n.hiddendiv {\n  display: none;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n  overflow-wrap: break-word;\n  /* future version of deprecated 'word-wrap' */\n  padding-top: 1.2rem;\n  /* prevents text jump on Enter keypress */\n}\n\n/* Autocomplete */\n.autocomplete-content {\n  margin-top: -15px;\n  display: block;\n  opacity: 1;\n  position: static;\n}\n\n.autocomplete-content li .highlight {\n  color: #444;\n}\n\n.autocomplete-content li img {\n  height: 40px;\n  width: 40px;\n  margin: 5px 15px;\n}\n\n/* Radio Buttons\n   ========================================================================== */\n[type=\"radio\"]:not(:checked),\n[type=\"radio\"]:checked {\n  position: absolute;\n  left: -9999px;\n  opacity: 0;\n}\n\n[type=\"radio\"]:not(:checked) + label,\n[type=\"radio\"]:checked + label {\n  position: relative;\n  padding-left: 35px;\n  cursor: pointer;\n  display: inline-block;\n  height: 25px;\n  line-height: 25px;\n  font-size: 1rem;\n  transition: .28s ease;\n  /* webkit (konqueror) browsers */\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n[type=\"radio\"] + label:before,\n[type=\"radio\"] + label:after {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 0;\n  margin: 4px;\n  width: 16px;\n  height: 16px;\n  z-index: 0;\n  transition: .28s ease;\n}\n\n/* Unchecked styles */\n[type=\"radio\"]:not(:checked) + label:before,\n[type=\"radio\"]:not(:checked) + label:after,\n[type=\"radio\"]:checked + label:before,\n[type=\"radio\"]:checked + label:after,\n[type=\"radio\"].with-gap:checked + label:before,\n[type=\"radio\"].with-gap:checked + label:after {\n  border-radius: 50%;\n}\n\n[type=\"radio\"]:not(:checked) + label:before,\n[type=\"radio\"]:not(:checked) + label:after {\n  border: 2px solid #5a5a5a;\n}\n\n[type=\"radio\"]:not(:checked) + label:after {\n  z-index: -1;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n}\n\n/* Checked styles */\n[type=\"radio\"]:checked + label:before {\n  border: 2px solid transparent;\n}\n\n[type=\"radio\"]:checked + label:after,\n[type=\"radio\"].with-gap:checked + label:before,\n[type=\"radio\"].with-gap:checked + label:after {\n  border: 2px solid #26a69a;\n}\n\n[type=\"radio\"]:checked + label:after,\n[type=\"radio\"].with-gap:checked + label:after {\n  background-color: #26a69a;\n  z-index: 0;\n}\n\n[type=\"radio\"]:checked + label:after {\n  -webkit-transform: scale(1.02);\n          transform: scale(1.02);\n}\n\n/* Radio With gap */\n[type=\"radio\"].with-gap:checked + label:after {\n  -webkit-transform: scale(0.5);\n          transform: scale(0.5);\n}\n\n/* Focused styles */\n[type=\"radio\"].tabbed:focus + label:before {\n  box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.1);\n}\n\n/* Disabled Radio With gap */\n[type=\"radio\"].with-gap:disabled:checked + label:before {\n  border: 2px solid rgba(0, 0, 0, 0.26);\n}\n\n[type=\"radio\"].with-gap:disabled:checked + label:after {\n  border: none;\n  background-color: rgba(0, 0, 0, 0.26);\n}\n\n/* Disabled style */\n[type=\"radio\"]:disabled:not(:checked) + label:before,\n[type=\"radio\"]:disabled:checked + label:before {\n  background-color: transparent;\n  border-color: rgba(0, 0, 0, 0.26);\n}\n\n[type=\"radio\"]:disabled + label {\n  color: rgba(0, 0, 0, 0.26);\n}\n\n[type=\"radio\"]:disabled:not(:checked) + label:before {\n  border-color: rgba(0, 0, 0, 0.26);\n}\n\n[type=\"radio\"]:disabled:checked + label:after {\n  background-color: rgba(0, 0, 0, 0.26);\n  border-color: #BDBDBD;\n}\n\n/* Checkboxes\n   ========================================================================== */\n/* CUSTOM CSS CHECKBOXES */\nform p {\n  margin-bottom: 10px;\n  text-align: left;\n}\n\nform p:last-child {\n  margin-bottom: 0;\n}\n\n/* Remove default checkbox */\n[type=\"checkbox\"]:not(:checked),\n[type=\"checkbox\"]:checked {\n  position: absolute;\n  left: -9999px;\n  opacity: 0;\n}\n\n[type=\"checkbox\"] {\n  /* checkbox aspect */\n}\n\n[type=\"checkbox\"] + label {\n  position: relative;\n  padding-left: 35px;\n  cursor: pointer;\n  display: inline-block;\n  height: 25px;\n  line-height: 25px;\n  font-size: 1rem;\n  -webkit-user-select: none;\n  /* webkit (safari, chrome) browsers */\n  -moz-user-select: none;\n  /* mozilla browsers */\n  -khtml-user-select: none;\n  /* webkit (konqueror) browsers */\n  -ms-user-select: none;\n  /* IE10+ */\n}\n\n[type=\"checkbox\"] + label:before,\n[type=\"checkbox\"]:not(.filled-in) + label:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 18px;\n  height: 18px;\n  z-index: 0;\n  border: 2px solid #5a5a5a;\n  border-radius: 1px;\n  margin-top: 2px;\n  transition: .2s;\n}\n\n[type=\"checkbox\"]:not(.filled-in) + label:after {\n  border: 0;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n}\n\n[type=\"checkbox\"]:not(:checked):disabled + label:before {\n  border: none;\n  background-color: rgba(0, 0, 0, 0.26);\n}\n\n[type=\"checkbox\"].tabbed:focus + label:after {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n  border: 0;\n  border-radius: 50%;\n  box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.1);\n  background-color: rgba(0, 0, 0, 0.1);\n}\n\n[type=\"checkbox\"]:checked + label:before {\n  top: -4px;\n  left: -5px;\n  width: 12px;\n  height: 22px;\n  border-top: 2px solid transparent;\n  border-left: 2px solid transparent;\n  border-right: 2px solid #26a69a;\n  border-bottom: 2px solid #26a69a;\n  -webkit-transform: rotate(40deg);\n          transform: rotate(40deg);\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  -webkit-transform-origin: 100% 100%;\n          transform-origin: 100% 100%;\n}\n\n[type=\"checkbox\"]:checked:disabled + label:before {\n  border-right: 2px solid rgba(0, 0, 0, 0.26);\n  border-bottom: 2px solid rgba(0, 0, 0, 0.26);\n}\n\n/* Indeterminate checkbox */\n[type=\"checkbox\"]:indeterminate + label:before {\n  top: -11px;\n  left: -12px;\n  width: 10px;\n  height: 22px;\n  border-top: none;\n  border-left: none;\n  border-right: 2px solid #26a69a;\n  border-bottom: none;\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  -webkit-transform-origin: 100% 100%;\n          transform-origin: 100% 100%;\n}\n\n[type=\"checkbox\"]:indeterminate:disabled + label:before {\n  border-right: 2px solid rgba(0, 0, 0, 0.26);\n  background-color: transparent;\n}\n\n[type=\"checkbox\"].filled-in + label:after {\n  border-radius: 2px;\n}\n\n[type=\"checkbox\"].filled-in + label:before,\n[type=\"checkbox\"].filled-in + label:after {\n  content: '';\n  left: 0;\n  position: absolute;\n  /* .1s delay is for check animation */\n  transition: border .25s, background-color .25s, width .20s .1s, height .20s .1s, top .20s .1s, left .20s .1s;\n  z-index: 1;\n}\n\n[type=\"checkbox\"].filled-in:not(:checked) + label:before {\n  width: 0;\n  height: 0;\n  border: 3px solid transparent;\n  left: 6px;\n  top: 10px;\n  -webkit-transform: rotateZ(37deg);\n  transform: rotateZ(37deg);\n  -webkit-transform-origin: 20% 40%;\n  transform-origin: 100% 100%;\n}\n\n[type=\"checkbox\"].filled-in:not(:checked) + label:after {\n  height: 20px;\n  width: 20px;\n  background-color: transparent;\n  border: 2px solid #5a5a5a;\n  top: 0px;\n  z-index: 0;\n}\n\n[type=\"checkbox\"].filled-in:checked + label:before {\n  top: 0;\n  left: 1px;\n  width: 8px;\n  height: 13px;\n  border-top: 2px solid transparent;\n  border-left: 2px solid transparent;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  -webkit-transform: rotateZ(37deg);\n  transform: rotateZ(37deg);\n  -webkit-transform-origin: 100% 100%;\n  transform-origin: 100% 100%;\n}\n\n[type=\"checkbox\"].filled-in:checked + label:after {\n  top: 0;\n  width: 20px;\n  height: 20px;\n  border: 2px solid #26a69a;\n  background-color: #26a69a;\n  z-index: 0;\n}\n\n[type=\"checkbox\"].filled-in.tabbed:focus + label:after {\n  border-radius: 2px;\n  border-color: #5a5a5a;\n  background-color: rgba(0, 0, 0, 0.1);\n}\n\n[type=\"checkbox\"].filled-in.tabbed:checked:focus + label:after {\n  border-radius: 2px;\n  background-color: #26a69a;\n  border-color: #26a69a;\n}\n\n[type=\"checkbox\"].filled-in:disabled:not(:checked) + label:before {\n  background-color: transparent;\n  border: 2px solid transparent;\n}\n\n[type=\"checkbox\"].filled-in:disabled:not(:checked) + label:after {\n  border-color: transparent;\n  background-color: #BDBDBD;\n}\n\n[type=\"checkbox\"].filled-in:disabled:checked + label:before {\n  background-color: transparent;\n}\n\n[type=\"checkbox\"].filled-in:disabled:checked + label:after {\n  background-color: #BDBDBD;\n  border-color: #BDBDBD;\n}\n\n/* Switch\n   ========================================================================== */\n.switch,\n.switch * {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -khtml-user-select: none;\n  -ms-user-select: none;\n}\n\n.switch label {\n  cursor: pointer;\n}\n\n.switch label input[type=checkbox] {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n\n.switch label input[type=checkbox]:checked + .lever {\n  background-color: #84c7c1;\n}\n\n.switch label input[type=checkbox]:checked + .lever:after {\n  background-color: #26a69a;\n  left: 24px;\n}\n\n.switch label .lever {\n  content: \"\";\n  display: inline-block;\n  position: relative;\n  width: 40px;\n  height: 15px;\n  background-color: #818181;\n  border-radius: 15px;\n  margin-right: 10px;\n  transition: background 0.3s ease;\n  vertical-align: middle;\n  margin: 0 16px;\n}\n\n.switch label .lever:after {\n  content: \"\";\n  position: absolute;\n  display: inline-block;\n  width: 21px;\n  height: 21px;\n  background-color: #F1F1F1;\n  border-radius: 21px;\n  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.4);\n  left: -5px;\n  top: -3px;\n  transition: left 0.3s ease, background .3s ease, box-shadow 0.1s ease;\n}\n\ninput[type=checkbox]:checked:not(:disabled) ~ .lever:active::after,\ninput[type=checkbox]:checked:not(:disabled).tabbed:focus ~ .lever::after {\n  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.4), 0 0 0 15px rgba(38, 166, 154, 0.1);\n}\n\ninput[type=checkbox]:not(:disabled) ~ .lever:active:after,\ninput[type=checkbox]:not(:disabled).tabbed:focus ~ .lever::after {\n  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.4), 0 0 0 15px rgba(0, 0, 0, 0.08);\n}\n\n.switch input[type=checkbox][disabled] + .lever {\n  cursor: default;\n}\n\n.switch label input[type=checkbox][disabled] + .lever:after,\n.switch label input[type=checkbox][disabled]:checked + .lever:after {\n  background-color: #BDBDBD;\n}\n\n/* Select Field\n   ========================================================================== */\nselect {\n  display: none;\n}\n\nselect.browser-default {\n  display: block;\n}\n\nselect {\n  background-color: rgba(255, 255, 255, 0.9);\n  width: 100%;\n  padding: 5px;\n  border: 1px solid #f2f2f2;\n  border-radius: 2px;\n  height: 3rem;\n}\n\n.select-label {\n  position: absolute;\n}\n\n.select-wrapper {\n  position: relative;\n}\n\n.select-wrapper input.select-dropdown {\n  position: relative;\n  cursor: pointer;\n  background-color: transparent;\n  border: none;\n  border-bottom: 1px solid #9e9e9e;\n  outline: none;\n  height: 3rem;\n  line-height: 3rem;\n  width: 100%;\n  font-size: 1rem;\n  margin: 0 0 20px 0;\n  padding: 0;\n  display: block;\n}\n\n.select-wrapper span.caret {\n  color: initial;\n  position: absolute;\n  right: 0;\n  top: 16px;\n  font-size: 10px;\n}\n\n.select-wrapper span.caret.disabled {\n  color: rgba(0, 0, 0, 0.26);\n}\n\n.select-wrapper + label {\n  position: absolute;\n  top: -14px;\n  font-size: 0.8rem;\n}\n\nselect:disabled {\n  color: rgba(0, 0, 0, 0.3);\n}\n\n.select-wrapper input.select-dropdown:disabled {\n  color: rgba(0, 0, 0, 0.3);\n  cursor: default;\n  -webkit-user-select: none;\n  /* webkit (safari, chrome) browsers */\n  -moz-user-select: none;\n  /* mozilla browsers */\n  -ms-user-select: none;\n  /* IE10+ */\n  border-bottom: 1px solid rgba(0, 0, 0, 0.3);\n}\n\n.select-wrapper i {\n  color: rgba(0, 0, 0, 0.3);\n}\n\n.select-dropdown li.disabled,\n.select-dropdown li.disabled > span,\n.select-dropdown li.optgroup {\n  color: rgba(0, 0, 0, 0.3);\n  background-color: transparent;\n}\n\n.prefix ~ .select-wrapper {\n  margin-left: 3rem;\n  width: 92%;\n  width: calc(100% - 3rem);\n}\n\n.prefix ~ label {\n  margin-left: 3rem;\n}\n\n.select-dropdown li img {\n  height: 40px;\n  width: 40px;\n  margin: 5px 15px;\n  float: right;\n}\n\n.select-dropdown li.optgroup {\n  border-top: 1px solid #eee;\n}\n\n.select-dropdown li.optgroup.selected > span {\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.select-dropdown li.optgroup > span {\n  color: rgba(0, 0, 0, 0.4);\n}\n\n.select-dropdown li.optgroup ~ li.optgroup-option {\n  padding-left: 1rem;\n}\n\n/* File Input\n   ========================================================================== */\n.file-field {\n  position: relative;\n}\n\n.file-field .file-path-wrapper {\n  overflow: hidden;\n  padding-left: 10px;\n}\n\n.file-field input.file-path {\n  width: 100%;\n}\n\n.file-field .btn, .file-field .btn-large {\n  float: left;\n  height: 3rem;\n  line-height: 3rem;\n}\n\n.file-field span {\n  cursor: pointer;\n}\n\n.file-field input[type=file] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  font-size: 20px;\n  cursor: pointer;\n  opacity: 0;\n  filter: alpha(opacity=0);\n}\n\n/* Range\n   ========================================================================== */\n.range-field {\n  position: relative;\n}\n\ninput[type=range],\ninput[type=range] + .thumb {\n  cursor: pointer;\n}\n\ninput[type=range] {\n  position: relative;\n  background-color: transparent;\n  border: none;\n  outline: none;\n  width: 100%;\n  margin: 15px 0;\n  padding: 0;\n}\n\ninput[type=range]:focus {\n  outline: none;\n}\n\ninput[type=range] + .thumb {\n  position: absolute;\n  border: none;\n  height: 0;\n  width: 0;\n  border-radius: 50%;\n  background-color: #26a69a;\n  top: 10px;\n  margin-left: -6px;\n  -webkit-transform-origin: 50% 50%;\n          transform-origin: 50% 50%;\n  -webkit-transform: rotate(-45deg);\n          transform: rotate(-45deg);\n}\n\ninput[type=range] + .thumb .value {\n  display: block;\n  width: 30px;\n  text-align: center;\n  color: #26a69a;\n  font-size: 0;\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n}\n\ninput[type=range] + .thumb.active {\n  border-radius: 50% 50% 50% 0;\n}\n\ninput[type=range] + .thumb.active .value {\n  color: #fff;\n  margin-left: -1px;\n  margin-top: 8px;\n  font-size: 10px;\n}\n\ninput[type=range] {\n  -webkit-appearance: none;\n}\n\ninput[type=range]::-webkit-slider-runnable-track {\n  height: 3px;\n  background: #c2c0c2;\n  border: none;\n}\n\ninput[type=range]::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  border: none;\n  height: 14px;\n  width: 14px;\n  border-radius: 50%;\n  background-color: #26a69a;\n  -webkit-transform-origin: 50% 50%;\n          transform-origin: 50% 50%;\n  margin: -5px 0 0 0;\n  transition: .3s;\n}\n\ninput[type=range]:focus::-webkit-slider-runnable-track {\n  background: #ccc;\n}\n\ninput[type=range] {\n  /* fix for FF unable to apply focus style bug  */\n  border: 1px solid white;\n  /*required for proper track sizing in FF*/\n}\n\ninput[type=range]::-moz-range-track {\n  height: 3px;\n  background: #ddd;\n  border: none;\n}\n\ninput[type=range]::-moz-range-thumb {\n  border: none;\n  height: 14px;\n  width: 14px;\n  border-radius: 50%;\n  background: #26a69a;\n  margin-top: -5px;\n}\n\ninput[type=range]:-moz-focusring {\n  outline: 1px solid #fff;\n  outline-offset: -1px;\n}\n\ninput[type=range]:focus::-moz-range-track {\n  background: #ccc;\n}\n\ninput[type=range]::-ms-track {\n  height: 3px;\n  background: transparent;\n  border-color: transparent;\n  border-width: 6px 0;\n  /*remove default tick marks*/\n  color: transparent;\n}\n\ninput[type=range]::-ms-fill-lower {\n  background: #777;\n}\n\ninput[type=range]::-ms-fill-upper {\n  background: #ddd;\n}\n\ninput[type=range]::-ms-thumb {\n  border: none;\n  height: 14px;\n  width: 14px;\n  border-radius: 50%;\n  background: #26a69a;\n}\n\ninput[type=range]:focus::-ms-fill-lower {\n  background: #888;\n}\n\ninput[type=range]:focus::-ms-fill-upper {\n  background: #ccc;\n}\n\n/***************\n    Nav List\n***************/\n.table-of-contents.fixed {\n  position: fixed;\n}\n\n.table-of-contents li {\n  padding: 2px 0;\n}\n\n.table-of-contents a {\n  display: inline-block;\n  font-weight: 300;\n  color: #757575;\n  padding-left: 20px;\n  height: 1.5rem;\n  line-height: 1.5rem;\n  letter-spacing: .4;\n  display: inline-block;\n}\n\n.table-of-contents a:hover {\n  color: #a8a8a8;\n  padding-left: 19px;\n  border-left: 1px solid #ea4a4f;\n}\n\n.table-of-contents a.active {\n  font-weight: 500;\n  padding-left: 18px;\n  border-left: 2px solid #ea4a4f;\n}\n\n.side-nav {\n  position: fixed;\n  width: 300px;\n  left: 0;\n  top: 0;\n  margin: 0;\n  -webkit-transform: translateX(-100%);\n          transform: translateX(-100%);\n  height: 100%;\n  height: calc(100% + 60px);\n  height: -moz-calc(100%);\n  padding-bottom: 60px;\n  background-color: #fff;\n  z-index: 999;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  overflow-y: auto;\n  will-change: transform;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  -webkit-transform: translateX(-105%);\n          transform: translateX(-105%);\n}\n\n.side-nav.right-aligned {\n  right: 0;\n  -webkit-transform: translateX(105%);\n          transform: translateX(105%);\n  left: auto;\n  -webkit-transform: translateX(100%);\n          transform: translateX(100%);\n}\n\n.side-nav .collapsible {\n  margin: 0;\n}\n\n.side-nav li {\n  float: none;\n  line-height: 48px;\n}\n\n.side-nav li.active {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n\n.side-nav a {\n  color: rgba(0, 0, 0, 0.87);\n  display: block;\n  font-size: 14px;\n  font-weight: 500;\n  height: 48px;\n  line-height: 48px;\n  padding: 0 32px;\n}\n\n.side-nav a:hover {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n\n.side-nav a.btn, .side-nav a.btn-large, .side-nav a.btn-large, .side-nav a.btn-flat, .side-nav a.btn-floating {\n  margin: 10px 15px;\n}\n\n.side-nav a.btn, .side-nav a.btn-large, .side-nav a.btn-large, .side-nav a.btn-floating {\n  color: #fff;\n}\n\n.side-nav a.btn-flat {\n  color: #343434;\n}\n\n.side-nav a.btn:hover, .side-nav a.btn-large:hover, .side-nav a.btn-large:hover {\n  background-color: #2bbbad;\n}\n\n.side-nav a.btn-floating:hover {\n  background-color: #26a69a;\n}\n\n.side-nav li > a > i,\n.side-nav li > a > [class^=\"mdi-\"], .side-nav li > a > [class*=\"mdi-\"],\n.side-nav li > a > i.material-icons {\n  float: left;\n  line-height: 48px;\n  margin: 0 32px 0 0;\n  width: 24px;\n  color: rgba(0, 0, 0, 0.54);\n}\n\n.side-nav .divider {\n  margin: 8px 0 0 0;\n}\n\n.side-nav .subheader {\n  cursor: initial;\n  pointer-events: none;\n  color: rgba(0, 0, 0, 0.54);\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 48px;\n}\n\n.side-nav .subheader:hover {\n  background-color: transparent;\n}\n\n.side-nav .userView {\n  overflow: hidden;\n  position: relative;\n  padding: 32px 32px 0;\n  margin-bottom: 8px;\n}\n\n.side-nav .userView a {\n  height: auto;\n  padding: 0;\n}\n\n.side-nav .userView a:hover {\n  background-color: transparent;\n}\n\n.side-nav .userView .background {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: -1;\n}\n\n.side-nav .userView .circle, .side-nav .userView .name, .side-nav .userView .email {\n  display: block;\n}\n\n.side-nav .userView .circle {\n  height: 64px;\n  width: 64px;\n}\n\n.side-nav .userView .name,\n.side-nav .userView .email {\n  font-weight: 14px;\n  line-height: 24px;\n}\n\n.side-nav .userView .name {\n  margin-top: 16px;\n  font-weight: 500;\n}\n\n.side-nav .userView .email {\n  padding-bottom: 16px;\n  font-weight: 400;\n}\n\n.drag-target {\n  height: 100%;\n  width: 10px;\n  position: fixed;\n  top: 0;\n  z-index: 998;\n}\n\n.side-nav.fixed a {\n  display: block;\n  padding: 0 16px;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.side-nav.fixed {\n  left: 0;\n  -webkit-transform: translateX(0);\n          transform: translateX(0);\n  position: fixed;\n}\n\n.side-nav.fixed.right-aligned {\n  right: 0;\n  left: auto;\n}\n\n@media only screen and (max-width: 992px) {\n  .side-nav.fixed {\n    -webkit-transform: translateX(-105%);\n            transform: translateX(-105%);\n  }\n  .side-nav.fixed.right-aligned {\n    -webkit-transform: translateX(105%);\n            transform: translateX(105%);\n  }\n  .side-nav a {\n    padding: 0 16px;\n  }\n  .side-nav .userView {\n    padding: 16px 16px 0;\n  }\n}\n\n.side-nav .collapsible-body li.active,\n.side-nav.fixed .collapsible-body li.active {\n  background-color: #ee6e73;\n}\n\n.side-nav .collapsible-body li.active a,\n.side-nav.fixed .collapsible-body li.active a {\n  color: #fff;\n}\n\n#sidenav-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 120vh;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 997;\n  will-change: opacity;\n}\n\n/*\n    @license\n    Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n    This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n    The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n    The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n    Code distributed by Google as part of the polymer project is also\n    subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n/**************************/\n/* STYLES FOR THE SPINNER */\n/**************************/\n/*\n * Constants:\n *      STROKEWIDTH = 3px\n *      ARCSIZE     = 270 degrees (amount of circle the arc takes up)\n *      ARCTIME     = 1333ms (time it takes to expand and contract arc)\n *      ARCSTARTROT = 216 degrees (how much the start location of the arc\n *                                should rotate each time, 216 gives us a\n *                                5 pointed star shape (it's 360/5 * 3).\n *                                For a 7 pointed star, we might do\n *                                360/7 * 3 = 154.286)\n *      CONTAINERWIDTH = 28px\n *      SHRINK_TIME = 400ms\n */\n.preloader-wrapper {\n  display: inline-block;\n  position: relative;\n  width: 48px;\n  height: 48px;\n}\n\n.preloader-wrapper.small {\n  width: 36px;\n  height: 36px;\n}\n\n.preloader-wrapper.big {\n  width: 64px;\n  height: 64px;\n}\n\n.preloader-wrapper.active {\n  /* duration: 360 * ARCTIME / (ARCSTARTROT + (360-ARCSIZE)) */\n  -webkit-animation: container-rotate 1568ms linear infinite;\n  animation: container-rotate 1568ms linear infinite;\n}\n\n@-webkit-keyframes container-rotate {\n  to {\n    -webkit-transform: rotate(360deg);\n  }\n}\n\n@keyframes container-rotate {\n  to {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n.spinner-layer {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  border-color: #26a69a;\n}\n\n.spinner-blue,\n.spinner-blue-only {\n  border-color: #4285f4;\n}\n\n.spinner-red,\n.spinner-red-only {\n  border-color: #db4437;\n}\n\n.spinner-yellow,\n.spinner-yellow-only {\n  border-color: #f4b400;\n}\n\n.spinner-green,\n.spinner-green-only {\n  border-color: #0f9d58;\n}\n\n/**\n * IMPORTANT NOTE ABOUT CSS ANIMATION PROPERTIES (keanulee):\n *\n * iOS Safari (tested on iOS 8.1) does not handle animation-delay very well - it doesn't\n * guarantee that the animation will start _exactly_ after that value. So we avoid using\n * animation-delay and instead set custom keyframes for each color (as redundant as it\n * seems).\n *\n * We write out each animation in full (instead of separating animation-name,\n * animation-duration, etc.) because under the polyfill, Safari does not recognize those\n * specific properties properly, treats them as -webkit-animation, and overrides the\n * other animation rules. See https://github.com/Polymer/platform/issues/53.\n */\n.active .spinner-layer.spinner-blue {\n  /* durations: 4 * ARCTIME */\n  -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, blue-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, blue-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n}\n\n.active .spinner-layer.spinner-red {\n  /* durations: 4 * ARCTIME */\n  -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, red-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, red-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n}\n\n.active .spinner-layer.spinner-yellow {\n  /* durations: 4 * ARCTIME */\n  -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, yellow-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, yellow-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n}\n\n.active .spinner-layer.spinner-green {\n  /* durations: 4 * ARCTIME */\n  -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, green-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, green-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n}\n\n.active .spinner-layer,\n.active .spinner-layer.spinner-blue-only,\n.active .spinner-layer.spinner-red-only,\n.active .spinner-layer.spinner-yellow-only,\n.active .spinner-layer.spinner-green-only {\n  /* durations: 4 * ARCTIME */\n  opacity: 1;\n  -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n}\n\n@-webkit-keyframes fill-unfill-rotate {\n  12.5% {\n    -webkit-transform: rotate(135deg);\n  }\n  /* 0.5 * ARCSIZE */\n  25% {\n    -webkit-transform: rotate(270deg);\n  }\n  /* 1   * ARCSIZE */\n  37.5% {\n    -webkit-transform: rotate(405deg);\n  }\n  /* 1.5 * ARCSIZE */\n  50% {\n    -webkit-transform: rotate(540deg);\n  }\n  /* 2   * ARCSIZE */\n  62.5% {\n    -webkit-transform: rotate(675deg);\n  }\n  /* 2.5 * ARCSIZE */\n  75% {\n    -webkit-transform: rotate(810deg);\n  }\n  /* 3   * ARCSIZE */\n  87.5% {\n    -webkit-transform: rotate(945deg);\n  }\n  /* 3.5 * ARCSIZE */\n  to {\n    -webkit-transform: rotate(1080deg);\n  }\n  /* 4   * ARCSIZE */\n}\n\n@keyframes fill-unfill-rotate {\n  12.5% {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg);\n  }\n  /* 0.5 * ARCSIZE */\n  25% {\n    -webkit-transform: rotate(270deg);\n            transform: rotate(270deg);\n  }\n  /* 1   * ARCSIZE */\n  37.5% {\n    -webkit-transform: rotate(405deg);\n            transform: rotate(405deg);\n  }\n  /* 1.5 * ARCSIZE */\n  50% {\n    -webkit-transform: rotate(540deg);\n            transform: rotate(540deg);\n  }\n  /* 2   * ARCSIZE */\n  62.5% {\n    -webkit-transform: rotate(675deg);\n            transform: rotate(675deg);\n  }\n  /* 2.5 * ARCSIZE */\n  75% {\n    -webkit-transform: rotate(810deg);\n            transform: rotate(810deg);\n  }\n  /* 3   * ARCSIZE */\n  87.5% {\n    -webkit-transform: rotate(945deg);\n            transform: rotate(945deg);\n  }\n  /* 3.5 * ARCSIZE */\n  to {\n    -webkit-transform: rotate(1080deg);\n            transform: rotate(1080deg);\n  }\n  /* 4   * ARCSIZE */\n}\n\n@-webkit-keyframes blue-fade-in-out {\n  from {\n    opacity: 1;\n  }\n  25% {\n    opacity: 1;\n  }\n  26% {\n    opacity: 0;\n  }\n  89% {\n    opacity: 0;\n  }\n  90% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n@keyframes blue-fade-in-out {\n  from {\n    opacity: 1;\n  }\n  25% {\n    opacity: 1;\n  }\n  26% {\n    opacity: 0;\n  }\n  89% {\n    opacity: 0;\n  }\n  90% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n@-webkit-keyframes red-fade-in-out {\n  from {\n    opacity: 0;\n  }\n  15% {\n    opacity: 0;\n  }\n  25% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 1;\n  }\n  51% {\n    opacity: 0;\n  }\n}\n\n@keyframes red-fade-in-out {\n  from {\n    opacity: 0;\n  }\n  15% {\n    opacity: 0;\n  }\n  25% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 1;\n  }\n  51% {\n    opacity: 0;\n  }\n}\n\n@-webkit-keyframes yellow-fade-in-out {\n  from {\n    opacity: 0;\n  }\n  40% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 1;\n  }\n  75% {\n    opacity: 1;\n  }\n  76% {\n    opacity: 0;\n  }\n}\n\n@keyframes yellow-fade-in-out {\n  from {\n    opacity: 0;\n  }\n  40% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 1;\n  }\n  75% {\n    opacity: 1;\n  }\n  76% {\n    opacity: 0;\n  }\n}\n\n@-webkit-keyframes green-fade-in-out {\n  from {\n    opacity: 0;\n  }\n  65% {\n    opacity: 0;\n  }\n  75% {\n    opacity: 1;\n  }\n  90% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n\n@keyframes green-fade-in-out {\n  from {\n    opacity: 0;\n  }\n  65% {\n    opacity: 0;\n  }\n  75% {\n    opacity: 1;\n  }\n  90% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n\n/**\n * Patch the gap that appear between the two adjacent div.circle-clipper while the\n * spinner is rotating (appears on Chrome 38, Safari 7.1, and IE 11).\n */\n.gap-patch {\n  position: absolute;\n  top: 0;\n  left: 45%;\n  width: 10%;\n  height: 100%;\n  overflow: hidden;\n  border-color: inherit;\n}\n\n.gap-patch .circle {\n  width: 1000%;\n  left: -450%;\n}\n\n.circle-clipper {\n  display: inline-block;\n  position: relative;\n  width: 50%;\n  height: 100%;\n  overflow: hidden;\n  border-color: inherit;\n}\n\n.circle-clipper .circle {\n  width: 200%;\n  height: 100%;\n  border-width: 3px;\n  /* STROKEWIDTH */\n  border-style: solid;\n  border-color: inherit;\n  border-bottom-color: transparent !important;\n  border-radius: 50%;\n  -webkit-animation: none;\n  animation: none;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n}\n\n.circle-clipper.left .circle {\n  left: 0;\n  border-right-color: transparent !important;\n  -webkit-transform: rotate(129deg);\n  transform: rotate(129deg);\n}\n\n.circle-clipper.right .circle {\n  left: -100%;\n  border-left-color: transparent !important;\n  -webkit-transform: rotate(-129deg);\n  transform: rotate(-129deg);\n}\n\n.active .circle-clipper.left .circle {\n  /* duration: ARCTIME */\n  -webkit-animation: left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n}\n\n.active .circle-clipper.right .circle {\n  /* duration: ARCTIME */\n  -webkit-animation: right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n}\n\n@-webkit-keyframes left-spin {\n  from {\n    -webkit-transform: rotate(130deg);\n  }\n  50% {\n    -webkit-transform: rotate(-5deg);\n  }\n  to {\n    -webkit-transform: rotate(130deg);\n  }\n}\n\n@keyframes left-spin {\n  from {\n    -webkit-transform: rotate(130deg);\n            transform: rotate(130deg);\n  }\n  50% {\n    -webkit-transform: rotate(-5deg);\n            transform: rotate(-5deg);\n  }\n  to {\n    -webkit-transform: rotate(130deg);\n            transform: rotate(130deg);\n  }\n}\n\n@-webkit-keyframes right-spin {\n  from {\n    -webkit-transform: rotate(-130deg);\n  }\n  50% {\n    -webkit-transform: rotate(5deg);\n  }\n  to {\n    -webkit-transform: rotate(-130deg);\n  }\n}\n\n@keyframes right-spin {\n  from {\n    -webkit-transform: rotate(-130deg);\n            transform: rotate(-130deg);\n  }\n  50% {\n    -webkit-transform: rotate(5deg);\n            transform: rotate(5deg);\n  }\n  to {\n    -webkit-transform: rotate(-130deg);\n            transform: rotate(-130deg);\n  }\n}\n\n#spinnerContainer.cooldown {\n  /* duration: SHRINK_TIME */\n  -webkit-animation: container-rotate 1568ms linear infinite, fade-out 400ms cubic-bezier(0.4, 0, 0.2, 1);\n  animation: container-rotate 1568ms linear infinite, fade-out 400ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n@-webkit-keyframes fade-out {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n@keyframes fade-out {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n.slider {\n  position: relative;\n  height: 400px;\n  width: 100%;\n}\n\n.slider.fullscreen {\n  height: 100%;\n  width: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n\n.slider.fullscreen ul.slides {\n  height: 100%;\n}\n\n.slider.fullscreen ul.indicators {\n  z-index: 2;\n  bottom: 30px;\n}\n\n.slider .slides {\n  background-color: #9e9e9e;\n  margin: 0;\n  height: 400px;\n}\n\n.slider .slides li {\n  opacity: 0;\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1;\n  width: 100%;\n  height: inherit;\n  overflow: hidden;\n}\n\n.slider .slides li img {\n  height: 100%;\n  width: 100%;\n  background-size: cover;\n  background-position: center;\n}\n\n.slider .slides li .caption {\n  color: #fff;\n  position: absolute;\n  top: 15%;\n  left: 15%;\n  width: 70%;\n  opacity: 0;\n}\n\n.slider .slides li .caption p {\n  color: #e0e0e0;\n}\n\n.slider .slides li.active {\n  z-index: 2;\n}\n\n.slider .indicators {\n  position: absolute;\n  text-align: center;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin: 0;\n}\n\n.slider .indicators .indicator-item {\n  display: inline-block;\n  position: relative;\n  cursor: pointer;\n  height: 16px;\n  width: 16px;\n  margin: 0 12px;\n  background-color: #e0e0e0;\n  transition: background-color .3s;\n  border-radius: 50%;\n}\n\n.slider .indicators .indicator-item.active {\n  background-color: #4CAF50;\n}\n\n.carousel {\n  overflow: hidden;\n  position: relative;\n  width: 100%;\n  height: 400px;\n  -webkit-perspective: 500px;\n          perspective: 500px;\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d;\n  -webkit-transform-origin: 0% 50%;\n          transform-origin: 0% 50%;\n}\n\n.carousel.carousel-slider {\n  top: 0;\n  left: 0;\n  height: 0;\n}\n\n.carousel.carousel-slider .carousel-fixed-item {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 20px;\n  z-index: 1;\n}\n\n.carousel.carousel-slider .carousel-fixed-item.with-indicators {\n  bottom: 68px;\n}\n\n.carousel.carousel-slider .carousel-item {\n  width: 100%;\n  height: 100%;\n  min-height: 400px;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n.carousel.carousel-slider .carousel-item h2 {\n  font-size: 24px;\n  font-weight: 500;\n  line-height: 32px;\n}\n\n.carousel.carousel-slider .carousel-item p {\n  font-size: 15px;\n}\n\n.carousel .carousel-item {\n  display: none;\n  width: 200px;\n  height: 400px;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n.carousel .carousel-item img {\n  width: 100%;\n}\n\n.carousel .indicators {\n  position: absolute;\n  text-align: center;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin: 0;\n}\n\n.carousel .indicators .indicator-item {\n  display: inline-block;\n  position: relative;\n  cursor: pointer;\n  height: 8px;\n  width: 8px;\n  margin: 24px 4px;\n  background-color: rgba(255, 255, 255, 0.5);\n  transition: background-color .3s;\n  border-radius: 50%;\n}\n\n.carousel .indicators .indicator-item.active {\n  background-color: #fff;\n}\n\n/* ==========================================================================\n   $BASE-PICKER\n   ========================================================================== */\n/**\n * Note: the root picker element should *NOT* be styled more than what's here.\n */\n.picker {\n  font-size: 16px;\n  text-align: left;\n  line-height: 1.2;\n  color: #000000;\n  position: absolute;\n  z-index: 10000;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n/**\n * The picker input element.\n */\n.picker__input {\n  cursor: default;\n}\n\n/**\n * When the picker is opened, the input element is \"activated\".\n */\n.picker__input.picker__input--active {\n  border-color: #0089ec;\n}\n\n/**\n * The holder is the only \"scrollable\" top-level container element.\n */\n.picker__holder {\n  width: 100%;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n}\n\n/*!\n * Default mobile-first, responsive styling for pickadate.js\n * Demo: http://amsul.github.io/pickadate.js\n */\n/**\n * Note: the root picker element should *NOT* be styled more than what's here.\n */\n/**\n * Make the holder and frame fullscreen.\n */\n.picker__holder,\n.picker__frame {\n  bottom: 0;\n  left: 0;\n  right: 0;\n  top: 100%;\n}\n\n/**\n * The holder should overlay the entire screen.\n */\n.picker__holder {\n  position: fixed;\n  transition: background 0.15s ease-out, top 0s 0.15s;\n  -webkit-backface-visibility: hidden;\n}\n\n/**\n * The frame that bounds the box contents of the picker.\n */\n.picker__frame {\n  position: absolute;\n  margin: 0 auto;\n  min-width: 256px;\n  width: 300px;\n  max-height: 350px;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n  filter: alpha(opacity=0);\n  -moz-opacity: 0;\n  opacity: 0;\n  transition: all 0.15s ease-out;\n}\n\n@media (min-height: 28.875em) {\n  .picker__frame {\n    overflow: visible;\n    top: auto;\n    bottom: -100%;\n    max-height: 80%;\n  }\n}\n\n@media (min-height: 40.125em) {\n  .picker__frame {\n    margin-bottom: 7.5%;\n  }\n}\n\n/**\n * The wrapper sets the stage to vertically align the box contents.\n */\n.picker__wrap {\n  display: table;\n  width: 100%;\n  height: 100%;\n}\n\n@media (min-height: 28.875em) {\n  .picker__wrap {\n    display: block;\n  }\n}\n\n/**\n * The box contains all the picker contents.\n */\n.picker__box {\n  background: #ffffff;\n  display: table-cell;\n  vertical-align: middle;\n}\n\n@media (min-height: 28.875em) {\n  .picker__box {\n    display: block;\n    border: 1px solid #777777;\n    border-top-color: #898989;\n    border-bottom-width: 0;\n    border-radius: 5px 5px 0 0;\n    box-shadow: 0 12px 36px 16px rgba(0, 0, 0, 0.24);\n  }\n}\n\n/**\n * When the picker opens...\n */\n.picker--opened .picker__holder {\n  top: 0;\n  background: transparent;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.gradient(startColorstr=#1E000000,endColorstr=#1E000000)\";\n  zoom: 1;\n  background: rgba(0, 0, 0, 0.32);\n  transition: background 0.15s ease-out;\n}\n\n.picker--opened .picker__frame {\n  top: 0;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\";\n  filter: alpha(opacity=100);\n  -moz-opacity: 1;\n  opacity: 1;\n}\n\n@media (min-height: 35.875em) {\n  .picker--opened .picker__frame {\n    top: 10%;\n    bottom: auto;\n  }\n}\n\n/**\n * For `large` screens, transform into an inline picker.\n */\n/* ==========================================================================\n   CUSTOM MATERIALIZE STYLES\n   ========================================================================== */\n.picker__input.picker__input--active {\n  border-color: #E3F2FD;\n}\n\n.picker__frame {\n  margin: 0 auto;\n  max-width: 325px;\n}\n\n@media (min-height: 38.875em) {\n  .picker--opened .picker__frame {\n    top: 10%;\n    bottom: auto;\n  }\n}\n\n/* ==========================================================================\n   $BASE-DATE-PICKER\n   ========================================================================== */\n/**\n * The picker box.\n */\n.picker__box {\n  padding: 0 1em;\n}\n\n/**\n * The header containing the month and year stuff.\n */\n.picker__header {\n  text-align: center;\n  position: relative;\n  margin-top: .75em;\n}\n\n/**\n * The month and year labels.\n */\n.picker__month,\n.picker__year {\n  display: inline-block;\n  margin-left: .25em;\n  margin-right: .25em;\n}\n\n/**\n * The month and year selectors.\n */\n.picker__select--month,\n.picker__select--year {\n  height: 2em;\n  padding: 0;\n  margin-left: .25em;\n  margin-right: .25em;\n}\n\n.picker__select--month.browser-default {\n  display: inline;\n  background-color: #FFFFFF;\n  width: 40%;\n}\n\n.picker__select--year.browser-default {\n  display: inline;\n  background-color: #FFFFFF;\n  width: 26%;\n}\n\n.picker__select--month:focus,\n.picker__select--year:focus {\n  border-color: rgba(0, 0, 0, 0.05);\n}\n\n/**\n * The month navigation buttons.\n */\n.picker__nav--prev,\n.picker__nav--next {\n  position: absolute;\n  padding: .5em 1.25em;\n  width: 1em;\n  height: 1em;\n  box-sizing: content-box;\n  top: -0.25em;\n}\n\n.picker__nav--prev {\n  left: -1em;\n  padding-right: 1.25em;\n}\n\n.picker__nav--next {\n  right: -1em;\n  padding-left: 1.25em;\n}\n\n.picker__nav--disabled,\n.picker__nav--disabled:hover,\n.picker__nav--disabled:before,\n.picker__nav--disabled:before:hover {\n  cursor: default;\n  background: none;\n  border-right-color: #f5f5f5;\n  border-left-color: #f5f5f5;\n}\n\n/**\n * The calendar table of dates\n */\n.picker__table {\n  text-align: center;\n  border-collapse: collapse;\n  border-spacing: 0;\n  table-layout: fixed;\n  font-size: 1rem;\n  width: 100%;\n  margin-top: .75em;\n  margin-bottom: .5em;\n}\n\n.picker__table th, .picker__table td {\n  text-align: center;\n}\n\n.picker__table td {\n  margin: 0;\n  padding: 0;\n}\n\n/**\n * The weekday labels\n */\n.picker__weekday {\n  width: 14.285714286%;\n  font-size: .75em;\n  padding-bottom: .25em;\n  color: #999999;\n  font-weight: 500;\n  /* Increase the spacing a tad */\n}\n\n@media (min-height: 33.875em) {\n  .picker__weekday {\n    padding-bottom: .5em;\n  }\n}\n\n/**\n * The days on the calendar\n */\n.picker__day--today {\n  position: relative;\n  color: #595959;\n  letter-spacing: -.3;\n  padding: .75rem 0;\n  font-weight: 400;\n  border: 1px solid transparent;\n}\n\n.picker__day--disabled:before {\n  border-top-color: #aaaaaa;\n}\n\n.picker__day--infocus:hover {\n  cursor: pointer;\n  color: #000;\n  font-weight: 500;\n}\n\n.picker__day--outfocus {\n  display: none;\n  padding: .75rem 0;\n  color: #fff;\n}\n\n.picker__day--outfocus:hover {\n  cursor: pointer;\n  color: #dddddd;\n  font-weight: 500;\n}\n\n.picker__day--highlighted:hover,\n.picker--focused .picker__day--highlighted {\n  cursor: pointer;\n}\n\n.picker__day--selected,\n.picker__day--selected:hover,\n.picker--focused .picker__day--selected {\n  border-radius: 50%;\n  -webkit-transform: scale(0.75);\n          transform: scale(0.75);\n  background: #0089ec;\n  color: #ffffff;\n}\n\n.picker__day--disabled,\n.picker__day--disabled:hover,\n.picker--focused .picker__day--disabled {\n  background: #f5f5f5;\n  border-color: #f5f5f5;\n  color: #dddddd;\n  cursor: default;\n}\n\n.picker__day--highlighted.picker__day--disabled,\n.picker__day--highlighted.picker__day--disabled:hover {\n  background: #bbbbbb;\n}\n\n/**\n * The footer containing the \"today\", \"clear\", and \"close\" buttons.\n */\n.picker__footer {\n  text-align: center;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n\n.picker__button--today,\n.picker__button--clear,\n.picker__button--close {\n  border: 1px solid #ffffff;\n  background: #ffffff;\n  font-size: .8em;\n  padding: .66em 0;\n  font-weight: bold;\n  width: 33%;\n  display: inline-block;\n  vertical-align: bottom;\n}\n\n.picker__button--today:hover,\n.picker__button--clear:hover,\n.picker__button--close:hover {\n  cursor: pointer;\n  color: #000000;\n  background: #b1dcfb;\n  border-bottom-color: #b1dcfb;\n}\n\n.picker__button--today:focus,\n.picker__button--clear:focus,\n.picker__button--close:focus {\n  background: #b1dcfb;\n  border-color: rgba(0, 0, 0, 0.05);\n  outline: none;\n}\n\n.picker__button--today:before,\n.picker__button--clear:before,\n.picker__button--close:before {\n  position: relative;\n  display: inline-block;\n  height: 0;\n}\n\n.picker__button--today:before,\n.picker__button--clear:before {\n  content: \" \";\n  margin-right: .45em;\n}\n\n.picker__button--today:before {\n  top: -0.05em;\n  width: 0;\n  border-top: 0.66em solid #0059bc;\n  border-left: .66em solid transparent;\n}\n\n.picker__button--clear:before {\n  top: -0.25em;\n  width: .66em;\n  border-top: 3px solid #ee2200;\n}\n\n.picker__button--close:before {\n  content: \"\\D7\";\n  top: -0.1em;\n  vertical-align: top;\n  font-size: 1.1em;\n  margin-right: .35em;\n  color: #777777;\n}\n\n.picker__button--today[disabled],\n.picker__button--today[disabled]:hover {\n  background: #f5f5f5;\n  border-color: #f5f5f5;\n  color: #dddddd;\n  cursor: default;\n}\n\n.picker__button--today[disabled]:before {\n  border-top-color: #aaaaaa;\n}\n\n/* ==========================================================================\n   CUSTOM MATERIALIZE STYLES\n   ========================================================================== */\n.picker__box {\n  border-radius: 2px;\n  overflow: hidden;\n}\n\n.picker__date-display {\n  text-align: center;\n  background-color: #26a69a;\n  color: #fff;\n  padding-bottom: 15px;\n  font-weight: 300;\n}\n\n.picker__nav--prev:hover,\n.picker__nav--next:hover {\n  cursor: pointer;\n  color: #000000;\n  background: #a1ded8;\n}\n\n.picker__weekday-display {\n  background-color: #1f897f;\n  padding: 10px;\n  font-weight: 200;\n  letter-spacing: .5;\n  font-size: 1rem;\n  margin-bottom: 15px;\n}\n\n.picker__month-display {\n  text-transform: uppercase;\n  font-size: 2rem;\n}\n\n.picker__day-display {\n  font-size: 4.5rem;\n  font-weight: 400;\n}\n\n.picker__year-display {\n  font-size: 1.8rem;\n  color: rgba(255, 255, 255, 0.4);\n}\n\n.picker__box {\n  padding: 0;\n}\n\n.picker__calendar-container {\n  padding: 0 1rem;\n}\n\n.picker__calendar-container thead {\n  border: none;\n}\n\n.picker__table {\n  margin-top: 0;\n  margin-bottom: .5em;\n}\n\n.picker__day--infocus {\n  color: #595959;\n  letter-spacing: -.3;\n  padding: .75rem 0;\n  font-weight: 400;\n  border: 1px solid transparent;\n}\n\n.picker__day.picker__day--today {\n  color: #26a69a;\n}\n\n.picker__day.picker__day--today.picker__day--selected {\n  color: #fff;\n}\n\n.picker__weekday {\n  font-size: .9rem;\n}\n\n.picker__day--selected,\n.picker__day--selected:hover,\n.picker--focused .picker__day--selected {\n  border-radius: 50%;\n  -webkit-transform: scale(0.9);\n          transform: scale(0.9);\n  background-color: #26a69a;\n  color: #ffffff;\n}\n\n.picker__day--selected.picker__day--outfocus,\n.picker__day--selected:hover.picker__day--outfocus,\n.picker--focused .picker__day--selected.picker__day--outfocus {\n  background-color: #a1ded8;\n}\n\n.picker__footer {\n  text-align: right;\n  padding: 5px 10px;\n}\n\n.picker__close, .picker__today {\n  font-size: 1.1rem;\n  padding: 0 1rem;\n  color: #26a69a;\n}\n\n.picker__nav--prev:before,\n.picker__nav--next:before {\n  content: \" \";\n  border-top: .5em solid transparent;\n  border-bottom: .5em solid transparent;\n  border-right: 0.75em solid #676767;\n  width: 0;\n  height: 0;\n  display: block;\n  margin: 0 auto;\n}\n\n.picker__nav--next:before {\n  border-right: 0;\n  border-left: 0.75em solid #676767;\n}\n\nbutton.picker__today:focus, button.picker__clear:focus, button.picker__close:focus {\n  background-color: #a1ded8;\n}\n\n/* ==========================================================================\n   $BASE-TIME-PICKER\n   ========================================================================== */\n/**\n * The list of times.\n */\n.picker__list {\n  list-style: none;\n  padding: 0.75em 0 4.2em;\n  margin: 0;\n}\n\n/**\n * The times on the clock.\n */\n.picker__list-item {\n  border-bottom: 1px solid #dddddd;\n  border-top: 1px solid #dddddd;\n  margin-bottom: -1px;\n  position: relative;\n  background: #ffffff;\n  padding: .75em 1.25em;\n}\n\n@media (min-height: 46.75em) {\n  .picker__list-item {\n    padding: .5em 1em;\n  }\n}\n\n/* Hovered time */\n.picker__list-item:hover {\n  cursor: pointer;\n  color: #000000;\n  background: #b1dcfb;\n  border-color: #0089ec;\n  z-index: 10;\n}\n\n/* Highlighted and hovered/focused time */\n.picker__list-item--highlighted {\n  border-color: #0089ec;\n  z-index: 10;\n}\n\n.picker__list-item--highlighted:hover,\n.picker--focused .picker__list-item--highlighted {\n  cursor: pointer;\n  color: #000000;\n  background: #b1dcfb;\n}\n\n/* Selected and hovered/focused time */\n.picker__list-item--selected,\n.picker__list-item--selected:hover,\n.picker--focused .picker__list-item--selected {\n  background: #0089ec;\n  color: #ffffff;\n  z-index: 10;\n}\n\n/* Disabled time */\n.picker__list-item--disabled,\n.picker__list-item--disabled:hover,\n.picker--focused .picker__list-item--disabled {\n  background: #f5f5f5;\n  border-color: #f5f5f5;\n  color: #dddddd;\n  cursor: default;\n  border-color: #dddddd;\n  z-index: auto;\n}\n\n/**\n * The clear button\n */\n.picker--time .picker__button--clear {\n  display: block;\n  width: 80%;\n  margin: 1em auto 0;\n  padding: 1em 1.25em;\n  background: none;\n  border: 0;\n  font-weight: 500;\n  font-size: .67em;\n  text-align: center;\n  text-transform: uppercase;\n  color: #666;\n}\n\n.picker--time .picker__button--clear:hover,\n.picker--time .picker__button--clear:focus {\n  color: #000000;\n  background: #b1dcfb;\n  background: #ee2200;\n  border-color: #ee2200;\n  cursor: pointer;\n  color: #ffffff;\n  outline: none;\n}\n\n.picker--time .picker__button--clear:before {\n  top: -0.25em;\n  color: #666;\n  font-size: 1.25em;\n  font-weight: bold;\n}\n\n.picker--time .picker__button--clear:hover:before,\n.picker--time .picker__button--clear:focus:before {\n  color: #ffffff;\n}\n\n/* ==========================================================================\n   $DEFAULT-TIME-PICKER\n   ========================================================================== */\n/**\n * The frame the bounds the time picker.\n */\n.picker--time .picker__frame {\n  min-width: 256px;\n  max-width: 320px;\n}\n\n/**\n * The picker box.\n */\n.picker--time .picker__box {\n  font-size: 1em;\n  background: #f2f2f2;\n  padding: 0;\n}\n\n@media (min-height: 40.125em) {\n  .picker--time .picker__box {\n    margin-bottom: 5em;\n  }\n}\n"; });

define("materialize-css/js/materialize.amd", ["jquery"], (function (global) {
  return function () {
    var ret, fn;
    return ret || global.Materialize;
  };
}(this)));
;define('materialize-css', ['materialize-css/js/materialize.amd'], function (main) { return main; });

define("materialize-css/js/materialize.amd", ["jquery"], (function (global) {
  return function () {
    var ret, fn;
    return ret || global.Materialize;
  };
}(this)));
;define('materialize-css', ['materialize-css/js/materialize.amd'], function (main) { return main; });
