const qm = (u:string, v:string, w: string) => u.split('').map((c,i) => (v[i] === w[i] ? v[i] : c)).join('');

const qmHullComp = (d: string[]) => {
    const m = d.slice(); // copy array by value
    let noNewQuasiMedian;
    do {
        noNewQuasiMedian = false;
        m.forEach(u => {
            m.forEach(v => {
                m.forEach(w => {
                    const z = qm(u, v, w);
                    if (!m.includes(z)){
                        noNewQuasiMedian = true;                        
                        m.push(z)
                    }
                });
            });
        });
    } while(noNewQuasiMedian);
    return m;
}

const sample1 = ['AAAAAAA', 'AGGAAGG', 'AAAGGGG', 'GAGAGAG'];
const sample2 = [
    'AAAAAAAAAAAAAA',
    'AAAGGGGAGGGGGG',
    'AGGAAGGGAGCCCC',
    'GAGAGAGCCCAGCT'
    ];

const sample21 = ['1100', '0010', '0011', '0100'];
const sample22 = ['11000', '00101', '00110', '01001', '11001'];
const sample23 = ['GAA', 'AGA', 'AAG', 'ACA'];

const hull1 = qmHullComp(sample21);
const hull2 = qmHullComp(sample22);
const hull3 = qmHullComp(sample23);


console.log(hull1.filter(e => !sample21.includes(e)));
console.log(hull2.filter(e => !sample22.includes(e)));
console.log(hull3.filter(e => !sample23.includes(e)));

console.log(qm(sample21[0], sample21[1], sample21[2]));
console.log(qm(sample21[0], sample21[1], sample21[3]));
console.log(qm(sample21[0], sample21[2], sample21[3]));
console.log(qm(sample21[1], sample21[2], sample21[3]));


console.log(qm(sample22[0], sample22[1], sample22[2]));
console.log(qm(sample22[0], sample22[1], sample22[3]));
console.log(qm(sample22[0], sample22[1], sample22[4]));
console.log(qm(sample22[0], sample22[2], sample22[3]));
console.log(qm(sample22[0], sample22[2], sample22[4]));
console.log(qm(sample22[0], sample22[3], sample22[4]));
console.log(qm(sample22[1], sample22[2], sample22[3]));
console.log(qm(sample22[1], sample22[2], sample22[4]));
console.log(qm(sample22[1], sample22[3], sample22[4]));
console.log(qm(sample22[2], sample22[3], sample22[4]));

const a = '00100'; 
const b = '01000';
console.log('--');


console.log(qm(sample22[0], sample22[1], a));
console.log(qm(sample22[0], sample22[2], a));
console.log(qm(sample22[0], sample22[3], a));
console.log(qm(sample22[0], sample22[4], a));
console.log(qm(sample22[1], sample22[2], a));
console.log(qm(sample22[1], sample22[3], a));
console.log(qm(sample22[1], sample22[4], a));
console.log(qm(sample22[2], sample22[3], a));
console.log(qm(sample22[2], sample22[4], a));
console.log(qm(sample22[3], sample22[4], a));

console.log(qm(sample22[0], sample22[1], b));
console.log(qm(sample22[0], sample22[2], b));
console.log(qm(sample22[0], sample22[3], b));
console.log(qm(sample22[0], sample22[4], b));
console.log(qm(sample22[1], sample22[2], b));
console.log(qm(sample22[1], sample22[3], b));
console.log(qm(sample22[1], sample22[4], b));
console.log(qm(sample22[2], sample22[3], b));
console.log(qm(sample22[2], sample22[4], b));
console.log(qm(sample22[3], sample22[4], b));


console.log();

console.log(qm(sample23[0], sample23[1], sample23[2]));

console.log(qm(sample23[0], sample23[1], sample23[3]));
console.log(qm(sample23[1], sample23[0], sample23[3]));
console.log(qm(sample23[3], sample23[0], sample23[1]));

console.log(qm(sample23[0], sample23[2], sample23[3]));
console.log(qm(sample23[2], sample23[0], sample23[3]));
console.log(qm(sample23[3], sample23[0], sample23[2]));

console.log(qm(sample23[1], sample23[2], sample23[3]));
console.log(qm(sample23[2], sample23[1], sample23[3]));
console.log(qm(sample23[3], sample23[1], sample23[2]));