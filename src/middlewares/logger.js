export function logger(req, res, next){
    const timestamp = new Date().toISOString();
    const metodo = req.method;
    const url = req.originalUrl || req.url;

    console.log(`${timestamp} - Metodo: ${metodo} Url: ${url}`);
    next();
}