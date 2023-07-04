# Consenso de prueba de autoridad descentralizado {#decentralized-proof-of-authority-consensus}
<!-- TOC -->

- [¿Qué es el consenso descentralizado de prueba de autoridad?](#what-is-decentralized-proof-of-authority-consensus)
- [Ventajas del consenso DPoA](#advantages-of-dpoa-consensus)
- [Consensus DPoA y medios comunes de ataque](#dpoa-consensus-and-common-means-of-attack)
    - [Ataque de denegación de servicio](#dos)
    - [Ataque del 51%](#percent-attack-51)
- [Implementación del consenso DPoA en IBAX](#implementation-of-dpoa-consensus-in-ibax)
    - [Nodo de honor](#honor-node)
    - [Nodo líder](#leader-node)
    - [Generación de nuevos bloques](#generation-of-new-blocks)
    - [Bifurcación](#forks)

<!-- /TOC -->

Esta sección describe el consenso de Prueba de Autoridad y su implementación en la plataforma blockchain IBAX.

## ¿Qué es el Consenso de Prueba de Autoridad Descentralizada? {#what-is-decentralized-proof-of-authority-consensus}

La red IBAX ha desarrollado un nuevo mecanismo de consenso llamado DPoA (Prueba de Autoridad Descentralizada) considerando los escenarios de aplicación empresarial y el entorno del mundo real.

La descentralización siempre ha sido nuestra firme creencia. No solo se refiere al entorno de red de infraestructura de IBAX, sino que también permite que la descentralización arraigue en cada ecoLib creado en la red IBAX y logre una alta autonomía en cada ecosistema utilizando soluciones técnicas. Para lograr una autonomía altamente distribuida, hemos realizado muchos cambios en la arquitectura general y la implementación técnica. Sin embargo, en la práctica, no podemos evitar el concepto de gestión centralizada. Para encontrar un equilibrio entre la centralización y la descentralización, hemos desarrollado ciertos esquemas de recompensa e incentivos además del mecanismo de consenso DPoA.

La red IBAX ha creado un nuevo mecanismo de consenso que combina la autorización distribuida, la centralización débil y el certificado. Lo llamamos DPoA (Prueba de Autoridad Descentralizada). Para garantizar la continuidad de toda la red IBAX, el consenso incluye no solo la red pública de IBAX, sino también los ecoLibs creados por cada usuario y grupo de usuarios. Esto creará una organización autónoma, descentralizada, justa, transparente y antifraude de organización autónoma descentralizada (DAO).

DPoA tiene mecanismos para prevenir ataques de red y permite la creación de nodos de acuñación que protegen la red y acuñan nuevos tokens IBXC. Los titulares de IBAXCoin pueden apostar una parte de su saldo de liquidez de IBXC en los nodos de acuñación para recibir recompensas de emisión de acuñación y apuesta. La acuñación y la apuesta ayudan a aumentar el costo y la dificultad de los ataques y aumentan proporcionalmente el valor total de las monedas IBXC. Con este mecanismo, la probabilidad y el daño de cualquier ataque son infinitamente cercanos a cero.

## Ventajas del Consenso DPoA {#advantages-of-dpoa-consensus}

En comparación con los mecanismos de consenso de Prueba de Trabajo (PoW) y Prueba de Participación (PoS), DPoA tiene las siguientes ventajas:

- No se requiere hardware de alto rendimiento. En comparación con el consenso PoW, el consenso DPoA no requiere que los nodos gasten recursos informáticos para resolver lógica matemática compleja.
- El intervalo de tiempo para generar nuevos bloques es predecible, lo que difiere del consenso PoW y PoS.
- Alta tasa de transacción. Los nodos de red autorizados generan bloques en secuencia en intervalos de tiempo especificados, lo que aumenta la velocidad de verificación de transacciones.
- Tolerancia para nodos atacados y maliciosos, siempre y cuando no se ataque al 51% de los nodos. La plataforma blockchain IBAX implementa mecanismos para prohibir nodos y revocar los derechos de generación de bloques.

## Consenso DPoA y métodos comunes de ataque {#dpoa-consensus-and-common-means-of-attack}

### Ataque de denegación de servicio (DoS) {#dos}

El atacante envía una gran cantidad de transacciones y bloques al nodo de red objetivo en un intento de interrumpir su actividad y hacerlo no disponible.

El mecanismo DPoA puede resistir este tipo de ataque:

> - Dado que los nodos de red han sido preverificados, los permisos de generación de bloques solo pueden otorgarse a nodos que puedan resistir los ataques DoS;
> - Si un cierto nodo de honor no está disponible durante un período de tiempo, puede ser excluido de la lista de nodos de honor.

### Ataque del 51% {#percent-attack-51}

En el consenso DPoA, un ataque del 51% requiere que el atacante tome el control del 51% de los nodos de la red. Esto es diferente del ataque del 51% en el consenso PoW, donde el atacante necesita obtener el 51% del poder de cómputo de la red. Es mucho más difícil tomar el control de los nodos en una red de blockchain con permisos que obtener el poder de cómputo.

Por ejemplo, en una red de consenso PoW, el atacante puede aumentar el poder de cómputo (rendimiento) del segmento de red controlado, aumentando así el porcentaje controlado. Esto no tiene sentido para el consenso DPoA porque el poder de cómputo de los nodos no tiene impacto en las decisiones de la red de blockchain.

## Implementación del consenso DPoA en IBAX {#implementation-of-dpoa-consensus-in-ibax}

### Nodo de honor {#honor-node}

En la plataforma de blockchain IBAX, solo los nodos de honor tienen el derecho de generar nuevos bloques, y estos nodos mantienen la red de blockchain y el libro mayor distribuido.

La lista de nodos de honor se guarda en el registro de blockchain. El orden de los nodos en esta lista determina el orden en que los nodos generan nuevos bloques.

### Nodo líder {#leader-node}

El nodo líder es el nodo de honor que genera nuevos bloques en el momento actual. La siguiente fórmula determina el nodo líder en la lista actual de nodos de honor:

``` text
leader = ((time - first) / step) % nodes
```

> leader

El índice de la lista actual de nodos de honor, que se puede representar como un nodo líder según el índice.

> time

El tiempo actual (UNIX).

> first

La hora de generación del bloque inicial (UNIX).

> step

El número de segundos en el intervalo de generación de bloques.

> nodes

El número total de nodos de honor.

#### Generación de nuevos bloques {#generation-of-new-blocks}

Los nuevos bloques son generados por el [nodo líder](#leader-node) del intervalo de tiempo actual. En cada intervalo de tiempo, el nodo líder pasa la responsabilidad al siguiente nodo de honor en la lista.

![image](/block-generation.png)

a) Pasos para generar un nuevo bloque

Los pasos principales son los siguientes:

> 1.  Recopilar todas las nuevas transacciones de la cola de transacciones del nodo;
> 2.  Ejecutar cada transacción una por una, las transacciones inválidas o que no se pueden ejecutar serán rechazadas;
> 3.  Verificar si cumple con el [rango de límite de generación de bloques](../reference/platform-parameters.md#configure-the-generation-of-blocks);
> 4.  Generar un nuevo bloque con transacciones válidas y firmar el bloque con la clave privada del nodo de honor utilizando el algoritmo ECDSA;
> 5.  Enviar el bloque a otros nodos de honor.

b) Verificación del nuevo bloque

Los otros nodos de honor verifican los siguientes pasos:

> 1.  Recibir y verificar el nuevo bloque:
>
>     > -   El nuevo bloque fue generado por el nodo líder del intervalo de tiempo actual;
>     > -   El nodo líder del intervalo de tiempo actual no ha generado otros bloques;
>     > -   El nuevo bloque está firmado correctamente.
>
> 2.  Ejecutar cada transacción en el bloque. Verificar si la transacción se ejecutó correctamente y si está dentro del [rango de límite de generación de bloques](../reference/platform-parameters.md#configure-the-generation-of-blocks).
>
> 3.  Aceptar o rechazar el bloque, dependiendo del paso anterior:
>
>     > -   Si la verificación del bloque es exitosa, agregar el nuevo bloque a la cadena de bloques del nodo actual;
>     > -   Si la verificación del bloque falla, rechazar el bloque, marcar el bloque y enviar una transacción de **bloque malo**;
>     > -   Si el nodo de honor que generó el bloque malo sigue generando ese tipo de bloques, puede ser desactivado o excluido de la lista de nodos de honor.

### Forks {#forks}

**Forks** son versiones alternativas de la cadena de bloques. Los forks contienen uno o más bloques generados de forma independiente al resto de la cadena de bloques.

Los forks suelen ocurrir cuando una parte de los nodos de la red no están sincronizados. Los factores que afectan la probabilidad de un fork son la alta latencia de la red, violaciones intencionales o no intencionales de límites de tiempo, y la falta de sincronización del tiempo del sistema de los nodos. Si los nodos de la red están geográficamente dispersos, se debe aumentar el intervalo de generación de bloques.

Los forks se resuelven siguiendo la regla de la cadena de bloques más larga. Cuando se detectan dos versiones de la cadena de bloques, los nodos honorables revertirán la versión más corta y aceptarán la versión más larga.

![image](/block-fork-resolution.png)
