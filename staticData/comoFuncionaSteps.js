import functionStep from '../models/functionStep'

STEPS = [
    new functionStep(
        'step1',
        '1er paso',
        'Bajarse la app y registrarse. Es importante la informacion como nombre y apellido, asi como cuenta de instagram porque permiten validar las acciones realizadas para luego emitir la bonificacion',
        ''
      ),
      new functionStep(
        'step2',
        '2do paso',
        'Ingresar el codigo del local, presente en la ubicacion. Preguntar a encargados de no encontrar el codigo',
        ''
      ),
      new functionStep(
        'step3',
        '3er paso',
        'Realizar una historia en instagram con los @ y # soliticados. BiancaInstagram estara activamente chequendo que este la publicacion por lo que de tener cuenta privada permitir que BiancaInstagram te siga',
        ''
      ),
      new functionStep(
        'step4',
        '4to paso',
        'Ya realizada la publicacion en Instagram, se les enviara un codigo a su celular con el cual podran ir al mostrador del local o al agente de Bianca visible conuna gorra amarilla a pedir su bonificacion!',
        ''
      ),
]

export default STEPS;