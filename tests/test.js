const { searchRepository } = require("../api/controller");

describe("searchRepository", () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            query: {},
        };
        res = {
            json: jest.fn(),
        };
        next = jest.fn();
    });

    it("should return 400 if the search query is missing", async () => {
        await searchRepository(req, res, next);

        expect(next).toHaveBeenCalledWith({
            message: "Validation Failed",
            error: "Search field missing",
            status: 400,
        });
    });
});
