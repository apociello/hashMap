// Both classes are reused from previous project

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    append(value) {
        if (this.head == null) {
            this.head= new Node(value);
        } else {
            let current = this.head;
            while(current.next != null) {
                current = current.next;
            }

            current.next = new Node(value);
        }

        this.size++
    }

    getSize() {
        return this.size;
    }


    get(value) {
        if (this.head == null) return null;
        let current = this.head;
        while(current != null) {
            const [key, storedValue] = current.value.split(':');
            if(key === value) return storedValue;
            current = current.next;
        }

        return null;
    }

    contains(value) {
        if (this.head == null) return false;
        let current = this.head;
        while(current != null) {
            const key = current.value.split(':')[0];
            if(key === value) return true;
            current = current.next;
        }

        return false;
    }

    find(value) {
        let index = 0;
        let current = this.head;

        while(current != null) {
            const key = current.value.split(':')[0];
            if (key === value) return index;
            current = current.next;
            index++;
        }

        return null;
    }

    removeAt(index) {
        
        if (index === 0) {
            this.head = this.head.next;
            this.size--;
            return;
        }
        
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }

        current.next = current.next.next;
        this.size--;
    }
}

class Node {
    constructor(value=null, next=null) {
        this.value = value;
        this.next = next;
    }
}

export { LinkedList, Node }