export class DiscClass {
    x = 0;
    y = 0;
    speedX = Math.round((Math.random() - 0.5) * 10 * 100) / 100;
    speedY = Math.round((Math.random() - 0.5) * 10 * 100) / 100;
    radius = 30;
    dirX = 1;
    dirY = 1;
    lastHit = 0;
    lastHitSmallDistance = 0;
    id = 0;

    collisionTimes = [0, 0, 0, 0];

    constructor(x, y, count, id) {
        this.x = x;
        this.y = y;
        for (let i = 0; i < count; i++) {
            this.collisionTimes.push(9999999);

        }
        this.id = id;
    }



    getShortestTime() {
 
        return Math.min(...this.collisionTimes);
    }

    getIndexShortestTime() {
        const min = this.getShortestTime();
        const index = this.collisionTimes.indexOf(min);
        return index;
    }
    async setDiscStepForward(time) {
 
        let timeIndex = this.getIndexShortestTime();
        await this.setDiscForward(time, timeIndex);
 
    }



    async changeDirection(timeIndex) { //  0=top 1=right 2=bottom 3=left 4=discs
        switch (timeIndex + 3) {
            case 0 + 3:
                this.speedY = -this.speedY;
                break;
            case 1 + 3:
                this.speedX = -this.speedX;
                break;
            case 2 + 3:
                this.speedY = -this.speedY;
                break;
            case 3 + 3:
                this.speedX = -this.speedX;
                break;
        }
    }

    resetTimes() {
        for (let index = 0; index < this.collisionTimes.length; index++) {
            this.collisionTimes[index] = 99999;
        }
    }

    async setDiscForward(time, timeIndex) { //  0=top 1=right 2=bottom 3=left 4=discs
        this.x = this.x + (this.speedX * time);
        this.y = this.y + (this.speedY * time);

        switch (timeIndex + 3) {
            case 0 + 3:
                this.speedY = -this.speedY;
                //this.y = this.y + (this.speedY * (1 - time))
                break;
            case 1 + 3:
                this.speedX = -this.speedX;
                //this.x = this.x + (this.speedX * (1 - time));
                break;
            case 2 + 3:
                this.speedY = -this.speedY;
                //this.y = this.y + (this.speedY * (1 - time));
                break;
            case 3 + 3:
                this.speedX = -this.speedX;
                //this.x = this.x + (this.speedX * (1 - time));
                break;

        }


    }


}
