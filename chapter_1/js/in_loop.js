(function () {
    async function test() {
        for (let i = 0; i < 10; i++) {
            await new Promise((resolve) => {
                setTimeout(resolve, 100)
            })
        }
        console.log('Hello after 1 second');
    }
    
    test()    
})()
