module.exports = {
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath != undefined) res.redirect(redirectPath);
        else next();
    }
}