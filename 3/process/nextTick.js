setImmediate(() => {
    console.log('immediate');
});

//이벤트 루프가 다른 콜백함수들보다 
//nextTick의 콜백함수를 우선적으로 처리한다.
process.nextTick(()=>{
    console.log('nextTick');
});

setTimeout(()=>{
    console.log('timeout');
}, 0);

Promise.resolve().then(()=> console.log('promise'));

//nextTick -> setImmediate나 setTimeout보다 먼저 실행된다.
//resolve된 promise도 nextTick과 같이 다른 콜백들보다 우선시되어 실행된다. 