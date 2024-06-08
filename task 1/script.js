function mySetTimeout(delay) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}


// First Version

async function makeToys() {
    if (Math.random() > 0.1) {
        return "undefected";
    } else {
        return "defected";
    }
}

async function sellToys(status) {
    if (status === "undefected") {
        if (Math.random() > 0.7) {
            return "sold";
        } else {
            return "not sold";
        }
    }
}

async function deliverToys() {
    return new Promise((resolve) => {
        if (Math.random() > 0.5) {
            resolve("delivered");
        } else {
            resolve("not delivered");
        }
    });
}

function promisify() {
    makeToys()
        .then((status) => {
            console.log('Toy status:', status);
            if (status === "undefected") {
                return mySetTimeout(3000).then(() => sellToys(status));
            } else {
                throw new Error("Toy is defected");
            }
        })
        .then((result) => {
            console.log('Sell result:', result);
            if (result === "sold") {
                return mySetTimeout(2000).then(deliverToys);
            } else {
                throw new Error("Toy not sold");
            }
        })
        .then((deliveryStatus) => {
            console.log('Delivery status:', deliveryStatus);
            if (deliveryStatus === "delivered") {
                return mySetTimeout(1000).then(() => console.log("Toy sold and delivered successfully"));
            } else {
                throw new Error("Toy not delivered");
            }
        })
        .catch((error) => {
            console.error(error.message);
        });
}

promisify();


console.log('first')