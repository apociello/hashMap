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

    prepend(value) {
        if (this.head != null) {
            const node = new Node(value);
            node.next = this.head;
            this.head = node;
            this.size++;
        } else {
            this.append(value);
        }
    }

    getSize() {
        return this.size;
    }

    getHead() {
        return this.head;
    }

    getTail() {
        if (this.head == null) return this.head;
        let current = this.head;
        while(current.next != null) {
            current = current.next;
        }

        return current;
    }

    at(index) {
        if (index >= this.size || index < 0) return null ;

        let current = this.head;
        for (let i=0; i < index; i++) {
            current = current.next;
        }

        return current;
    }

    pop() {
        if (this.head == null) return null;

        if (this.head.next == null) {
            const removed = this.head;
            this.head = null;
            this.size--;
            return removed;
        }

        let current = this.head;

        while (current.next.next != null) {
        current = current.next;
        }

        const removed = current.next;
        current.next = null;
        this.size--;
        return removed;
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

    toString() {
        if (this.head == null) return 'null';
        let string = '';
        let current = this.head;
        while(current != null) {
            string+= `( ${current.value} ) -> `;
            current = current.next;
        }

        string += 'null';
        return string;
    }

    insertAt(value, index) {

        if (index < 0 || index > this.size) return null;
        
        if (index === 0) {
            this.prepend(value);
            return;
        }

       
        let current = this.head
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }

        const newNode = new Node(value, current.next);
        current.next = newNode;
        this.size++;
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