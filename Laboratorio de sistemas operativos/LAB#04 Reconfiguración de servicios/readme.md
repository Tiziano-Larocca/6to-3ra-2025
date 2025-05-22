# Configuración de Servicios de Red (DNS, DHCP, HTTP, SSH)

Este documento explica los pasos realizados y las capturas correspondientes en la configuración de servicios de red en un entorno cliente-servidor.

## 🔹 DNS

### Configuracion de zonas

Esta captura muestra la declaración de zonas directa e inversa para que BIND sepa qué archivos debe usar para resolver nombres de dominio a IP `(zona directa)` y IPs a nombres 
`(zona inversa)`.

Utilizando este comando para poder entrar a la configuracion

![Imagen1](./img/Captura%20de%20pantalla%202025-05-21%20142836.png)

![Imagen2](./img/Captura%20de%20pantalla%202025-05-21%20142843.png)


### Zona directa
Se configuró una zona directa en el servidor DNS (BIND) para traducir nombres de dominio `(como ns.tcc.ar)` a direcciones IP. Se definieron registros A y NS.

![Imagen3](./img/Captura%20de%20pantalla%202025-05-21%20142853.png)

![Imagen4](./img/Captura%20de%20pantalla%202025-05-21%20142856.png)


### Chequeo de Configuración

Se utilizó `named-checkzone` y named-checkconf para verificar que los archivos no tengan errores.

![Imagen5](./img/Captura%20de%20pantalla%202025-05-21%20142904.png)

### Zona Inversa

Se creó una zona inversa para resolver IPs a nombres de dominio (PTR). Esto mejora la validación y trazabilidad de conexiones.

![Imagen6](./img/Captura%20de%20pantalla%202025-05-21%20142908.png)

![Imagen7](./img/Captura%20de%20pantalla%202025-05-21%20142912.png)

### Chequeao de configuracion

Se utilizo `named-checkzone` y `named-checkconf` para verificar que los archivos no tengan errores.

![Imagen8](./img/Captura%20de%20pantalla%202025-05-21%20142942.png)

### Reinicio del Servicio

Se reinició BIND con `systemctl restart bind9` para aplicar los cambios y luego se utiliza `systemctl status bind9` para ver si el servidor esta activo.

![Imagen9](./img/Captura%20de%20pantalla%202025-05-21%20142945.png)

### Pruebas desde el Cliente

Desde una PC cliente, se configuró el servidor DNS manualmente y se realizaron consultas con nslookup para verificar la resolución.

![Imagen10](./img/Captura%20de%20pantalla%202025-05-21%20142951.png)

## 🔹 DHCP

### Configuración del Archivo

Se editó `/etc/dhcp/dhcpd.conf`estableciendo:

![Imagen11](./img/Captura%20de%20pantalla%202025-05-21%20142955.png)

![Imagen12](./img/Captura%20de%20pantalla%202025-05-21%20142958.png)

- Rango de IPs

- DNS

- Puerta de enlace

- Tiempo de arrendamiento

- Verificación

Se reinició el servicio con `systemctl restart isc-dhcp-server` y se verificó su correcto funcionamiento.

![Imagen13](./img/Captura%20de%20pantalla%202025-05-21%20143001.png)


- Cliente

Verificamos que de una ip dentro del rango en el cliente

![Imagen14](./img/Captura%20de%20pantalla%202025-05-21%20143005.png)

El cliente recibió una IP dentro del rango mediante DHCP. Se comprobó conectividad al DNS usando ping.

![Imagen15](./img/Captura%20de%20pantalla%202025-05-21%20143008.png)


## 🔹 HTTP y SSH (Transferencia de Archivos)

### PowerShell y SSH

- PowerShell como usuario `tizi`

En esta imagen con PowerShell en Windows es para conectarte al servidor remoto. El objetivo es transferir archivos HTML (la página web) al servidor Apache mediante SSH.

Función de esta captura: mostrar el intento de conexión o preparación para copiar archivos usando scp o similar.

![Imagen16](./img/Captura%20de%20pantalla%202025-05-21%20143011.png)

- Navegación a la carpeta web

Accedemos PowerShell a la carpeta donde está lista la página web (HTML, CSS, etc.) para ser enviada al servidor Ubuntu.

Función de esta captura: mostrar el contenido listo para subir

![Imagen17](./img/Captura%20de%20pantalla%202025-05-21%20143014.png)


- Fallo al transferir los archivos

Intetamos copiar los archivos pero aparece un error de permiso denegado, ya que el usuario no tiene acceso a `/var/www/html` en el servidor.

Función de esta captura: evidenciar que hace falta configurar una forma segura y autorizada de acceso al servidor `(con claves SSH)`.

![Imagen18](./img/Captura%20de%20pantalla%202025-05-21%20143017.png)


- Generación de claves con PuTTYgen

En la interfaz de PuTTYgen, donde se generan claves pública y privada. Este método reemplaza el uso de usuario y contraseña por autenticación mediante archivo de clave.

Función de esta captura: Mostrar la creación de las claves necesarias para el acceso seguro al servidor.

![Imagen19](./img/Captura%20de%20pantalla%202025-05-21%20143021.png)


- Una vez terminado, guardamos la clave privada y la pública

![Imagen20](./img/Captura%20de%20pantalla%202025-05-21%20143024.png)

- Desde el servidor Ubuntu, como root damos permisos a la carpeta ssh y creamos el archivo “authorized_keys”con su carpeta .ssh. También le ponemos permisos. Dentro del archivo, ponemos la clave ssh-rsa que copiamos

![Imagen21](./img/Captura%20de%20pantalla%202025-05-21%20143034.png)

![Imagen22](./img/Captura%20de%20pantalla%202025-05-21%20143036.png)

