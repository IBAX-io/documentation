# Terminología y definiciones {#terms-and-definitions}

  - [Términos relacionados con blockchain](#blockchain-terms)
    - [Blockchain](#blockchain)
    - [Red peer-to-peer](#peer-to-peer-network)
    - [Hash](#hash)
    - [Bloque](#block)
    - [Verificación de bloque](#block-verification)
    - [Consenso](#consensus)
    - [Token](#token)
    - [Identificador](#identification)
    - [Identificador único](#unique-identification)
    - [Clave privada](#private-key)
    - [Clave pública](#public-key)
    - [Firma digital](#digital-signature)
    - [Contrato inteligente](#smart-contract)
    - [Tarifa de transacción](#transaction-fee)
    - [Doble gasto](#double-spend)
    - [Cifrado](#encryption)
    - [Blockchain privada](#private-blockchain)
    - [Blockchain pública](#public-blockchain)
    - [Prueba de autoridad](#proof-of-authority)
  - [Términos de la plataforma blockchain IBAX](#ibax-terms)
    - [Red de prueba](#testnet)
    - [Red principal](#mainnet)
    - [Tarifa de gas](#gas-fee)
    - [Dirección de cuenta](#account-address)
    - [Dirección de billetera](#wallet-address)
    - [Weaver](#weaver)
    - [Ecolib](#ecolib)
    - [Parámetros de Ecolib](#ecolib-parameters)
    - [Miembros de Ecolib](#ecolib-members)
    - [Ecolib virtual privada](#virtual-private-ecolib)
    - [Prueba de autoridad descentralizada](#decentralized-proof-of-authority)
    - [Needle](#needle)
    - [Logicor](#logicor)
    - [Entorno de desarrollo integrado (IDE)](#integrated-development-environment-ide)
    - [Editor de página](#page-editor)
    - [Diseñador de página visual](#visual-page-designer)
    - [Editor de contrato inteligente](#contract-editor)
    - [Recursos multilingües](#multilingual-resources)
    - [Exportar aplicación](#application-export)
    - [Importar aplicación](#application-import)
    - [Ley inteligente](#smart-law)
    - [Sistema legal](#legal-system)
    - [Aplicación](#application)
    - [Página](#page)
    - [Segmento de código](#code-segment)
    - [Derechos de acceso](#access-rights)
    - [Nodo de honor](#honor-node)
    - [Nodo guardián](#guardian-node)
    - [Procesamiento de transacciones concurrentes](#concurrent-transaction-processing)



## Terminología relacionada con blockchain {#blockchain-terms}

### Blockchain {#blockchain}

> Un sistema de información para almacenar datos, transmitir y procesar datos dentro del sistema, que puede prevenir la falsificación y pérdida de datos, y al mismo tiempo mantener la confiabilidad de los datos;
> Protege los datos de la siguiente manera:
>
> > 1. Escribir los datos en una cadena de bloques cifrada;
> > 2. Almacenar copias descentralizadas de la cadena de bloques en una red de pares;
> > 3. Sincronizar la cadena de bloques en todos los nodos mediante un mecanismo de consenso;
> > 4. Almacenar algoritmos de contratos inteligentes en la cadena de bloques para garantizar la confiabilidad de los datos al realizar operaciones de datos en la red.

### Red de pares {#peer-to-peer-network}

> Una red de nodos de computadora (sin servidor central).

### Hash {#hash}

> También conocido como función hash, es un valor binario de longitud fija más corta que se asigna a cualquier archivo o conjunto de datos de cualquier longitud.

### Bloque {#block}

> Un conjunto de transacciones que se agrupan por nodos honorarios en una estructura de datos específica después de verificar el formato y la firma de la transacción.
> Un bloque contiene un puntero hash como enlace al bloque anterior, que es una de las medidas de seguridad para la cadena de bloques.

### Verificación de bloque {#block-verification}

> Verificar la estructura del bloque, el tiempo de generación, la compatibilidad con el bloque anterior, la firma de la transacción y la correspondencia entre la transacción y los datos del bloque.

### Consenso {#consensus}

> Un protocolo de verificación utilizado por los nodos honorarios para agregar nuevos bloques a la cadena de bloques o un algoritmo similar.

### Transacción {#transaction-1}

> Una operación de transferencia de datos en la red de blockchain o un registro de este tipo de transacción en la cadena de bloques.

### Token {#token}

> Una prueba de derecho digital cifrado y transferible en la cadena de bloques. Un conjunto de registros digitales reconocibles almacenados en un registro, que incluyen un mecanismo para intercambiar participaciones de derechos entre estos registros.

### Identificador {#identification}

> Un programa de cifrado utilizado para identificar a los usuarios en el sistema.

### Identificador único {#unique-identification}

> Un programa que vincula una cuenta con un usuario, que requiere esfuerzos legales y organizativos o programas de identificación biométrica para vincular un nombre de usuario con un usuario real.

### Clave privada {#private-key}

> Una cadena de caracteres mantenida en secreto por su propietario, utilizada para acceder a cuentas virtuales en la red y firmar transacciones.

### Clave pública {#public-key}

> Una cadena de caracteres utilizada para verificar la autenticidad de una clave privada, generada de manera única a partir de la clave privada.

### Firma digital {#digital-signature}

> Una propiedad obtenida mediante la encriptación de un documento o mensaje, utilizada para verificar la integridad (sin modificaciones) y autenticidad (verificar la identidad del remitente) del documento.

### Contrato inteligente {#smart-contract}

> Un programa que ejecuta operaciones de almacenamiento de datos en una cadena de bloques, y todos los contratos inteligentes se almacenan en la cadena de bloques.

### Tarifa de transacción {#transaction-fee}

> La tarifa pagada al nodo validador por ejecutar una transacción.

### Doble gasto {#double-spend}

> Un método de ataque en la red de la cadena de bloques que resulta en gastar el mismo token dos veces en una transacción.
>
> Este tipo de ataque ocurre cuando la cadena de bloques se bifurca. Solo cuando el atacante controla más del 50% de la capacidad de validación de la red se puede ejecutar este tipo de ataque.

### Encriptación {#encryption}

> Una forma de convertir datos digitales que solo pueden ser leídos por la parte con la clave de descifrado correspondiente.

### Cadena de bloques privada {#private-blockchain}

> Una red de cadena de bloques donde todos los nodos y el acceso a los datos son controlados centralmente por una sola organización (gobierno, empresa o individuo).

### Cadena de bloques pública {#public-blockchain}

> Una red de cadena de bloques que no está controlada por ninguna organización, donde todas las decisiones son tomadas por consenso entre los participantes de la red, y todos pueden acceder y recuperar datos de la red de cadena de bloques.

### Prueba de autoridad {#proof-of-authority}

> Prueba de autoridad (PoA), la red IBAX crea un nuevo mecanismo de consenso que combina la descentralización distribuida, la centralización débil y la autorización de certificados.
> Lo llamamos PoA (Prueba de autoridad). Para garantizar la continuidad de toda la red IBAX, el consenso incluye no solo la red pública de IBAX,
> sino también ecoLibs creados por cada usuario y grupo de usuarios.
> Esto creará una organización autónoma, descentralizada, justa, transparente y antifraude verdaderamente descentralizada (DAO).

## Términos de la plataforma de cadena de bloques IBAX {#ibax-terms}

### Testnet {#testnet}

> Una versión de la red de cadena de bloques utilizada para pruebas.

### Mainnet {#mainnet}

> La versión principal de la red blockchain.

### Transacción {#transaction-2}

> Una operación que llama a un contrato inteligente y pasa parámetros al contrato inteligente. El resultado de la transacción ejecutada por un nodo de honor es la actualización de la base de datos.

### Gas {#gas-fee}

> La unidad convencional utilizada para calcular el costo de realizar ciertas operaciones en la red de nodos. La tasa de gas es determinada por votación de los nodos de honor.

### Dirección de cuenta {#account-address}

> Un registro de datos que almacena tokens y se puede acceder a través de un par de claves (clave privada y clave pública).

### Dirección de billetera {#wallet-address}

> Un identificador de caracteres de un usuario en la red de nodos, que sirve como nombre de su cuenta virtual.

### Weaver {#weaver}

> Un cliente de software utilizado para conectarse a la red de nodos, disponible en versión de escritorio y versión de navegador web.
>
> Weaver integra un entorno de desarrollo de plataforma que incluye la creación y edición de tablas de datos, páginas y contratos inteligentes. Los usuarios pueden construir ecosistemas en Weaver, crear y utilizar aplicaciones.

### Ecosistema {#ecolib}

> Un entorno de programación de software relativamente cerrado o abierto que incluye aplicaciones y miembros del ecosistema.
>
> Los miembros del ecosistema pueden emitir tokens exclusivos del ecosistema, establecer reglas de interacción entre los miembros mediante contratos inteligentes y establecer permisos de acceso a los elementos de la aplicación para los miembros.

### Parámetros del ecosistema {#ecolib-parameters}

> Un conjunto de parámetros del ecosistema configurables, que incluyen la cuenta del creador del ecosistema, los permisos para cambiar los elementos de la aplicación, etc. Estos parámetros se pueden cambiar en la tabla de parámetros.

### Miembros del ecosistema {#ecolib-members}

> Usuarios que pueden acceder a funciones específicas de la aplicación y del ecosistema.

### Virtual Private Ecosystem {#virtual-private-ecolib}

> El ecosistema privado virtual Cross Ledgers Base (CLB) tiene todas las funciones de un ecosistema estándar, pero funciona fuera de la cadena de bloques.
> En CLB, se pueden usar y crear contratos inteligentes y lenguajes de plantillas, tablas de bases de datos y se pueden crear aplicaciones con Weaver.
> Se pueden llamar a los contratos inteligentes en el ecosistema de la cadena de bloques mediante una interfaz.

### Prueba de autoridad descentralizada {#decentralized-proof-of-authority}

> La Prueba de autoridad descentralizada (DPoA) es un nuevo algoritmo de consenso que proporciona alta velocidad y tolerancia a fallos.
> En DPoA, el derecho a generar nuevos bloques se otorga a los nodos que han demostrado tener la capacidad de hacerlo y estos nodos deben ser verificados previamente.

### Needle {#needle}

> Es un lenguaje de script utilizado para crear contratos inteligentes que puede manejar la funcionalidad de los datos recibidos de las páginas de usuario y las operaciones de valores realizadas en las tablas de bases de datos.
>
> Se pueden crear y editar contratos inteligentes en el editor de Weaver.

### Logicor {#logicor}

> Es un lenguaje de plantillas utilizado para crear páginas que puede obtener valores de las tablas de bases de datos, construir páginas de usuario y pasar los datos de entrada del usuario a la sección **data** de los contratos inteligentes.

### Integrated Development Environment (IDE) {#integrated-development-environment-ide}

> El Entorno de Desarrollo Integrado (IDE) es un conjunto de herramientas de software utilizadas para crear aplicaciones.
>
> El IDE de Weaver incluye un editor de contratos inteligentes, un editor de páginas, una herramienta de gestión de tablas de bases de datos, un editor de recursos multilingües y funciones de exportación e importación de aplicaciones. El IDE se complementa con un diseñador de páginas visual basado en herramientas semánticas.

### Editor de páginas {#page-editor}

> En Weaver, se pueden crear páginas de aplicaciones mediante la disposición directa de elementos básicos de la aplicación en la pantalla, como contenedores HTML, campos de formulario, botones, etc.

### Diseñador de páginas visual {#visual-page-designer}

> Las herramientas para crear páginas de aplicaciones en Weaver incluyen un diseñador de interfaz y un generador de código de página basado en el lenguaje Logicor.

### Editor de contratos inteligentes {#contract-editor}

> Herramientas para crear contratos inteligentes visualmente en Weaver.

### Recursos multilingües {#multilingual-resources}

> Un módulo en Weaver para la localización de páginas de aplicaciones, que asocia las etiquetas en la página de la aplicación con los valores de texto en el idioma seleccionado.

### Exportación de aplicaciones {#application-export}

> Guarda todo el código fuente de la aplicación, incluyendo tablas de datos, páginas y contratos inteligentes, en un archivo.

### Importación de aplicaciones {#application-import}

> Carga todas las tablas de datos, páginas y contratos inteligentes incluidos en un archivo de exportación en el ecosistema.

### Ley inteligente {#smart-law}

> Un conjunto especial de contratos inteligentes que incluyen información regulatoria. Se utiliza para gestionar y controlar las operaciones de los contratos inteligentes y el acceso a los registros.

### Sistema legal {#legal-system}

> Un conjunto de reglas y mecanismos establecidos en la ley inteligente que pueden regular las relaciones entre los usuarios del ecosistema, definir las reglas del proceso de cambio de parámetros del protocolo y definir soluciones desafiantes.

### Aplicación {#application}

> Un producto de software completo y funcional creado en el entorno de desarrollo integrado de Weaver.
>
> Una aplicación es una colección de elementos, como tablas de bases de datos, contratos inteligentes y páginas de usuario, que tienen permisos de acceso configurados.

### Página {#page}

> Programa escrito en el lenguaje de plantillas Logicor para crear una interfaz interactiva en la pantalla.

### Fragmento de código {#code-segment}

> Programa escrito en el lenguaje de plantillas Logicor que se puede repetir en bloques de código en una página de la aplicación.

### Derechos de acceso {#access-rights}

> Condiciones para obtener acceso a la creación y edición de tablas de datos, contratos inteligentes y páginas.
>
> Los derechos de acceso a las tablas de datos pueden incluir permisos para agregar filas y columnas, así como para editar los valores en las columnas.

### Nodo de honor {#honor-node}

> Nodo de la red que tiene el derecho de generar y verificar bloques.

### Nodo guardián {#guardian-node}

> Un nodo en la red que almacena la última versión completa de la cadena de bloques.

### Procesamiento de transacciones concurrentes {#concurrent-transaction-processing}

> Un método para mejorar la velocidad de procesamiento de transacciones mediante el procesamiento simultáneo de datos de diferentes ecosistemas.
