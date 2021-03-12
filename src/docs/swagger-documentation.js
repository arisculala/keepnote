'use strict';

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Notes Management API's
 */

/**
 * @swagger
 *   components:
 *     schemas:
 *       noteID:
 *         type: integer
 *         description: Note id, unique value.
 *         example: 1
 *       title:
 *         type: string
 *         description: Title of the note.
 *         example: Call Customer
 *       body:
 *         type: string
 *         description: Description of the note.
 *         example: Call customer tomorrow morning.
 *       created:
 *         type: string
 *         description: Date/Time the note is created.
 *         example: 2021-11-03 14:32:00
 *       NewNote:
 *         type: object
 *         properties:
 *           title:
 *             $ref: '#/components/schemas/title'
 *           body:
 *             $ref: '#/components/schemas/body'
 *       Note:
 *         type: object
 *         properties:
 *           noteID:
 *             $ref: '#/components/schemas/noteID'
 *           title:
 *             $ref: '#/components/schemas/title'
 *           body:
 *             $ref: '#/components/schemas/body'
 *           created:
 *             $ref: '#/components/schemas/created'
 *       GeneralError:
 *         type: object
 *         properties:
 *           error_code:
 *             type: string
 *             description: Http Error Code
 *             example: 5xx (500)
 *           message:
 *             type: string
 *             description: Description of the Http Error Code
 *             example: Internal server error encountered.
 */

/**
 * @swagger
 *   /notes:
 *     post:
 *       tags:
 *       - Notes
 *       summary: "New note"
 *       description: "Create a new note."
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewNote'
 *       responses:
 *         200:
 *           description: Note is created.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Note'
 *         500:
 *           description: Error encountered saving note.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/GeneralError'
 */

/**
 * @swagger
 *   /notes:
 *     get:
 *       tags:
 *       - Notes
 *       summary: "Get all notes"
 *       description: "A list of notes."
 *       responses:
 *         200:
 *           description: Notes were obtained.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Note'
 */

/**
 * @swagger
 *   /notes/{id}:
 *     get:
 *       tags:
 *       - Notes
 *       summary: "Retrieve note"
 *       description: "Retrieve a single note."
 *       responses:
 *         200:
 *           description: A single note.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Note'
 */