const getApp = (req, res) => {
    console.log("holas")
    res.send('hola mundo');
}

const getUser = (req, res) => {

    res.json('getUser');
}

const postUser = (req, res) => {
    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            message: 'Debe contener el nombre'
        });
    } else {
        res.json({
            persona: body
        });
    }
}

const putUser = (req, res) => {
    let id = req.params.id;
    res.json({
        id
    });
}

const deleteUser = (req, res) => {
    res.json('deleteUser');
}
module.exports = {
    getApp,
    getUser,
    postUser,
    putUser,
    deleteUser
}