const axios = require("axios");
const GITHUB_URL = "https://api.github.com";
const { PER_PAGE_DEFAULT, DEFAULT_PAGE } = require("./constants");

exports.searchRepository = async (req, res, next) => {
    const {
        q,
        per_page: perPage = PER_PAGE_DEFAULT,
        page = DEFAULT_PAGE,
        sort,
        order,
    } = req.query;

    try {
        if (!q) {
            throw {
                message: "Validation Failed",
                error: "Search field missing",
                status: 400,
            };
        }

        const queryParams = new URLSearchParams({ q, per_page: perPage, page });

        if (order) queryParams.append("order", order);
        if (sort && ["asc", "desc"].includes(sort))
            queryParams.append("sort", sort);

        const { data } = await axios.get(`${GITHUB_URL}/search/repositories`, {
            params: queryParams,
        });

        const totalCount = parseInt(data?.total_count || 0);

        const pagination = {
            totalCount,
            perPage: parseInt(perPage),
            totalPages: Math.ceil(totalCount / parseInt(perPage)),
            currentPage: parseInt(page),
        };

        res.json({
            success: true,
            data,
            pagination,
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

exports.getRespositoryDetail = (req, res, next) => {};
