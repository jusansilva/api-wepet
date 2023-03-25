

const protectedEndpoint = async function(req, res, next) {
    try {
        const { authorization } = req.headers;
      const token = authorization.split('Bearer ')[1];
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.decodedToken = decodedToken;
      next();
    } catch (error) {
        res.status(401).send(error.message);
    }
}