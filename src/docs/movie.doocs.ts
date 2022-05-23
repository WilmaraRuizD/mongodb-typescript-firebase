/**
 * @swagger
 * components:
 *  schemas:
 *      movie:
 *          type: object
 *          properties:
 *              adult:
 *                  type: boolean
 *                  description: Se define si es categoría de adultos 
 *              backdrop_path:
 *                  type: string
 *                  description: Ruta de película
 *              genre_ids:
 *                  type: string
 *                  description: Categoría de la película
 *              original_lenguage:
 *                  type: string
 *                  description: Idioma original 
 *              original_title:
 *                  type: string
 *                  description: Título original 
 *              overview:
 *                  type: string
 *                  description: Visión original de la película 
 *              popularity:
 *                  type: number
 *                  description: Popularidad
 *              poster_path:
 *                  type: string
 *                  description: Cartelera
 *              release_date:
 *                  type: date
 *                  description: Fecha de lanzamiento 
 *              title:   
 *                  type: string
 *                  description:   título
 *              video:  
 *                  type: boolean
 *                  description: Se define si el video se encuentra disponible
 *              vote_average:  
 *                  type: number
 *                  description:    Votos promedios
 *              vote_count:
 *                  type: number
 *                  description:    Recuento de votos
 *          required:    
 *                  - adult
 *                  - backdrop_path
 *                  - genre_ids
 *                  - original_lenguage
 *                  - original_title
 *                  - overview  
 *                  - popularity
 *                  - poster_path
 *                  - release_date  
 *                  - title   
 *                  - video 
 *                  - vote_average  
 *                  - vote_count
 * 
 */
/**
 * @swagger
 * /movies:
 *  get:
 *      summary: Trae todas las películas
 *      tags: [movie]
 *      responses:
 *          200:
 *              description: Lista de todas las películas
 *              content:
 *                 application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/movie'
 *
 */
/**
 * @swagger
 * /movies/{id}:
 *  get:
 *      summary: Consulta las películas por su id 
 *      tags: [movie]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: Identificador de la película
 *      responses:
 *          200:
 *              description: Se consultó películas por ID
 *          500:
 *              description: Error en el servidor
 *
 */
/**
 * @swagger
 * /movies:
 *  post:
 *      summary: Crea una nueva película
 *      tags: [movie]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   $ref: '#/components/schemas/movie'
 *      responses:
 *          200:
 *              description: Película creada
 *          400:
 *              description: Película no creada por error en el envío de datos
 *          500:
 *              description: Película no creada por error en el servidor
*/

// Eliminar peliculas
/**
 * @swagger
 * /movies/{id}:
 *  delete:
 *      summary: Elimina la película pasándole el ID como parámetro
 *      tags: [movie]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: Identificador de la película 
 *      responses:
 *          200:
 *              description: Película eliminada
 *          500:
 *              description: Error en el servidor
 *
 */
/**
 * @swagger
 * /movies/{id}:
 *  put:
 *      summary: Edita una película pasándole el ID como parámetro
 *      tags: [movie]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: Identificador de la película
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   $ref: '#/components/schemas/movie'
 *      responses:
 *          200:
 *              description: Se editó de manera correcta 
 *              content:
 *                 application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/movie'
 *          400:
 *              description: Error en envío de datos por parte del cliente 
 *          500:
 *              description: Error en el servidor
 *
 */
