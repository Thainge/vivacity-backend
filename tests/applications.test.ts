const app = require("../src/server");
const request = require("supertest");
import { StatusCodes } from 'http-status-codes';
import { Applicant } from '../src/controllers/applicant';

const baseURL = 'http://localhost:6060';

describe("GET /awesome/applicant/:id", () => {
    const testApplicant: Applicant = {
        id: 50001,
        firstname: "Test",
        lastname: "Test",
        about: "Test",
        address: "Test",
        state: "Test",
        city: "Test",
        zip: "Test"
    }

    beforeAll(async () => {
        // set up test applicant
        await request(baseURL).post("/awesome/applicant").send(testApplicant);
    });
    afterAll(async () => {
        // delete test applicant after tests
        await request(baseURL).delete(`/awesome/applicant/${testApplicant.id}`);
    });

    it("should return 200", async () => {
        const response = await request(baseURL).get(`/awesome/applicant/${testApplicant.id}`);
        expect(response.statusCode).toBe(StatusCodes.OK);
    });

    it("should return 400", async () => {
        const response = await request(baseURL).get(`/awesome/applicant/null`);
        expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
});

describe("POST /awesome/applicant", () => {
    const testApplicant: Applicant = {
        id: 50002,
        firstname: "Test",
        lastname: "Test",
        about: "Test",
        address: "Test",
        state: "Test",
        city: "Test",
        zip: "Test"
    }

    afterAll(async () => {
        // delete test applicant after tests
        await request(baseURL).delete(`/awesome/applicant/${testApplicant.id}`);
    });

    it("should return 201", async () => {
        const response = await request(baseURL).post("/awesome/applicant").send(testApplicant);
        expect(response.statusCode).toBe(StatusCodes.CREATED);
    });

    it("should return 200", async () => {
        const response = await request(baseURL).post("/awesome/applicant").send(testApplicant);
        expect(response.statusCode).toBe(StatusCodes.OK);
    });

    it("should return 400", async () => {
        const response = await request(baseURL).post(`/awesome/applicant`);
        expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
});

describe("PUT /awesome/applicant", () => {
    const testApplicant: Applicant = {
        id: 50004,
        firstname: "Test",
        lastname: "Test",
        about: "Test",
        address: "Test",
        state: "Test",
        city: "Test",
        zip: "Test"
    }

    beforeAll(async () => {
        // set up test applicant
        await request(baseURL).post("/awesome/applicant").send(testApplicant);
    });
    afterAll(async () => {
        // delete test applicant after tests
        await request(baseURL).delete(`/awesome/applicant/${testApplicant.id}`);
    });

    it("should return 200", async () => {
        const response = await request(baseURL).put(`/awesome/applicant`).send(testApplicant);
        expect(response.statusCode).toBe(StatusCodes.OK);
    });

    it("should return 400", async () => {
        const response = await request(baseURL).post(`/awesome/applicant`);
        expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
});

describe("DELETE /awesome/applicant", () => {
    const testApplicant: Applicant = {
        id: 50005,
        firstname: "Test",
        lastname: "Test",
        about: "Test",
        address: "Test",
        state: "Test",
        city: "Test",
        zip: "Test"
    }

    beforeAll(async () => {
        // set up test applicant
        await request(baseURL).post("/awesome/applicant").send(testApplicant);
    });

    it("should return 200", async () => {
        const response = await request(baseURL).delete(`/awesome/applicant/${testApplicant.id}`);
        expect(response.statusCode).toBe(StatusCodes.OK);
    });

    it("should return 400", async () => {
        const response = await request(baseURL).post(`/awesome/applicant/null`);
        expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
    });
});