module.exports = {
    redirectView: (req, res, next) => {
        console.log("Made it to redirect view!");
        let redirectPath = res.locals.redirect;
        if(redirectPath != undefined) res.redirect(redirectPath);
        else next();
    }
}