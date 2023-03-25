const checkRequest = (res, bodyFromRequest, modelKeys) => {
    const isEveryKeyInRequest = Object.keys(bodyFromRequest).every((key) =>
        modelKeys.includes(key)
    );
    if (!isEveryKeyInRequest) {
        return res.status(422).json({
            message: "Keys didn't correspond",
        });
    }
};

module.exports = checkRequest;
