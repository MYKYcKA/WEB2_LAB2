class Pier extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
    constructor () {
        super('piers')
        this.fields = this.fields.concat([
            'port',
            'number',
            'capacity'
        ])
    }
}
