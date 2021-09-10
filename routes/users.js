var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');



/* GET users listing. */
router.post('/token', function(req, res, next) {
  var token = jwt.sign({ id: '1o2839sadh19238', name:'Rodrigo', rol:['admin'] }, 'shhhhh');
  console.log('Generate hola: ');
  console.log('Generate token: ', token);
  res.send({token});
});


router.get('/decode', function(req, res, next) {
  const bearer  = req.headers['authorization'];
  const matches = bearer.toString().includes('Bearer');

  if(!bearer) res.status(403).send({message:'No bearer token'});
  if(!matches) res.status(403).send({message:'Token no válido'});

  const token = bearer.split('Bearer')[1].trim();
  const decoded = jwt.decode(token);

  console.log('Bearer ', bearer);
  // var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

  
  res.send({decoded});
});

router.get('/verify/:secret', function(req, res, next) {
  const bearer  = req.headers['authorization'];
  const secret = req.params['secret'];
  const matches = bearer.toString().includes('Bearer');

  if(!bearer) res.status(403).send({message:'No bearer token'});
  if(!matches) res.status(403).send({message:'Token no válido'});

  try {
    const token = bearer.split('Bearer')[1].trim();

  const isValid = jwt.verify(token, secret);

  res.status(200).send({isValid});
  } catch (error) {
    res.status(500).send({message: 'Error al decodificar token', secret })
  }
});


/* GET users listing. */
router.get('/perfil', function(req, res, next) {
  const bearer  = req.headers['authorization'];
  const matches = bearer.toString().includes('Bearer');

  if(!bearer) res.status(403).send({message:'No bearer token'});
  if(!matches) res.status(403).send({message:'Token no válido'});

  const token = bearer.split('Bearer')[1].trim();
  const decoded = jwt.decode(token);

  const {rol} = decoded;

  if(!rol) res.status(403).send({message:'No tiene los permisos necesarios'});
  if(rol !== 'user') res.status(403).send({message:'No tiene los permisos necesarios'});

  res.send({token});
});


router.get('/administrar', function(req, res, next) {
  const bearer  = req.headers['authorization'];
  const matches = bearer.toString().includes('Bearer');

  if(!bearer) res.status(403).send({message:'No bearer token'});
  if(!matches) res.status(403).send({message:'Token no válido'});

  const token = bearer.split('Bearer')[1].trim();
  const decoded = jwt.decode(token);

  const {rol} = decoded;

  if(!rol) res.status(403).send({message:'No tiene los permisos necesarios'});
  if(rol !== 'admin') res.status(403).send({message:'No tiene los permisos necesarios'});

  res.send({token});
});





module.exports = router;
