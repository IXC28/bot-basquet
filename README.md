# bot-basquet
## Un bot de discord para optener informacion del baloncesto, tanto de equipos como de jugadores por individual

### Características

```/buscar-jugador``` Muestra informacion del jugador introducido

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nombre` | `string` | **Required**. Nombre del jugador a buscar |
| `apellido` | `string` | **Required**. Apelllido del jugador a buscar |

![image](https://github.com/IXC28/bot-basquet/assets/67348084/060d82a9-b7a7-4b08-b624-a0b03c19b539)

![image](https://github.com/IXC28/bot-basquet/assets/67348084/1d004a6b-9a31-4291-8cbb-bb4efd196ca1)


```/seasons-jugador``` Muestra la informacion del jugador en la season introducida

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nombre` | `string` | **Required**. Nombre del jugador a buscar |
| `apellido` | `string` | **Required**. Apelllido del jugador a buscar |
| `season` | `integer` | **Required**. Fecha de la season a buscar |

![image](https://github.com/IXC28/bot-basquet/assets/67348084/4465dbda-cbb4-4fe8-9aed-5c6b041699d1)

![image](https://github.com/IXC28/bot-basquet/assets/67348084/903be132-337a-4097-9559-47b07c60726a)



```/buscar-equipo``` Muestra la informacion del equipo introducido

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nombre` | `string` | **Required**. Nombre del equipo a buscar |

![image](https://github.com/IXC28/bot-basquet/assets/67348084/22f8b714-a22f-4d71-97e9-37dc369de959)

![image](https://github.com/IXC28/bot-basquet/assets/67348084/9d99fd1f-f263-424d-a042-07d9897b4d46)


```/buscar-juegos``` Devuelve un resumen de las últimos 3 partidos jugadas por el equipo.
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nombre` | `string` | **Required**. Nombre del equipo a buscar los partidos |

![image](https://github.com/IXC28/bot-basquet/assets/67348084/a1db6d54-b90e-4231-9590-0f1faa8d6465)

![image](https://github.com/IXC28/bot-basquet/assets/67348084/3482510f-ba4a-47b1-a66b-ce843e8cea12)

