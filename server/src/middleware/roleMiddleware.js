export const authorize = (...roles) => {
    return (req, res, next) => {
        console.log(req.user);
        if (!roles.includes(req.user.role)) {
            res.status(403);
            throw new Error("Access denied");
        }
        next();
    };
};