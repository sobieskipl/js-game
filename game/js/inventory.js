const inventory = {
    slots: Array(10).fill(null),
    container: document.getElementById('inventory'),

    init: function() {
        this.container.innerHTML = '';
        for (let i = 0; i < this.slots.length; i++) {
            const slot = document.createElement('div');
            slot.className = 'slot';
            slot.textContent = i + 1; // Numeracja slotów
            this.container.appendChild(slot);
        }
    },

    addItem: function(item) {
        const emptySlot = this.slots.findIndex(slot => slot === null);
        if (emptySlot !== -1) {
            this.slots[emptySlot] = item;
            this.updateSlot(emptySlot);
            return true;
        }
        return false;
    },

    updateSlot: function(index) {
        const slotElement = this.container.children[index];
        slotElement.textContent = this.slots[index] ? this.slots[index].name : index + 1;
    }
};
