const { Router } = require('express');
const router = Router();

const User = require('../models/User');

const jwt = require('jsonwebtoken');

//EMPR
const empresa = require("../controllers/empresa.controller");
// Para la consulta no verificamos el token
router.get("/empr", empresa.getEmpresas);

router.get("/empr/distinct", empresa.getEmpresasDistinct);

router.get("/empr/distinctdos", empresa.getEmpresasDistinctdos);

router.get("/empr/filter/:pais", empresa.getEmpresasFilter);

router.get("/empr/filterdos/:localidad", empresa.getEmpresasFilterdos);

router.post("/empr", verifyToken, empresa.createEmpresa);

router.get("/empr/:id", verifyToken, empresa.getEmpresa);

router.put("/empr/:id", verifyToken, empresa.editEmpresa);

router.delete("/empr/:id", verifyToken, empresa.deleteEmpresa);

//USR
const user = require("../controllers/user.controller");
// Para la consulta no verificamos el token
router.get("/usr", user.getUsers);

router.post("/usr", verifyToken, user.createUser);

router.get("/usr/:id", verifyToken, user.getUser);

router.put("/usr/:id", verifyToken, user.editUser);

router.delete("/usr/:id", verifyToken, user.deleteUser);

// FIN EMPR

router.get('/', (req, res) => {
    res.send('hello')
});

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const newUser = new User({email, password});
    await newUser.save();
	const token = await jwt.sign({_id: newUser._id}, 'secretkey');
    res.status(200).json({token});
});


router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(401).send('El email no existe');
    if (user.password !== password) return res.status(401).send('Password errónea');

	const token = jwt.sign({_id: user._id}, 'secretkey');

    //Probamos extraer la información almacenada
    const payload = jwt.verify(token, 'secretkey');

    return res.status(200).json({token});
});

router.get('/tasks', (req, res) => {
    res.json([
        {
            _id: '1',
            name: "task one",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '2',
            name: "task two",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '3',
            name: "task three",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
    ])
});

router.get('/private-tasks', verifyToken, (req, res) => {
    console.log(`El usuario es: ${req.userId}`)
    res.json([
        {
            _id: '1',
            name: "task one",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '2',
            name: "task two",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '3',
            name: "task three",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
    ])
});

async function verifyToken(req, res, next) {

    console.log(req.headers.authorization)
    
	try {
        // Si no existe la cabecera
		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request -1. ');
		}
        // Si no hay nada después de un espacio "Bearer dfasfjsdfjasj"
		let token = req.headers.authorization.split(' ')[1];
		if (token === undefined) {
			return res.status(401).send('Unauhtorized Request -2');
		}
        console.log(token)

		const payload = await jwt.verify(token, 'secretkey');
        console.log(payload)
		if (!payload) {
			return res.status(401).send('Unauhtorized Request -3');
		}
        console.log(payload)
        req.userId = payload._id;
        /*
        console.log("cabeceras:")
        console.log(token)
        console.log(payload._id)

        */
		next();
	} catch(e) {
		//console.log(e)
        // Si el token está mal formado, no tiene la misma estructura
		return res.status(401).send('Unauhtorized Request -4');
	}
    
}

module.exports = router;
