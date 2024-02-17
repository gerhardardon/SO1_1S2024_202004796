package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"os"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) Extraer() string {
	// Ruta completa al archivo en /proc que deseas leer
	rutaArchivo := "/proc/ram_202004796"
	contenido, err := leerArchivo(rutaArchivo)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(contenido)
	return contenido
}

// Función para leer el contenido de un archivo
func leerArchivo(ruta string) (string, error) {
	// Abre el archivo
	archivo, err := os.Open(ruta)
	if err != nil {
		return "", err
	}
	defer archivo.Close()

	// Lee el contenido del archivo
	contenido, err := ioutil.ReadAll(archivo)
	if err != nil {
		return "", err
	}

	// Convierte el contenido a una cadena y devuelve
	return string(contenido), nil
}
