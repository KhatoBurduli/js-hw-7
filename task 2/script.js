function mySetTimeout(delay) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

// Second Version

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

async function promisify() {
    try {
        const status = await makeToys();
        console.log('Toy status:', status);

        if (status === "undefected") {
            await mySetTimeout(3000);
            const result = await sellToys(status);
            console.log('Sell result:', result);

            if (result === "sold") {
                await mySetTimeout(2000);
                const deliveryStatus = await deliverToys();
                console.log('Delivery status:', deliveryStatus);

                if (deliveryStatus === "delivered") {
                    await mySetTimeout(1000);
                    console.log("Toy sold and delivered successfully");
                } else {
                    throw new Error("Toy not delivered");
                }
            } else {
                throw new Error("Toy not sold");
            }
        } else {
            throw new Error("Toy is defected");
        }
    } catch (error) {
        console.error(error.message);
    }
}

promisify();

console.log('second')
