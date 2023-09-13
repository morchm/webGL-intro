export default class RandomIntervalMinimum {
    constructor(callback){

        this.callback = callback;

        this.execute();

    }


    //Tilfældigt tal mellem 1-5, som en ny funktion
    execute(){

        let randomInterval = Math.floor(Math.random() * (5000 - 1000)+1) + 1000;

        this.callback();

        let timer = setTimeout(()=> {
            this.execute();
        }, randomInterval);

    }
}