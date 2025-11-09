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
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
        }

        return hashCode;
    }

    set(key, value) {
        const hashCode = this.hash(key);

        this.keyCollector.forEach((savedKey) => {
            if (key == savedKey) {
                let linkedList = this.array[hashCode];
                const index = linkedList.find(key);
                linkedList.removeAt(index);
                linkedList.append(`${key}:${value}`);
                return;
            }
        })

        for (const savedKey of this.keyCollector) {
            if (savedKey == key) {
                let linkedList = this.array[hashCode];
                const index = linkedList.find(key);
                linkedList.removeAt(index);
                linkedList.append(`${key}:${value}`);
                return;
            }
        }

        if(this.array[hashCode]) {
            let linkedList = this.array[hashCode];
            linkedList.append(`${key}:${value}`);

            this.capacityCounter++;
            this.keyCollector.push(key);
            if (this.capacityCounter / this.capacity >= this.loadFactor) {
                console.log('over capacity')
            }
            
            return;
        } else {
            this.array[hashCode] = new LinkedList();
            this.array[hashCode].append(`${key}:${value}`);

            this.keyCollector.push(key);
            this.capacityCounter++;
            if (this.capacityCounter / this.capacity >= this.loadFactor) {
                console.log('over capacity')
            }
        }


    }
}

const hashy = new HashMap();
hashy.set('fruit', 'apple');
hashy.set('car', 'toyota');
hashy.set('city', 'tokyo');
hashy.set('weather', 'sunny');
hashy.set('mood', 'happy');
hashy.set('cat', 'ron');
hashy.set('dog', 'toby');
hashy.set('singer', 'dylan');
hashy.set('boxer', 'tyson');
hashy.set('color', 'blue');
hashy.set('grade', 'A');
//hashy.set('Actor', 'Paul Walker');

console.log(hashy);
