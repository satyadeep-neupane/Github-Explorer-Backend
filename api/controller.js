const {
    fetchRespositoryList,
    fetchRespositoryDetail,
    fetchReadMe,
    fetchUserDetail,
} = require("./config");

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

        const queryParams = new URLSearchParams({
            q,
            type: "repositories",
            per_page: perPage,
            page,
        });

        if (sort) queryParams.append("sort", sort);
        if (sort && ["asc", "desc"].includes(order))
            queryParams.append("order", order);

        const { data } = await fetchRespositoryList(queryParams);

        const processedData = {
            totalCount: data.total_count,
            items: data?.items?.map((i) => ({
                id: i.id,
                repoName: i.name,
                repoFullName: i.full_name,
                ownerId: i.owner?.login,
                description: i.description,
                updatedAt: i.updated_at,
                starsCount: i.stargazers_count,
                watchersCount: i.watchers_count,
                forksCount: i.forks,
            })),
        };

        const totalCount = parseInt(data?.total_count || 0);

        const pagination = {
            totalCount,
            perPage: parseInt(perPage),
            totalPages: Math.ceil(totalCount / parseInt(perPage)),
            currentPage: parseInt(page),
        };

        res.json({
            success: true,
            data: processedData,
            pagination,
        });
    } catch (error) {
        next(error);
    }
};

exports.getRepositoryDetail = async (req, res, next) => {
    const { owner, repo } = req.params;

    try {
        // Initiate fetching repo details and readme in parallel
        const repoDetailPromise = fetchRespositoryDetail(owner, repo);
        const readmePromise = fetchReadMe(owner, repo);

        // Await repo details to fetch owner details
        const { data: repoDetail } = await repoDetailPromise;
        const username = repoDetail.owner?.login;

        // Initiate fetching user details
        const userDetailPromise = fetchUserDetail(username);

        // Await both readme and user details
        const [userDetailResponse, readmeResponse] = await Promise.all([
            userDetailPromise,
            readmePromise,
        ]);

        const userDetail = userDetailResponse.data;
        const readme = readmeResponse.data;

        const data = {
            ownerName: userDetail.name || repoDetail.owner?.login,
            ownerUrl: userDetail.html_url,
            repositoryName: repoDetail.name,
            repositoryUrl: repoDetail.html_url,
            openIssuesCount: repoDetail.open_issues,
            defaultBranch: repoDetail.default_branch,
            starsCount: repoDetail.stargazers_count,
            watchersCount: repoDetail.watchers_count,
            forksCount: repoDetail.forks,
            updatedAt: repoDetail.updated_at,
            readme,
        };

        res.json({
            success: true,
            data,
        });
    } catch (error) {
        console.error("Error in getRepositoryDetail:", error.message);
        next(error);
    }
};
