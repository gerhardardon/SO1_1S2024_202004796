# Plataforma de Monitoreo y Señales a Procesos

## Backend Go
Se escogio fiber y go debido a su rendimiento y facilidad de uso, ademas que lo vuelve una API ligera 

Para la creacion de esta API se utilizo:
- Fiber V2
- GoRutines

Se leyeron los modulos insertados con anterioridad en la carpeta "/proc" de neustro SO y se manejaron los datos para devolver los siguientes valores:

| Modulo    | Valor de retorno             | Endpoint       |
|-----------|------------------------------|----------------|
| RAM       | int porcentaje libre         | "api/ram"      |
| CPU       | int porcentaje libre         | "api/cpu"      |
| Procesos  | json procesos con sus hijos  | "api/proclist" |




## Uso de modulos
En C para Linux, los módulos son fragmentos de código que pueden ser cargados y descargados en el kernel del sistema operativo en tiempo de ejecución. Estos módulos extienden las funcionalidades del kernel sin necesidad de recompilarlo por completo. Permiten agregar características específicas, controladores de dispositivos, sistemas de archivos, entre otros, sin tener que modificar el núcleo del sistema operativo. Esto proporciona flexibilidad y modularidad al sistema Linux, ya que los módulos pueden ser cargados y descargados según sea necesario sin afectar al funcionamiento general del sistema.

En este caso en específico se utilizaron los siguientes:
- Modulo Ram: Este módulo es el encargado de leer la ram total y la libre del sistema
- Modulo CPU: Este modulo lee la utilizacion del cpu y devuelve su porcetaje
- Modulo Proc: El modulo de procesos lee todos los procesos del sistema y los ordena segun su PID, ademas este modulo obtiene todos los child processes (si los hay) y los enlaza con su proceso padre para llevar todo el tracking de estos.

### Notas
Estos módulos estan escritos en C y varian dependiendo de las necesidades solicitas, adeas están acompañados de de un Mkefile que proporciona lo necesario para su uso.

Pasos para instalar los modulos:
- cd a la carpeta del modulo
- cmd "make"
- cmd "Sudo insmod nombre_del_modulo.ko"

Para esto se necesita el secure boot desactivado.