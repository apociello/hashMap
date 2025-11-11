import { LinkedList} from "./linkedList.mjs";

class HashMap {
    constructor(loadFactor = 0.75, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.capacityCounter = 0;
        this.array = [];
        this.keyCollector = [];
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
        let linkedList = this.array[hashCode];

        if (linkedList) {
            if(linkedList.contains(key)) {
                const index = linkedList.find(key);
                linkedList.removeAt(index);
                linkedList.append(`${key}:${value}`);
                return
            } else {
                // Collision
                linkedList.append(`${key}:${value}`);
                this.capacityCounter++;

                if (this.capacityCounter / this.capacity > this.loadFactor) {
                    console.log('over capacity -> grow buckets')
                    this.growBuckets();
                }
            }
        } else {
            this.array[hashCode] = new LinkedList();
            this.array[hashCode].append(`${key}:${value}`);
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
        const keyCopies = this.keyCollector;
        this.array = [];
        this.keyCollector = [];
        this.capacityCounter = 0;
        
        for (const entry of entries) {
            const [key, value] = entry;
            this.set(key, value);
        }

        return this.array;

    }

    get(key) {
        for (const linkedList of this.array) {
            if (linkedList) {
                const result = linkedList.get(key);
                if (result != null) {
                    return result;
                }
            }
        }

        return null;
    }

    has(key) {
        for (const linkedList of this.array) {
            if (linkedList) {
                const hasKey = linkedList.contains(key);
                if (hasKey) return true;
            }
        }

        return false;
    }

    remove(key) {
        for (const linkedList of this.array) {
            if (linkedList) {
                const index = linkedList.find(key)
                if (index != null) {
                    linkedList.removeAt(index); 
                    this.keyCollector.splice(this.keyCollector.indexOf(key), 1);
                    this.capacityCounter--;
                    return true;
                }
            }
            
        }

        return false;
    }

    length() {
        return this.keyCollector.length;
    }

    clear() {
        this.array = [];
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.capacityCounter = 0;
        this.keyCollector = []
    }

    keys() {
        return this.keyCollector;
    }

    values() {
        let array = [];

        for (const key of this.keyCollector) {
            array.push(this.get(key));
        }

        return array;
    }

    entries() {
        let entryArray = [];
        for (const key of this.keyCollector) {
            let entry = [];
            const value = this.get(key);

            entry.push(key, value);
            entryArray.push(entry);
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

console.log(test.array);
test.set('carrot', 'green');
console.log(test.array);
