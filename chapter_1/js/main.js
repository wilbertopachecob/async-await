// async function test() {
//   // This function will print "Hello, World!" after 1 second.
//   await new Promise(resolve => setTimeout(() => resolve(), 1000));
//   console.log('Hello, World!');
// }
// test();

// async function test() {
//   while (true) {
//     // Convoluted way to print out "Hello, World!" once per
//     // second by pausing execution for 200ms 5 times
//     for (let i = 0; i < 10; ++i) {
//       if (i % 2 === 0) {
//         await new Promise(resolve => setTimeout(resolve, 200));
//       }
//     }
//     console.log('Hello, World!');
//   }
// }

// test();

// async function computeValue() {
//   await new Promise(resolve => setTimeout(resolve, 1000));
//   // "Hello, World" is the resolved value for this function call
//   return 'Hello, World!';
// }

// async function test() {
//   // Prints after 1 second. `computeValue` returns a promise!
//   console.log(await computeValue());
// }

// test();

async function fn1() {
    await new Promise((resolve, reject) =>
      setTimeout(() => {
        reject("Hello Error");
        //throw new Error('Hello Error');
      }, 1000)
    );
    console.log('After');
  }
  
  async function fn2() {
    try {
      //console.log( await fn1())
      await fn1();
      console.log("Aqui");
    } catch (error) {
      console.log("My error: ", error);
    }
    console.log("Here");
  }
  
  fn2();