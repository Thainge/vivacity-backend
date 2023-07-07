import { put } from './../node_modules/@jridgewell/set-array/src/set-array';
const app = require("../src/server");
const request = require("supertest");
import { StatusCodes } from 'http-status-codes';
import { Applicant } from '../src/controllers/applicant';

const baseURL = 'http://localhost:6060';

describe("GET /awesome", () => {
    const testApplicant: Applicant = {
        id: 50000,
        firstName: "Test",
        lastName: "Test",
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
        const response = await request(baseURL).get("/awesome");
        expect(response.statusCode).toBe(StatusCodes.OK);
    });
});

describe("GET /awesome/applicant/:id", () => {
    const testApplicant: Applicant = {
        id: 50001,
        firstName: "Test",
        lastName: "Test",
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
});

describe("POST /awesome/applicant", () => {
    const testApplicant: Applicant = {
        id: 50002,
        firstName: "Test",
        lastName: "Test",
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
});

describe("PUT /awesome/applicant", () => {
    const testApplicant: Applicant = {
        id: 50003,
        firstName: "Test",
        lastName: "Test",
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
});

describe("DELETE /awesome/applicant", () => {
    const testApplicant: Applicant = {
        id: 50004,
        firstName: "Test",
        lastName: "Test",
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
});