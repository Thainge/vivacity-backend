import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'vivacity',
    password: 'pgmepassword',
    port: 5432,
})

export interface Applicant {
    id: Number;
    firstname: String;
    lastname: String;
    about: String;
    address: String;
    state: String;
    city: String;
    zip: String;
}

// Get Applicant data
const getApplicant = async (req: Request, res: Response) => {
    // get the Applicant id from the req
    let id: string = req.params.id;
    // get the Applicant
    pool.query('SELECT * FROM Applicants WHERE id = $1;', [id], (error: any, results: { rows: any; }) => {
        if (error) {
            return res.status(StatusCodes.BAD_REQUEST).send(`Error finding user with id of ${id}: ` + error);
        }
        return res.status(StatusCodes.OK).json(results.rows[0])
    });
};

// Adding an Applicant
const CreateApplicant = async (req: Request, res: Response) => {
    // get the data from req.body
    let body: Applicant = req.body ?? null;
    const { id, firstname, lastname, about, address, city, state, zip } = body;

    // Since only 1 applicant for this example, check if an applicant exists
    await pool.query('SELECT * FROM Applicants WHERE id = $1;', [id], (error: any, results: { rows: any; }) => {
        if (error) {
            return res.status(StatusCodes.BAD_REQUEST).send(`Error finding user with id of ${id}: ` + error);
        }

        // Applicant exists? Then update
        if (results.rows.length > 0) {
            // update the Applicant
            pool.query('UPDATE Applicants SET firstname = $1, lastname = $2, about = $3, address = $4, city = $5, state = $6, zip = $7 WHERE id = $8', [firstname, lastname, about, address, city, state, zip, id], (error: any, results: any) => {
                if (error) {
                    return res.status(StatusCodes.BAD_REQUEST).send("Invalid application data: " + error);
                }
                return res.status(StatusCodes.OK).send(`Applicant modified with ID: ${id}`)
            });
        } else {
            // Else add to the Applicant
            pool.query('INSERT INTO Applicants (id, firstname, lastname, about, address, city, state, zip) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [id, firstname, lastname, about, address, city, state, zip], (error: any, results: any) => {
                if (error) {
                    return res.status(StatusCodes.BAD_REQUEST).send("Invalid application data: " + error);
                }
                return res.status(StatusCodes.CREATED).send(`Applicant added with ID: ${results.rows[0].id}`)
            });
        }
    });
};

// Update Applicant data
const UpdateApplicant = async (req: Request, res: Response) => {
    // // get the data from req.body
    let body: Applicant = req.body ?? null;
    const { id, firstname, lastname, about, address, city, state, zip } = body;

    // Since only 1 applicant for this example, check if an applicant exists
    await pool.query('SELECT * FROM Applicants WHERE id = $1;', [id], (error: any, results: { rows: any; }) => {
        if (error) {
            return res.status(StatusCodes.BAD_REQUEST).send(`Error finding user with id of ${id}: ` + error);
        }

        // Applicant exists? Then update
        if (results.rows.length > 0) {
            // update the Applicant
            pool.query('UPDATE Applicants SET firstname = $1, lastname = $2, about = $3, address = $4, city = $5, state = $6, zip = $7 WHERE id = $8', [firstname, lastname, about, address, city, state, zip, id], (error: any, results: any) => {
                if (error) {
                    return res.status(StatusCodes.BAD_REQUEST).send("Invalid application data: " + error);
                }
                return res.status(StatusCodes.OK).send(`Applicant modified with ID: ${id}`)
            });
        } else {
            // Else add to the Applicant
            pool.query('INSERT INTO Applicants (id, firstname, lastname, about, address, city, state, zip) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [id, firstname, lastname, about, address, city, state, zip], (error: any, results: any) => {
                if (error) {
                    return res.status(StatusCodes.BAD_REQUEST).send("Invalid application data: " + error);
                }
                return res.status(StatusCodes.CREATED).send(`Applicant added with ID: ${results.rows[0].id}`)
            });
        }
    });
};

// Deleting an Applicant
const DeleteApplicant = async (req: Request, res: Response, next: NextFunction) => {
    // get the Applicant id from req.params
    let id: string = req.params.id;

    // delete the Applicant
    pool.query('DELETE FROM Applicants WHERE id = $1', [id], (error: any, results: any) => {
        if (error) {
            return res.status(StatusCodes.NOT_FOUND).send(`Error deleting user with id of ${id}: ` + error);
        }
        return res.status(StatusCodes.OK).send(`Applicant deleted with ID: ${id}`)
    })
};

export default { getApplicant, UpdateApplicant, DeleteApplicant, CreateApplicant };