![Imagen23](./img/Captura%20de%20pantalla%202025-05-21%20143038.png)

- Desde putty, vamos a configurar todo para entrar a Ubuntu: La ip, la clave de autenticacion, el puerto y todo lo configurado lo guardaremos de nuestra setting `"Configuracion claves"`

![Imagen24](./img/Captura%20de%20pantalla%202025-05-21%20143041.png)

- En el apartado de "Browse..." ingresamos la dirrecion del archivo donde tenias guardada nuestra `clave.ppk`

![Imagen25](./img/Captura%20de%20pantalla%202025-05-21%20143047.png)

- Cuando terminamos de configurar todo hacemos click en Open y se nos abrira la terminal de nuestro servidor Ubunto con exito.

![Imagen26](./img/Captura%20de%20pantalla%202025-05-21%20143050.png)

- Transferencia exitosa del HTML
Volvemos a intentar subir la página HTML desde PowerShell al servidor, y esta vez funciona correctamente.

Función de esta captura: Mostrar que el sistema ahora permite subir archivos a `/var/www/html.`

![Imagen27](./img/Captura%20de%20pantalla%202025-05-21%20143053.png)

- Página accesible desde navegador

En esta última captura abrimos el navegador y se accede al sitio con el dominio configurado `(ej: https://ns.tcc.ar)`. La página que creamos se muestra correctamente.

Función de esta captura: Probar que Apache está funcionando y que la configuración DNS apunta correctamente.

![Imagen28](./img/Captura%20de%20pantalla%202025-05-21%20143056.png)


## 🔹 SSH (Configuración Avanzada)


### Explicación línea por línea de la configuración:

- Port 2222
Cambia el puerto por defecto de SSH de 22 a 2222.

Esto es una medida básica de seguridad para evitar ataques automáticos a puertos comunes.

- PasswordAuthentication yes

En la nota de arriba dice que se desea deshabilitar la autenticación por contraseña, pero esta línea permitiría aún usarla. Lo correcto sería:
PasswordAuthentication no

- #AllowUsers tizi
Está comentada (#), por lo tanto no tiene efecto actualmente.

Si se activa, sólo el usuario tizi (o el que pongas) podrá iniciar sesión vía SSH.

Para habilitarlo correctamente y permitir solo a admin, se deberia escribir:
AllowUsers admin(Nos dimos cuenta tarde que por eso no funcionaba ).

- PubkeyAuthentication yes
Habilita la autenticación mediante clave pública. Esto permite conectarse con una clave SSH y no con contraseña.

- #AddressFamily any, ListenAddress 0.0.0.0, #ListenAddress ::
Estas líneas controlan en qué interfaces escucha el servicio SSH:

0.0.0.0 = escucha en todas las interfaces IPv4.

:: = IPv6 (comentada).

AddressFamily define si usar IPv4 (inet) o IPv6 (inet6) o ambos (any).

![Imagen29](./img/Captura%20de%20pantalla%202025-05-21%20143059.png)


### Generación de claves SSH
Usando el comando `ssh-keygen -b 2048`
Se genera un par de claves pública y privada con algoritmo ed25519. La clave privada se guarda en C:\Users\Info6\.ssh\id_ed25519 y la pública en el mismo directorio con extensión .pub. Esta clave se usará para autenticarse sin contraseña en el servidor remoto.

![Imagen30](./img/Captura%20de%20pantalla%202025-05-21%20143104.png)


### Listado de archivos
Usando el comando `ls`
Se muestra el contenido del directorio del usuario (C:\Users\Info6) y luego el de la carpeta .ssh, donde están las claves generadas y los archivos de configuración de SSH.

![Imagen31](./img/Captura%20de%20pantalla%202025-05-21%20143107.png)


### Transferencia de clave pública

Con el comando `scp -P 2222 id_ed25519.pub tizi@192.168.128.96:/home/tizi`
Se transfiere la clave pública generada desde Windows al servidor Ubuntu (192.168.128.96) usando scp, especificando el puerto 2222 que se configuró antes en SSH.

![Imagen31](./img/Captura%20de%20pantalla%202025-05-21%20143111.png)


### Ingreso exitoso al servidor

Con el comando `ssh -p 2222 tizi@192.168.128.96`
Con la clave ya copiada y autorizada en el servidor, se puede ingresar desde PowerShell al servidor remoto sin necesidad de escribir contraseña. Se muestra el login exitoso a Ubuntu.

![Imagen31](./img/Captura%20de%20pantalla%202025-05-21%20143113.png)



### ¿Qué aprendiste de la actividad?

Con esta actividad aprendimos a configurar y entender cómo funcionan varios servicios fundamentales en una red:

- DNS: aprendimos a crear zonas directas e inversas para que un servidor pueda traducir nombres de dominio a direcciones IP y viceversa. Entendí cómo se estructuran los archivos de configuración en BIND.

- DHCP: aprendimos cómo un servidor puede asignar direcciones IP automáticamente a los dispositivos de una red y cómo verificar que esta asignación funcione correctamente desde un cliente.

- HTTP: aprendimos a transferir archivos de una página web al servidor para que puedan ser accesibles desde un navegador. También conocimos la ruta y permisos necesarios para que Apache pueda servir una web.

- SSH: entendimos cómo conectarnos de forma segura a un servidor remoto usando claves públicas y privadas, cómo cambiar el puerto por defecto, y cómo limitar el acceso a usuarios específicos. Esto nos permitió ver cómo se refuerza la seguridad en un sistema real.

En general, esta actividad nos ayudó a poner en práctica lo que vimos en clase con cerso, y nos sirvió para entender mejor cómo funciona una red real y cómo se administra un servidor.
