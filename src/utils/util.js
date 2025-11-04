import Swal from "sweetalert2";

const _debug = false;

export const generateUniqueId = () => {
    return Math.floor(Math.random() * 1000000);
}

export function createUniqueString() {
    const timestamp = +new Date() + ''
    const randomNum = parseInt((1 + Math.random()) * 65536) + ''
    return (+(randomNum + timestamp)).toString(32)
}


/**
 * Generate a random UUID v4 string
 * @returns {string} A UUID v4 string in the format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 */
export function generateUUID() {
    // Use crypto.randomUUID if available (Node.js 14.17.0+)
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }

    // Fallback implementation for older Node.js versions or browsers
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}



export const isBrowser = () =>{
    if (/MSIE\s|Trident\//.test(navigator.userAgent)) {
        document.body.innerHTML = "<strong>Sorry, this browser is currently not supported. We recommend using the latest version of a modern browser. For example, Chrome/Firefox/Edge.</strong>"
    }
}

/**
 * I database esistenti non supportano se il contenuto contiene caratteri emoji.
 * @param str
 * @returns {number}
 */
export function hasEmoji (str = '') {
    const reg = /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g;
    return str.match(reg) && str.match(reg).length
}


export function isArray(arg) {
    return Array.isArray ? Array.isArray(arg) : Object.prototype.toString.call(arg) === "[object Array]"
}

/**
 * Verifica se una variabile è null, undefined o un array vuoto.
 * @param {Array<any> | null | undefined} arr - La variabile da controllare.
 * @returns {boolean} Ritorna true se l'array è nullo, undefined o vuoto, altrimenti false.
 */
export function arrEmptyOrNull(arr) {
    // 1. Controlla se l'array è null o undefined
    if (arr === null || typeof arr === 'undefined') {
        return true;
    }

    // 2. Controlla se è un array e se la sua lunghezza è 0
    if (Array.isArray(arr) && arr.length === 0) {
        return true;
    }

    // 3. In tutti gli altri casi (array non vuoto, o altri tipi di dati non null/undefined)
    return false;
}

export function cleanArray(actual) {
    const newArray = []
    for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i])
        }
    }
    return newArray
}


export function isString(str) {
    return typeof str === "string" || str instanceof String
}


export function isExternal(path) {
    const reg = /^(https?:|mailto:|tel:)/
    return reg.test(path)
}


export function showAlertErrore(err) {
    Swal.fire({
        title: 'Oops...',
        text: `Qualcosa è andato storto: ${err}`,
        icon: 'error',
        confirmButtonText: 'Capito'
    });
}

export function showAlertSuccesso() {
    Swal.fire({
        title: 'Fatto!',
        text: 'La tua operazione è stata completata.',
        icon: 'success',
        timer: 2000, // L'alert si chiude dopo 2 secondi
        showConfirmButton: false // Nasconde il pulsante OK
    });
}

export async function showAlertConferma() {
    const result = await Swal.fire({
        title: 'Sei sicuro?',
        text: "Non potrai annullare questa operazione!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Elimina',
        cancelButtonText: 'Annulla'
    });

    // La funzione ritorna il valore se confermato, altrimenti null
    if (result.isConfirmed) {
        return result.value;
    } else {
        // Gestione dell'annullamento con un avviso separato (opzionale)
        //await Swal.fire('Annullato', 'Operazione annullata', 'error');
        return null;
    }

}

export async function showAlertConfermaOld() {
    Swal.fire({
        title: 'Sei sicuro?',
        text: "Non potrai annullare questa operazione!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Elimina',
        cancelButtonText: 'Annulla'
    }).then((result) => {
        // 'result' contiene l'esito della scelta dell'utente
        if (result.isConfirmed) {
            // Se l'utente clicca "Si, elimina!"
            Swal.fire('Eliminato!', 'Il prodotto è stato eliminato.', 'success' );
            // Qui dovresti mettere la tua logica di eliminazione

        } else if (result.isDismissed) {
            // Se l'utente clicca "Annulla" o chiude l'alert
            Swal.fire('Annullato', 'Operazione annullata)', 'error' );

        }

    });
}

/**
 * Funzione che formatta un prezzo aggiungendo il simbolo dell'euro.
 * @param {number} prezzo - Il numero da formattare.
 * @returns {string} Il prezzo formattato come stringa (es. "€ 19,99").
 */
export function formattaPrezzo(prezzo) {
    // Controlla che il prezzo sia un numero valido
    if (typeof prezzo !== 'number') {
        return 'Prezzo non valido';
    }
    // Usa l'API Intl.NumberFormat per una formattazione corretta
    return new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR'
    }).format(prezzo);
}

