import functionStep from '../models/functionStep'

STEPS = [
    new functionStep(
        'step1',
        '1er paso',
        'Bajarse la app y registrarse. Es importante la información como nombre y apellido, así como la cuenta de Instagram, ya que permitirán validar las acciones realizadas para luego emitir su bonificación',
        ''
      ),
      new functionStep(
        'step2',
        '2do paso',
        'Ingresar el codigo del local presente en la ubicación. Preguntar a encargados de no encontrar el código',
        ''
      ),
      new functionStep(
        'step3',
        '3er paso',
        'Realizar una historia en instagram del momento compartido. @Bianca estara activamente chequendo que este la publicación. Permitir que BiancaInstagram te siga para casos de cuentas privadas',
        ''
      ),
      new functionStep(
        'step4',
        '4to paso',
        'Ya realizada y validada la publicación, se le enviará un aviso a su Mail (o lo encontrará presente aquí) con el cual podrá ir al mostrador del local o al agente de Bianca a pedir su bonificación!',
        ''
      ),
      new functionStep(
        'step5',
        '5to paso',
        'En todo momento va a encontrar información aquí sobre su estado. Pruebe refrescar cada unos minutos',
        ''
      ),
]

export default STEPS;