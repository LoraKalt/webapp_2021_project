module.exports = {
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },
    paginationHandler: (req, res, next) => {
        const itemsPerPage = 5;
        let pageNum = parseInt(req.params.pageNum) || 1;
        if(pageNum < 1){
            pageNum = 1;
            req.flash("error", "Invalid page number, page cannot be less than 1.");
        }
        res.locals.pageNum = pageNum;
        res.locals.itemCount = itemsPerPage;
        res.locals.skipCount = (pageNum-1)*itemsPerPage;
        res.locals.isFirstPage = (pageNum === 1);
        res.locals.nextPage = pageNum + 1;
        res.locals.prevPage = pageNum - 1;
        next();
    }
}