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
    firstName: String;
    lastName: String;
    about: String;
    address: String;
    state: String;
    city: String;
    zip: String;
}

// Get All Applicant
const getAllApplicants = async (req: Request, res: Response) => {
    // get all Applicants
    pool.query(`SELECT * FROM Applicants;`, (error: any, results: { rows: any; }) => {
        if (error) {
            throw error;
        }
        return res.status(StatusCodes.OK).json(results.rows)
    });
};

// Get Applicant data
const getApplicant = async (req: Request, res: Response) => {
    // get the Applicant id from the req
    let id: string = req.params.id;

    // get the Applicant
    pool.query('SELECT * FROM Applicants WHERE id = $1;', [id], (error: any, results: { rows: any; }) => {
        if (error) {
            throw error;
        }
        return res.status(StatusCodes.OK).json(results.rows[0])
    });
};

// Adding an Applicant
const CreateApplicant = async (req: Request, res: Response) => {
    // get the data from req.body
    let body: Applicant = req.body ?? null;
    const { firstName, lastName, about, address, city, state, zip } = body;

    // add the Applicant
    pool.query('INSERT INTO Applicants (firstname, lastname, about, address, state, city, zip) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [firstName, lastName, about, address, city, state, zip], (error: any, results: any) => {
        if (error) {
            throw error
        }
        res.status(StatusCodes.CREATED).send(`Applicant added with ID: ${results.rows[0].id}`)
    });
};

// Update Applicant data
const UpdateApplicant = async (req: Request, res: Response) => {
    // // get the data from req.body
    let body: Applicant = req.body ?? null;
    const { id, firstName, lastName, about, address, city, state, zip } = body;

    // update the Applicant
    pool.query('UPDATE Applicants SET firstname = $1, lastname = $2, about = $3, address = $4, state = $5, city = $6, zip = $7 WHERE id = $8', [firstName, lastName, about, address, city, state, zip, id], (error: any, results: any) => {
        if (error) {
            throw error
        }
        res.status(StatusCodes.OK).send(`Applicant modified with ID: ${id}`)
    });
};

// Deleting an Applicant
const DeleteApplicant = async (req: Request, res: Response, next: NextFunction) => {
    // get the Applicant id from req.params
    let id: string = req.params.id;

    // delete the Applicant
    pool.query('DELETE FROM Applicants WHERE id = $1', [id], (error: any, results: any) => {
        if (error) {
            throw error
        }
        res.status(StatusCodes.OK).send(`Applicant deleted with ID: ${id}`)
    })
};

export default { getApplicant, UpdateApplicant, DeleteApplicant, CreateApplicant, getAllApplicants };