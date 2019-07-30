function firstUpperCase(s){
    return s.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

module.exports = firstUpperCase;