export function param2Obj(url) {
    const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
    if (!search) {
        return {}
    }
    const obj = {}
    const searchArr = search.split('&')
    searchArr.forEach(v => {
        const index = v.indexOf('=')
        if (index !== -1) {
            const name = v.substring(0, index)
            const val = v.substring(index + 1, v.length)
            obj[name] = val
        }
    })
    return obj
}

export function getQueryObject(url) {
    url = url == null ? window.location.href : url
    const search = url.substring(url.lastIndexOf('?') + 1)
    const obj = {}
    const reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, (rs, $1, $2) => {
        const name = decodeURIComponent($1)
        let val = decodeURIComponent($2)
        val = String(val)
        obj[name] = val
        return rs
    })
    return obj
}

export function byteLength(str) {
    // returns the byte length of an utf8 string
    let s = str.length
    for (let i = str.length - 1; i >= 0; i--) {
        const code = str.charCodeAt(i)
        if (code > 0x7f && code <= 0x7ff) s++
        else if (code > 0x7ff && code <= 0xffff) s += 2
        if (code >= 0xDC00 && code <= 0xDFFF) i--
    }
    return s
}

export function param(json) {
    if (!json) return ''
    return cleanArray(
        Object.keys(json).map(key => {
            if (json[key] === undefined) return ''
            return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
        })
    ).join('&')
}

export function html2Text(val) {
    const div = document.createElement('div')
    div.innerHTML = val
    return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
    if (typeof target !== 'object') {
        target = {}
    }
    if (Array.isArray(source)) {
        return source.slice()
    }
    Object.keys(source).forEach(property => {
        const sourceProperty = source[property]
        if (typeof sourceProperty === 'object') {
            target[property] = objectMerge(target[property], sourceProperty)
        } else {
            target[property] = sourceProperty
        }
    })
    return target
}

export function getTime(type) {
    if (type === 'start') {
        return new Date().getTime() - 3600 * 1000 * 24 * 90
    } else {
        return new Date(new Date().toDateString())
    }
}

export function titleCase(str) {
    return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
}

export function camelCase(str) {
    return str.replace(/_[a-z]/g, str1 => str1.substr(-1).toUpperCase())
}

export function isNumberStr(str) {
    return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}

export function validAlphabets(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
}

export function removeSpace(value) {
    return value.replace(/\s+/g, '')
}

export function formValidate(val, type) {
    const phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
    const emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    if (val === '') {
        return false
    } else {

        if (type === 'require') {
            return !!removeSpace(val)
        }
        if (type === 'phone') {
            return phoneReg.test(val)
        }
        if (type === 'email') {
            return emailReg.test(val)
        }
    }
}

export function getUrlKey(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null
}

export function makeMap(str, expectsLowerCase) {
    const map = Object.create(null)
    const list = str.split(',')
    for (let i = 0; i < list.length; i++) {
        map[list[i]] = true
    }
    return expectsLowerCase
        ? val => map[val.toLowerCase()]
        : val => map[val]
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elem
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(elem, cls) {
    return !elem.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elem
 * @param {string} cls
 */
export function addClass(elem, cls) {
    if (!hasClass(elem, cls)) elem.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elem
 * @param {string} cls
 */
export function removeClass(elem, cls) {
    if (hasClass(elem, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        elem.className = elem.className.replace(reg, ' ')
    }
}

export function addEvent (el, event, handler) {
    if (!el) {
        return
    }
    if (el.attachEvent) {
        el.attachEvent('on' + event, handler)
    } else if (el.addEventListener) {
        el.addEventListener(event, handler, true)
    } else {
        el['on' + event] = handler
    }
}

export function removeEvent (el, event, handler) {
    if (!el) {
        return
    }
    if (el.detachEvent) {
        el.detachEvent('on' + event, handler)
    } else if (el.removeEventListener) {
        el.removeEventListener(event, handler, true)
    } else {
        el['on' + event] = null
    }
}

export function debounce(func, wait, immediate) {
    let timeout;

    return function () {
        const context = this;
        const args = arguments;

        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

export function logInfo(label, msg=null) {
    if(_debug) {
        //if(typeof console === "undefined" || typeof consoleLog === "undefined") {
        //    alert('console undefined');
        //} else {
            if (isNotNull(msg))
                console.log(label + " ==> " + msg);
            else
                console.log(label);
        //}
    }
}

export function isNotNull(arg0) {
    return (arg0 !== undefined && arg0 !== null && arg0 !== "");
}

export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

