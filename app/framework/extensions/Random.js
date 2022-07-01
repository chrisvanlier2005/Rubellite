class RandomId {
    constructor() {
        this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    static new() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}

class RandomNumber{
    constructor(min, max){
        this.min = min;
        this.max = max;
        this.number = RandomNumber.new(min, max);
    }
    static new(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export default { RandomId, RandomNumber };