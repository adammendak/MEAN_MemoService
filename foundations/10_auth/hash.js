const bcrypt = require('bcrypt');


bcrypt.genSalt(10,(err,salt) => {
    if(err) return next(err);
    // console.log(salt);

    bcrypt.hash("password123", salt, (err,hash)=> {
        if(err) return next(err);

        console.log(hash);
    })
})

