import { LinkedList} from "./linkedList.mjs";

class HashMap {
    constructor(loadFactor = 0.75, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.capacityCounter = 0;
        this.array = [];
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    set(key, value) {
        const hashCode = this.hash(key);
        let bucket = this.array[hashCode];

        if (bucket) {
            if(bucket.contains(key)) {
                const index = bucket.find(key);
                bucket.removeAt(index);
                bucket.append({key, value});
                return
            } else {
                // Collision
                bucket.append({key, value});
                this.capacityCounter++;

                if (this.capacityCounter / this.capacity > this.loadFactor) {
                    console.log('over capacity -> grow buckets')
                    this.growBuckets();
                }
            }
        } else {
            this.array[hashCode] = new LinkedList();
            this.array[hashCode].append({key,value});
            this.capacityCounter++;

            if (this.capacityCounter / this.capacity > this.loadFactor) {
                console.log('over capacity -> grow buckets')
                this.growBuckets();
            }
        }
    }

    growBuckets(){
        this.capacity = this.capacity * 2;
        const entries = this.entries();
        this.array = [];
        this.capacityCounter = 0;
        
        for (const entry of entries) {
            const [key, value] = entry;
            this.set(key, value);
        }
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.array[index];
        if (!bucket) return null;
        return bucket.getValue(key);
    }

    has(key) {
        const index = this.hash(key);
        const bucket = this.array[index];
        if (!bucket) return false;
        return bucket.contains(key);
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.array[index];
        if (!bucket) return false;
        const i = bucket.find(key);
        if (i != null) {
            bucket.removeAt(i); 
            this.capacityCounter--;
            return true;
        }

        return false;
    }

    length() {
        return this.capacityCounter;
    }

    clear() {
        this.array = [];
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.capacityCounter = 0;
    }

    keys() {
        let keys = [];
        for (const linkedList of this.array) {
            if (!linkedList) continue;
            const keyArray = linkedList.getKeys();
            if (keyArray) keys.push(...keyArray);
        }
        return keys;
    }

    values() {
        let values = [];
        for (const linkedList of this.array) {
            if (!linkedList) continue;
            const valueArray = linkedList.getValues();
            if (valueArray) values.push(...valueArray);
        }
        return values;
    }

    entries() {
        let entryArray = [];
        for (const linkedList of this.array) {
            if (!linkedList) continue;
            const array = linkedList.getKeyValues();
            if (array) entryArray.push(...array);
        }

        return entryArray;
    }

}


const test = new HashMap()

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.entries());
