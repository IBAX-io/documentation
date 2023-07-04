# La plataforma de blockchain IBAX {#the-ibax-network}

<!-- TOC -->
- [La plataforma de blockchain IBAX](#the-ibax-network)
  - [Desarrolladores de aplicaciones](#application-developers)
  - [Miembros del ecosistema](#ecolib-members)
  - [Aplicaciones del ecosistema y aplicaciones de plataforma](#ecolib-applications-and-platform-applications)
  - [Modelo subyacente](#underlying-model)
  - [Implementación](#implementation)

<!-- /TOC -->

Este capítulo explica cómo utilizar la plataforma blockchain IBAX.

Si está interesado en desarrollar y gestionar el ecosistema de aplicaciones en la plataforma blockchain IBAX, es posible que no necesite saber nada sobre la blockchain y la red blockchain.
En la plataforma blockchain IBAX, la blockchain y la red blockchain están ocultas para los miembros del ecosistema, los administradores y los desarrolladores de aplicaciones.
La plataforma blockchain IBAX ha proporcionado interfaces [RESTful API](../reference/api2.md) para todos estos grupos de usuarios. Estas interfaces proporcionan acceso al estado global distribuido resistente a la manipulación de la blockchain.

## Desarrolladores de aplicaciones {#application-developers}

En términos técnicos, el **estado global** es un conjunto de datos. La implementación del estado global de la plataforma blockchain IBAX es una base de datos.
Desde la perspectiva de los desarrolladores de aplicaciones, las aplicaciones interactúan con la base de datos mediante consultas, inserciones y actualizaciones de tablas de la base de datos.

En la plataforma blockchain IBAX, las transacciones se escriben en la blockchain mediante la ejecución de contratos, que llaman al código de contrato ejecutado por los nodos de la red blockchain, lo que cambia la base de datos de estado global.

Para los desarrolladores de aplicaciones, los contratos son funciones que escriben datos en la base de datos cuando se ejecutan. Las páginas son como scripts.
El código de la página es un conjunto de funciones de [plantilla de página](../topics/templates2.md). Algunas de estas funciones muestran elementos de la página, mientras que otras recuperan datos de la base de datos.
Los desarrolladores de aplicaciones pueden utilizar la plataforma blockchain IBAX sin conocer las transacciones, la generación de bloques y los algoritmos de consenso.

## Miembros del ecosistema {#ecolib-members}

Las aplicaciones escritas por los desarrolladores de aplicaciones funcionan en el entorno del [ecosistema](../concepts/thesaurus.md#ecosystem), que generalmente sirve a un propósito específico y combina diferentes aspectos de las aplicaciones para lograr ese propósito.

Para acceder a las aplicaciones en el ecosistema, los usuarios deben convertirse en miembros del ecosistema. Un usuario puede ser miembro de múltiples ecosistemas.

Los miembros del ecosistema pueden ver y modificar la base de datos desde las páginas de la aplicación, al igual que en las aplicaciones web comunes, completar formularios, hacer clic en botones y navegar por las páginas.

## Aplicaciones de Ecosistema y Aplicaciones de Plataforma {#ecolib-aplicaciones-y-aplicaciones-de-plataforma}

Las aplicaciones se pueden dividir en dos categorías: **Aplicaciones de Ecosistema** y **Aplicaciones de Plataforma**.

> Aplicaciones de Ecosistema

Las aplicaciones de ecosistema implementan funciones o procesos de negocio exclusivos de ese ecosistema. Las aplicaciones de ecosistema solo están disponibles dentro de su ecosistema.

> Aplicaciones de Plataforma

Las aplicaciones de plataforma son aplicables a todos los ecosistemas. Cualquier aplicación puede desarrollarse como una aplicación de plataforma. Los desarrolladores de la plataforma de blockchain IBAX proporcionan aplicaciones de plataforma que admiten funciones centrales de gobernanza del ecosistema, como votación, notificación y gestión de roles de miembros del ecosistema.

## Modelo Subyacente {#underlying-model}

> Definición de niveles

La plataforma de blockchain IBAX se divide en varios niveles:

> -   Capa de Interacción de Usuario
>
>     > Los miembros del ecosistema interactúan con la aplicación a través de páginas y elementos de página.
>
> -   Capa de Aplicación
>
>     > Los desarrolladores de aplicaciones interactúan con el estado global (tabla de base de datos) a través de código de contrato y código de página.
>
> -   Capa de Estado Global
>
>     > Actualiza y sincroniza el estado global (base de datos) según las operaciones de escritura en el libro mayor de operaciones distribuido (blockchain).
>
> -   Capa de Blockchain
>
>     > Actualiza el libro mayor de operaciones distribuido utilizando nuevos bloques. Las operaciones (transacciones) guardadas en los nuevos bloques deben ejecutarse en el estado global.
>
> -   Capa de Red de Nodos
>
>     > Implementa el protocolo de red de la plataforma de blockchain IBAX. El protocolo de red distribuye transacciones, verifica transacciones y genera nuevos bloques en la red de nodos. De manera similar, los nuevos bloques se distribuyen y verifican en la red de nodos.
>     >
>     > El libro mayor de operaciones distribuido de todos los nodos se mantiene sincronizado. Si hay conflictos entre los nodos, los nodos identificarán qué blockchain se considera una cadena válida y revertirán la cadena no válida.
>
> -   Capa de Transacciones
>
>    La transacción es la base para generar bloques y el protocolo de la cadena de bloques, la transacción en sí es el resultado de una operación ejecutada en la capa de interacción del usuario. La transacción es generada por Weaver.

Cuando el usuario o el desarrollador realiza una operación, como hacer clic en un botón en la página o ejecutar un contrato desde el editor de código, Weaver convierte esta operación en una transacción y la envía a los nodos de la red a la que está conectado.

Por lo tanto, el flujo de la transacción es el siguiente:

- La operación del usuario en la página crea una transacción;
- Esta transacción se incluye en un bloque;
- Este bloque se incluye en la cadena de bloques;
- El cambio en la operación provoca un cambio en el estado global de la cadena de bloques, que se aplica a la base de datos;
- Los cambios en la base de datos se muestran en la aplicación.

## Implementación {#implementation}

Los dos componentes principales de la plataforma de blockchain IBAX son el servidor [go-ibax](https://github.com/IBAX-io/go-ibax) y el código fuente de [Weaver](https://github.com/IBAX-io/weaver).

Weaver:
> - Proporciona la página de usuario;
>
> - Proporciona un IDE para el desarrollo de aplicaciones;
>
> - Almacena la clave pública de la cuenta del usuario y realiza la autorización;
>
> - Solicita datos de la base de datos desde la página de la aplicación y muestra la página de la aplicación al usuario;
>
> - Envía transacciones al servidor a través de [REST API](../reference/api2.md);
>
>     > Para facilitar la operación del usuario, Weaver crea automáticamente transacciones. Cuando los desarrolladores de aplicaciones ejecutan un contrato desde el IDE, Weaver convierte esa operación en una transacción.

Servidor:
> - Mantiene el estado global del nodo (base de datos);
- Implementar el protocolo de blockchain;
- Ejecutar código de contrato en una [máquina virtual](../topics/vm.md);
- Ejecutar código de página en un [motor de plantillas](../topics/templates2.md);
- Implementar una interfaz [RESTful API](../reference/api2.md).
