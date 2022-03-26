const { Observable, async } = require('rxjs');
const { filter } = require('rxjs/operators')


//Promise  one value sent only, included on native lenguage (JS)
const doSomething = () => {
  return new Promise((resolve) => {
    // resolve('Valor 1');
    // resolve('Valor 2');
    setTimeout(() => {
      resolve('Valor 3');
    }, 3000)
  });
}

//Observable send a lot of values and listening are continuous (events, responsive, fetch). Is possible cancel them
const doSomething$ = () => {
  return new Observable(observer => {
    observer.next('valor 1 $');
    observer.next('valor 2 $');
    observer.next('valor 3 $');
    observer.next(null);
    setTimeout(() => {
      observer.next('Valor 4 $');
    }, 5000)
    setTimeout(() => {
      observer.next(null);
    }, 8000)
    setTimeout(() => {
      observer.next('Valor 5 $');
    }, 10000)
  });
}

(async () => {
  const rta = await doSomething();
  console.log(rta);
})();

(() => {
  const obs$ = doSomething$();
  obs$
    .pipe(
      filter(value=> value !== null)
    )
    .subscribe(rta => {
      console.log(rta);
    });
})();


