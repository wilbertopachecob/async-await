(function () {
  async function test() {
    try {
      await Promise.reject("Got Rejected");
    } catch (error) {
      console.log(error);
    }
  }
  test();


//you can also catch the non asyncronous errors with try catch
  async function test2() {
      try {
        const bad = undefined;
        bad.x = 'Im a bad boy';
        const res = Promise.reject('No one will see me');    
      } catch (error) {
          console.log(error);
      }
  }

  test2();

//you can also throw inside an async function
async function computedValue(params) {
    throw new Error('Im inside a throw');
}

async function test3() {
    try {
        await computedValue();
    } catch (error) {
        console.log(error);
    }   
}

test3();

//if we comment the await then no error will be thrown
async function test3WithoutAwait() {
    try {
        computedValue()
    } catch (error) {
        console.log(error);
    }   
}

test3WithoutAwait();

//using catch
async function test3WithoutAwait() { 
    computedValue().catch(error => {
        console.log('Im inside a catch');
        console.log(error);
    })   
}

})();
