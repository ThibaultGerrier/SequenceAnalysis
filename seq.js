const max = (arr) => Math.max(...arr);

const range = (lo, up) => Array.from(new Array(up+1), (x,i) => i + lo);

const getAlphabet = (str) => 
    String.prototype.concat(...new Set(str))


String.prototype.val = function(pos) {
    return this[pos-1];
}

String.prototype.subs = function(start, end) {
    return this.substring(start-1, end);
}
String.prototype.suffixOf = function(s) {
    return s.endsWith(this);
}
String.prototype.suffixFunc = function(S) {
    return max(range(0, this.length)
            .filter(k => 
                this.subs(1, k).suffixOf(S)
            )
        );
}
String.prototype.prefixFunc = function(q) {
    return max(range(0, q-1)
            .filter(k => 
                this.subs(1, k).suffixOf(this.subs(1,q))
            )
        );
}


/*
String.prototype.delta = function(q, x){
        return suffixFunc(subs(1,q) + x)
}
*/

const naive = (t, p) => {
    const n = t.length;
    const m = p.length;
    for(let i=0; i <= n-m; i++){
        if (t.subs(i+1, i+m) === p){
            console.log(i);
        }
    }
}

const arr2d = (x, y) => {
    const multiArray = new Array(x);
    for (var i = 0; i < multiArray.length; i++) {
        multiArray[i] = new Array(y);
    }
    return multiArray;
}

const printTransitionTable = (obj) => {
    console.log(' | ' + Object.keys(Object.values(obj)[0]).join(' '));
    Object.entries(obj).forEach(([k,v]) => {
        console.log(`${k}| ${Object.values(v).join(' ')}`);
    });
}

const finiteAutomatonStringMatcherTable = (P, alphabet) => {
    const table = {};
    alphabet.split('').forEach(x => table[x] = {});
    const m = P.length;
    for(let q=0; q<=m; q++) {
        alphabet.split('').forEach(x => {
            let k = Math.min(m+1, q+2);
            do{
                k--;
            } while(!P.subs(1, k).suffixOf(P.subs(1,q)+x));
            table[x][q] = k;
        });
    }
    // printTransitionTable(table);
    return table;
}

const finiteAutomatonStringMatcher = (T, P) => {
    const transitionTable = finiteAutomatonStringMatcherTable(P, getAlphabet(T+P));
    const n = T.length;
    const m = P.length;
    let q = 0;
    for (i=1; i<=n; i++) {
        q = transitionTable[T.val(i)][q];
        if (q===m) {
            console.log(i-m);
        }
    }
}

const printPrefixTable = (table) => {
    console.log('π: ', Object.values(table).join(' '));
}

const prefixFunctionComputation = (P) => {
    const table = {};
    const m = P.length;
    let k = 0;
    table[1] = 0;
    for (let q=2; q<=m; q++){
        while(k>0 && P.val(k+1) !== P.val(q)){
            k = table[k];
        }
        if (P.val(k+1) === P.val(q)) {
            k++
        }
        table[q] = k;
    }
    // printPrefixTable(table);
    return table;
}

const knuthMorrisPratt = (T, P) => {    // Text, Pattern
    const n = T.length;
    const m = P.length;
    const prefixTable = prefixFunctionComputation(P);
    let q = 0;
    for (let i=1; i<=n; i++) {
        // Compute the state of the automaton.
        while(q>0 && P.val(q+1) !== T.val(i)) {
            q = prefixTable[q]
        }
        if (P.val(q+1) === T.val(i)) {
            q++;
        }
        if(q === m) {
            // Reached accepting state.
            console.log(i-m);
            q = prefixTable[q];
        }
    }
}

//finiteAutStringMatcher('ababbaba', 'ab');
//native('aaabaabbaabba', 'a');
//[1,2,3,4,5,6,7,8].forEach(i => console.log('ababbaba'.prefixFunc(i)))
//prefixFunctionComputation('ababbaba');

const string = 'aaabaabbaabba'; 
const pattern = 'ab';
console.log();

console.log('Naive string-matching:');
naive(string, pattern);
console.log();

console.log('Finite-automaton string matcher:');
finiteAutomatonStringMatcher(string, pattern);
console.log();

console.log('Knuth-Morris-Pratt algorithm:');
knuthMorrisPratt(string, pattern);
console.log();

console.log('done');

function randString(size) {
    var text = "";
    //var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var possible = "ABCD";
  
    for (var i = 0; i < size; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}

const performFunc = (func, string, pattern, repeats) => {
    console.time('time');
    console.log(func.name);
    for(let i=0; i<repeats; i++){
        func(string, pattern);
    }
    console.timeEnd('time');
}

const performace = () => {
    const string = randString(10000000);
    const pattern = randString(300);

    const repeats = 10;

    performFunc(naive, string, pattern, repeats);
    performFunc(finiteAutomatonStringMatcher, string, pattern, repeats);
    performFunc(knuthMorrisPratt, string, pattern, repeats);
}

performace();