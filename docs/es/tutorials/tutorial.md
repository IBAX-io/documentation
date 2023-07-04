# Tutorial para desarrolladores de redes IBAX {#ibax-development-tutorial}

## Guía de inicio {#getting-started-guide}

  - [Deployar el primer contrato inteligente a través de la herramienta de línea de comandos](#deploy-first-smart-contract-via-command-line-tool)
  - [Desarrollo de la ecología de herramientas de línea de comandos](#command-line-tool-eco-development)
  
## Despliegue {#deployment}

  - [Deployar aplicación usando herramientas de línea de comandos](#deploy-application-using-command-line-tools)
  - [Configuración ecológica usando herramientas de línea de comandos](#ecological-configuration-using-command-line-tool)

## Guía avanzada {#advanced-guide}

  - [Deploying applications using application packaging tools](#deploy-applications-using-application-packaging-tool)


## Para implementar el primer contrato inteligente a través de la herramienta de línea de comandos: {#deploy-first-smart-contract-via-command-line-tool}

Vamos a desplegar un [contrato inteligente](../concepts/thesaurus.md#smart-contract) en la cadena de bloques IBAX y aprender cómo llamar a un contrato inteligente utilizando la [herramienta de línea de comandos](https://github.com/IBAX-io/ibax-cli). Como nuestro primer contrato inteligente, lo desplegaremos en una [red de prueba local](../concepts/blockchain-layers.md). Puedes consultar cómo desplegar una red local en [Despliegue de red](../howtos/deployment.md), por lo que no necesitas ningún gasto para desplegarlo y ejecutarlo.

### Crear una aplicación. {#create-application}

Invocar el contrato inteligente @1NewApplication para crear una aplicación. Este contrato inteligente tiene un parámetro de nombre de aplicación y un parámetro de modificación de permisos (../concepts/about-the-platform.md#access-rights-control-mechanism).

``` text
1    $ ibax-cli console
2    
3    Welcome to the IBAX console!
4    To exit, press ctrl-d or type exit
5  >callContract @1NewApplication {"Name": "testapp", "Conditions": "ContractConditions(\"@1DeveloperCondition\")"}
6  
7  {
8      "block_id": 1217,
9      "hash": "6327161d2202c33c06d34ab4ed9b509c05fc2cbb15cf260c6d3d404a6f640028",
10      "penalty": 0,
11      "err": "31"
12  }
```

- En la primera línea, se inicia la terminal de línea de comandos.
- En la quinta línea, se llama al contrato inteligente @1NewApplication para crear una aplicación llamada `testapp`, con permisos de modificación de la aplicación para el desarrollador `@1DeveloperCondition`.
- En la octava línea, se muestra el ID del bloque generado por la transacción.
- En la novena línea, se muestra el hash del bloque generado por la transacción.
- En la décima línea, se muestra si la transacción falló (0: sin castigo, 1: castigo).
- En la undécima línea, si la transacción falló, se devuelve un mensaje de texto de error y si se devuelve el ID del bloque, el campo err es el ID de la aplicación.

Por supuesto, si desea ver qué campos y tipos de datos tiene este contrato inteligente, puede llamar al método `getContractInfo`, que devolverá información sobre el contrato inteligente de la siguiente manera:

```text
>getContractInfo @1NewApplication

{
    "id": 5022,
    "state": 1,
    "tableid": "22",
    "walletid": "0",
    "tokenid": "1",
    "address": "0000-0000-0000-0000-0000",
    "fields": [
        {
            "name": "Name",
            "type": "string",
            "optional": false
        },
        {
            "name": "Conditions",
            "type": "string",
            "optional": false
        },
        {
            "name": "VotingId",
            "type": "int",
            "optional": true
        }
    ],
    "name": "@1NewApplication",
    "app_id": 1,
    "ecosystem": 1,
    "conditions": "ContractConditions(\"@1DeveloperCondition\")"
}
```

El campo `fields` es el parámetro de este contrato inteligente, que incluye el nombre del parámetro `name`, el tipo `type`, la opción opcional `optional`, `Name` y `Conditions` son campos obligatorios, `VotingId` es opcional y se puede consultar en el método de API [contract/name](../reference/api2.md#contract-name).


### Escribir un contrato inteligente. {#writing-contracts}

Usamos [Needle](../topics/script.md#needle-contract-language) para escribir contratos inteligentes. Implementamos una operación de suma simple. El código fuente del contrato inteligente es el siguiente. Guardamos el contrato inteligente como `SumMath.sim`.

``` text
1    contract SumMath {
2        data {
3            A int
4            B int
5        }
6        conditions {
7    
8        }
9        action {
10            var sum int
11            sum = $A + $B
12            $result = sum
13        }
14    }
```

- En la primera línea, definimos un contrato inteligente llamado SumMath.
- En la segunda línea, se encuentra la sección de datos.
- En las líneas 3 y 4, definimos dos parámetros de entrada de tipo entero de 64 bits llamados `A` y `B`.
- En la línea 6, se encuentra la sección de condiciones.
- En la línea 9, se encuentra la sección de acciones. Definimos una variable llamada `sum` para recibir el resultado de la suma de `A` y `B`, y luego asignamos el valor de `sum` a `$result`, que es el resultado del contrato inteligente. Por supuesto, también podríamos asignar directamente el valor de `A+B` a `$result`, pero esto es solo un ejemplo.

### Crear un contrato inteligente. {#create-contract}

Hay dos formas de crear un contrato inteligente, el primer método:

El primer paso es escribir un archivo de parámetros de contrato inteligente en formato JSON:

``` json
{
  "ApplicationId": 31,
  "Value": "contract SumMath {\n    data {\n        A int\n        B int\n    }\n    conditions {\n\n    }\n    action {\n        var sum int\n        sum = $A + $B\n        $result = sum\n    }\n}",
  "Conditions": "ContractConditions(\"@1DeveloperCondition\")"
}
```

El `ApplicationId` es el ID de la aplicación, `Value` es el código fuente del contrato inteligente y debe escapar los caracteres especiales. `Conditions` son los permisos de modificación del contrato inteligente.

Lo llamaremos `SumMathParams.json`.

El segundo paso es llamar a la creación del contrato inteligente @1NewContract.

```
1    >callContract @1NewContract -f=./data/SumMathParams.json
2    {
3        "block_id": 1238,
4        "hash": "f3fe7aff8a613c96299723b7e9af0682aa8cabe7becf67a485e2a77a974f58b6",
5        "penalty": 0,
6        "err": "328"
7    }
```

Segunda opción:

Enviar directamente el archivo de código fuente del contrato inteligente guardado como parámetro del contrato inteligente, el formato del parámetro es `nombre del parámetro` + `-` + "archivo", `nombreDelParametro-archivo` como se muestra a continuación:

```shell
1    >callContract @1NewContract {"ApplicationId": 31, "Value-file": "SumMath.sim", "Conditions": "true"}    
2    {
3        "block_id": 2055,
4        "hash": "cdf25060669cf7cba137278...26ca463fd5d458f3402a5f0137f693db",
5        "penalty": 0,
6        "err": "368"
7    }
```

- Línea 1: Se llama al contrato inteligente @1NewContract para crear un contrato inteligente, utilizando el parámetro del contrato inteligente importado desde un archivo con la opción -f.
- Línea 3: El ID del bloque generado por la transacción.
- Línea 4: El hash del bloque generado por la transacción.
- Línea 5: Si la transacción falla (0: sin castigo, 1: castigo).
- Línea 6: Si la transacción falla, se devuelve un mensaje de error de texto. Si se devuelve un ID de bloque, el campo err es el ID de este contrato inteligente.

Intentemos llamar al contrato inteligente que acabamos de implementar.

```
1  >callContract @5SumMath {"A":1, "B":2}
2  
3  {
4      "block_id": 1239,
5      "hash": "7fa09da0b9f65634119a910f9d91aaf4927208278efd62961499ef7e4f4c8c9c",
6      "penalty": 0,
7      "err": "3"
8  }
```

La llamada se ha completado y el resultado es el esperado, a continuación se explica línea por línea:
- En la primera línea se llama al contrato inteligente, aquí hemos desplegado el contrato inteligente en la ecología con el id 5, pero si estamos en la misma ecología con el id 5, también podemos llamarlo así: `callContract SumMath {"A":1, "B":2}`.
- En la tercera línea se muestra el id del bloque generado por la transacción.
- En la cuarta línea se muestra el hash del bloque generado por la transacción.
- En la quinta línea se muestra si la transacción falló (0: sin penalización, 1: con penalización).
- En la sexta línea, si la transacción falló, se devuelve un mensaje de error en forma de texto. Si se devuelve un id de bloque, el campo "err" será el resultado del contrato inteligente, es decir, el valor de `$result`.


## Desarrollo de la ecología de herramientas de línea de comandos. {#command-line-tool-eco-development}

En este tutorial, aprenderás cómo:
1. [Crear un ecosistema](#step-1-create-ecosystem)
2. [Crear una aplicación](#step-2-create-application)
3. [Crear una tabla de datos](#step-3-create-table)
4. [Crear parámetros de aplicación](#step-4-create-application-parameters)
5. [Crear y desplegar un contrato inteligente](#step-5-create-contract-deploy-contract)
6. [Crear parámetros ecosistema](#step-6-create-ecological-parameters)
7. [Agregar localización](#step-7-add-localization)
8. [Modificar el contrato inteligente](#step-8-modify-the-contract)
9. [Modificar los permisos de la tabla de datos](#step-9-modify-data-table-permissions)

Para comprender mejor cómo es el ecosistema y las aplicaciones de IBAX, y para qué se utilizan, primero debemos entender a qué parte pertenecen el ecosistema y las aplicaciones. Podemos comprenderlo mejor a través de un simple mapa mental:
![image](/ibax-eco.png)

Se puede ver que la red IBAX puede tener muchos [ecosistemas](../concepts/about-the-platform.md#ecolib), cada ecosistema puede tener múltiples [aplicaciones](../concepts/about-the-platform.md#applications), cada aplicación tiene [contratos inteligentes](../concepts/thesaurus.md#smart-contract), [tablas de datos](../concepts/about-the-platform.md#tables), el ecosistema tiene parámetros de ecosistema, las aplicaciones tienen parámetros de aplicación.

### Paso 1 - Crear un ecosistema {#step-1-create-ecosystem}

Primero usaremos la herramienta de línea de comandos (https://github.com/IBAX-io/ibax-cli) para crear un ecosistema y llamar al contrato inteligente @1NewEcosystem. Si desea modificar el nombre del ecosistema, puede llamar al contrato inteligente @1EditEcosystemName.

```shell
1    $ ibax-cli console
2    
3    Welcome to the IBAX console!
4    To exit, press ctrl-d or type exit
5    >callContract @1NewEcosystem {"Name": "goodBoy school"}
6    
7    {
8        "block_id": 1199,
9        "hash": "a1dc90c1772545c16394b9521...227676b27b145743556a8973dd",
10       "penalty": 0,
11       "err": "18"
12   }
```

- En la primera línea, se inicia el programa de consola de línea de comandos.
- En la quinta línea, se llama al contrato inteligente @1NewEcosystem para crear un ecosistema con el nombre `test ecosystem`.
- En la octava línea, se muestra el ID del bloque generado por la transacción.
- En la novena línea, se muestra el hash del bloque generado por la transacción.
- En la décima línea, se muestra si la transacción falló (0: sin castigo, 1: castigo).
- En la undécima línea, si la transacción falló, se devuelve un mensaje de error de texto y si se devuelve el ID del bloque, el campo err es el ID del ecosistema que es `18`.

Luego, configuramos la herramienta de comando `config.yml`, establecemos `ecosystem` como el ID del ecosistema creado `18` y reiniciamos el programa de consola de línea de comandos.

```shell
>exit
INFO[0002] Exit

$ vim data/config.yml

$ ibax-cli console

Welcome to the IBAX console!
To exit, press ctrl-d or type exit
>
```

### Paso 2 - Crear una aplicación {#step-2-create-application}

Para llamar al contrato inteligente `@1NewApplication` para crear una aplicación, el contrato inteligente tiene un parámetro para el nombre de la aplicación y un parámetro para modificar los derechos de acceso.

``` text
1  >callContract @1NewApplication {"Name": "GradesRecorder", "Conditions": "ContractConditions(\"@1DeveloperCondition\")"}
2  
3  {
4     "block_id": 1246,
5     "hash": "85ab8953d26d0d1047fc610866115331babfaf88c80792d50b41826185c9f6f8",
6     "penalty": 0,
7     "err": "47"
8  }
```

Si necesitas modificar los permisos de la aplicación, puedes llamar al contrato inteligente `EditApplication`.


- En la primera línea, se llama al contrato inteligente @1NewApplication para crear una aplicación llamada `GradesRecorder`, con permisos de modificación para desarrolladores `@1DeveloperCondition`.
- En la cuarta línea, se muestra el ID del bloque generado por la transacción.
- En la quinta línea, se muestra el hash del bloque generado por la transacción.
- En la sexta línea, se indica si la transacción falló (0: sin castigo, 1: castigo).
- En la séptima línea, si la transacción falló, se devuelve un mensaje de error. Si se devuelve un ID de bloque, el campo "err" de la aplicación es `47`.

Vamos a escribir un ejemplo sencillo. Esta aplicación puede registrar las calificaciones de los estudiantes. Los campos de la tabla de datos incluyen información del estudiante, grado `grade`, clase `class`, calificaciones en matemáticas, física y literatura `mathematics, physics, literature`, puntaje general `overall_score`, calificación `score`, y una marca de tiempo de creación (en milisegundos) `created_at`.

### Paso 3 - Crear tabla de datos {#step-3-create-table}

"Primero, escribimos un archivo de parámetros de contrato inteligente en formato json:"

```json
{
  "ApplicationId": 47,
  "Name": "grade_info",
  "ColumnsArr": [
    "student",
    "grade",
    "class",
    "mathematics",
    "physics",
    "literature",
    "overall_score",
    "score",
    "created_at"
  ],
  "TypesArr": [
    "varchar",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "varchar",
    "number"
  ],
  "InsertPerm": "ContractConditions(\"MainCondition\")",
  "UpdatePerm": "ContractConditions(\"MainCondition\")",
  "ReadPerm": "true",
  "NewColumnPerm": "ContractConditions(\"MainCondition\")"
}
```

El campo `ApplicationId` es el ID de la aplicación, `Name` es el nombre de la tabla de datos creada `test_table`, `ColumnsArr` es una matriz de campos de la tabla de datos, `TypesArr` es una matriz de tipos de campos de la tabla de datos, que incluye 9 tipos [tipos](../concepts/about-the-platform.md#tables). `varchar`, `character`, `json`, `number`, `datetime`, `double`, `money`, `text`, `bytea`, el nombre del campo y el tipo de campo son una correspondencia uno a uno, `InsertPerm` es el permiso para crear una entrada en la tabla de datos, `UpdatePerm` es el permiso para actualizar una entrada en la tabla de datos, `ReadPerm` es el permiso para leer datos de la tabla de datos, `NewColumnPerm` es el permiso para crear un nuevo campo en la tabla de datos. Consulte [Gestión de permisos](../concepts/about-the-platform.md#access-rights-control-mechanism), aquí `ContractConditions(\"MainCondition\")` está disponible para el creador del ecosistema actual.

Lo llamamos createTable.json y luego llamamos al contrato inteligente para crear la tabla de datos `@1NewTableJoint`.

```text
>callContract @1NewTableJoint -f ./createTestTable.json
```

#### Modificar los permisos de los campos de la tabla de datos. {#modify-data-table-field-permissions}

Podemos modificar los permisos de los campos de la tabla de datos. Los permisos de los campos de la tabla de datos incluyen permisos de lectura y permisos de actualización. Los permisos de lectura, cuando se utilizan `DBFind.Columns` en el contrato inteligente para filtrar campos o al consultar a través de la interfaz como [list](https://docs.ibax.io/reference/api2.html#list-name-limit-offset-columns), si no se tienen permisos, se producirá un error de permisos. Los permisos de actualización son los permisos para actualizar los campos de la tabla de datos. Establecemos los permisos de lectura y actualización del campo `student` en `false`, pero también se pueden establecer para que sean operables por algún contrato inteligente. Llamamos al contrato inteligente `@1EditColumn` para modificar los permisos de los campos de la tabla de datos.

```shell
>callContract @1EditColumn {"TableName": "grade_info", "Name": "student", "UpdatePerm": "false", "ReadPerm": "false"}
```


We can create several application parameters `grade_best_type`, `grade_type_a+`, `grade_type_a`, `grade_type_b+`, `grade_type_b`, `grade_type_c`, for grading types. 

Podemos crear varios parámetros de aplicación `grade_best_type`, `grade_type_a+`, `grade_type_a`, `grade_type_b+`, `grade_type_b`, `grade_type_c`, para tipos de calificación.

### Paso 4 - Crear parámetros de la aplicación {#step-4-create-application-parameters}

Utiliza el contrato inteligente `@1NewAppParam` para crear los parámetros de la aplicación. Si deseas modificar los parámetros de la aplicación, puedes utilizar el contrato inteligente `@1EditAppParam`.

```text
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_best_type", "Value": "A+", "Conditions": "ContractConditions(\"MainCondition\")"}
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_type_a+", "Value": "{\"max\": 101,\"min\": 90}", "Conditions": "ContractConditions(\"MainCondition\")"}
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_type_a", "Value": "{\"max\": 90,\"min\": 80}", "Conditions": "ContractConditions(\"MainCondition\")"}
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_type_b+", "Value": "{\"max\": 80,\"min\": 70}", "Conditions": "ContractConditions(\"MainCondition\")"}
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_type_b", "Value": "{\"max\": 70,\"min\": 60}", "Conditions": "ContractConditions(\"MainCondition\")"}
>callContract @1NewAppParam {"ApplicationId": 47, "Name": "grade_type_c", "Value": "{\"max\": 60,\"min\": 0}", "Conditions": "ContractConditions(\"MainCondition\")"}
```

El parámetro `grade_best_type` es el tipo de calificación más alta. El parámetro `grade_type_a+` es la condición que desencadena la calificación `A+`. Cuando la puntuación es mayor o igual a 90 y menor que 101, se califica como `A+`. Los demás parámetros son similares.


### Paso 5 - Crear un contrato inteligente y desplegarlo {#step-5-create-contract-deploy-contract}

Vamos a crear un contrato inteligente para registrar la información de calificaciones y calificaciones finales de los estudiantes. Al ingresar la información, se ingresan las calificaciones de cada materia y la clase y el grado del estudiante. Se realiza un cálculo promedio de las calificaciones ingresadas para obtener la puntuación general `overallScore` y la calificación final `score`. Al llamar al contrato inteligente, se creará un registro en la tabla de datos `grade_info` que acabamos de crear.

Primero, escribiremos un contrato inteligente y lo llamaremos `NewRecord.sim`.

```text
1	contract NewRecord {				
2	    data {				
3	        Student string				
4	        Grade int				
5	        Class int				
6	        Mathematics int				
7	        Physics int				
8	        Literature int				
9	    }				
10	    func getScore(a b c int) map{				
11	        var m map				
12	        var overallScore int				
13	        overallScore = (a+b+c) / 3				
14	        m["overallScore"] = overallScore				
15	        if overallScore >= $gradeTypeABest["min"] && overallScore < $gradeTypeABest["max"] {				
16	            m["score"] = "A+"				
17	        }elif overallScore >= $gradeTypeA["min"] && overallScore < $gradeTypeA["max"] {				
18	            m["score"] = "A"				
19	        }elif overallScore >= $gradeTypeBBest["min"] && overallScore < $gradeTypeBBest["max"] {				
20	            m["score"] = "B+"				
21	        }elif overallScore >= $gradeTypeB["min"] && overallScore < $gradeTypeB["max"] {				
22	            m["score"] = "B"				
23	        }elif overallScore >= $gradeTypeC["min"] && overallScore < $gradeTypeC["max"]{				
24	            m["score"] = "C"				
25	        }else{				
26	            m["score"] = "Notset"				
27	        }				
28	        return m				
29	    }				
30	    func safeJsonDecode(m string) map {				
31	        var res map				
32	        if Size(m) > 0 {				
33	            res = JSONDecode(m)				
34	        }				
35	        return res				
36	    }				
37					
38	    conditions {				
39	        if Size($Student) == 0 {				
40	            warning "Student Can not be empty"				
41	        }				
42	        if $Class <= 0{				
43	            warning "Class cannot be less than or equal to zero"				
44	        }				
45	        if $Grade <= 0{				
46	            warning "Grade cannot be less than or equal to zero"				
47	        }				
48	        if $Mathematics < 0 {				
49	            warning "Mathematics cannot be less than zero"				
50	        }				
51	        if $Physics < 0 {				
52	            warning "Physics cannot be less than zero"				
53	        }				
54	        if $Literature < 0 {				
55	            warning "Literature cannot be less than zero"				
56	        }				
57	        if $Mathematics > 100 || $Physics > 100 ||  $Literature > 100{				
58	            warning "Score cannot exceed 100"				
59	        }				
60	        var app map				
61	        app = DBFind("@1applications").Columns("id,ecosystem").Where({"ecosystem": 18,"name":"GradesRecorder","deleted":0}).Row()				
62	        if !app {				
63	            warning LangRes("@1app_not_found")				
64	        }				
65					
66	        var app_id int				
67	        app_id = Int(app["id"])				
68	        $eId = Int(app["ecosystem"])				
69	        $gradeBestType = AppParam(app_id, "grade_best_type", $eId)				
70	        $gradeTypeABest = safeJsonDecode(AppParam(app_id, "grade_type_a+", $eId))				
71	        $gradeTypeA = safeJsonDecode(AppParam(app_id, "grade_type_a", $eId))				
72	        $gradeTypeBBest = safeJsonDecode(AppParam(app_id, "grade_type_b+", $eId))				
73	        $gradeTypeB = safeJsonDecode(AppParam(app_id, "grade_type_b", $eId))				
74	        $gradeTypeC = safeJsonDecode(AppParam(app_id, "grade_type_c", $eId))				
75	    }				
76	    action {				
77	        var m map 				
78	        m = getScore($Mathematics,$Physics,$Literature)				
79	        var in map				
80	        in["student"] = $Student				
81	        in["class"] = $Class				
82	        in["grade"] = $Grade				
83	        in["mathematics"] = $Mathematics				
84	        in["physics"] = $Physics 				
85	        in["literature"] = $Literature 				
86	        in["overall_score"] = m["overallScore"]				
87	        in["score"] = m["score"]				
88	        in["created_at"] = $time				
89	        DBInsert("@"+ Str($eId)+"grade_info", in)				
90	    }				
91	}				
```

- En la línea 2, la sección de datos define los parámetros de entrada `Student` para el nombre del estudiante, `Grade` para el grado, `Class` para la clase, `Mathematics` para la puntuación de matemáticas, `Physics` para la puntuación de física y `Literature` para la puntuación de literatura.
- En la línea 10, la función getScore calcula la puntuación general y la calificación final en función de las puntuaciones de cada materia.
- En la línea 30, la función safeJsonDecode decodifica una cadena JSON y la convierte en un mapa.
- En la línea 38, se encuentra la sección de condiciones.
- En la línea 39, se encuentra la sección de acciones.

Puede ver que cuando se llama al contrato inteligente, primero se ejecuta la parte de la condición, verificando si los parámetros de entrada del contrato inteligente son válidos, como el nombre del estudiante `if Size($Student) == 0 {` si está vacío (línea 39), si está vacío, devuelve un mensaje de error. `"Student Can not be empty"` (línea 30), cuando se verifican todos los parámetros de entrada, en la línea 61, se utiliza [DBFind](../topics/script.md#dbfind) para recuperar la información de la aplicación con el id de ecología `18`, el nombre de la aplicación `GradesRecorder` y que no ha sido eliminada `deleted=0` de la base de datos. En las líneas 69-74, se utiliza [AppParam](../topics/script.md#appparam) para recuperar los parámetros de la aplicación, como `$gradeBestType = AppParam(app_id, "grade_best_type", $eId)` (línea 69), si los parámetros de la aplicación se almacenan en formato json, como `grade_type_a`, puede consultar `$gradeTypeABest = safeJsonDecode(AppParam(app_id, "grade_type_a+", $eId))`, y convertir los parámetros de la aplicación obtenidos en formato de mapa a través de la función safeJsonDecode.

Luego, se ejecuta la parte de la operación, se llama a la función getScore para obtener la puntuación general y la calificación final (línea 10), se almacena en un mapa, en la línea 79, se define un mapa para guardar la información de calificaciones de los estudiantes, y se utiliza [DBInsert](../topics/script.md#dbinsert) para insertar datos en la tabla de datos `@18grade_info`.

Hay dos formas de crear un contrato inteligente, la primera forma:

Primero, escribimos un archivo de parámetros de contrato inteligente, el formato del archivo es json:

```json
{
  "ApplicationId": 47,
  "Value": "contract NewRecord {\n    data {\n        Student string\n        Grade int\n        Class int\n        Mathematics int\n        Physics int\n        Literature int\n    }\n    func getScore(a b c int) map{\n        var m map\n        var overallScore int\n        overallScore = (a+b+c) / 3\n        m[\"overallScore\"] = overallScore\n        if overallScore >= $gradeTypeABest[\"min\"] && overallScore < $gradeTypeABest[\"max\"] {\n            m[\"score\"] = \"A+\"\n        }elif overallScore >= $gradeTypeA[\"min\"] && overallScore < $gradeTypeA[\"max\"] {\n            m[\"score\"] = \"A\"\n        }elif overallScore >= $gradeTypeBBest[\"min\"] && overallScore < $gradeTypeBBest[\"max\"] {\n            m[\"score\"] = \"B+\"\n        }elif overallScore >= $gradeTypeB[\"min\"] && overallScore < $gradeTypeB[\"max\"] {\n            m[\"score\"] = \"B\"\n        }elif overallScore >= $gradeTypeC[\"min\"] && overallScore < $gradeTypeC[\"max\"]{\n            m[\"score\"] = \"C\"\n        }else{\n            m[\"score\"] = \"Notset\"\n        }\n        return m\n    }\n    func safeJsonDecode(m string) map {\n        var res map\n        if Size(m) > 0 {\n            res = JSONDecode(m)\n        }\n        return res\n    }\n\n    conditions {\n        if Size($Student) == 0 {\n            warning \"Student Can not be empty\"\n        }\n        if $Class <= 0{\n            warning \"Class cannot be less than or equal to zero\"\n        }\n         if $Grade <= 0{\n            warning \"Grade cannot be less than or equal to zero\"\n        }\n        if $Mathematics < 0 {\n            warning \"Mathematics cannot be less than zero\"\n        }\n        if $Physics < 0 {\n            warning \"Physics cannot be less than zero\"\n        }\n        if $Literature < 0 {\n            warning \"Literature cannot be less than zero\"\n        }\n        if $Mathematics > 100 || $Physics > 100 ||  $Literature > 100{\n            warning \"Score cannot exceed 100\"\n        }\n        var app map\n        app = DBFind(\"@1applications\").Columns(\"id,ecosystem\").Where({\"ecosystem\": 18,\"name\":\"GradesRecorder\",\"deleted\":0}).Row()\n        if !app {\n            warning LangRes(\"@1app_not_found\")\n        }\n\n        var app_id int\n        app_id = Int(app[\"id\"])\n        $eId = Int(app[\"ecosystem\"])\n        $gradeBestType = AppParam(app_id, \"grade_best_type\", $eId)\n        $gradeTypeABest = safeJsonDecode(AppParam(app_id, \"grade_type_a+\", $eId))\n        $gradeTypeA = safeJsonDecode(AppParam(app_id, \"grade_type_a\", $eId))\n        $gradeTypeBBest = safeJsonDecode(AppParam(app_id, \"grade_type_b+\", $eId))\n        $gradeTypeB = safeJsonDecode(AppParam(app_id, \"grade_type_b\", $eId))\n        $gradeTypeC = safeJsonDecode(AppParam(app_id, \"grade_type_c\", $eId))\n    }\n    action {\n        var m map \n        m = getScore($Mathematics,$Physics,$Literature)\n        var in map\n        in[\"student\"] = $Student\n        in[\"class\"] = $Class\n        in[\"grade\"] = $Grade\n        in[\"mathematics\"] = $Mathematics\n        in[\"physics\"] = $Physics \n        in[\"literature\"] = $Literature \n        in[\"overall_score\"] = m[\"overallScore\"]\n        in[\"score\"] = m[\"score\"]\n        in[\"created_at\"] = $time\n        DBInsert(\"@\"+ Str($eId)+\"grade_info\", in)\n    }\n}",
  "Conditions": "ContractConditions(\"@1DeveloperCondition\")"
}
```

El `ApplicationId` es el ID de la aplicación y se requiere procesar los caracteres especiales de escape. Las `Conditions` son los permisos de modificación del contrato inteligente y `Value` es el código fuente del contrato inteligente, que se guarda como `NewRecordParams.json`:

Después de escribir el contrato inteligente, necesitamos implementarlo y llamar a la creación del contrato inteligente `@1NewContract`.

```text
1    >>callContract @1NewContract -f=./data/NewRecordParams.json
2    {
3        "block_id": 1262,
4        "hash": "d896f12f685835f6cf71705e1ba...4d8bcc0a1406f7b0b6482b2d230fc",
5        "penalty": 0,
6        "err": "348"
7    }
```

- Línea 1: Se llama al contrato inteligente `@1NewContract` para crear un contrato inteligente, utilizando el parámetro del contrato inteligente importado del archivo `NewRecord.json` con la opción `-f`.
- Línea 3: El ID del bloque generado por la transacción.
- Línea 4: El hash del bloque generado por la transacción.
- Línea 5: Si la transacción falla (0: sin castigo, 1: castigo).
- Línea 6: Si la transacción falla, devuelve un mensaje de error de texto. Si se devuelve el ID del bloque, el campo `err` del ID del contrato inteligente es `348`.

Segunda opción:

Se puede pasar directamente el código fuente del contrato inteligente guardado como parámetro del contrato inteligente, con el formato de parámetro `nombreDelParámetro` + `-` + "archivo", `nombreDelParámetro-archivo` como se muestra a continuación:

```shell
callContract @1NewContract {"ApplicationId": 47, "Value-file": "NewRecord.sim", "Conditions": "ContractConditions(\"@1DeveloperCondition\")"}
```

Ok, la traducción en español sería: "Vamos a intentar llamar al contrato inteligente que acabamos de crear.

```text
1  >callContract @18NewRecord {"Student": "tom", "Grade": 1, "Class": 1, "Mathematics": 18, "Physics": 57, "Literature": 93}
2  
3  {
4     "block_id": 1263,
5     "hash": "1b964a47fe6c5fd43ea55a752d01edb5ad576432fd6f63315344d87999a0473d",
6     "penalty": 0,
7     "err": ""
8  }
```
La llamada se completa y luego verificamos si se guarda un registro en la tabla de datos.
```text
>getList @18grade_info
{
    "count": 1,
    "list": [
        {
            "class": "1",
            "created_at": "1683698914109",
            "grade": "1",
            "id": "9",
            "literature": "93",
            "mathematics": "18",
            "overall_score": "56",
            "physics": "57",
            "score": "C",
            "student": "tom"
        }
    ]
}
```
Puedes ver que ya hay un registro en la tabla de datos, donde el `student` Tom tiene una puntuación integral de 56 y una calificación de C.

El ejemplo anterior es solo para fines de aprendizaje e investigación. Debes modificar los parámetros relevantes de acuerdo con la situación real, como el permiso de escritura de la tabla de datos, el permiso de modificación del contrato inteligente, etc.

Por ejemplo, si queremos especificar que solo una persona puede llamar a este contrato inteligente para crear un nuevo registro, y todas las demás personas no pueden llamarlo, podemos establecer un parámetro ecológico `new_record_account`.

### Paso 6 - Configuración de los parámetros ecosistema. {#step-6-create-ecological-parameters}

Invocar el contrato inteligente `@1NewParameter` creará el parámetro ecológico `new_record_account` en la tabla `@1parameters`. Si necesita modificar el parámetro ecológico, puede llamar a `@1EditParameter`.

```text
>callContract @1NewParameter {"Name": "new_record_account", "Value": "6667782293976713160", "Conditions": "ContractConditions(\"MainCondition\")"}

{
    "block_id": 1416,
    "hash": "12fc87ce6a70e2fc993ab9ffe623311f1c50edd1157595ce6183c38c93960cae",
    "penalty": 0,
    "err": "273"
}
```

Hemos creado un parámetro ecológico llamado `new_record_account`, con un valor de keyId `6667782293976713160`, y permisos de modificación establecidos en `ContractConditions("MainCondition")`, lo que significa que solo el creador actual del ecosistema puede modificarlo. Cuando se ejecuta la transacción con éxito, el campo "err" muestra que el id del parámetro ecológico es `273`.

### Paso 7 - Agregar idioma de localización {#step-7-add-localization}

You can use the `@1NewLangJoint` smart contract to create a localized parameter called `account_not_access`, which will be created in the `@1languages` table. You can modify the localized parameter using `@1EditLangJoint`.

```shell
callContract @1NewLangJoint {"Name": "account_not_access", "LocaleArr": ["en", "ja"], "ValueArr": ["Sorry, you do not have access to this action", "申し訳ありませんが、このアクションにアクセスする権限がありません"]}
```

### Paso 8 - Modificar el contrato inteligente {#step-8-modify-the-contract}

Entonces necesitamos modificar el código fuente del contrato en la sección de `condiciones`, agregando el siguiente código a `condiciones`.

```text
conditions {
  if EcosysParam("new_record_account") != $key_id {
      warning LangRes("account_not_access")
  }
}
```

Llamando a la modificación del contrato @1EditContract, donde `Id` es el ID del contrato y `Value` es el código fuente del contrato.

```text
>callContract @1EditContract {"Id": 348, "Value": "contract NewRecord {\n    data {\n        Student string\n        Grade int\n        Class int\n        Mathematics int\n        Physics int\n        Literature int\n    }\n    func getScore(a b c int) map{\n        var m map\n        var overallScore int\n        overallScore = (a+b+c) / 3\n        m[\"overallScore\"] = overallScore\n        if overallScore >= $gradeTypeABest[\"min\"] && overallScore < $gradeTypeABest[\"max\"] {\n            m[\"score\"] = \"A+\"\n        }elif overallScore >= $gradeTypeA[\"min\"] && overallScore < $gradeTypeA[\"max\"] {\n            m[\"score\"] = \"A\"\n        }elif overallScore >= $gradeTypeBBest[\"min\"] && overallScore < $gradeTypeBBest[\"max\"] {\n            m[\"score\"] = \"B+\"\n        }elif overallScore >= $gradeTypeB[\"min\"] && overallScore < $gradeTypeB[\"max\"] {\n            m[\"score\"] = \"B\"\n        }elif overallScore >= $gradeTypeC[\"min\"] && overallScore < $gradeTypeC[\"max\"]{\n            m[\"score\"] = \"C\"\n        }else{\n            m[\"score\"] = \"Notset\"\n        }\n        return m\n    }\n    func safeJsonDecode(m string) map {\n        var res map\n        if Size(m) > 0 {\n            res = JSONDecode(m)\n        }\n        return res\n    }\n\n    conditions {\n        if EcosysParam(\"new_record_account\") != $key_id {\n            warning LangRes(\"account_not_access\")\n        }\n        if Size($Student) == 0 {\n            warning \"Student Can not be empty\"\n        }\n        if $Class <= 0{\n            warning \"Class cannot be less than or equal to zero\"\n        }\n         if $Grade <= 0{\n            warning \"Grade cannot be less than or equal to zero\"\n        }\n        if $Mathematics < 0 {\n            warning \"Mathematics cannot be less than zero\"\n        }\n        if $Physics < 0 {\n            warning \"Physics cannot be less than zero\"\n        }\n        if $Literature < 0 {\n            warning \"Literature cannot be less than zero\"\n        }\n        if $Mathematics > 100 || $Physics > 100 ||  $Literature > 100{\n            warning \"Score cannot exceed 100\"\n        }\n        var app map\n        app = DBFind(\"@1applications\").Columns(\"id,ecosystem\").Where({\"ecosystem\": 18,\"name\":\"GradesRecorder\",\"deleted\":0}).Row()\n        if !app {\n            warning LangRes(\"@1app_not_found\")\n        }\n\n        var app_id int\n        app_id = Int(app[\"id\"])\n        $eId = Int(app[\"ecosystem\"])\n        $gradeBestType = AppParam(app_id, \"grade_best_type\", $eId)\n        $gradeTypeABest = safeJsonDecode(AppParam(app_id, \"grade_type_a+\", $eId))\n        $gradeTypeA = safeJsonDecode(AppParam(app_id, \"grade_type_a\", $eId))\n        $gradeTypeBBest = safeJsonDecode(AppParam(app_id, \"grade_type_b+\", $eId))\n        $gradeTypeB = safeJsonDecode(AppParam(app_id, \"grade_type_b\", $eId))\n        $gradeTypeC = safeJsonDecode(AppParam(app_id, \"grade_type_c\", $eId))\n    }\n    action {\n        var m map \n        m = getScore($Mathematics,$Physics,$Literature)\n        var in map\n        in[\"student\"] = $Student\n        in[\"class\"] = $Class\n        in[\"grade\"] = $Grade\n        in[\"mathematics\"] = $Mathematics\n        in[\"physics\"] = $Physics \n        in[\"literature\"] = $Literature \n        in[\"overall_score\"] = m[\"overallScore\"]\n        in[\"score\"] = m[\"score\"]\n        in[\"created_at\"] = $time\n        DBInsert(\"@\"+ Str($eId)+\"grade_info\", in)\n    }\n}"}
```


#### Paso 9 - Modificar los permisos de la tabla de datos {#step-9-modify-data-table-permissions}

Aquí necesitamos cambiar los permisos de inserción de la tabla de datos. Originalmente, el permiso `ContractConditions("MainCondition")` era para el creador del ecosistema, pero la configuración del contrato `new_record_account` no es el creador del ecosistema. Por lo tanto, solo necesitamos cambiar `ContractConditions("MainCondition")` a `ContractAccess("@18NewRecord")`, que es el contrato especificado que puede operar. Luego, llamamos al contrato `@1EditTable` para cambiar los permisos de la tabla de datos.

```text
>callContract @1EditTable {"Name": "@18grade_info", "InsertPerm": "ContractAccess(\"@18NewRecord\")", "UpdatePerm": "ContractConditions(\"MainCondition\")", "ReadPerm": "true", "NewColumnPerm": "ContractConditions(\"MainCondition\")"}
```

Continúa llamando al contrato modificado recientemente y crea un nuevo registro.

```text
1  >callContract @18NewRecord {"Student": "tom", "Grade": 1, "Class": 1, "Mathematics": 18, "Physics": 57, "Literature": 93}
2  
3  {
4      "block_id": 1435,
5      "hash": "7d4b06d3738133f9c2ec775935478cd2d6c20fd04eca275769afd0f8e6a4f687",
6      "penalty": 1,
7      "err": "{\"type\":\"warning\",\"error\":\"Sorry, you do not have access to this action\"}"
8  }
```

Puedo ver que el parámetro de localización que acabamos de establecer, `account_not_access`, está funcionando.

Hemos encontrado un error de permisos, el usuario actual no tiene permisos para operar, así que cambiamos a la cuenta con keyId `6667782293976713160`. Podemos obtener la información del usuario actual a través de la herramienta de línea de comandos `account info`. Configuramos el archivo `config.yml` de la herramienta de línea de comandos para cambiar a la cuenta con keyId `6667782293976713160`. Después de configurar esto, llamamos al contrato de nuevo.

```text
>callContract @18NewRecord {"Student": "tini", "Grade": 1, "Class": 3, "Mathematics": 69, "Physics": 89, "Literature": 98}

{
    "block_id": 1436,
    "hash": "93327dafb7bae9f9f66718eb87020a7bca4c00060f4bd0a243b49eea304c52e6",
    "penalty": 0,
    "err": ""
}
```

La llamada ha sido completada. Al consultar la tabla de datos a través de `getList @18grade_info`, los resultados son los esperados.

Espero que este artículo le ayude a comprender mejor cómo funciona la red IBAX y cómo escribir un código claro y seguro con `Needle`.


## Implementar aplicaciones usando herramientas de línea de comandos {#deploy-application-using-command-line-tools}

En este tutorial, aprenderás cómo:
- 1. [Exportar una aplicación](#export-application)
- 2. [Importar una aplicación](#import-application)

Antes de comenzar este tutorial, necesitas tener tu propia aplicación y conocer los conceptos de la ecología y la aplicación. Puedes consultar la [Guía de inicio](#getting-started-guide) para obtener más información. Utilizaremos la [herramienta de línea de comandos](https://github.com/IBAX-io/ibax-cli) para importar y exportar aplicaciones en la cadena de bloques de IBAX.


### Aplicación de exportación {#export-application}

Al llamar a `account info`, se puede consultar la información de la cuenta actual. Aquí, el ID del ecosistema de inicio de sesión es `9`. Al llamar al comando `getList`, se puede consultar qué aplicaciones hay en el ecosistema actual.

```shell
$ ibax-cli console
   
Welcome to the IBAX console!
To exit, press ctrl-d or type exit
>account info
{
    "public_key": "04d11ea197fe23152562c6f54c4...889c074dfd9080099982d8b2d4d100315e1cebc7",     
    "ecosystem_id": 9,
    "key_id": 6660819...78795186,
    "account": "0666-0819-...-7879-5186"
}

>getList @1applications -w={"ecosystem": 9}

{
    "count": 6,
    "list": [
        {
            "conditions": "true",
            "deleted": "0",
            "ecosystem": "9",
            "id": "36",
            "name": "testapp",
            "uuid": "00000000-0000-0000-0000-000000000000"
        }
        ...
    ]
}
```

Puedes ver que hay 6 aplicaciones en el ecosistema actual. Usamos el comando `export` para exportar la aplicación con `id` 36.

```shell
>export 36 -f=./data.json

{
    "name": "./data.json",
    "type": "application/json",
    "value": ""
}
```

Aquí, el parámetro `-f` guardará la aplicación exportada en un archivo `data.json` en el directorio actual. Si no se utiliza el parámetro `-f`, los datos de la aplicación se mostrarán en la terminal de comandos.


El comando `export` encapsula los pasos para exportar una aplicación. Puedes utilizar este comando para exportar una aplicación o seguir los siguientes pasos:

1. Llama al contrato `@1ExportNewApp` para exportar una nueva aplicación.
2. Se generará un registro de la aplicación exportada en la tabla `1_buffer_data`.

```shell
>callContract @1ExportNewApp {"ApplicationId": 36}
```

Invocar el contrato `@1Export` para exportar la aplicación seleccionada, buscarla en la tabla `1_buffer_data` y exportar todos los recursos de la aplicación en una cadena JSON generada. La cadena JSON generada se escribirá en la tabla `1_binaries` del ecosistema actual.

```shell
>callContract @1Export
```

`getList` comando para consultar los datos en la tabla `1_binaries`.

```shell
>getList @1binaries -w={"name": "export", "account": "0666-0819-...-7879-5186", "ecosystem": 9, "app_id": 36} -l=1 -c="id,hash"

{
    "count": 1,
    "list": [
        {
            "hash": "8542cb57b77e0ae2c...92c3e05dbbe35ab646789be5b8ba8",
            "id": "14"
        }
    ]
}
```

Obtener el ID y el hash del archivo binario. Llamar al comando `binaryVerify` para exportar el archivo binario.

```shell
>binaryVerify 14 8542cb57b77e0ae2c...92c3e05dbbe35ab646789be5b8ba8 -f=./data.json

{
    "name": "./data.json",     
    "type": "application/json",
    "value": ""
}
```

### Importar aplicación. {#import-application}

Para importar una aplicación usando el comando `import`, use el parámetro `-f` para especificar el archivo de la aplicación que desea importar.

```shell
$ ibax-cli console

Welcome to the IBAX console!
To exit, press ctrl-d or type exit

>import -f ./data.json
```

El comando `import` encapsula los pasos para importar una aplicación, y puedes usar el comando anterior para importar una aplicación.

Alternativamente, para facilitar el aprendizaje e investigación, puedes seguir los siguientes pasos:

- Paso 1: Llama al contrato `@1ImportUpload` para importar una nueva aplicación, lo que generará un registro de la aplicación exportada en la tabla `1_buffer_data`. El parámetro `Data` del contrato `@1ImportUpload` es de tipo `file`, que incluye las palabras clave `Name` para el nombre del archivo (cadena), `MimeType` para el tipo de archivo (cadena) y `Body` para el contenido del archivo ([]byte). Necesitas codificar los datos del archivo de la aplicación en base64 y pasarlos a `Body`. Puedes usar el comando `base64Encode` para codificar en base64.

```shell
>base64Encode -f=./data.json

Encode:ewoJIm5hbWUiOiAid...CQkJIlR5cGUiOiAiY29udHJhY3RzIiwKCQkJIk5hbWUiOiAiSGVsbG9Xb3JsZCIsCgkJCSJWYWx1ZSI6...

>callContract @1ImportUpload {"Data": {"Name": "filename", "MimeType": "mimeType", "Body": "ewoJIm5hbWUiOiAid...CQkJIlR5cGUiOiAiY29udHJhY3RzIiwKCQkJIk5hbWUiOiAiSGVsbG9Xb3JsZCIsCgkJCSJWYWx1ZSI6..."}}
```

- Paso 2: Después de llamar a la función, utiliza el comando `getList` para consultar los datos en la tabla `1_buffer_data`.

```shell
>getList @1buffer_data -w={"key": "import", "account": "0666-0819-xxxx-7879-5186", "ecosystem": 19} -l=1 -c=value->'data'

{
    "count": 1,
    "list": [
        {
            "id": "22",
            "value.data": "[{"Data": "[a,b]"}, {"Data": "[c,d]"}]"
        }
    ]
}
```

- Paso 3: Ensamble los datos de value.data->Data en un arreglo unidimensional, [a,b,c,d], luego cree un archivo de parámetros de contrato llamado `importParams.json`, con el siguiente contenido:

```json
{"Data":"[a,b,c,d]"}
```

- Paso 4: Llame al contrato `@1Import` para importar los datos de la aplicación.

```shell
>callContract @1Import -f=./importParams.json
```


## Configurar el ecosistema usando herramientas de línea de comandos {#ecological-configuration-using-command-line-tool}

En este tutorial, aprenderás cómo:
- 1. [Solicitar unirse al ecosistema](#apply-to-join-the-ecosystem)
- 2. [Agregar miembros al ecosistema](#add-ecosystem-members)
- 3. [Congelar cuenta](#freezing-of-accounts)
- 4. [Gestión de roles](#role-management)
- 5. [Emisión de tokens ecosistema](#issuance-of-token)
- 6. [Deducción de tarifas ecosistema](#eco-deduction)
- 7. [Gobernanza DAO del ecosistema](#dao-governance-ecosystem)

Antes de comenzar este tutorial, necesitas tener tu propia aplicación y conocer los conceptos de la ecología y la aplicación. Puedes consultar la [Guía de inicio](#getting-started-guide) para obtener más información. Utilizaremos la [herramienta de línea de comandos](https://github.com/IBAX-io/ibax-cli) para configurar la ecología en la cadena de bloques de IBAX.

### Solicitar unirse al ecosistema {#apply-to-join-the-ecosystem}

Podemos llamar al contrato `@1MembershipRequest` para solicitar la membresía en el ecosistema. Por ejemplo:

```shell
>callContract @1MembershipRequest {"EcosystemId": 19}
```

Solicitud de unirse al ecosistema con ID `19`, el contrato `@1MembershipRequest` restringe las llamadas solo al ecosistema base. Una vez que se aprueba la solicitud, el administrador del ecosistema objetivo recibirá una notificación y solo se considerará que se ha unido al ecosistema objetivo después de que el administrador del ecosistema apruebe la solicitud. Si el ecosistema objetivo es público, puedes unirte directamente.

### Agregar miembros al ecosistema {#add-ecosystem-members}

Cuando se crea un ecosistema, solo el creador del ecosistema es miembro. Si deseas invitar a otros miembros a unirse, necesitas conocer la clave pública del miembro invitado y luego llamar al contrato `@1MembershipAdd` para agregar al miembro.

```shell
>callContract @1MembershipAdd {"Keys": "04f2c1780ca0aa0f343d0e541c77811...3b0d5bf3a9903253aad6e78c966b5f91ffb32703884020"}
```

Si la ecología es pública y permite que cualquier persona se una, puedes establecer el parámetro de ecología "free_membership" en 1. Por defecto, la ecología no es pública, pero una vez que se establece este parámetro, cualquier persona puede unirse sin necesidad de aprobación.

```shell
>callContract @1NewParameter {"Name": "free_membership", "Value": "1", "Conditions": "ContractConditions(\"MainCondition\")"}
```

Si no has establecido el parámetro `free_membership`, recibirás una notificación de solicitud cuando otros miembros soliciten unirse a tu ecosistema, que puedes ver en "Ver todas las notificaciones de roles".

Llama al contrato `@1MembershipDecide` para aprobar la solicitud, con el parámetro del contrato `NotificId` como el ID de la notificación y `Accept` como la identificación de la decisión, donde `1` significa aprobado.

```shell
>callContract @1MembershipDecide {"NotificId": 6, "Accept": 1}
```

### Congelar cuenta {#freezing-of-accounts}
Llame al contrato `@1DeleteMember` para congelar la cuenta. Tenga en cuenta que esta operación no se puede deshacer.
```shell
>callContract @1DeleteMember {"MemberAccount": "1539-2715-xxxx-1679-5385"}
```

### Gestión de roles {#role-management}

- [Nueva creación de rol](#new-role-creation)
- [Agregar miembros al rol](#adding-role-members)
- [Eliminar miembros del rol](#delete-role-members)
- [Modificar el administrador del rol](#modify-role-manager)
- [Eliminar el rol](#delete-role)

#### Nueva creación de rol {#new-role-creation}

Llame al contrato `@1RolesCreate` para crear un nuevo rol con el nombre `estudiante` y el tipo `2` (1-Asignable, 2-Elegido por votación, 3-Sistema).

```shell
>callContract @1RolesCreate {"Name": "student", "Type": 2}
{
    "block_id": 1685,
    "hash": "5321f2231a...d0d80158b62766395f14d0ff7",
    "penalty": 0,
    "err": "21"
}
```

El resultado contiene el ID de rol `21`.

#### Agregar miembros al rol {#adding-role-members}

Hay dos métodos, el primer método es que los miembros del ecosistema presenten una solicitud y llamen al contrato `@1RolesRequest` para solicitar ser agregados como miembros de ese rol, donde `Rid` es el ID del rol.

```shell
>callContract @1RolesRequest {"Rid": 21}
```

La segunda opción es que el administrador de roles asigne miembros a un rol. El administrador de roles llama al contrato "@1RolesAssign" para agregar miembros a ese rol.

```shell
>callContract @1RolesAssign {"MemberAccount": "0666-7782-xxxx-7671-3160", "Rid": 21}
```

#### Eliminar miembros del rol {#delete-role-members}

Primero, vamos a ver qué miembros tiene un cierto personaje. Podemos hacerlo mediante la consulta getList, como se muestra a continuación:

```shell
>getList @1roles_participants -w={"ecosystem": 18, "role->id": "21", "deleted": 0}

{
    "count": 3,
    "list": [
        {
            "appointed": "{\"account\": \"1273-2644-xxxx-5846-6598\", \"image_id\": \"0\", \"member_name\": \"founder\"}",
            "date_created": "1684916023",
            "date_deleted": "0",
            "deleted": "0",
            "ecosystem": "18",
            "id": "21",
            "member": "{\"account\": \"1273-2644-xxxx-5846-6598\", \"image_id\": \"0\", \"member_name\": \"founder\"}",
            "role": "{\"id\": \"20\", \"name\": \"teacher\", \"type\": \"1\", \"image_id\": \"0\"}"
        }
        ...
    ]
}
```
En la cláusula `where`, `ecosystem` especifica el ecosistema, `role->id` especifica el ID del rol y `deleted: 0` especifica que no ha sido eliminado. Podemos ver que se han encontrado 3 registros. Si queremos eliminar los permisos del rol para el miembro `1273-2644-xxxx-5846-6598`, es decir, el rol con `id` 21, el administrador puede llamar al contrato `@1RolesUnassign` para eliminar al miembro del rol, como se muestra a continuación:

```shell
>callContract @1RolesUnassign {"RowId": 21}
```

#### Modificar el administrador del rol {#modify-role-manager}

Vamos a echar un vistazo a los roles en el ecosistema actual.

```shell
>getList @1roles -w={"ecosystem": 18}

{
    "count": 5,
    "list": [
        {
            "company_id": "0",
            "creator": "{\"account\": \"1273-2644-xxxx-5846-6598\", \"image_id\": \"0\", \"member_name\": \"founder\"}",
            "date_created": "1684910917",
            "date_deleted": "0",
            "default_page": "",
            "deleted": "0",
            "ecosystem": "18",
            "id": "20",
            "image_id": "0",
            "role_name": "teacher",
            "role_type": "1",
            "roles_access": "[]"
        }
        ...
    ]
}
```

En este caso, `roles_access` es el rol de gestión del rol actual y es una matriz que puede tener varios valores. Para agregar un rol de gestión al rol `teacher`, se llama al contrato `@1RolesAccessManager`, donde el parámetro `Action` es el operador de gestión (`clean` para limpiar, `remove` para eliminar, `add` para agregar), `Rid` es el ID del rol que se desea gestionar y `ManagerRid` es el ID del gestor de ese rol.

```shell
>callContract @1RolesAccessManager {"Action": "add", "Rid": 20, "ManagerRid": 13}

{
    "block_id": 1745,
    "hash": "e2eb8ff0dc309ec7652db...bbbe58bca4ca574804e46c2f63653eb73104",
    "penalty": 0,
    "err": ""
}
```

#### Eliminar el rol {#delete-role}

Podemos llamar al contrato `@1RolesDelete` para eliminar un rol, donde el parámetro del contrato `Rid` es el ID del rol que se desea administrar, y `Ops` es el operador (`D` para eliminar, `R` para restaurar).

```shell
>callContract @1RolesDelete {"Rid": 24, "Ops": "D"}

{
    "block_id": 1785,
    "hash": "1ebf99a04f504fc3d2...4ecfbdfc419bf3dbf39df0013dca913f844",
    "penalty": 0,
    "err": ""
}
```


### Emisión de tokens ecosistema {#issuance-of-token}

- [Crear un ecosistema](#create-ecosystem)
- [Instalar aplicaciones básicas](#installing-basic-applications)
- [Emisión de tokens en el ecosistema](#token-issuance)

#### Crear un ecosistema {#create-ecosystem}

Crear un ecosistema, llamando al contrato `@1NewEcosystem`.

```shell
>callContract @1NewEcosystem {"Name": "Test Ecosystem"}
{
    "block_id": 1787,
    "hash": "384f35ef93243c9dd4f53b9298873b356b25b31cf7c6a6be7600ee7694d77006",
    "penalty": 0,
    "err": "21"
}
```
Entonces, vamos a modificar la configuración de la herramienta de línea de comandos para iniciar sesión en el nuevo ecosistema "21" que acabamos de crear.

#### Instalar aplicaciones básicas {#installing-basic-applications}

Invocar la instalación de una aplicación básica en un contrato inteligente, como se muestra a continuación:

```shell
1  >callContract @1PlatformAppsInstall
2  >callContract @1RolesInstall
3  >callContract @1AppInstall {"ApplicationId": 5}
4  >callContract @1AppInstall {"ApplicationId": 6}
```

- Primera línea, instalar la aplicación de plataforma.
- Segunda línea, instalar el rol predeterminado.
- Tercera y cuarta línea, instalar la configuración ecológica y la aplicación de emisión de tokens, donde la ID de la aplicación "5,6" se puede consultar a través de getList, como se muestra a continuación:

```shell
>getList @1applications -w={"ecosystem": 1, "$or": [{"name": "Token emission"},{"name": "Ecosystems catalog"}]} -c="name,ecosystem"

{
    "count": 2,
    "list": [
        {
            "ecosystem": "1",
            "id": "5",
            "name": "Token emission"
        },
        {
            "ecosystem": "1",
            "id": "6",
            "name": "Ecosystems catalog"
        }
    ]
}
```

#### Emisión de tokens en el ecosistema {#token-issuance}

Debido a que es un ecosistema recién establecido, es necesario configurar la emisión de tokens. Llama al contrato `@1TeSettings` para especificar el rol que puede emitir tokens.

```shell
>callContract @1TeSettings {"RoleDeveloper": 30}
```

`RoleDeveloper` es el ID del rol actual en el ecosistema, que se puede obtener a través de la tabla de datos "@1roles".


**Emisión de tokens** 

Llame al contrato `@1NewToken` para emitir tokens.

```shell
>callContract @1NewToken {"Symbol": "TEST", "Name": "TEST Coin", "Amount": "10000000000000000" ,"Digits": "12"}
```

Los parámetros del contrato `Symbol` representan el símbolo del token, `Name` representa el nombre del token, `Amount` representa la cantidad total y `Digits` representa la precisión.

**Incrementar la emisión de tokens**

```shell
>callContract @1TeEmission {"Amount": 1000000000000}
```

**Destrucción de tokens**

```shell
>callContract @1TeBurn {"Amount": 1000000000000}
```

La emisión y la destrucción de tokens son permitidas por defecto, pero puedes desactivarlas a través de `@1TeChange`. `TypeChange` indica el tipo de cambio (`emission` para emisión y `withdraw` para destrucción) y `Value` indica el estado del cambio (`1` para activar y `2` para desactivar). Por ejemplo: **Desactivar la emisión**. Ten en cuenta que una vez desactivado, no se puede volver a activar.

```shell
>callContract @1TeChange {"TypeChange": "emission", "Value": 2}
```

**Desactivar y destruir** 

Si desea volver a activar la función de destrucción, simplemente establezca el valor de "Value" en "1".

```shell
>callContract @1TeChange {"TypeChange": "withdraw", "Value": 2}
```

### Deducción de tarifas ecosistema {#eco-deduction}

Antes de configurar el ecosistema para la deducción de tarifas de gas por parte de los miembros, es necesario comprender el modelo de tarifas de IBAX, que se puede encontrar en el [libro blanco](https://github.com/IBAX-io/whitepaper).

Primero establecemos la dirección de la billetera del ecosistema, llamamos al contrato `@1EditParameter` y modificamos los parámetros del ecosistema:

```shell
>callContract @1EditParameter {"Id": 334, "Value": "1273-2644-xxxx-5846-6598"}
```
`Id` se refiere al ID del parámetro `ecosystem_wallet` de la billetera ecológica. Puede consultarlo de la siguiente manera:

```shell
>getList @1parameters -w={"ecosystem": 22, "name": "ecosystem_wallet"}
```

El valor `Value` es la dirección de la billetera ecológica que se va a vincular. La tarifa de gas generada por el contrato será pagada por esa dirección. Esta dirección debe tener suficientes tokens en la ecología actual y solo se modificará con el consentimiento de la dirección vinculada.


Llamando al contrato `@1EcoFeeModeManage` para configurar la deducción de tarifas de múltiples ecosistemas, como sigue:

```shell
>callContract @1EcoFeeModeManage {"FollowFuel": 0.01, "CombustionFlag": 1, "VmCostFlag": 2, "VmCostConversionRate": 100, "StorageConversionRate": 100, "StorageFlag": 2, "ExpediteFlag": 1}
```

Los campos de parámetros del contrato se definen de la siguiente manera:
- `FollowFuel`: parámetro que multiplica la tasa de la tarifa ecológica 1.
- `CombustionFlag`: si se habilita la quema de tarifas de gas en transacciones ecológicas, 1-no, 2-sí.
- `CombustionPercent`: porcentaje de quema, solo efectivo cuando se habilita la quema de tarifas de gas, con valores del 1 al 100. Cuando no está habilitado, es 0.
- `VmCostFlag`: identificador de costo de máquina virtual, establecido para pago directo o pago por proxy, 1-pago directo, 2-pago por proxy.
- `StorageFlag`: identificador de costo de almacenamiento, establecido para pago directo o pago por proxy, 1-pago directo, 2-pago por proxy.
- `ExpediteFlag`: identificador de costo acelerado, establecido para pago directo o pago por proxy, 1-pago directo, 2-pago por proxy.
- `VmCostConversionRate`: tasa de conversión de costo de máquina virtual, con 2 decimales, solo efectiva para pago por proxy, mayor que cero.
- `StorageConversionRate`: tasa de conversión de costo de almacenamiento, con 2 decimales, solo efectiva para pago por proxy, mayor que cero.

Si utiliza la configuración mencionada anteriormente, todas las tarifas de transacción generadas por los usuarios al llamar a contratos dentro de ese ecosistema serán pagadas por la billetera ecológica configurada actualmente. Todos los usuarios solo necesitan pagar las tarifas de gas generadas dentro de ese ecosistema. Por supuesto, puede ajustar los parámetros de tarifas correspondientes según sea necesario.


### Gobernanza DAO del ecosistema {#dao-governance-ecosystem}

Antes de cambiar a un ecosistema de gobernanza DAO, es necesario asegurarse de que el ecosistema actual ya haya emitido tokens. Después de cambiar a un ecosistema de gobernanza DAO, todas las propuestas en el ecosistema serán decididas por la votación de los miembros del comité de gobernanza, en lugar de ser administradas por separado por los desarrolladores del ecosistema. Los miembros del comité de gobernanza DAO son elegidos por los 50 principales poseedores de los tokens del ecosistema.

Invoca el contrato `@1EditControlMode` para cambiar el modo de gobernanza ecológica al modo de gobernanza DAO.

```shell
>callContract @1EditControlMode {"Value": 2}
```

El parámetro `Value` con valor `1` representa el modelo de creador, mientras que `2` representa el modelo de gobernanza DAO.

Podemos intentar crear una aplicación:

```shell
>callContract @1NewApplication {"Name": "testApp", "Conditions": "ContractConditions(\"@1DeveloperCondition\")"}
```

En este momento se generará una propuesta de gobernanza DAO, que solo se creará después de que sea aprobada por votación por el comité de gobernanza DAO. Se requiere una mayoría del 75% de los votos para que una propuesta sea válida, con una tasa de aprobación del 68%. 

El alcance de la gobernanza DAO incluye:

1. Agregar, eliminar y modificar aplicaciones, contratos, páginas, fragmentos de código, pestañas, menús, parámetros de aplicación, tablas de datos y campos.
2. Modificar el multilingüismo.
3. Interruptores de modelo DAO y creador.
4. Editar parámetros ecosistema.
5. Roles, asignación y eliminación de miembros de roles.
6. Emitir y destruir monedas.
7. Modificar parámetros de plataforma.
8. Modificar información ecológica.
9. Modificar contratos de retraso.
10. Modificar plantillas de votación.


## Deploying an application using an application packaging tool {#deploy-applications-using-application-packaging-tool}

Antes de comenzar este tutorial, necesitas descargar la [herramienta de empaquetado de aplicaciones IBAX](https://github.com/IBAX-io/app-tool). Necesitamos usar esta herramienta para empaquetar la aplicación IBAX.

Necesitamos guardar los archivos de la aplicación en la siguiente estructura de directorios:

```text
- APP Name
    - app_params
        params1.csv
        params2.csv
        ...
    - contracts
        contract1.sim
        contract2.sim
        ...
    - tables
        tableName1.json
        tableName2.json
        ...
    config.json
```

Como sigue:

```shell
airdrop$ ls *
config.json

app_params:
dedicated_account.csv  lock_percent.csv  per_period_sec.csv  period_count.csv

contracts:
AddAirdrop.sim  ClaimAirdrop.sim  SpeedAirdrop.sim

tables:
airdrop_info.json
```

El directorio `app_params` contiene archivos de parámetros de aplicación, con el nombre del parámetro seguido del formato de archivo `.csv`, y el contenido del archivo es el valor del parámetro. El directorio `contracts` contiene contratos en formato de archivo `.sim`, y el contenido del archivo es el código fuente del contrato. El directorio `tables` contiene la estructura de la tabla de datos de la aplicación en formato de archivo `json`, como se muestra a continuación:

```json
[
  { "name": "account", "conditions": "{\"read\": \"true\", \"update\": \"ContractConditions(\"MainCondition\")\"}", "type": "varchar" },
  { "name": "balance_amount", "conditions": "true", "type": "money" },
  { "name": "stake_amount", "conditions": "true", "type": "money" },
  { "name": "surplus", "conditions": "true", "type": "number" },
  { "name": "total_amount", "conditions": "true", "type": "money" }
]
```

`name` es el nombre del campo de la tabla de datos, `conditions` son los permisos del campo de la tabla de datos, `type` es el tipo de campo.

En el primer paso, generamos un archivo config.json y lo guardamos en el directorio airdrop. El contenido del archivo es el siguiente:

```text
{
    "name": "Airdrop",
    "conditions": "ContractConditions(\"@1MainCondition\")"
}
```

En primer lugar, `name` es el nombre de la aplicación y `conditions` son los permisos para modificar la aplicación. Luego, se guarda en el directorio `airdrop`.

En el segundo paso, se empaqueta la aplicación y se genera el archivo `airdrop.json` en el directorio actual. Si se modifican los parámetros de la aplicación o el contrato, es necesario volver a empaquetar la aplicación.

```shell
$ ./app-tool airdrop/
```

Podemos importar una aplicación a través de la [herramienta de línea de comandos](https://github.com/IBAX-io/ibax-cli), como se muestra a continuación:

Usando el comando `import`, importe la aplicación y el parámetro `-f` especifica el archivo de la aplicación a importar.

```shell
$ ibax-cli console

Welcome to the IBAX console!
To exit, press ctrl-d or type exit

>import -f ./airdrop.json
```

Por supuesto, si tienes una aplicación, también puedes generar la estructura completa del directorio con el siguiente comando.

```shell
$ app-tool.exe airdrop.json
```

