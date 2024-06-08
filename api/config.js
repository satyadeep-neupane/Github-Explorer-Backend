const axios = require("axios");
const GITHUB_URL = "https://api.github.com";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers = GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {};

const instance = axios.create({
    baseURL: GITHUB_URL,
    headers,
});

exports.fetchRespositoryList = (queryParams) => {
    return instance.get(`/search/repositories`, {
        params: queryParams,
    });
};

exports.fetchRespositoryDetail = (owner, repo) => {
    return instance.get(`/repos/${owner}/${repo}`);
};

exports.fetchReadMe = (owner, repo) => {
    return instance
        .get(`/repos/${owner}/${repo}/readme`, {
            headers: {
                Accept: "application/vnd.github.v3.raw",
            },
        })
        .catch((err) => {
            return { data: "" };
        });
};

exports.fetchUserDetail = (username) => {
    return instance.get(`/users/${username}`);
};

exports.instance = instance;
