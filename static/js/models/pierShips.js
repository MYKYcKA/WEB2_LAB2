class PierShips extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
    constructor () {
        super('pierShips')
        this.fields = this.fields.concat([
            'ship',
            'pier'
        ])
    }

    // mostPopularTrains (soldTickets) {
    //     const myMap = new Map()
    //     for (let i = 0; i < soldTickets.length; i++) {
    //         if (myMap.has(soldTickets[i].train)) {
    //             let newNumber = myMap.get(soldTickets[i].train);
    //             myMap.set(soldTickets[i].train, ++newNumber)
    //         }
    //         else myMap.set(soldTickets[i].train, 1)
    //     }
    //     return myMap;
    // }

    // mostExpensiveTrains(soldTickets){
    //     const myMap = new Map()
    //     for (let i = 0; i < soldTickets[i].size; i++) {
    //         if (myMap.has(soldTickets[i].train) === false)
    //             myMap.set(soldTickets[i].train, soldTickets[i].ticket.price)
    //         else
    //         {
    //             let newNumber = myMap.get(soldTickets[i].train);
    //             myMap.set(soldTickets[i].train, soldTickets[i].ticket.price + newNumber)
    //         }


    //     }
    //     return myMap;
    // }
}
