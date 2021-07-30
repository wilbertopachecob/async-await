(function () {
  const wrap = (fn) =>
    function () {
      // Ensure function call has an error handler
      return fn.apply(null, arguments).catch((error) => console.log(error));
    };
  const [fn1, fn2] = [
    async function () {
      throw Error("err1");
    },
    async function () {
      throw Error("err2");
    },
  ].map(wrap);

  fn1(); // Prints "err1"
  fn2();
})();


_myTest = async function () {
    throw Error("My error en log");
};

console.log(typeof _myTest());
console.log('then' in _myTest());

const p = new Promise((resolve, reject) => {
    resolve('')
}) 

console.log('then' in p);

_myTest().catch(console.log);

