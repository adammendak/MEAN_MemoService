console.log("starting app");

let func = setTimeout(() => {
    console.log("after 2 sex")
}, 2000);

console.log("finishing");

func.on('end')