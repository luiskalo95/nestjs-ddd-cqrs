# Aplicación de suministro de leche de depositos o bodegas (warehouse) a tiendas de barrio (store) usando DDD con CQRS

## Description

Esta aplicación demuestra el funcionamiento básico entre un depósito de leche o bodega de la cual
su función principal es la distribuición y provición de leche a tiendas que se encargan de vender
dichos productos al público general.

Aqui se hace uso de NestJS con patrón arquitectónico DDD con CQRS emitiendo eventos handling y
también sourcing para guardar la trazabilidad de transaciones hechas

1. Diagrama de dominio con agregates para entidades root
![aggregates](imgs/aggregates.png 'aggregates')

2. Tablas especificando los valores que va a tener cada entidad de dominio con la dependencia
![entidades](imgs/entidades.png 'entidades')

## Preparación de entorno de forma local

1. Tener docker instalado y configurado apropiadamente
2. Descargar la imagen de mysql versión 8 y crear un contenedor corriendo con los siguientes valores
   (para almacenar toda la información principal)

   host: 'localhost',
   port: 5200,
   database: 'dairy_store',
   username: 'root',
   password: '123456',
3. Descargar la imagen de mongo versión 3.6 y crear un contenedor corriendo con los siguientes valores
   (para almacenar toda la información con respecto al event sourcing)

   user: 'root',
   pass: '12345',
   database: 'eventsourcing',
   host: 'localhost',
   port: 27017

4. Finalmente instalar los módulos de node y correr el proyecto con yarn start:dev

## Funcionamiento y reglas de negocio del proyecto

Cada entidad de dominio sea warehouse y store tiene su respectivo CRUD el cual se va a explicar
el funcionamiento del flujo principal

1. Se crea un "warehouse" con las variables obligatorias especificadas y siguiendo el mismo tipado
   de variables como se muestra en el ejemplo. Por defecto se crea con estado de demanda "HIGH"
   Nota: Todos los valores del numeros tienen que ser positivos por que hablamos es de cantidades

   Ejemplo CREATE warehouse

![warehouse-create](imgs/warehouse-create.png 'warehouse-create')

2. Una vez creado el warehouse se puede hacer una solicitud GET PUT y DELETE del registro creado

   Ejemplo GET warehouse

![warehouse-get](imgs/warehouse-get.png 'warehouse-get')

   Ejemplo PUT warehouse

![warehouse-put](imgs/warehouse-put.png 'warehouse-put')

   Ejemplo DELETE warehouse

![warehouse-delete](imgs/warehouse-delete.png 'warehouse-delete')

3. Cuando se tenga un warehouse creado, se le puede asociar N cantidad de stores al warehouse
   el cual se le asocia el id de creación con el número de bolsas de leche que va a necesitar
   dicha tienda para vender (Nota: No puede ser mayor al número de bolsas que tiene el warehouse)

   Ejemplo CREATE store

![store-create](imgs/store-create.png 'store-create')

4. Al store se le puede hacer también CRUD como el warehouse GET PUT DELETE; al momento de crear el store
   va a generar un evento hacia el warehouse restandole la cantidad de bolsas de leche solicitadas,
   va a actualizar el campo de numero se stores subscritas y si el numero de cantidad de bolsas de leche
   es menor a 10 con el que queda el warehouse cambia el estado de demanda a "LOW" (event handling)

   Ejemplo GET warehouse, después de haber creado el store previamente en el ejemplo mostrado

![event-handling](imgs/event-handling.png 'event-handling')

4. Finalmente cada una de las transaciones hechas con la entidad de dominio store, está siendo almacenada en mongo usando el event-sourcing para mantener el registro de modificación en cada una de estas.

Ejemplo Registro de datos en mongo en base a store

![event-sourcing](imgs/event-sourcing.png 'event-sourcing')

### Nota
Si alguna duda surge, ponerse en contacto para solucionar o aclarar la dificultad presentada.

   

